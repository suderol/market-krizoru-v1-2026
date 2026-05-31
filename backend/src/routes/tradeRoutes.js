const express = require('express');
const router = express.Router();
const db = require('../models/db');

// 1. TOPTANCIDAN MAL ALMA (Stok Ekleme, Kasadan Para Düşme)
router.post('/buy', (req, res) => {
  const { productName, quantity } = req.body;

  try {
    // Ürünün güncel toptan fiyatını ve oyun durumunu çekiyoruz
    const product = db.prepare('SELECT * FROM inventory WHERE product_name = ?').get(productName);
    const gameState = db.prepare('SELECT cash_balance FROM game_state WHERE id = 1').get();

    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı.' });

    const totalCost = product.purchase_price * quantity;

    // Kasada yeterli para var mı kontrolü
    if (gameState.cash_balance < totalCost) {
      return res.status(400).json({ error: 'Yetersiz bakiye! Toptancıya borç yapamazsın.' });
    }

    // Veritabanını güncelle (Kasılan parayı düş, stoğu artır)
    db.prepare('UPDATE game_state SET cash_balance = cash_balance - ? WHERE id = 1').run(totalCost);
    db.prepare('UPDATE inventory SET stock_quantity = stock_quantity + ? WHERE product_name = ?').run(quantity, productName);

    // İşlemi geçmişe kaydet
    db.prepare('INSERT INTO transactions (type, product_name, quantity, unit_price, total_amount) VALUES (?, ?, ?, ?, ?)')
      .run('ALIS', productName, quantity, product.purchase_price, totalCost);

    res.json({ message: `${quantity} adet ${productName} başarıyla satın alındı.`, totalCost });
  } catch (error) {
    res.status(500).json({ error: 'Satın alma işlemi başarısız oldu.' });
  }
});

// 2. MÜŞTERİYE MAL SATMA (Stok Düşme, Kasaya Para Ekleme)
router.post('/sell', (req, res) => {
  const { productName, quantity } = req.body;

  try {
    const product = db.prepare('SELECT * FROM inventory WHERE product_name = ?').get(productName);

    if (!product) return res.status(404).json({ error: 'Ürün bulunamadı.' });

    // Rafta yeterli ürün var mı kontrolü
    if (product.stock_quantity < quantity) {
      return res.status(400).json({ error: 'Rafta bu kadar ürün yok! Önce toptancıdan mal almalısın.' });
    }

    const totalRevenue = product.shelf_price * quantity;

    // Veritabanını güncelle (Parayı kasaya ekle, stoğu düş)
    db.prepare('UPDATE game_state SET cash_balance = cash_balance + ? WHERE id = 1').run(totalRevenue);
    db.prepare('UPDATE inventory SET stock_quantity = stock_quantity - ? WHERE product_name = ?').run(quantity, productName);

    // İşlemi geçmişe kaydet
    db.prepare('INSERT INTO transactions (type, product_name, quantity, unit_price, total_amount) VALUES (?, ?, ?, ?, ?)')
      .run('SATIS', productName, quantity, product.shelf_price, totalRevenue);

    res.json({ message: `${quantity} adet ${productName} başarıyla satıldı.`, totalRevenue });
  } catch (error) {
    res.status(500).json({ error: 'Satış işlemi başarısız oldu.' });
  }
});

module.exports = router;