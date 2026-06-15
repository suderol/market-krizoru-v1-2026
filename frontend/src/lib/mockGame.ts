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

const INITIAL_CASH = 15_000;
const BASE_USD_TRY = 45.0; 
const TICK_MS = 5000;
const DAY_MS = 60_000;
let currentBaseSaleRate = 6; 

// Lojistik altyapı yatırımını kontrol eden değişken
let isLogisticsUpgraded = false;

const seedProducts: InternalProduct[] = [
  { id: 1, productName: "Ekmek", productEmoji: "🍞", productType: "local", stockQuantity: 100, purchasePrice: 6, shelfPrice: 9, basePrice: 6 },
  { id: 2, productName: "Süt", productEmoji: "🥛", productType: "local", stockQuantity: 60, purchasePrice: 20, shelfPrice: 28, basePrice: 20 },
  { id: 3, productName: "Makarna", productEmoji: "🍝", productType: "local", stockQuantity: 80, purchasePrice: 12, shelfPrice: 18, basePrice: 12 },
  { id: 4, productName: "Sıvı Yağ", productEmoji: "🫙", productType: "import", stockQuantity: 30, purchasePrice: 70, shelfPrice: 95, basePrice: 70 },
  { id: 5, productName: "Çikolata", productEmoji: "🍫", productType: "import", stockQuantity: 40, purchasePrice: 18, shelfPrice: 26, basePrice: 18 },
  { id: 6, productName: "Filtre Kahve", productEmoji: "☕", productType: "import", stockQuantity: 20, purchasePrice: 130, shelfPrice: 195, basePrice: 130 },
  { id: 7, productName: "Bebek Bezi", productEmoji: "👶", productType: "import", stockQuantity: 25, purchasePrice: 85, shelfPrice: 125, basePrice: 85 },
  { id: 8, productName: "Enerji İçeceği", productEmoji: "⚡", productType: "import", stockQuantity: 35, purchasePrice: 35, shelfPrice: 55, basePrice: 35 }
];

let gameState = initialGameState();
let inventory = cloneInitialInventory();
let recentEventsRing: GameEvent[] = [];

let lastSyncAt = NaN;
let tickDebtMs = 0;
let dayDebtMs = 0;
let shockNonce = 0;

let globalCustomsTariff = 1.0;
let logisticsSurcharge = 0;
let campaignProductIds: number[] = []; 

function cloneInitialInventory(): InternalProduct[] {
  return structuredClone(seedProducts);
}

function initialGameState(): GameState {
  return {
    cashBalance: INITIAL_CASH,
    gameDay: 1,
    inflationRate: 0.15, 
    usdTryRate: BASE_USD_TRY,
    isBankrupt: false,
    recentEvents: [],
  };
}

function moodFromShelfPurchase(productId: number, shelf: number, purchase: number): Mood {
  if (campaignProductIds.includes(productId)) return "Panik Alışı"; 
  if (!(purchase > 0)) return "Normal";
  const ratio = shelf / purchase;
  if (ratio > 1.45) return "Fırsatçı"; 
  if (ratio <= 1.05) return "Panik Alışı"; 
  return "Normal";
}

function salesMultiplier(mood: Mood): number {
  if (mood === "Fırsatçı") return 0.1;
  if (mood === "Panik Alışı") return 3.5;
  return 1;
}

export function getShockNonce(): number {
  return shockNonce;
}

function pushEvent(ev: GameEvent) {
  recentEventsRing = [ev, ...recentEventsRing].slice(0, 5);
  gameState = { ...gameState, recentEvents: recentEventsRing };
}

function adjustInflation(currentRate: number, trend: "up" | "down" | "stable"): number {
  const change = Math.random() * 0.005;
  if (trend === "up") return Math.min(currentRate + change, 0.85); 
  if (trend === "down") return Math.max(currentRate - change, 0.05); 
  return currentRate + (Math.random() * 0.002 - 0.001); 
}

