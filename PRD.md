# Ürün Gereksinim Dokümanı (PRD): Market Krizörü v1.0



**Versiyon:** 1.0.0  

**Doküman Sahibi:** Sude Erol (Senior Product Owner)  

**Tarih:** 19 Nisan 2026



---



## 1. Ürün Özeti ve Stratejik Hedef

**Market Krizörü**, Türkiye'nin makroekonomik değişkenlerini (hiperenflasyon, kur şokları, arz krizleri) bir mikro-işletme yönetimi üzerinden simüle eden bir **Gamified-Fintech** uygulamasıdır. Kullanıcı, sadece bir bakkal değil, kaos yönetiminde uzmanlaşmış bir CEO rolündedir.



---



## 2. Teknik Mimari ve Veri Tabanı Şeması

Uygulamanın sürdürülebilirliği ve kullanıcı ilerlemesi için veri tabanı yapısı hayati önem taşır.



### 2.1. Veri Tabanı Yapısı (PostgreSQL/Supabase Önerilir)



* **Users & Auth:** id, email, username, created_at, current_balance, total_xp

* **Inventory:** id, user_id, product_id, stock_quantity, last_purchase_price, shelf_price

* **Market_State:** id, inflation_rate, usd_try_rate, fuel_price, market_sentiment_index

* **Transactions:** id, user_id, type (Alış/Satış), amount, timestamp

* **Events_Log:** id, event_type, impact_factor, duration



---



## 3. Fonksiyonel Detaylar ve Mekanikler



### 3.1. Çok Katmanlı Ekonomi Motoru (The Engine)

Oyunun "beyni" şu değişkenleri eşzamanlı hesaplar:

* **Base Inflation (BI):** Saniyede %0.01 artan baz oran.

* **Volatility Index (VI):** Beklenmedik kur şoklarının (USD/TRY) çarpan etkisi.

* **Cost of Goods Sold (COGS):** Üretim Maliyeti + Lojistik Maliyeti (Akaryakıta bağlı) + Depolama Maliyeti.



### 3.2. Operasyonel Özellik Seti



#### **FAZ 1: MVP - Temel Döngü**

* **Ürün Kartları:** Ekmek, Süt, Yağ için gerçek zamanlı stok takibi.

* **Anlık Fiyatlandırma:** Raf fiyatının saniyeler içinde güncellenmesi.

* **Kasa Akışı:** Satışların bakiyeye anlık yansıması.



#### **FAZ 2: Stratejik Yönetim**

* **Lojistik Modülü:** Nakliye süresi ve maliyetinin akaryakıta bağlanması.

* **SKT (Bozulma) Algoritması:** Ürünlerin tazelik indeksine göre fire verme mekanizması.

* **Personel Yönetimi:** Çırak (Otomatik fiyat) ve Muhasebeci (Vergi optimizasyonu) alımı.



#### **FAZ 3: Finansal Derinlik ve Sosyal Katman**

* **Kredi ve Borçlanma:** Değişken faizli kredi sistemi ve icra riski.

* **Yetenek Ağacı:** "Stokçu" ve "Pazarlıkçı" gibi kalıcı avantajlar.

* **LinkedIn Entegrasyonu:** "Krizör Raporu"nun PDF olarak paylaşılması.



---



## 4. UI/UX Tasarım Sistemi

* **Dashboard:** Glassmorphism tarzı saydam paneller ve neon vurgular.

* **Geri Bildirimler:** Kırmızı "Kriz Uyarı" ışıkları ve haptik titreşimler (mobil için).

* **Haber Bandı:** Esprili ve gerçekçi ekonomi başlıklarının alt kısımda kayan yazı ile sunulması.



---



## 5. Başarı Metrikleri (KPIs)

* **DAU (Daily Active Users):** Günlük aktif kullanıcı oranı.

* **Survival Rate:** Ortalama iflas süresi (Dengeleme için).

* **Engagement:** Oturum başına fiyat güncelleme sayısı.



---


## 6. Riskler ve Çözümler
* **Karmaşıklık Riski:** Oyunun ekonomi tarafının kullanıcıyı yorması.

* **Çözüm:** İlk 3 oyun günü boyunca aktif olan bir "AI Danışman" modu. 
* **Çözüm:** İlk 3 oyun günü boyunca aktif olan bir "AI Danışman" modu.
