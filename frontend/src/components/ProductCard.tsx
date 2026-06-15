import React, { useState } from "react";
import { cn } from "@/lib/designSystem";
import type { Product } from "@/lib/types";
import { applyManualSale } from "@/lib/mockGame"; // Yeni eklediğimiz motor fonksiyonu

type Props = {
  product: Product;
  onSetPrice: (id: number, val: number) => void;
  onQuickRaise: (id: number) => void;
  onCampaign: (id: number) => void; 
  onRestock: (id: number, qty: number) => void;
  onCreditRestock: (id: number, qty: number) => void; 
};

export function ProductCard({ product, onSetPrice, onQuickRaise, onCampaign, onRestock, onCreditRestock }: Props) {
  const [inputVal, setInputVal] = useState("");
  
  // Manuel Satış için State'ler
  const [saleQty, setSaleQty] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const moodColors: Record<Product["customerMood"], string> = {
    Normal: "text-slate-300 bg-slate-800/50",
    Fırsatçı: "text-red-400 bg-red-950/30 border border-red-500/20",
    "Panik Alışı": "text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 animate-pulse",
  };

  return (
    <div className="border border-slate-800 bg-slate-900/90 backdrop-blur-sm rounded-xl p-5 flex flex-col justify-between shadow-xl transition-all duration-200 hover:border-slate-700">
      
      {/* Ürün Üst Bilgisi */}
      <div>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <span className="text-3xl bg-slate-800/60 p-2 rounded-lg">{product.productEmoji}</span>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">{product.productName}</h3>
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wider", 
                product.productType === "import" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              )}>
                {product.productType === "import" ? "🚢 İthal" : "🚜 Yerli"}
              </span>
            </div>
          </div>
          <span className={cn("text-xs px-2 py-1 rounded-md font-semibold", moodColors[product.customerMood])}>
            {product.customerMood}
          </span>
        </div>

        {/* Fiyat ve Stok Detayları */}
        <div className="grid grid-cols-2 gap-2 my-4 bg-slate-950/50 p-3 rounded-lg border border-slate-800/60 text-sm">
          <div>
            <p className="text-slate-500 text-xs uppercase font-medium">📦 Kalan Stok</p>
            <p className={cn("text-base font-bold tabular-nums mt-0.5", product.stockQuantity < 15 ? "text-rose-400 animate-pulse" : "text-slate-200")}>
              {product.stockQuantity} Adet
            </p>
          </div>
          <div>
            <p className="text-slate-500 text-xs uppercase font-medium">📉 Alış Fiyatı</p>
            <p className="text-base font-bold text-amber-400 tabular-nums mt-0.5">{product.purchasePrice.toFixed(2)} ₺</p>
          </div>
          <div className="col-span-2 border-t border-slate-800/60 pt-2 mt-1">
            <p className="text-slate-500 text-xs uppercase font-medium">🏷️ Raftaki Varsayılan Satış Fiyatı</p>
            <p className="text-lg font-black text-emerald-400 tabular-nums mt-0.5">{product.shelfPrice.toFixed(2)} ₺</p>
          </div>
        </div>
      </div>

      {/* Operasyonel Butonlar ve Kontroller */}
      <div className="space-y-3 pt-2 border-t border-slate-800/50">
        
        {/* VARYASYON PANELİ: ÖZEL ANLIK MANUEL SATIŞ KISMI */}
        <div className="bg-slate-950/40 p-2.5 rounded-lg border border-orange-500/10 space-y-2">
          <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">🎯 Özel Manuel Satış Yap</p>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Kaç Adet?"
              value={saleQty}
              onChange={(e) => setSaleQty(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-orange-500 tabular-nums"
            />
            <input
              type="number"
              placeholder="Özel Fiyat (₺)"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-orange-500 tabular-nums"
            />
          </div>
          <button
            onClick={() => {
              const qty = parseInt(saleQty);
              const price = parseFloat(salePrice);
              if (qty > 0 && price > 0) {
                try {
                  applyManualSale(product.id, qty, price);
                  setSaleQty("");
                  setSalePrice("");
                  // Sayfanın anında güncellenmesi için tetikleme (varsayılan aksiyon çağrısı)
                  onSetPrice(product.id, product.shelfPrice); 
                } catch (err: any) {
                  alert(err.message || "Satış başarısız!");
                }
              } else {
                alert("Lütfen geçerli adet ve fiyat girin.");
              }
            }}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold py-1.5 rounded-lg text-xs transition-all shadow-md"
          >
            🤝 Belirlenen Şartlarla Satış Yap
          </button>
        </div>

        {/* Varsayılan Raf Fiyatı Ayarlama Girişi */}
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Raf Fiyatını Değiştir"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 tabular-nums"
          />
          <button
            onClick={() => {
              const num = parseFloat(inputVal);
              if (num > 0) { onSetPrice(product.id, num); setInputVal(""); }
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg text-sm transition-all"
          >
            Set
          </button>
        </div>

        {/* Hızlı Mikro Aksiyonlar */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onQuickRaise(product.id)}
            className="bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-500/20 font-semibold py-1 rounded-lg text-xs transition-all"
          >
            ⚡ %10 Zam
          </button>
          <button
            onClick={() => onCampaign(product.id)}
            className="bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/20 font-semibold py-1 rounded-lg text-xs transition-all"
          >
            🏷️ Kampanya (-%15)
          </button>
        </div>

        {/* Stok Tedarik Yönetimi */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={() => onRestock(product.id, 20)}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-1.5 rounded-lg text-xs transition-all shadow-md"
          >
            📥 Peşin Al (+20)
          </button>
          <button
            onClick={() => onCreditRestock(product.id, 20)}
            className="bg-amber-950/40 hover:bg-amber-900/40 text-amber-400 border border-amber-500/30 font-bold py-1.5 rounded-lg text-xs transition-all shadow-md"
          >
            💳 Vadeli Al (+20)
          </button>
        </div>

      </div>
    </div>
  );
}