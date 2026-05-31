const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

// Veritabanı dosyasının nereye kaydedileceğini belirliyoruz (.env dosyasından okur)
const dbPath = process.env.DB_PATH || './game.db';
const db = new Database(dbPath);

// 1. OYUN DURUMU TABLOSU (Kasa, gün, enflasyon, dolar kuru burada tutulur)
db.exec(`
  CREATE TABLE IF NOT EXISTS game_state (
    id INTEGER PRIMARY KEY DEFAULT 1,
    cash_balance REAL DEFAULT 10000.0,
    game_day INTEGER DEFAULT 1,
    inflation_rate REAL DEFAULT 0.001,
    usd_try_rate REAL DEFAULT 32.0,
    base_usd_try_rate REAL DEFAULT 32.0,
    is_bankrupt INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// 2. ENVANTER TABLOSU (Ürünlerin stokları, geliş fiyatları ve raf fiyatları)
db.exec(`
  CREATE TABLE IF NOT EXISTS inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    product_emoji TEXT NOT NULL,
    product_type TEXT NOT NULL,
    stock_quantity INTEGER DEFAULT 50,
    purchase_price REAL NOT NULL,
    shelf_price REAL NOT NULL,
    base_price REAL NOT NULL
  );
`);

// 3. İŞLEMLER TABLOSU (Yaptığın her alış/satış buraya kaydedilir)
db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER,
    unit_price REAL,
    total_amount REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// 4. OLAY GÜNLÜĞÜ TABLOSU (Gelen zamlar, krizler ve şoklar)
db.exec(`
  CREATE TABLE IF NOT EXISTS events_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT,
    description TEXT,
    impact_factor REAL,
    triggered_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = db;