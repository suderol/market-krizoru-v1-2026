"use client";

import { resetGame } from "@/lib/api";
import {
  buttons,
  cn,
  glass,
  overlays,
  spacing,
  typography,
} from "@/lib/designSystem";
import type { GameState } from "@/lib/types";

type Props = {
  gameState: GameState;
  onRestart: () => void;
};

export function BankruptModal({ gameState, onRestart }: Props) {
  if (!gameState.isBankrupt) return null;

  const handleReplay = async () => {
    try {
      await resetGame();
      onRestart();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={overlays.bankrupt}>
      <div className={cn(spacing.layout.modalWidth, glass.bankruptPanel)}>
        <p className={typography.className.bankruptEmoji}>💸</p>
        <h2
          className={cn(typography.className.bankruptTitle, spacing.margin.majorTop)}
        >
          İflas
        </h2>
        <p
          className={cn(typography.className.bankruptBody, spacing.margin.blockTop)}
        >
          {gameState.gameDay} gün sonra kasanız sıfırlandı. Rekabet zordu —
          yeniden deneyebilirsiniz.
        </p>
        <button
          type="button"
          className={cn(buttons.success, spacing.margin.majorTop)}
          onClick={handleReplay}
        >
          Tekrar Oyna
        </button>
      </div>
    </div>
  );
}
