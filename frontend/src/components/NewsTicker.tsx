import { glass, typography } from "@/lib/designSystem";

const headlines = [
  "SON DAKİKA: Tedarikçiler bu sabah fiyat listesini güncelledi!",
  "ANALİZ: Uzmanlar enflasyonun nereye gideceğini tartışıyor...",
  "UYARI: Sıvı yağ stokları kritik seviyelere indi!",
  "EKONOMİ: Dolar/TL bugün yeni rekor kırdı",
  "HABER: Ekmek kuyruğu sosyal medyada gündem oldu",
  "PİYASALAR: Bu sabah toptancı kapılarında izdiham yaşandı",
];

export function NewsTicker() {
  const text = [...headlines, ...headlines].join("   •   ");

  return (
    <div className={glass.ticker}>
      <div className={typography.className.marqueeStrip}>{text}</div>
    </div>
  );
}
