# Market Krizörü v1.0

Market Krizörü, hiperenflasyon ve dinamik kur şoklarının yaşandığı zorlu bir ekonomik atmosferde kullanıcıların bir marketi batırmadan işletmeye çalıştığı **gamified-fintech simülatörüdür**. 

Uygulama, finansal kararları, anlık fiyat stratejilerini ve kriz yönetimini eğlenceli ve öğretici bir oyun döngüsü (core loop) içinde sunar.

---

## Proje Özellikleri & Core Loop
* **Dinamik Ekonomi Motoru:** Her 5 saniyede bir (tick) değişen makroekonomik parametreler ve enflasyon oranları.
* **Kur Şokları:** %15 olasılıkla tetiklenen ani döviz artışları ve bu artışların ithal ürünlerin maliyetlerine (COGS) doğrudan yansıması.
* **Müşteri Psikolojisi Algoritması:** Kullanıcının rafa koyduğu fiyatlara göre anlık tepki veren müşteri kitlesi (*Normal, Fırsatçı veya Panik Alışı*).
* **Cam Efekti (Glassmorphism) Panel:** Finansal verilerin ve kriz anlarının monospaced yazı tipleri ve modern Dark Mode arayüzü ile takibi.

---

## Teknoloji Yığını (Tech Stack)
Proje, teslim kriterlerine %100 uyumlu şekilde **Frontend** ve **Backend** katmanları tamamen birbirinden bağımsız (decoupled) olacak şekilde geliştirilmektedir:
* **Frontend:** Next.js (React), Tailwind CSS, Axios, TypeScript
* **Backend:** Node.js, Express.js, SQLite (better-sqlite3)
* **Yapay Zeka:** OpenRouter / Google Gemini API entegrasyonu

---

## Proje Klasör Yapısı
```text
market-krizoru/
├── backend/          # Node.js + Express — Oyun durumu & Ekonomi Motoru API
├── frontend/         # Next.js (React) — Oyun Arayüzü & Dashboard
└── prodocs/          # Yapay Zeka Ajanları ve Sistem Promptları


---

## Projeyi Yerelde Çalıştırma

### 1. Backend Kurulumu
```bash
cd backend
npm install
npm run dev


cd frontend
npm install
npm run dev


## Canlı Önizleme Linki
[Uygulamayı Canlıda Test Edin](https://market-krizoru.netlify.app/)

---
