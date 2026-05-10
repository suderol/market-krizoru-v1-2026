import type { CSSProperties } from "react";

/**
 * Market Krizörü — tasarım belirteçleri (renk, tipografi, spacing, radius, motion, butonlar).
 * Tailwind sınıfları statik string olarak tutulur; sayısal/token değerleri `globals.css` ile
 * `--mk-*` değişkenleri üzerinden eşlenir (layout’ta `injectDesignSystemRootStyle()`).
 */

export const colors = {
  /** Ana CTA / marka yeşili (emerald-600) */
  primary: "#059669",
  primaryHover: "#10b981",

  background: "#0d1117",
  foreground: "#e6edf3",

  /** Metin tonları (opacity yerine rgba — ihtiyaç halinde) */
  muted: "rgba(255, 255, 255, 0.6)",
  mutedSoft: "rgba(255, 255, 255, 0.55)",

  neon: {
    red: "#ff3344",
    redFlash: "rgba(255, 51, 51, 0.4)",
    green: "#00ff88",
    greenGlow: "0 0 10px #00ff88",
  },

  /** Cam paneller */
  glass: {
    fill: "rgba(255, 255, 255, 0.05)",
    fillSoft: "rgba(0, 0, 0, 0.2)",
    stroke: "rgba(255, 255, 255, 0.1)",
    strokeMedium: "rgba(255, 255, 255, 0.15)",
    backdrop: "backdrop-blur-md",
  },

  /** Semantik yüzeyler */
  danger: {
    solid: "#dc2626",
    border: "rgba(239, 68, 68, 0.35)",
    mutedBg: "rgba(239, 68, 68, 0.1)",
    borderStrong: "rgba(239, 68, 68, 0.6)",
  },
  success: {
    solid: "#16a34a",
    solidHover: "#22c55e",
  },
  warning: {
    border: "rgba(245, 158, 11, 0.2)",
    bg: "rgba(69, 26, 3, 0.3)",
    text: "rgba(254, 243, 199, 0.95)",
  },

  /** Durum rozetleri — ProductCard */
  mood: {
    predatorBorder: "#ef4444",
    panicBorder: "#facc15",
    normalBorder: "rgba(255, 255, 255, 0.1)",
    predatorBadgeBg: "#ef4444",
    panicBadgeBg: "#facc15",
    panicBadgeText: "#18181b",
    normalBadgeBg: "#22c55e",
  },

  accent: {
    /** Toptancı / bilgi CTA (sky) */
    sky: "#0284c7",
    skyHover: "#0ea5e9",
  },

  overlay: {
    scrim: "rgba(0, 0, 0, 0.7)",
    scrimDeep: "rgba(0, 0, 0, 0.8)",
  },

  mockBadge: {
    border: "rgba(255, 255, 255, 0.1)",
    bg: "rgba(0, 0, 0, 0.5)",
    text: "rgba(255, 255, 255, 0.5)",
  },
} as const;

export const typography = {
  /** piksel/rem — CSS veya doc amaçlı */
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "6xl": "3.75rem",
  },
  fontWeight: {
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  /** Yaygın bileşen kombinasyonları (Tailwind) */
  className: {
    pageTitle:
      "text-center text-3xl font-bold tracking-tight sm:text-4xl text-white",
    subtitle: "text-center text-sm text-white/55",
    sectionLabel: "text-sm text-white/60",
    priceValue: "tabular-nums text-white/90 rounded px-1",
    bodyStrong: "font-semibold tabular-nums text-white",
    emojiProduct: "text-3xl leading-none",
    productTitle: "text-lg font-semibold text-white",
    productMeta:
      "text-xs font-medium uppercase tracking-wide text-white/45",
    message: "text-sm text-amber-200/95",
    inputLabel: "text-sm text-white/70",
    modalTitle: "text-xl font-bold tracking-tight text-amber-200",
    modalBody: "text-zinc-200",
    modalMetric: "text-lg font-semibold text-amber-300",
    bankruptEmoji: "text-6xl leading-none",
    bankruptTitle: "text-2xl font-bold text-white",
    bankruptBody: "text-zinc-300",
    demoHighlight: "text-emerald-400/90",
    errorState: "text-red-300",
    loadingState: "text-white/80",
    marqueeStrip:
      "animate-marquee inline-block whitespace-nowrap pr-[50%] font-medium tracking-wide",
  },
} as const;

export const spacing = {
  /** rem — referans */
  rem: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
  },

  gap: {
    xs: "gap-2",
    sm: "gap-3",
    md: "gap-4",
    grid: "gap-5",
  },

  padding: {
    card: "p-5",
    panel: "p-4",
    modal: "p-6",
    modalLg: "p-8",
    tickerY: "py-2",
    header: "px-4 py-6 sm:px-8",
    main: "px-4 py-8 sm:px-8",
    mockBadge: "px-3 py-1.5",
  },

  margin: {
    titleTop: "mt-2",
    blockTop: "mt-3",
    stackTop: "mt-4",
    sectionTop: "mt-6",
    majorTop: "mt-8",
    valueTop: "mt-1",
  },

  layout: {
    bottomBar: "bottom-4 right-4",
    pageBottom: "pb-16",
    maxContent: "max-w-5xl",
    modalWidth: "max-w-md",
    dashboardGrid: "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
    mainStack: "space-y-6",
  },
} as const;

export const radius = {
  /** Piksel string (CSS) */
  px: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1rem",
    "2xl": "1rem",
    full: "9999px",
  },
  /** Tailwind sınıfları */
  className: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
    mockBadge: "rounded-lg",
  },
} as const;

