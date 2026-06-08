import { Service, Review, FAQItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'mekanik-elektrik',
    title: 'Mekanik & Elektrik Onarım',
    description: 'Aracınızın motor, yürüyen aksam, süspansiyon ve karmaşık elektrik-elektronik devre arızaları orijinal şemalarla çözülür.',
    icon: 'Wrench',
    category: 'onarim',
    details: [
      'Ön takım, rot-balans ve süspansiyon onarımları',
      'Fren diski, balataları ve hidrolik sistem revizyonu',
      'Alternatör, marş dinamosu ve tesisat tamiri',
      'Far, stop, aydınlatma ve merkezi kilit sorunları'
    ],
    priceEst: '500 TL\'den başlayan'
  },
  {
    id: 'periyodik-bakim',
    title: 'Periyodik Bakım',
    description: 'Düzenli bakım motorunuzun ömrünü uzatır, sürüş emniyetini artırır ve yakıt sarfiyatını en aza indirir.',
    icon: 'Settings',
    category: 'bakim',
    details: [
      'Motor yağı ve yağ filtresi değişimi',
      'Hava filtreleri ve polen filtrelerinin yenilenmesi',
      'Sıvı seviyeleri kontrolü (Fren, direksiyon, antifriz)',
      '30 Nokta detaylı güvenlik check-up taraması'
    ],
    priceEst: '1.200 TL\'den başlayan'
  },
  {
    id: 'kaporta-boya',
    title: 'Kaporta & Boya',
    description: 'Boyasız göçük düzeltme, lokal boya onarımı ve kaza sonrası orijinal fırın boya standartlarıyla kusursuz kaporta işleri.',
    icon: 'Sparkles',
    category: 'diger',
    details: [
      'Boyasız dolu hasarı ve derin göçük düzeltme',
      'Fırınlı tozsuz boya ve orijinal renk kodu eşleştirme',
      'Çizik giderme, pasta-cila ve seramik kaplama koruması',
      'Şase ve tampon hasarları hassas doğrultma işlemleri'
    ],
    priceEst: 'Hasara Göre Belirlenir'
  },
  {
    id: 'ariza-tespiti',
    title: 'Gelişmiş Arıza Tespiti',
    description: 'Lisanslı arıza tespit cihazlarımızla otomobilinizin beynine (ECU) bağlanarak tüm elektriksel ve duyusal hataları belirleriz.',
    icon: 'Cpu',
    category: 'elektronik',
    details: [
      'Detaylı OBD-2 soket beyin hata kodu (DTC) analizi',
      'Gerçek zamanlı sensör değerleri ve akış ölçümleri',
      'Ateşleme, enjektör ve yakıt basıncı parametre okuma',
      'Gösterge paneli ikaz ışıkları tespiti ve kalıcı silme'
    ],
    priceEst: '350 TL\'den başlayan'
  },
  {
    id: 'motor-revizyonu',
    title: 'Motor Revizyonu',
    description: 'Usta ellerde motor rektifiyesi, silindir kapak contası, sübap değişimi ve komple yenileme işlemleri garantili olarak yapılır.',
    icon: 'Wrench',
    category: 'onarim',
    details: [
      'Silindir kapak contası değişimi ve motor rektifiyesi',
      'Segman, piston, kol yatağı ve krank yenilemeleri',
      'Triger setleri (kayış veya zincir) hassas sente değişimi',
      'Motor sızdırmazlık keçe, conta ve sıvı sızıntı onarımı'
    ],
    priceEst: 'Detaylı Tespit Sonrası'
  },
  {
    id: 'sanziman-tamiri',
    title: 'Şanzıman Tamiri',
    description: 'Manuel ve otomatik (DSG, EDC, CVT vb.) tüm şanzıman tiplerinde kavrama, dişli grubu, beyin ve yağ değişim onarımları.',
    icon: 'Settings',
    category: 'onarim',
    details: [
      'Baskı balata ve debriyaj seti revizyonu / değişimi',
      'Otomatik şanzıman hidrolik beyin tamiri ve kodlanması',
      'Şanzıman yağı, filtresi ve sızdırmazlık bakımları',
      'Dişli aşınmaları, vites geçiş problemleri onarımı'
    ],
    priceEst: 'Detaylı İnceleme Sonrası'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Murat Karaoğlan',
    rating: 5,
    text: 'Turgut Usta ve ekibine çok teşekkür ederim. Adana sıcağında klimam çalışmıyordu, yarım saatte kaçağı bulup gazı doldurdular ve şu an buz gibi yapıyor. Fiyatları da piyasaya göre çok adil.',
    vehicle: 'Honda Civic VTEC',
    date: '12 Mayıs 2026'
  },
  {
    id: 'rev-2',
    author: 'Serkan Yılmaz',
    rating: 5,
    text: 'Siteden randevu alıp gittim, tam saatimde arabamı lifte aldılar. Periyodik bakımı yapıp ön fren balatalarımı değiştirdiler. Dürüst sanayi esnafı bulmak zordur ama burası tam bir aile ortamı. Şiddetle tavsiye ederim.',
    vehicle: 'Volkswagen Passat TDI',
    date: '28 Nisan 2026'
  },
  {
    id: 'rev-3',
    author: 'Ayşe Tatlı',
    rating: 5,
    text: 'Aracımın debriyaj setini değiştirdiler. Kadın olarak sanayiye gitmeye çekinirdim fakat çalışanların nezaketi, her işlemi video atarak bildirmeleri ve şeffaflıkları harikaydı. Çok güvendim.',
    vehicle: 'Renault Clio 1.5 dCi',
    date: '04 Nisan 2026'
  },
  {
    id: 'rev-4',
    author: 'Mehmet Bulut',
    rating: 4,
    text: 'Motor arıza lambası bir türlü sönmüyordu. Adana\'da gezmediğim dükkan kalmadı, hepsi farklı bir şey dedi. Bilgisayarlı arıza teşhisi ile sensördeki temassızlığı hemen yakaladılar. Elinize sağlık.',
    vehicle: 'Ford Focus 1.6 Ti-VCT',
    date: '15 Mart 2026'
  },
  {
    id: 'rev-5',
    author: 'Kaan Öztürk',
    rating: 5,
    text: 'Yolculuk öncesi 30 nokta genel kontrol yaptırdım. Sadece aşınmış olan silecek lastiklerini değiştirdik, diğer her şey sağlam dediler. Gereksiz masraf çıkarmayan, son derece ahlaklı ve güvenilir esnaf.',
    vehicle: 'Toyota Corolla 1.6',
    date: '22 Şubat 2026'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Web sitesi üzerinden randevu almak zorunlu mu?',
    answer: 'Zorunlu değildir. Ancak gün içinde yoğun olup beklemenizi en aza indirmek için web sitemizdeki formdan hızlıca randevu oluşturmanızı veya doğrudan bizi telefonla arayarak saati kesinleştirmenizi öneririz.'
  },
  {
    id: 'faq-2',
    question: 'Hangi marka araçlara hizmet veriyorsunuz?',
    answer: 'Tüm binek ve hafif ticari araç segmentlerinde yerli (Fiat, Renault vb.), Avrupa (Volkswagen, Opel, BMW, Mercedes vb.) ve Asya (Toyota, Hyundai, Honda vb.) menşeili markaların bakımlarını üretici standartlarında yapabiliyoruz.'
  },
  {
    id: 'faq-3',
    question: 'Kullandığınız yedek parçalar garantili mi?',
    answer: 'Evet, servisimizde kullandığımız tüm orijinal veya orijinal eşdeğer (OEM onaylı) yedek parçalar ile yaptığımız işçilikler 1 yıl süreyle garantimiz altındadır. Herhangi bir parça kaynaklı sorunda ücretsiz telafi sağlıyoruz.'
  },
  {
    id: 'faq-4',
    question: 'Sıradan periyodik bakım ne kadar sürüyor?',
    answer: 'Yağ değişimi, hava, polen, yakıt filtrelerinin değişimi ile frenlerin kontrolü gibi standart periyodik bakım işlemleri yaklaşık 45 - 60 dakika sürmektedir. Bekleme salonumuzda çayınızı içerken aracınızı tamamlayıp teslim ediyoruz.'
  },
  {
    id: 'faq-5',
    question: 'Kredi kartı ile ödeme yapabilir miyim?',
    answer: 'Evet, Turgutlar Oto Tamir Merkezi\'nde Axess, Bonus, World, Maximum ve tüm diğer kredi kartlarıyla ödeme gerçekleştirebilirsiniz. Dönemsel kampanyalar çerçevesinde bazı kartlara peşin fiyatına taksit imkanımız olmaktadır.'
  }
];

