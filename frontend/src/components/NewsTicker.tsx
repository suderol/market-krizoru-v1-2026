import { glass, typography } from "@/lib/designSystem";

const headlines = [
  "🚨 SON DAKİKA: Merkez Bankası faizleri artırdı! İç piyasada talep daralması bekleniyor.",
  "🎉 MÜJDE: Merkez Bankası faiz indirdi! Piyasa canlanıyor, tüketim çılgınlığı kapıda!",
  "📦 GÜMRÜK: Gümrük Bakanlığı ithal ürünlere ek kota ve %35 vergi getirdi! Maliyetler yükselecek.",
  "⛽ LOJİSTİK: Akaryakıt fiyatlarına lojistik zammı geldi! Toptancı nakliye ücretlerini artırdı.",
  "📈 ENFLASYON: Tedarikçiler fiyat listesini güncelledi, raflardaki etiketleri kontrol edin!",
  "💵 DÖVİZ: Dolar/TL kurunda hareketlilik sürüyor, serbest piyasa dengelenmeye çalışıyor."
];

export function NewsTicker() {
  const text = [...headlines, ...headlines, ...headlines].join("   •   ");

  return (
    <div className={glass.ticker} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div 
        className={typography.className.marqueeStrip} 
        style={{ 
          display: 'inline-block', 
          paddingLeft: '100%', 
          animation: 'marquee 75s linear infinite' // Akış hızı gözü yormayacak şekilde, tam istediğin gibi yavaşlatıldı!
        }}
      >
        {text}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
      `}</style>
    </div>
  );
}