export const motion = {
  /** Animasyon süreleri — `globals.css` ile aynı değerleri `--mk-*` üzerinden bağla */
  duration: {
    flashRed: "0.5s",
    flashGreen: "0.3s",
    marquee: "25s",
  },
  easing: {
    default: "ease",
    linear: "linear",
  },

  /** UX zamanlamaları */
  ui: {
    crisisModalAutoCloseMs: 4000,
  },
} as const;

/** Buton stilleri (Tailwind) */
export const buttons = {
  base:
    "inline-flex items-center justify-center font-medium transition disabled:opacity-50 disabled:pointer-events-none",

  /** Birincil — kaydet, ana CTA */
  primary: [
    radius.className.sm,
    "bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500",
  ].join(" "),

  /** Başarılı / olumlu blok aksiyon — tekrar oyna */
  success: [
    radius.className.md,
    "w-full bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-500",
  ].join(" "),

  /** Tehlike — iptal / yıkıcı (görsel vurgu gerektiğinde) */
  danger: [
    radius.className.sm,
    "bg-red-600 px-4 py-2 text-white hover:bg-red-500",
  ].join(" "),

  /** İkincil outline — hızlı zam vb. */
  outline: [
    radius.className.sm,
    "w-full border border-white/15 py-2 text-sm font-medium text-white/90 hover:bg-white/10",
  ].join(" "),

  /** İkincil dolu — toptancı (accent) */
  accent: [
    radius.className.sm,
    "shrink-0 bg-sky-600 px-4 py-2 text-white hover:bg-sky-500",
  ].join(" "),

  /** Uyarı hayalet — kriz kapat */
  warningGhost: [
    radius.className.sm,
    "bg-amber-500/20 px-4 py-2 text-sm font-medium text-amber-100 hover:bg-amber-500/30",
  ].join(" "),
} as const;

/** Cam / panel birleşikleri */
/** Tam ekran örtüler */
export const overlays = {
  modal:
    "fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm",
  bankrupt:
    "fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md",
} as const;

/** Sabit köşe rozeti */
export const chrome = {
  mockRibbon: [
    "pointer-events-none fixed rounded-lg border border-white/10 bg-black/50 backdrop-blur text-xs text-white/50",
    spacing.padding.mockBadge,
    spacing.layout.bottomBar,
  ].join(" "),
} as const;

export const shell = {
  page: cn("min-h-screen text-white", spacing.layout.pageBottom),
} as const;

export const glass = {
  card: [
    radius.className.md,
    "border border-white/10 bg-white/5 p-4 backdrop-blur-md",
  ].join(" "),
  cardMuted: [
    radius.className.md,
    "border border-white/10 bg-white/5 p-4 backdrop-blur-md",
  ].join(" "),
  cardAlert: [
    radius.className.md,
    "border border-red-500/60 bg-red-500/10 p-4 backdrop-blur-md",
  ].join(" "),
  surfacePage: "min-h-screen text-white",
  header: "border-b border-white/10 bg-black/20 backdrop-blur-md",
  productCard: [
    radius.className.md,
    "border bg-white/5 p-5 backdrop-blur-md",
  ].join(" "),
  modalPanel: [
    radius.className.lg,
    "border border-amber-500/40 bg-zinc-900/95 p-6 shadow-2xl shadow-amber-900/20",
  ].join(" "),
  bankruptPanel: [
    radius.className.lg,
    "border border-red-500/35 bg-zinc-900 p-8 text-center shadow-2xl",
  ].join(" "),
  ticker: [
    spacing.padding.tickerY,
    radius.className.sm,
    "overflow-hidden border border-amber-500/20 bg-amber-950/30 text-sm text-amber-100/95",
  ].join(" "),
  overlay: "backdrop-blur-sm",
  overlayStrong: "backdrop-blur-md",
} as const;

export const layout = {
  productGrid: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  flexHeader: "flex min-h-screen items-center justify-center",
  cardHeaderRow: "flex flex-wrap items-start justify-between gap-2",
  cardTitleCluster: "flex items-center gap-2",
  formRow: "flex flex-col gap-2 sm:flex-row sm:items-center",
  formRowEnd: "flex flex-col gap-2 sm:flex-row sm:items-end",
} as const;

export const separators = {
  cardFooter: "border-t border-white/10 pt-4",
} as const;

export const input = {
  base: [
    "mt-1 w-full border border-white/15 bg-black/40 px-3 py-2 text-white outline-none rounded-lg",
    "ring-2 ring-transparent focus:ring-2",
  ].join(" "),
  focusPrimary: "ring-emerald-500/40 focus:border-emerald-500/60",
  focusAccent: "ring-sky-500/40 focus:border-sky-500/60",
} as const;

/** Ruh hali — ProductCard kenarlık + rozet */
export const customerMoodUi = {
  Fırsatçı: {
    border: "border-red-500",
    badge: "bg-red-500 text-white",
  },
  "Panik Alışı": {
    border: "border-yellow-400",
    badge: "bg-yellow-400 text-zinc-900",
  },
  Normal: {
    border: "border-white/10",
    badge: "bg-green-500 text-white",
  },
} as const;

export function cn(
  ...parts: Array<string | false | undefined | null>
): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * `globals.css` içindeki `@keyframes` ve `.animate-marquee` ile eşleşen kök değişkenleri üretir.
 */
export function injectDesignSystemRootStyle(): CSSProperties {
  return {
    "--mk-bg-page": colors.background,
    "--mk-fg": colors.foreground,
    "--mk-neon-red-flash": colors.neon.redFlash,
    "--mk-neon-green": colors.neon.green,
    "--mk-neon-green-glow": colors.neon.greenGlow,
    "--mk-motion-flash-red": motion.duration.flashRed,
    "--mk-motion-flash-green": motion.duration.flashGreen,
    "--mk-motion-marquee": motion.duration.marquee,
  } as CSSProperties;
}
