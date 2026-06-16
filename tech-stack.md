# 🛠️ Tech Stack & Yapay Zeka (AI) Kullanım Raporu

Future Talent 2026 Bitirme Projesi kapsamında geliştirilen **Market Krizörü v1.0**, makroekonomik kriz ortamlarını simüle eden ve kullanıcının dinamik kararlar almasını sağlayan web tabanlı bir fintech simülatörüdür.

---

## Kullanılan Teknolojiler (Tech Stack)

### 1. Frontend & Arayüz Katmanı
* **Next.js (v16+ / App Router):** Uygulamanın çekirdek arayüz mimarisi, yüksek performanslı bileşen işleme ve esnek dosya tabanlı yönlendirme (routing) avantajları nedeniyle tercih edilmiştir.
* **TypeScript:** Güvenli veri tipleri (static typing) kullanılarak finansal veri akışındaki (kasa bakiyesi, döviz kurları, stok adetleri) olası runtime hatalarının önüne geçilmiştir.
* **Tailwind CSS & Shadcn/UI:** Kriz anındaki panik atmosferini (anlık kırmızı uyarılar, nabız efektleri, dinamik gösterge panelleri) kullanıcıya hissettirecek karanlık mod odaklı, duyarlı (responsive) bir tasarım dili kurgulanmıştır.

### 2. Backend & Simülasyon Motoru (API Yapısı)
* **Modüler Engine Yapısı (`/backend` & `mockGame.ts`):** Frontend ve backend lojistiği birbirinden bağımsız kurgulanmıştır. Krizörün tüm matematiksel, finansal ve makroekonomik olay döngüsü (enflasyon tetikleyicileri, döviz şokları, vadeli/peşin alım faiz işletim metotları) ileride farklı platformlara (mobil, masaüstü) hizmet verebilecek bağımsız bir API yapısına hazır şekilde geliştirilmiştir.

### 3. Canlıya Alım (Deployment)
* **Netlify:** GitHub reposu ile sürekli entegrasyon (CI/CD) halinde çalışarak projenin her güncellemede otomatik derlenmesi ve kesintisiz şekilde canlıya aktarılması sağlanmıştır.

---

## Geliştirme Sürecinde Yapay Zeka (AI) Kullanımı

Bu proje, **AI-Native Geliştirici** vizyonuna uygun olarak baştan sona yapay zeka iş birliğiyle kurgulanmış ve yönetilmiştir:

* **Mimari Planlama ve PRD Türetimi:** Projenin fikir aşamasından itibaren kriz senaryolarının mantıksal sınırları ve kullanıcı hikayeleri AI yardımıyla yapılandırılmıştır.
* **Refactoring ve Hata Yönetimi:** Özellikle Netlify üzerindeki TypeScript derleme (build) süreçlerinde yaşanan kilitlenmeler ve syntax hataları, AI ajanları ile birlikte log analizi yapılarak sakin ve nokta atışı hamlelerle çözülmüştür.
* **Ürün Pivotlama (Stratejik Değişiklik):** İlk aşamadaki otomatik arka plan satış mantığı, AI iş birliğiyle kullanıcının ithal ve yerli ürünler için bağımsız "Adet" ve "Özel Fiyat" belirleyebileceği derin bir mikro-yönetim (Manuel Spot Satış) paneline dönüştürülmüştür.

---

## 🏁 Sonuç
Market Krizörü v1.0; modern web teknolojileri ile makroekonomik teorilerin yapay zeka rehberliğinde harmanlandığı, ölçeklenebilir ve tam kontrollü bir dijital ürün prototipidir.
