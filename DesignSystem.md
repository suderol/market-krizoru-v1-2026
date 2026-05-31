# Market Krizörü - Tasarım Sistemi (Design System)

Bu doküman, Market Krizörü simülatörünün kullanıcı arayüzünde (UI) tutarlılığı sağlamak amacıyla kullanılan renk paletini, tipografiyi ve görsel bileşen kurallarını tanımlar.

---

## 1. Genel Konsept ve Tema
Uygulama, finansal kriz ve simülasyon atmosferini daha net hissettirmek adına **Dark Mode (Koyu Tema)** olarak kurgulanmıştır. Arayüz elemanlarında modern bir derinlik hissi yaratmak ve şık bir finansal panel havası sunmak için **Glassmorphic** (yarı geçirgen buzlu cam) efektleri tercih edilmiştir.

---

## 2. Renk Paleti

### Arka Plan ve Ana Gövde
* **Ana Arka Plan:** `#0d1117` (Derin Gece Mavisi / Siyah)
* **Kart Arka Planları:** `bg-white/5 backdrop-blur-md` (Yarı geçirgen beyaz, buzlu cam efektli)
* **Kenarlıklar:** `border-white/10` (Hafif beyaz çizgi)

### Durum ve Müşteri Modu Renkleri
* **Normal Durum (Başarı):** `#00ff88` (`bg-green-500`) - *Müşteri memnuniyetini ve kârlı satışları simgeler.*
* **Fırsatçı Tepki (Kritik):** `#ff3333` (`bg-red-500`) - *Aşırı kâr marjı nedeniyle müşterilerin alımı durdurduğunu simgeler.*
* **Panik Alışı (Uyarı):** `#facc15` (`bg-yellow-400`) - *Maliyetin altına satış yapıldığını ve stokların hızla tükendiğini simgeler.*

---

## 3. Tipografi (Yazı Tipleri)
Next.js ve Tailwind CSS sistem fontları optimize edilerek kullanılmıştır.
* **Başlıklar:** `font-sans font-bold tracking-tight` (Modern ve çarpıcı başlıklar)
* **Metinler ve Sayısal Değerler:** `font-mono` (Finansal verilerin, bakiye durumlarının ve dijital sayaçların daha okunaklı ve borsa ekranı gibi görünmesi adına monospaced yazı tipi tercih edilmiştir.)

---

## 4. Görsel Efektler ve Animasyonlar
* **Fiyat Artış Efekti:** Toptancı fiyatı her arttığında veya zam yapıldığında kartta beliren kırmızı anlık parlama (`flash-red`).
* **Satış Başarı Efekti:** Başarılı bir satış gerçekleştiğinde kasanın yeşil renkte parıldaması (`flash-green`).
* **Haber Bandı:** Sürekli akan dinamik bir metin akışı (`animate-marquee`).
