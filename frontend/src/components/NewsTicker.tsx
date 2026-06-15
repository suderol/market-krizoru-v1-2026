import { useState, useEffect } from "react";
import { glass } from "@/lib/designSystem";

// Haberleri mantıksal gruplara (durumlara) ayırdık
const FAiZ_ARTIS_HABERI = "🚨 SON DAKİKA: Merkez Bankası faizleri artırdı! İç piyasada talep daralması bekleniyor.";
const FAiZ_INDİRİM_HABERI = "🎉 MÜJDE: Merkez Bankası faiz indirdi! Piyasa canlanıyor, tüketim çılgınlığı kapıda!";

const GENEL_HABERLER = [
  "📦 GÜMRÜK: Gümrük Bakanlığı ithal ürünlere ek kota ve %35 vergi getirdi! Maliyetler yükselecek.",
  "⛽ LOJİSTİK: Akaryakıt fiyatlarına lojistik zammı geldi! Toptancı nakliye ücretlerini artırdı.",
  "📈 ENFLASYON: Tedarikçiler fiyat listesini güncelledi, raflardaki etiketleri kontrol edin!",
  "💵 DÖVİZ: Dolar/TL kurunda hareketlilik sürüyor, serbest piyasa dengelenmeye çalışıyor."
];

export function NewsTicker() {
  const [currentHeadline, setCurrentHeadline] = useState(GENEL_HABERLER[0]);
  const [lastType, setLastType] = useState<"artis" | "indirim" | "genel">("genel");
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const changeNews = () => {
      setFade(false); // Önce haberi yavaşça karart (Fade-out)

      setTimeout(() => {
        let nextHeadline = "";
        let nextType: "artis" | "indirim" | "genel" = "genel";

        // Mantık süzgeci: Rastgele bir sayı seçip havuz belirliyoruz
        const rand = Math.random();

        if (rand < 0.25) {
          // Son haber faiz indirimi DEĞİLSE faiz artışı getirebiliriz (Çelişkiyi engeller)
          if (lastType !== "indirim") {
            nextHeadline = FAiZ_ARTIS_HABERI;
            nextType = "artis";
          } else {
            nextHeadline = GENEL_HABERLER[Math.floor(Math.random() * GENEL_HABERLER.length)];
            nextType = "genel";
          }
        } else if (rand < 0.50) {
          // Son haber faiz artışı DEĞİLSE faiz indirimi getirebiliriz
          if (lastType !== "artis") {
            nextHeadline = FAiZ_INDİRİM_HABERI;
            nextType = "indirim";
          } else {
            nextHeadline = GENEL_HABERLER[Math.floor(Math.random() * GENEL_HABERLER.length)];
            nextType = "genel";
          }
        } else {
          // Genel ekonomik durumlardan bir haber seç
          nextHeadline = GENEL_HABERLER[Math.floor(Math.random() * GENEL_HABERLER.length)];
          nextType = "genel";
        }

        setCurrentHeadline(nextHeadline);
        setLastType(nextType);
        setFade(true); // Yeni haberi yavaşça aydınlat (Fade-in)
      }, 500); // 0.5 saniyelik geçiş yumuşaklığı
    };

    // Haber akış hızı: Her 8 saniyede bir tek ve mantıklı bir haber gelir
    const interval = setInterval(changeNews, 8000);
    return () => clearInterval(interval);
  }, [lastType]);

  return (
    <div className={glass.ticker} style={{ overflow: 'hidden', padding: '10px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div 
        className={`text-sm font-bold tracking-wide transition-opacity duration-500 text-center ${
          fade ? 'opacity-100' : 'opacity-0'
        } ${
          currentHeadline.includes('🚨') ? 'text-red-400' : 
          currentHeadline.includes('🎉') ? 'text-emerald-400' : 'text-amber-400'
        }`}
      >
        {currentHeadline}
      </div>
    </div>
  );
}