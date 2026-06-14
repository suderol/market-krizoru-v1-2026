/**
 * Yerel mock motoru kullanır. Projenin tarayıcıda bağımsız çalışmasını sağlar.
 */

import type { GameState, Product } from "@/lib/types";

import {
  applyQuickRaise as mockQuickRaise,
  applyRestock as mockRestock,
  applySetShelfPrice as mockSetShelf,
  getInventory as mockInventorySnapshot,
  getPublicGameState,
  resetGame as mockReset,
  syncEngine,
  applyCampaignDiscount as mockCampaign,
  applyUpgradeStore as mockUpgrade,
  applyCreditRestock as mockCreditRestock
} from "@/lib/mockGame";

export async function getState(): Promise<GameState> {
  try {
    syncEngine();
    return getPublicGameState();
  } catch (err) {
    console.error("[api] getState", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

export async function getInventory(): Promise<Product[]> {
  try {
    syncEngine();
    return mockInventorySnapshot();
  } catch (err) {
    console.error("[api] getInventory", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

export async function setPrice(productId: number, newShelfPrice: number): Promise<Product> {
  try {
    syncEngine();
    return mockSetShelf(productId, newShelfPrice);
  } catch (err) {
    console.error("[api] setPrice", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

export async function quickRaise(productId: number): Promise<Product> {
  try {
    syncEngine();
    return mockQuickRaise(productId);
  } catch (err) {
    console.error("[api] quickRaise", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

export async function restock(productId: number, quantity: number): Promise<void> {
  try {
    syncEngine();
    mockRestock(productId, quantity);
  } catch (err) {
    console.error("[api] restock", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

export async function resetGame(): Promise<void> {
  try {
    mockReset();
  } catch (err) {
    console.error("[api] resetGame", err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

// 🏷️ Kampanya API Tanımı
export async function campaignDiscount(productId: number): Promise<Product> {
  syncEngine();
  return mockCampaign(productId);
}

// 🏢 Mağaza Büyütme API Tanımı
export async function upgradeStore(): Promise<void> {
  syncEngine();
  mockUpgrade();
}

// 💰 Vadeli Alım API Tanımı
export async function creditRestock(productId: number, quantity: number): Promise<void> {
  syncEngine();
  mockCreditRestock(productId, quantity);
}