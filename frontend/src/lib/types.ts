export interface GameState {
  cashBalance: number;
  gameDay: number;
  inflationRate: number;
  usdTryRate: number;
  isBankrupt: boolean;
  recentEvents: GameEvent[];
}

export interface GameEvent {
  eventType: string;
  description: string;
  impactFactor: number;
}

export interface Product {
  id: number;
  productName: string;
  productEmoji: string;
  productType: "local" | "import";
  stockQuantity: number;
  purchasePrice: number;
  shelfPrice: number;
  customerMood: "Normal" | "Fırsatçı" | "Panik Alışı";
}

export interface RestockErrorBody {
  error: string;
  required: number;
  available: number;
}
