# Market Krizörü - Geliştirme Günlüğü (Progress Log)

Bu doküman, Market Krizörü projesinin fikir aşamasından teslim sürecine kadar geçen tüm geliştirme adımlarını, alınan kararları ve teknik notları içermektedir.

---

## Süreç Takip Günlüğü

### Aşama 1: Fikir ve Kapsam Belirleme
* **Yapılanlar:** Projenin ana konsepti olan "Gamified-Fintech" (Oyunlaştırılmış Finans) teması kararlaştırıldı. Hiperenflasyon ve kur şoklarının oyun mekaniklerine nasıl yedirileceği planlandı.
* **Çıktılar:** İlk taslak kapsam dokümanları oluşturuldu.

### Aşama 2: Dokümantasyon ve Mimari Planlama
* **Yapılanlar:** Projenin anayasası niteliğindeki `PRD.md` ve adım adım yazılım yol haritasını içeren `Plan.md` dokümanları kılavuz standartlarına uygun olarak hazırlandı.
* **Teknik Karar:** Frontend (Arayüz) ve Backend (Sunucu) katmanlarının tamamen birbirinden bağımsız (decoupled) çalışması kararlaştırıldı.

### Aşama 3: Frontend İskelet Kurulumu
* **Yapılanlar:** Next.js (React) kullanılarak `frontend/` dizini oluşturuldu. Tailwind CSS entegrasyonu tamamlandı. Tasarım standartları `DesignSystem.md` dokümanına işlendi.
* **Çıktılar:** Temel oyun paneli arayüz bileşenleri ve ürün kartlarının görsel iskeleti hazırlandı.

### Aşama 4 (Mevcut Durum): Repo Temizliği ve Düzenleme
* **Yapılanlar:** GitHub reposundaki dosya isimleri, kılavuzdaki büyük/küçük harf hassasiyetine göre güncellendi. Çift/hatalı dosyalar temizlendi ve ana `README.md` vitrini oluşturuldu.
* **Sonraki Adım:** `backend/` klasörünün oluşturulması ve Express.js ile ekonomi motorunun kodlanmasına başlanması.

---

##  Karşılaşılan Zorluklar ve Çözümler
* *Zorluk:* GitHub üzerinde dosya uzantılarının hatalı kaydedilmesi (`plan_md` gibi) sonucu tasarımların bozuk görünmesi.
* *Çözüm:* Hatalı ve uzantısız dosyalar silindi, standart `.md` (Markdown) uzantıları ve büyük harf hiyerarşisi uygulanarak sorun çözüldü.
