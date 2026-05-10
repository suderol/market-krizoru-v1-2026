"use client";

import { useEffect, useRef, useState } from "react";

import { quickRaise, restock, setPrice } from "@/lib/api";
import {
  buttons,
  cn,
  customerMoodUi,
  glass,
  input as inputStyles,
  layout,
  radius,
  separators,
  spacing,
  typography,
} from "@/lib/designSystem";
import type { Product, RestockErrorBody } from "@/lib/types";

type Props = {
  product: Product;
  onPriceUpdate: () => void;
};

export function ProductCard({ product, onPriceUpdate }: Props) {
  const [draft, setDraft] = useState(String(product.shelfPrice));
  const [restockQty, setRestockQty] = useState("10");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const priceRef = useRef<HTMLParagraphElement>(null);
  const prevPurchase = useRef(product.purchasePrice);

  const mood = customerMoodUi[product.customerMood];

  useEffect(() => {
    // Sunucudan gelen satış fiyatı (poll / hızlı zam) inputta gösterilsin.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- draft ile prop senkronu
    setDraft(String(product.shelfPrice));
  }, [product.shelfPrice]);

  useEffect(() => {
    if (product.purchasePrice > prevPurchase.current) {
      const el = priceRef.current;
      if (el) {
        el.classList.remove("flash-red");
        void el.offsetWidth;
        el.classList.add("flash-red");
      }
    }
    prevPurchase.current = product.purchasePrice;
  }, [product.purchasePrice]);

  const submitPrice = async () => {
    const v = Number(draft.replace(",", "."));
    if (!(v > 0)) {
      setMsg("Geçerli bir fiyat girin.");
      return;
    }
    setBusy("price");
    setMsg(null);
    try {
      await setPrice(product.id, v);
      onPriceUpdate();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Kayıt başarısız.");
    } finally {
      setBusy(null);
    }
  };

  const doQuickRaise = async () => {
    setBusy("raise");
    setMsg(null);
    try {
      await quickRaise(product.id);
      onPriceUpdate();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Zam uygulanamadı.");
    } finally {
      setBusy(null);
    }
  };

  const doRestock = async () => {
    const q = Math.floor(Number(restockQty.replace(",", ".")));
    if (!(q > 0)) {
      setMsg("Geçerli adet girin.");
      return;
    }
    setBusy("restock");
    setMsg(null);
    try {
      await restock(product.id, q);
      onPriceUpdate();
    } catch (e) {
      if (e instanceof Error) {
        const body = (e as Error & { body?: RestockErrorBody }).body;
        if (body) {
          setMsg(
            `${body.error} — Gerekli: ${body.required.toFixed(2)} ₺ · Mevcut: ${body.available.toFixed(2)} ₺`,
          );
        } else {
          setMsg(e.message || "Stok alınamadı.");
        }
      } else {
        setMsg("Stok alınamadı.");
      }
    } finally {
      setBusy(null);
    }
  };

  return (
    <article className={cn(glass.productCard, mood.border)}>
      <div className={layout.cardHeaderRow}>
        <div className={layout.cardTitleCluster}>
          <span className={typography.className.emojiProduct}>
            {product.productEmoji}
          </span>
          <div>
            <h3 className={typography.className.productTitle}>
              {product.productName}
            </h3>
            <span className={typography.className.productMeta}>
              {product.productType === "import" ? "İthal" : "Yerli"}
            </span>
          </div>
        </div>
        <span
          className={cn(
            radius.className.full,
            "px-2.5 py-1 text-xs font-semibold",
            mood.badge,
          )}
        >
          {product.customerMood}
        </span>
      </div>

      <p className={cn(typography.className.sectionLabel, spacing.margin.stackTop)}>
        Alış fiyatı:{" "}
        <span ref={priceRef} className={typography.className.priceValue}>
          {product.purchasePrice.toFixed(2)} ₺
        </span>
      </p>
      <p className={cn(typography.className.sectionLabel, spacing.margin.valueTop)}>
        Stok:{" "}
        <span className="inline font-semibold tabular-nums">
          {product.stockQuantity}
        </span>{" "}
        ad.
      </p>

      <div className={cn(layout.formRow, spacing.margin.stackTop)}>
        <label className={cn("flex-1", typography.className.inputLabel)}>
          Satış fiyatı (₺)
          <input
            type="text"
            inputMode="decimal"
            value={draft}
            className={cn(
              inputStyles.base,
              inputStyles.focusPrimary,
            )}
            onChange={(e) => setDraft(e.target.value)}
          />
        </label>
        <button
          type="button"
          disabled={busy !== null}
          className={cn(
            buttons.base,
            buttons.primary,
            "mt-6 sm:mt-0 shrink-0",
          )}
          onClick={submitPrice}
        >
          Kaydet
        </button>
      </div>

      <button
        type="button"
        disabled={busy !== null}
        className={cn(buttons.base, buttons.outline, spacing.margin.valueTop)}
        onClick={doQuickRaise}
      >
        +%10 Zam
      </button>

      <div
        className={cn(
          layout.formRowEnd,
          separators.cardFooter,
          spacing.margin.stackTop,
        )}
      >
        <label className={cn("flex-1", typography.className.inputLabel)}>
          Toptan adet
          <input
            type="text"
            inputMode="numeric"
            value={restockQty}
            className={cn(inputStyles.base, inputStyles.focusAccent)}
            onChange={(e) => setRestockQty(e.target.value)}
          />
        </label>
        <button
          type="button"
          disabled={busy !== null}
          className={cn(buttons.base, buttons.accent)}
          onClick={doRestock}
        >
          Toptancıdan Al
        </button>
      </div>

      {msg ? (
        <p className={cn(typography.className.message, spacing.margin.blockTop)}>
          {msg}
        </p>
      ) : null}
    </article>
  );
}