export function syncEngine(nowMs?: number): void {
  if (gameState.isBankrupt) return;
  const now = typeof nowMs === "number" ? nowMs : typeof performance !== "undefined" ? performance.now() : Date.now();
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
  lastSyncAt = typeof performance !== "undefined" ? performance.now() : Date.now();
  tickDebtMs = 0;
  dayDebtMs = 0;
}

function processDynamicMacroEconomy() {
  const roll = Math.random();
  campaignProductIds = []; 
  
  if (roll < 0.12) {
    const impact = Math.random() * 0.05 + 0.02; 
    gameState.usdTryRate = gameState.usdTryRate * (1 + impact);
    gameState.inflationRate = adjustInflation(gameState.inflationRate, "up");
    shockNonce += 1;
    pushEvent({
      eventType: "currency_shock",
      description: `💵 DÖVİZ BASKISI: Küresel gelişmelerle Dolar/TL yükseldi. İthal maliyetleri artıyor.`,
      impactFactor: impact,
    });
  } 
  else if (roll >= 0.12 && roll < 0.24) {
    const drop = Math.random() * 0.03 + 0.02; 
    gameState.usdTryRate = Math.max(gameState.usdTryRate * (1 - drop), BASE_USD_TRY * 0.85);
    gameState.inflationRate = adjustInflation(gameState.inflationRate, "down");
    currentBaseSaleRate = Math.max(2.5, currentBaseSaleRate - 2); 
    pushEvent({
      eventType: "policy_shock",
      description: `🏛️ FAİZ ARTIRILDI: Merkez Bankası faiz artırdı, Dolar geriledi! Piyasa yavaşlıyor, kampanya yapma zamanı!`,
      impactFactor: drop,
    });
  } 
  else if (roll >= 0.24 && roll < 0.34) {
    currentBaseSaleRate += 2; 
    const rise = Math.random() * 0.02 + 0.01;
    gameState.usdTryRate = gameState.usdTryRate * (1 + rise);
    pushEvent({
      eventType: "policy_shock",
      description: `🎉 FAİZ İNDİRİMİ: Tüketim çılgınlığı başladı, mağazada satış hızları artıyor!`,
      impactFactor: rise,
    });
  }
  else if (roll >= 0.34 && roll < 0.42) {
    logisticsSurcharge = 12; 
    pushEvent({
      eventType: "logistics_premium",
      description: `⛽ LOJİSTİK DARBOĞAZI: Akaryakıt zammı nakliye maliyetlerini artırdı.`,
      impactFactor: 0.2,
    });
  }
  else {
    globalCustomsTariff = 1.0;
    logisticsSurcharge = 0;
    gameState.inflationRate = adjustInflation(gameState.inflationRate, "stable");
    if (gameState.usdTryRate > BASE_USD_TRY * 1.25) {
      gameState.usdTryRate = gameState.usdTryRate * 0.97; 
    }
  }
}

function updatePurchasePrices(products: InternalProduct[], inflationRate: number, usdTryRate: number, baseUsdTryRate: number): InternalProduct[] {
  return products.map((p) => {
    let cost = p.basePrice * (1 + inflationRate);
    if (p.productType === "import") {
      cost = cost * (usdTryRate / baseUsdTryRate) * globalCustomsTariff; 
    } else {
      cost = cost * (((usdTryRate / baseUsdTryRate) + 1) / 2);
    }
    
    // EĞER lojistik yatırımı yapıldıysa, lojistik zammını %50 (yarı yarıya) yansıtıyoruz
    const activeLogisticsSurcharge = isLogisticsUpgraded ? (logisticsSurcharge / 2) : logisticsSurcharge;
    cost += activeLogisticsSurcharge;
    
    return { ...p, purchasePrice: cost };
  });
}

function processSales(state: GameState, products: InternalProduct[]): { state: GameState; products: InternalProduct[] } {
  return { state, products };
}

export function triggerManualSales(): void {
  if (gameState.isBankrupt) return;
  
  let cash = gameState.cashBalance;
  const nextProducts = inventory.map((p) => {
    const mood = moodFromShelfPurchase(p.id, p.shelfPrice, p.purchasePrice);
    const mult = salesMultiplier(mood);
    const proposed = Math.