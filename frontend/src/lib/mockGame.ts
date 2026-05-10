import type {
  GameEvent,
  GameState,
  Product,
  RestockErrorBody,
} from "./types";

type Mood = Product["customerMood"];

type InternalProduct = Omit<Product, "customerMood"> & {
  basePrice: number;
};

const INITIAL_CASH = 10_000;
const BASE_USD_TRY = 32;
const TICK_MS = 5000;
const DAY_MS = 60_000;
const BASE_SALE_RATE = 6;

const seedProducts: InternalProduct[] = [
  {
    id: 1,
    productName: "Ekmek",
    productEmoji: "🍞",
    productType: "local",
    stockQuantity: 100,
    purchasePrice: 5,
    shelfPrice: 7,
    basePrice: 5,
  },
  {
    id: 2,
    productName: "Süt",
    productEmoji: "🥛",
    productType: "local",
    stockQuantity: 50,
    purchasePrice: 18,
    shelfPrice: 24,
    basePrice: 18,
  },
  {
    id: 3,
    productName: "Sıvı Yağ",
    productEmoji: "🫙",
    productType: "import",
    stockQuantity: 30,
    purchasePrice: 65,
    shelfPrice: 85,
    basePrice: 65,
  },
];

function cloneInitialInventory(): InternalProduct[] {
  return structuredClone(seedProducts);
}

function initialGameState(): GameState {
  return {
    cashBalance: INITIAL_CASH,
    gameDay: 1,
    inflationRate: 0.001,
    usdTryRate: BASE_USD_TRY,
    isBankrupt: false,
    recentEvents: [],
  };
}

function moodFromShelfPurchase(shelf: number, purchase: number): Mood {
  if (!(purchase > 0)) return "Normal";
  const ratio = shelf / purchase;
  if (ratio > 1.4) return "Fırsatçı";
  if (shelf < purchase) return "Panik Alışı";
  return "Normal";
}

function salesMultiplier(mood: Mood): number {
  if (mood === "Fırsatçı") return 0;
  if (mood === "Panik Alışı") return 5;
  return 1;
}

let gameState = initialGameState();
let inventory = cloneInitialInventory();
let recentEventsRing: GameEvent[] = [];

let lastSyncAt = NaN;
let tickDebtMs = 0;
let dayDebtMs = 0;
let shockNonce = 0;

export function getShockNonce(): number {
  return shockNonce;
}

function pushEvent(ev: GameEvent) {
  recentEventsRing = [ev, ...recentEventsRing].slice(0, 5);
  gameState = { ...gameState, recentEvents: recentEventsRing };
}

function bumpInflation(currentRate: number): number {
  return currentRate + (Math.random() * 0.0004 + 0.0001);
}

export function syncEngine(nowMs?: number): void {
  if (gameState.isBankrupt) return;
  const now =
    typeof nowMs === "number"
      ? nowMs
      : typeof performance !== "undefined"
        ? performance.now()
        : Date.now();
  if (!Number.isFinite(lastSyncAt)) {
    lastSyncAt = now;
    return;
  }
  const delta = Math.min(now - lastSyncAt, 50_000);
  lastSyncAt = now;
  tickDebtMs += delta;
  dayDebtMs += delta;

  while (tickDebtMs >= TICK_MS) {
    tickDebtMs -= TICK_MS;
    processTickInternal();
    if (gameState.isBankrupt) break;
  }

  while (dayDebtMs >= DAY_MS) {
    dayDebtMs -= DAY_MS;
    gameState = { ...gameState, gameDay: gameState.gameDay + 1 };
  }
}

export function restoreLastSyncBaseline(): void {
  lastSyncAt =
    typeof performance !== "undefined" ? performance.now() : Date.now();
  tickDebtMs = 0;
  dayDebtMs = 0;
}

function triggerCurrencyShock(usdTryRate: number): {
  newUsdTryRate: number;
  shockTriggered: boolean;
  impactFactor: number;
} {
  if (Math.random() >= 0.15) {
    return { newUsdTryRate: usdTryRate, shockTriggered: false, impactFactor: 0 };
  }
  const impactFactor = Math.random() * 0.1 + 0.1;
  const newUsdTryRate = usdTryRate * (1 + impactFactor);
  return { newUsdTryRate, shockTriggered: true, impactFactor };
}

function updatePurchasePrices(
  products: InternalProduct[],
  inflationRate: number,
  usdTryRate: number,
  baseUsdTryRate: number,
): InternalProduct[] {
  return products.map((p) => {
    if (p.productType === "local") {
      return { ...p, purchasePrice: p.basePrice * (1 + inflationRate) };
    }
    const rateRatio = usdTryRate / baseUsdTryRate;
    return { ...p, purchasePrice: p.basePrice * (1 + inflationRate) * rateRatio };
  });
}

