import { cn, spacing } from "@/lib/designSystem";
import type { GameState } from "@/lib/types";

// Not: Eğer GameState tipinde interestRate yoksa hata vermemesi için 
// opsiyonel tanımladım veya varsayılan değer atadım.
type Props = { gameState: GameState };

export function Dashboard({ gameState }: Props) {
  const lowCash = gameState.cashBalance < 1000;
  const highInflation = gameState.inflationRate > 0.35; 
  const highUsd = gameState.usdTryRate > 50; 
  
  // Merkez Bankası faiz görünümü için (Eğer state'inde yoksa varsayılan %45 gösterir)
  const currentInterestRate = (gameState as any).interestRate !== undefined ? (gameState as any).interestRate : 0.45;
  const highInterest = currentInterestRate > 0.50;

  return (
    <div className={spacing.layout.dashboardGrid}>
      {/* Kasa Bakiyesi */}
      <div className={cn(
        lowCash ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-red-950/20" : "border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)] bg-slate-900/80",
        "border backdrop-blur-md rounded-xl p-4 transition-all duration-300"
      )}>
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">💰 Kasa Bakiyesi</p>
        <p className={cn("text-2xl font-black tabular-nums mt-2", lowCash ? "text-red-400 animate-pulse" : "text-emerald-400")}>
          {gameState.cashBalance.toFixed(2)} ₺
        </p>
      </div>

      {/* Enflasyon Oranı */}
      <div className={cn(
        highInflation ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)] bg-amber-950/20" : "border-blue-500/20 bg-slate-900/80",
        "border backdrop-blur-md rounded-xl p-4 transition-all duration-300"
      )}>
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">📈 Enflasyon Oranı</p>
        <p className={cn("text-2xl font-black tabular-nums mt-2", highInflation ? "text-amber-400 animate-pulse" : "text-blue-400")}>
          {(gameState.inflationRate * 100).toFixed(2)}%
        </p>
      </div>

      {/* TCMB Politika Faizi (Ekonomi Öğrencisi Dokunuşu) */}
      <div className={cn(
        highInterest ? "border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-purple-950/20" : "border-blue-500/20 bg-slate-900/80",
        "border backdrop-blur-md rounded-xl p-4 transition-all duration-300"
      )}>
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">🏦 TCMB Politika Faizi</p>
        <p className={cn("text-2xl font-black tabular-nums mt-2", highInterest ? "text-purple-400" : "text-indigo-400")}>
          {(currentInterestRate * 100).toFixed(2)}%
        </p>
      </div>

      {/* Dolar Kuru */}
      <div className={cn(
        highUsd ? "border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)] bg-rose-950/20" : "border-blue-500/20 bg-slate-900/80",
        "border backdrop-blur-md rounded-xl p-4 transition-all duration-300"
      )}>
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">💵 USD / TRY</p>
        <p className={cn("text-2xl font-black tabular-nums mt-2", highUsd ? "text-rose-400" : "text-slate-200")}>
          {gameState.usdTryRate.toFixed(2)}
        </p>
      </div>

      {/* Simülasyon Günü */}
      <div className="border border-blue-500/20 bg-slate-900/80 backdrop-blur-md rounded-xl p-4 shadow-[0_0_15px_rgba(59,130,246,0.05)] md:col-span-4 lg:col-span-1">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">📅 Simülasyon Günü</p>
        <p className="text-2xl font-black text-cyan-400 tabular-nums mt-2">
          {gameState.gameDay}. Gün
        </p>
      </div>
    </div>
  );
}