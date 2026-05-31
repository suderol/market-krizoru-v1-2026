const API_BASE = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', () => {
  fetchGameState();
  fetchInventory();
  fetchLogs();
  
  setInterval(() => {
    fetchGameState();
    fetchInventory();
    fetchLogs();
  }, 2000);
});

async function fetchGameState() {
  try {
    const res = await fetch(`${API_BASE}/game/state`);
    const data = await res.json();
    
    document.getElementById('game-day').innerText = data.game_day;
    document.getElementById('cash-balance').innerText = `${data.cash_balance.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`;
    document.getElementById('usd-rate').innerText = `${data.usd_try_rate.toFixed(2)} TL`;
  } catch (err) {
    console.error('Oyun durumu güncellenemedi:', err);
  }
}

async function fetchInventory() {
  try {
    const res = await fetch(`${API_BASE}/game/inventory`);
    const products = await res.json();
    const container = document.getElementById('inventory-container');
    container.innerHTML = '';

    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg space-y-4 hover:border-slate-600 transition-all';
      
      card.innerHTML = `
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3">
            <span class="text-4xl">${p.product_emoji}</span>
            <div>
              <h3 class="text-lg font-bold text-slate-100">${p.product_name}</h3>
              <span class="text-xs px-2 py-0.5 rounded-full ${p.product_type === 'İthal' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}">${p.product_type}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-slate-400">Mevcut Stok</p>
            <p class="text-xl font-bold ${p.stock_quantity < 10 ? 'text-rose-400 animate-pulse' : 'text-slate-200'}">${p.stock_quantity} Adet</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 bg-slate-900/40 p-3 rounded-xl border border-slate-700/30 text-sm">
          <div>
            <p class="text-slate-400 text-xs">Toptan Geliş</p>
            <p class="font-semibold text-amber-400">${p.purchase_price.toFixed(2)} TL</p>
          </div>
          <div>
            <p class="text-slate-400 text-xs">Raf Satış Fiyatı</p>
            <p class="font-semibold text-emerald-400">${p.shelf_price.toFixed(2)} TL</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-2">
          <button onclick="executeTrade('buy', '${p.product_name}', 5)" class="bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 py-2.5 rounded-xl font-semibold text-xs transition-all border border-slate-600 cursor-pointer">
            📥 5 Adet Al (-${(p.purchase_price * 5).toFixed(1)} TL)
          </button>
          <button onclick="executeTrade('sell', '${p.product_name}', 5)" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white py-2.5 rounded-xl font-semibold text-xs transition-all shadow-md shadow-emerald-900/20 cursor-pointer">
            📤 5 Adet Sat (+${(p.shelf_price * 5).toFixed(1)} TL)
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('Envanter güncellenemedi:', err);
  }
}

async function fetchLogs() {
  try {
    const res = await fetch(`${API_BASE}/game/logs`);
    const logs = await res.json();
    const container = document.getElementById('logs-container');
    
    if (logs.length === 0) {
      container.innerHTML = '<p class="text-xs text-slate-500 text-center py-8">Ekonomik gelişmeler bekleniyor...</p>';
      return;
    }

    container.innerHTML = logs.map(log => {
      const isKriz = log.event_type === 'KUR_SOKU';
      return `
        <div class="p-3 rounded-xl border text-xs transition-all ${isKriz ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'}">
          <div class="flex justify-between font-semibold mb-1">
            <span>${isKriz ? '🚨 Olağanüstü Durum' : '✅ Piyasa Gelişmesi'}</span>
            <span class="text-slate-500">${new Date(log.triggered_at).toLocaleTimeString('tr-TR')}</span>
          </div>
          <p class="text-slate-300">${log.description}</p>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Günlükler çekilemedi:', err);
  }
}

async function executeTrade(endpoint, productName, quantity) {
  try {
    const res = await fetch(`${API_BASE}/trade/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName, quantity })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      alert(`⚠️ İşlem Reddedildi: ${data.error}`);
    } else {
      fetchGameState();
      fetchInventory();
    }
  } catch (err) {
    console.error('Ticaret işlemi sırasında hata:', err);
  }
}