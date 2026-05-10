"use client";

import { useEffect } from "react";

import {
  buttons,
  cn,
  glass,
  motion,
  overlays,
  spacing,
  typography,
} from "@/lib/designSystem";
import type { GameEvent } from "@/lib/types";

type Props = {
  event: GameEvent | null;
  onClose: () => void;
};

export function CrisisModal({ event, onClose }: Props) {
  useEffect(() => {
    if (!event) return;
    const id = window.setTimeout(
      () => onClose(),
      motion.ui.crisisModalAutoCloseMs,
    );
    return () => window.clearTimeout(id);
  }, [event, onClose]);

  if (!event) return null;

  const pct = (event.impactFactor * 100).toFixed(1);

  return (
    <div className={overlays.modal}>
      <div
        role="dialog"
        aria-labelledby="crisis-title"
        className={cn(spacing.layout.modalWidth, glass.modalPanel)}
      >
        <h2 id="crisis-title" className={typography.className.modalTitle}>
          ⚠️ KUR ŞOKU!
        </h2>
        <p className={cn(typography.className.modalBody, spacing.margin.blockTop)}>
          {event.description}
        </p>
        <p
          className={cn(
            typography.className.modalMetric,
            spacing.margin.stackTop,
          )}
        >
          Tahmini kur etkisi: +{pct}%
        </p>
        <button
          type="button"
          className={cn(buttons.warningGhost, spacing.margin.sectionTop)}
          onClick={onClose}
        >
          Kapat
        </button>
      </div>
    </div>
  );
}