function processSales(state: GameState, products: InternalProduct[]): { state: GameState; products: InternalProduct[] } {
  let cash = state.cashBalance;
  const nextProducts = products.map((p) => {
    const mood = moodFromShelfPurchase(p.shelfPrice, p.purchasePrice);
    const mult = salesMultiplier(mood);
    const proposed = Math.floor(BASE_SALE_RATE * mult);
    const sold = Math.min(p.stockQuantity, proposed);
    if (sold <= 0) return { ...p, stockQuantity: p.stockQuantity };
    cash += sold * p.shelfPrice;
    return { ...p, stockQuantity: p.stockQuantity - sold };
  });
  return { state: { ...state, cashBalance: cash }, products: nextProducts };
}

export function checkBankruptcy(cashBalance: number): boolean {
  return cashBalance <= 0;
}

function processTickInternal(): void {
  const infl = bumpInflation(gameState.inflationRate);
  gameState = { ...gameState, inflationRate: infl };

  let usd = gameState.usdTryRate;
  const shock = triggerCurrencyShock(usd);
  if (shock.shockTriggered) {
    usd = shock.newUsdTryRate;
    gameState = { ...gameState, usdTryRate: usd };
    shockNonce += 1;
    pushEvent({
      eventType: "currency_shock",
      description: "Dolar fırladı!",
      impactFactor: shock.impactFactor,
    });
  }

  inventory = updatePurchasePrices(
    inventory,
    gameState.inflationRate,
    gameState.usdTryRate,
    BASE_USD_TRY,
  );

  const afterSales = processSales(gameState, inventory);
  gameState = afterSales.state;
  inventory = afterSales.products;

  if (checkBankruptcy(gameState.cashBalance)) {
    gameState = { ...gameState, isBankrupt: true, cashBalance: 0 };
  }
}

function publicProduct(row: InternalProduct): Product {
  return {
    id: row.id,
    productName: row.productName,
    productEmoji: row.productEmoji,
    productType: row.productType,
    stockQuantity: row.stockQuantity,
    purchasePrice: row.purchasePrice,
    shelfPrice: row.shelfPrice,
    customerMood: moodFromShelfPurchase(row.shelfPrice, row.purchasePrice),
  };
}

export function getPublicGameState(): GameState {
  const ev = [...recentEventsRing];
  return { ...gameState, recentEvents: ev };
}

export function getInventory(): Product[] {
  return inventory.map(publicProduct);
}

export function resetGame(): void {
  gameState = initialGameState();
  inventory = cloneInitialInventory();
  recentEventsRing = [];
  shockNonce = 0;
  restoreLastSyncBaseline();
}

export function applySetShelfPrice(productId: number, shelf: number): Product {
  if (!(shelf > 0) || !Number.isFinite(shelf)) throw new Error("Geçersiz fiyat");
  const exists = inventory.some((p) => p.id === productId);
  if (!exists) throw new Error("Ürün bulunamadı");
  inventory = inventory.map((p) =>
    p.id === productId ? { ...p, shelfPrice: shelf } : p,
  );
  const row = inventory.find((p) => p.id === productId)!;
  return publicProduct(row);
}

export function applyQuickRaise(productId: number): Product {
  const idx = inventory.findIndex((p) => p.id === productId);
  if (idx === -1) throw new Error("Ürün bulunamadı");
  const p = inventory[idx]!;
  const shelf = p.shelfPrice * 1.1;
  return applySetShelfPrice(productId, shelf);
}

export function applyRestock(productId: number, quantity: number): void {
  if (!(quantity > 0) || !Number.isFinite(quantity)) throw new Error("Geçersiz adet");
  const idx = inventory.findIndex((p) => p.id === productId);
  if (idx === -1) throw new Error("Ürün bulunamadı");
  const p = inventory[idx]!;
  const cost = p.purchasePrice * quantity;
  if (gameState.cashBalance < cost) {
    const err = new Error("Yetersiz bakiye");
    (err as Error & { body: RestockErrorBody }).body = {
      error: "Yetersiz bakiye",
      required: cost,
      available: gameState.cashBalance,
    };
    throw err;
  }
  inventory = inventory.map((row) =>
    row.id === productId ? { ...row, stockQuantity: row.stockQuantity + quantity } : row,
  );
  gameState = { ...gameState, cashBalance: gameState.cashBalance - cost };
}
