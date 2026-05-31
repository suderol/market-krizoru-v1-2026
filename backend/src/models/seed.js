const db = require('./db');

function seedDatabase() {
  // Önce mevcut verileri kontrol ediyoruz, eğer zaten ürün varsa tekrar yüklemesin
  const rowCount = db.prepare('SELECT COUNT(*) as count FROM inventory').get();
  
  if (rowCount.count > 0) {
    console.log('🌱 Veritabanı zaten dolu, seed işlemine gerek yok.');
    return;
  }

  console.log('🌱 Başlangıç verileri veritabanına yükleniyor...');

  // 1. Oyun Durumunu Sıfırla (Kasa: 10,000 TL, Gün: 1, Dolar: 32 TL)
  const insertState = db.prepare(`
    INSERT OR REPLACE INTO game_state (id, cash_balance, game_day, inflation_rate, usd_try_rate, base_usd_try_rate, is_bankrupt)
    VALUES (1, 10000.0, 1, 0.001, 32.0, 32.0, 0)
  `);
  insertState.run();

  // 2. Temel Ürünleri Raflara Ekle (Ekmek, Süt, Sıvı Yağ)
  const insertProduct = db.prepare(`
    INSERT INTO inventory (product_name, product_emoji, product_type, stock_quantity, purchase_price, shelf_price, base_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Ürün Listesi: [İsim, Emoji, Tip, Stok, Geliş Fiyatı, Raf Satış Fiyatı, Temel Fiyat]
  const defaultProducts = [
    ['Ekmek', '🍞', 'Yerli', 50, 8.0, 10.0, 8.0],
    ['Süt', '🥛', 'Yerli', 30, 20.0, 25.0, 20.0],
    ['Ayçiçek Yağı', '🌻', 'İthal', 15, 120.0, 150.0, 120.0]
  ];

  // Tüm ürünleri tek bir işlemde veritabanına kaydediyoruz
  const transaction = db.transaction((products) => {
    for (const p of products) {
      insertProduct.run(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
    }
  });

  transaction(defaultProducts);
  console.log('✅ Başlangıç ürünleri (Ekmek, Süt, Yağ) raflara başarıyla dizildi!');
}

module.exports = seedDatabase;