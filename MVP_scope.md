# 🏪 Market Krizörü: MVP Scope Document

**Proje Sahibi:** Sude Erol  
**Rol:** Senior Product Owner / Ekonomi Analisti  
**Versiyon:** v1.0.0 (MVP)  
**Teknoloji Stack:** HTML5, CSS3, JavaScript (ES6+), [Opsiyonel: Supabase/PostgreSQL]

---

## 1. Proje Tanımı
**Market Krizörü**, makroekonomik dalgalanmaları mikro-işletme seviyesinde deneyimleten bir market yönetimi simülatörüdür. Kullanıcı, hiperenflasyon ve kur şoklarının olduğu bir ortamda market işletmeciliği yaparak hayatta kalmaya ve kâr etmeye çalışır.

## 2. MVP Hedefleri (Minimum Viable Product)
Bu ilk fazın temel amacı, oyunun "Ekonomi Motoru"nu doğrulamak ve kullanıcıyı "sürekli fiyat güncelleme" stresiyle (Core Loop) tanıştırmaktır.

## 3. MVP Özellik Seti (Functional Scope)

### 3.1. Ekonomi Motoru (The Brain)
* **Temel Enflasyon:** Saniyede %0.1 ile %0.5 arasında değişen değişken bir baz enflasyon oranı.
* **Alış Fiyatı Dinamiği:** Ürünlerin tedarik fiyatları enflasyon oranına bağlı olarak her 5 saniyede bir otomatik olarak güncellenir.
* **Kur Etkisi:** Seçilen ürün bazında (örn. İthal Ürün) rastgele tetiklenen %10-%20'lik kur şokları.

### 3.2. Operasyonel Yönetim
* **Ürün Gamı:** MVP aşamasında 3 kritik ürün birimi:
  * **Ekmek:** Yüksek sürüm, düşük marj.
  * **Süt:** Orta düzey tüketim, kısa SKT (simülasyonu).
  * **Sıvı Yağ:** Yüksek maliyet, stok odaklı.
* **Fiyatlandırma Paneli:** Her ürün için anlık satış fiyatı girişi ve hızlı zam butonları (+%10).
* **Stok Yönetimi:** Kısıtlı depo kapasitesi ve "Toptancıdan Al" butonu.

### 3.3. Müşteri Algoritması (Behavioral Logic)
* **Hassasiyet Endeksi:** Satış Fiyatı / Alış Fiyatı oranı > 1.4 olduğunda müşterilerin "Fırsatçı" tepkisi vermesi ve satışın durması.
* **Zararına Satış:** Satış Fiyatı < Alış Fiyatı olduğunda stokların saniyeler içinde tükenmesi.

## 4. Kullanıcı Deneyimi (UI/UX)
* **Dashboard Görünümü:** Kasa Bakiyesi (TL), Enflasyon Oranı (%) ve Mevcut Gün sayısının bulunduğu üst panel.
* **Görsel Bildirimler:** Zam geldiğinde ürün kartlarının kırmızı yanması; satış olduğunda kasanın yeşil parlaması.
* **Responsive Yapı:** Masaüstü ve mobil tarayıcılarla tam uyum.

## 5. Başarı Kriterleri
* Oyunun kesintisiz 10 dakika (oyun içi 10 gün) boyunca iflas etmeden oynanabilmesi.
* Ekonomik verilerin (maliyetlerin) enflasyonla korele bir şekilde hatasız artması.

## 6. MVP Sonrası Plan (Next Steps)
* **Faz 2:** Personel alımı (Çırak, Muhasebeci), Lojistik (Akaryakıt) maliyetleri.
* **Faz 3:** Banka kredileri, LinkedIn "Başarı Sertifikası" API entegrasyonu.

---
*Bu doküman Market Krizörü projesinin gelişim yol haritasını belirlemek amacıyla hazırlanmıştır.*