export const WORKING_HOURS = {
  weekdays: '08:30 - 18:30',
  saturday: '08:30 - 16:30',
  sunday: 'Kapalı'
};

/**
 * Gerçek anlaşmalı sigorta şirketleri — kapı tabelasından ve marka kimliğinden derlendi.
 * Header'daki marquee bandı ve InsuranceSection bunu kullanır.
 */
export const INSURANCE_BADGES: { name: string; short: string; accent: string }[] = [
  { name: 'Allianz', short: 'Allianz', accent: '#003781' },
  { name: 'Anadolu Sigorta', short: 'Anadolu', accent: '#E30613' },
  { name: 'AK Sigorta', short: 'AK', accent: '#003594' },
  { name: 'MAPFRE Sigorta', short: 'MAPFRE', accent: '#D32F2F' },
  { name: 'Sompo Sigorta', short: 'Sompo', accent: '#E53935' },
  { name: 'Quick Sigorta', short: 'Quick', accent: '#FBC02D' },
  { name: 'HDI Sigorta', short: 'HDI', accent: '#1B4F72' },
  { name: 'ERGO Sigorta', short: 'ERGO', accent: '#D81B60' },
  { name: 'Güneş Sigorta', short: 'Güneş', accent: '#F57C00' },
  { name: 'SÜNEP Sigorta', short: 'SÜNEP', accent: '#0D47A1' },
  { name: 'NURSTU Sigorta', short: 'NURSTU', accent: '#37474F' },
  { name: 'Ziraat Sigorta', short: 'Ziraat', accent: '#1B5E20' }
];

