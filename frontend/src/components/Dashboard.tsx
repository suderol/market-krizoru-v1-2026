import { cn, glass, spacing, typography } from "@/lib/designSystem";
import type { GameState } from "@/lib/types";

type Props = { gameState: GameState };

export function Dashboard({ gameState }: Props) {
  const lowCash = gameState.cashBalance < 1000;

  return (
    <div className={spacing.layout.dashboardGrid}>
      <div className={lowCash ? glass.cardAlert : glass.cardMuted}>
        <p className={typography.className.sectionLabel}>💰 Kasa Bakiyesi</p>
        <p className={cn(typography.className.bodyStrong, spacing.margin.valueTop)}>
          {gameState.cashBalance.toFixed(2)} ₺
        </p>
      </div>
      <div className={glass.cardMuted}>
        <p className={typography.className.sectionLabel}>📈 Enflasyon</p>
        <p className={cn(typography.className.bodyStrong, spacing.margin.valueTop)}>
          {(gameState.inflationRate * 100).toFixed(2)}%
        </p>
      </div>
      <div className={glass.cardMuted}>
        <p className={typography.className.sectionLabel}>📅 Gün</p>
        <p className={cn(typography.className.bodyStrong, spacing.margin.valueTop)}>
          {gameState.gameDay}
        </p>
      </div>
      <div className={glass.cardMuted}>
        <p className={typography.className.sectionLabel}>💵 USD/TRY</p>
        <p className={cn(typography.className.bodyStrong, spacing.margin.valueTop)}>
          {gameState.usdTryRate.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
