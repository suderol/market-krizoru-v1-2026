"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { BankruptModal } from "@/components/BankruptModal";
import { CrisisModal } from "@/components/CrisisModal";
import { Dashboard } from "@/components/Dashboard";
import { NewsTicker } from "@/components/NewsTicker";
import { ProductCard } from "@/components/ProductCard";
import { getInventory, getState } from "@/lib/api";
import {
  chrome,
  cn,
  glass,
  layout,
  shell,
  spacing,
  typography,
} from "@/lib/designSystem";
import { getShockNonce } from "@/lib/mockGame";
import type { GameEvent, GameState, Product } from "@/lib/types";

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [crisisEvent, setCrisisEvent] = useState<GameEvent | null>(null);

  const lastNonceRef = useRef(0);

  const refresh = useCallback(async () => {
    try {
      const [nextState, inv] = await Promise.all([
        getState(),
        getInventory(),
      ]);

      const curNonce = getShockNonce();
      if (curNonce > lastNonceRef.current) {
        lastNonceRef.current = curNonce;
        const shock = nextState.recentEvents.find(
          (e) => e.eventType === "currency_shock",
        );
        if (shock) setCrisisEvent(shock);
      }

      setGameState(nextState);
      setProducts(inv);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const kickoff = window.setTimeout(() => void refresh(), 0);
    const intervalId = window.setInterval(() => void refresh(), 2000);
    return () => {
      window.clearTimeout(kickoff);
      window.clearInterval(intervalId);
    };
  }, [refresh]);

  const closeCrisis = useCallback(() => setCrisisEvent(null), []);

  if (loading && !gameState) {
    return (
      <div className={cn(layout.flexHeader, typography.className.loadingState)}>
        Yükleniyor…
      </div>
    );
  }

  if (!gameState) {
    return (
      <div className={cn(layout.flexHeader, typography.className.errorState)}>
        Oyun durumu alınamadı.
      </div>
    );
  }

  return (
    <div className={shell.page}>
      <header className={cn(spacing.padding.header, glass.header)}>
        <h1 className={typography.className.pageTitle}>Market Krizörü</h1>
        <p
          className={cn(
            typography.className.subtitle,
            spacing.margin.titleTop,
            spacing.layout.maxContent,
            "mx-auto",
          )}
        >
          Fiyatları ayarlayın, stoku yönetin, yerel ekonomi ile kur şoklarından
          sağ çıkın.{" "}
          <span className={typography.className.demoHighlight}>Demo (mock).</span>
        </p>
      </header>

      <main
        className={cn(
          "mx-auto",
          spacing.layout.maxContent,
          spacing.layout.mainStack,
          spacing.padding.main,
        )}
      >
        <Dashboard gameState={gameState} />
        <NewsTicker />
        <div className={layout.productGrid}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPriceUpdate={() => void refresh()}
            />
          ))}
        </div>
      </main>

      <CrisisModal event={crisisEvent} onClose={closeCrisis} />

      <BankruptModal gameState={gameState} onRestart={() => undefined} />

      <div className={chrome.mockRibbon}>Yerel mock · API yok</div>
    </div>
  );
}
