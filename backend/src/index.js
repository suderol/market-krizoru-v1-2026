const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Az önce oluşturduğun veritabanı ve seed dosyalarını buraya çağırıyoruz
const db = require('./models/db');
const seedDatabase = require('./models/seed');

const { startEconomyEngine } = require('./engine/economyEngine');
const gameRoutes = require('./routes/gameRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

// Geliştirme aşamasında arayüzün (frontend) sunucuya bağlanabilmesi için izin veriyoruz
app.use(cors());
app.use(express.json());
app.use('/api/game', gameRoutes);
app.use('/api/trade', tradeRoutes);

// Oyun ilk kez açıldığında veritabanını başlangıç verileriyle doldur (Seed fonksiyonunu çalıştır)
try {
  seedDatabase();
} catch (error) {
  console.error('❌ Veritabanı yüklenirken bir hata oluştu:', error);
}

// Sunucunun çalışıp çalışmadığını tarayıcıdan görebilmek için basit bir test rotası
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Market Krizörü Backend Sunucusu Aktif!',
    status: 'Running' 
  });
});

// Şalteri kaldırıyoruz ve sunucuyu dinlemeye alıyoruz
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Sunucu http://localhost:${PORT} adresinde çalışıyor!`);
  console.log(`==================================================\n`);
  startEconomyEngine();
});