/**
 * Tabela üzerindeki hizmet satırları — Header'da tag chip'leri olarak gösterilir,
 * Hero'da da kullanılabilir.
 */
export const SERVICE_TAGS: string[] = [
  'Profesyonel Mekanik',
  'Elektrik Onarım',
  'Periyodik Bakım',
  'Kaporta & Boya',
  'Gelişmiş Arıza Tespit',
  'Motor Revizyonu',
  'Şanzıman Tamiri',
  'Fren Sistemleri'
];

/**
 * Kapı tabelasının sol alt köşesindeki müşteri vaatleri.
 * Header üst barında ve Hero trust strip'inde kullanılır.
 */
export const PROMISES: { icon: 'shield' | 'clock' | 'tag' | 'check'; text: string }[] = [
  { icon: 'shield', text: 'Tüm Kasko & Trafik Sigortaları İle Anlaşma' },
  { icon: 'clock', text: 'Hızlı Hasar Dosyası Takibi' },
  { icon: 'tag', text: 'Hesaplı ve Güvenilir Tamir' },
  { icon: 'check', text: 'Orijinal Yedek Parça Garantisi' }
];

/**
 * Sık kullanılan navigasyon bağlantıları.
 * Header'da hem desktop hem mobile drawer'da gösterilir.
 */
export const NAV_LINKS: { label: string; id: string; section?: string }[] = [
  { label: 'Ana Sayfa', id: 'root' },
  { label: 'Hakkımızda', id: 'hakkimizda' },
  { label: 'Hizmetler', id: 'hizmetler' },
  { label: 'Hasar & Sigorta', id: 'hasar-sigorta' },
  { label: 'Hasar Sorgula', id: 'hasar-durumu' },
  { label: 'Yorumlar', id: 'yorumlar' },
  { label: 'SSS', id: 'sss' },
  { label: 'İletişim', id: 'iletisim' }
];

export const CONTACT_INFO = {
  // Görüntülenecek formatlı telefon numarası
  phone: '+90 532 123 45 67',
  // href="tel:..." ve href="https://wa.me/..." için temizlenmiş E.164 versiyonu
  phoneE164: '905321234567',
  landline: '+90 322 456 78 90',
  landlineE164: '903224567890',
  email: 'iletisim@turgutlaroto.com',
  address: 'Yeni Sanayi Sitesi, 23. Blok, No: 4, Seyhan / ADANA',
  // Schema.org için adres parçaları
  streetAddress: 'Yeni Sanayi Sitesi, 23. Blok, No: 4',
  postalCode: '01060',
  city: 'Seyhan',
  region: 'Adana',
  country: 'TR',
  coordinates: {
    lat: 36.9931,
    lng: 35.3256
  },
  siteUrl: 'https://turgutlaroto.com',
  social: {
    facebook: 'https://www.facebook.com/turgutlaroto',
    instagram: 'https://www.instagram.com/turgutlaroto'
  }
};
