const express = require('express');
const router = express.Router();
const db = require('../models/db');

// 1. OYUNUN ANLIK DURUMUNU GETİR (Kasa, Gün, Dolar Kuru vb.)
router.get('/state', (req, res) => {
  try {
    const gameState = db.prepare('SELECT * FROM game_state WHERE id = 1').get();
    res.json(gameState);
  } catch (error) {
    res.status(500).json({ error: 'Oyun durumu çekilirken hata oluştu.' });
  }
});

// 2. MARKET RAFLARINDAKİ ÜRÜNLERİ LİSTELE (Ekmek, Süt, Yağ stok ve fiyatları)
router.get('/inventory', (req, res) => {
  try {
    const inventory = db.prepare('SELECT * FROM inventory').all();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Envanter listelenirken hata oluştu.' });
  }
});

// 3. OLAY GÜNLÜĞÜNÜ GETİR (En son hangi krizler çıkmış?)
router.get('/logs', (req, res) => {
  try {
    const logs = db.prepare('SELECT * FROM events_log ORDER BY id DESC LIMIT 10').all();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Olay günlükleri çekilirken hata oluştu.' });
  }
});

module.exports = router;