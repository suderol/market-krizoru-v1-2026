"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applySetShelfPrice,
  applyQuickRaise,
  applyCampaignDiscount,
  applyRestock,
  applyCreditRestock,
  applyUpgradeStore,
  getInventory,
  getPublicGameState,
  resetGame,
  syncEngine,
} from "@/lib/mockGame";
import type { GameState, Product } from "@/lib/types";
import { NewsTicker } from "@/components/NewsTicker";
import { Dashboard } from "@/components/Dashboard";
import { ProductCard } from "@/components/ProductCard";

export default function GamePage() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [inventory, setInventory] = useState<Product[]>([]);
  const [, setTickCounter] = useState(0);
  
  const [logisticsLevel, setLogisticsLevel] = useState(1); 

  // PWA Kurulum Kontrolleri
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  const updateState = useCallback(() => {
    syncEngine();
    setGameState(getPublicGameState());
    setInventory(getInventory());
  }, []);

  useEffect(() => {
    updateState();
    const interval = setInterval(() => {
      setTickCounter((prev) => prev + 1);
      updateState();
    }, 1000);

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    });

    return () => clearInterval(interval);
  }, [updateState]);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  if (!gameState) return <div className="text-white p-8">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 space-y-6 selection:bg-indigo-500/30">
      
      {/* Üst Yönetim Paneli */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-slate-900/60 p-5 rounded-2xl border border-slate-800 shadow-2xl space-y-4 lg:space-y-0">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              MARKET KRİZÖRÜ <span className="text-sm font-medium text-slate-500">v1.0</span>
            </h1>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              PWA Destekli Mobil Uygulama
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Geliştirici: <span className="text-indigo-400 font-semibold">Sude Erol</span>
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          {/* PWA Kurulum Butonu */}
          {showInstallBtn && (
            <button
              onClick={handleInstallApp}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black px-4 py-2.5 rounded-xl text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-400/30 animate-bounce transition-all"
            >
              📱 Uygulama Olarak Ana Ekrana Ekle
            </button>
          )}

          {/* Lojistik & Depo Ağı Butonu */}
          <button
            onClick={() => {
              try {
                applyUpgradeStore();
                setLogisticsLevel((prev) => prev + 1);
                updateState();
              } catch (err: any) {
                alert(err.message || "Bakiye yetersiz!");
              }
            }}
            className="flex-1 lg:flex-none bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg border border-teal-500/30 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🚚 Lojistik &amp; Depo Ağını Optimize Et</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded text-[10px] font-mono text-teal-200">
              Lv. {logisticsLevel}
            </span>
          </button>
          
          <button
            onClick={() => {
              resetGame();
              setLogisticsLevel(1);
              updateState();
            }}
            className="flex-1 lg:flex-none bg-slate-900 hover:bg-slate-800 text-slate-400 font-semibold px-4 py-2.5 rounded-xl text-xs border border-slate-800 transition-all"
          >
            🔄 Yeniden Başlat
          </button>
        </div>
      </div>

      <NewsTicker />
      <Dashboard gameState={gameState} />

      <div className="w-full mx-auto">
        {gameState.isBankrupt ? (
          <div className="border border-red-500/30 bg-red-950/20 backdrop-blur-md rounded-2xl p-12 text-center max-w-xl mx-auto shadow-md my-12">
            <span className="text-6xl block mb-4">📉</span>
            <h2 className="text-3xl font-black text-red-400">MAALESEF İFLAS ETTİNİZ!</h2>
            <button onClick={() => { resetGame(); setLogisticsLevel(1); updateState(); }} className="mt-6 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm">Yeniden Dene</button>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {inventory.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSetPrice={(id, val) => { applySetShelfPrice(id, val); updateState(); }}
                onQuickRaise={(id) => { applyQuickRaise(id); updateState(); }}
                onCampaign={(id) => { applyCampaignDiscount(id); updateState(); }}
                onRestock={(id, qty) => { try { applyRestock(id, qty); updateState(); } catch (err: any) { alert(err.message || "Yetersiz bakiye!"); } }}
                onCreditRestock={(id, qty) => { applyCreditRestock(id, qty); updateState(); }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}