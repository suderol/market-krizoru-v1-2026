const db = require('../models/db');

function startEconomyEngine() {
  console.log('⚙️ Dengeli ve Dinamik Ekonomi Motoru 8 saniyede bir (tick) çalışıyor...');

  setInterval(() => {
    const gameState = db.prepare('SELECT * FROM game_state WHERE id = 1').get();
    
    if (!gameState || gameState.is_bankrupt === 1) return;

    let currentDay = gameState.game_day + 1;
    let currentUsd = gameState.usd_try_rate;
    let currentInflation = gameState.inflation_rate;
    let logMessage = `📆 Gün: ${currentDay} | `;

    const crystalBall = Math.random();

    if (crystalBall < 0.20) {
      // 1. ANLIK ŞOK (%20 İHTİMAL): Dolar makul bir oranda (%3 - %8) fırlıyor
      const shockFactor = 1 + (Math.random() * 0.05 + 0.03);
      currentUsd = parseFloat((currentUsd * shockFactor).toFixed(2));
      currentInflation = parseFloat((currentInflation + 0.001).toFixed(4));
      
      logMessage += `🚨 PİYASA GERİLDİ! Dolar yükselişte: ${currentUsd} TL 📉`;
      
      db.prepare('INSERT INTO events_log (event_type, description, impact_factor) VALUES (?, ?, ?)')
        .run('KUR_SOKU', `Döviz piyasasında hareketlilik: Dolar ${currentUsd} TL oldu.`, shockFactor);

    } else if (crystalBall > 0.85 && currentUsd > gameState.base_usd_try_rate) {
      // 2. OLUMLU MÜDAHALE (%15 İHTİMAL): Merkez Bankası adımlarıyla dolar %2 - %5 düşüyor
      const reliefFactor = 1 - (Math.random() * 0.03 + 0.02);
      currentUsd = parseFloat((currentUsd * reliefFactor).toFixed(2));
      if (currentUsd < gameState.base_usd_try_rate) currentUsd = gameState.base_usd_try_rate;
      
      logMessage += `✅ MERKEZ BANKASI MÜDAHALESİ! Dolar gevşedi: ${currentUsd} TL 📈`;
      
      db.prepare('INSERT INTO events_log (event_type, description, impact_factor) VALUES (?, ?, ?)')
        .run('PIYASA_RAHATLAMA', `Merkez Bankası adımları sonrası dolar kuru ${currentUsd} TL'ye geriledi.`, reliefFactor);

    } else {
      // 3. STABİL GÜNLER (%65 İHTİMAL): Küçük dalgalanmalar
      const normalFluctuation = 1 + (Math.random() * 0.002 - 0.001);
      currentUsd = parseFloat((currentUsd * normalFluctuation).toFixed(2));
      logMessage += `💸 Dolar: ${currentUsd} TL (Dengeli)`;
    }

    // Veritabanını güncelle
    db.prepare(`
      UPDATE game_state 
      SET game_day = ?, usd_try_rate = ?, inflation_rate = ? 
      WHERE id = 1
    `).run(currentDay, currentUsd, currentInflation);

    // İthal ürünlerin (Ayçiçek Yağı) maliyetini yeni kura göre güncelle
    const rateRatio = currentUsd / gameState.base_usd_try_rate;
    const currentInventory = db.prepare("SELECT base_price FROM inventory WHERE product_type = 'İthal'").get();
    
    if (currentInventory) {
      const newPurchasePrice = parseFloat((currentInventory.base_price * rateRatio).toFixed(2));
      db.prepare(`
        UPDATE inventory 
        SET purchase_price = ?
        WHERE product_type = 'İthal'
      `).run(newPurchasePrice);
    }

    console.log(logMessage);

  }, 8000);
}

module.exports = { startEconomyEngine };