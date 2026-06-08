# Turgutlar Oto Tamir Merkezi

Adana Seyhan'da faaliyet gösteren Turgutlar Oto Tamir ve Hasar Onarım Merkezi'nin kurumsal web sitesi.

## Teknoloji Yığını

- **Framework:** React 19 + Vite 6
- **Dil:** TypeScript
- **Stil:** Tailwind CSS v4
- **Animasyon:** Motion (framer-motion)
- **İkonlar:** Lucide React
- **Dağıtım:** Vercel (statik SPA)

## Yerel Geliştirme

```bash
npm install
npm run dev      # Geliştirme sunucusu (http://localhost:3000)
npm run build    # Üretim derlemesi (dist/)
npm run preview  # Build'i yerel olarak önizle
npm run lint     # TypeScript tip kontrolü
```

## Proje Yapısı

```
src/
├── components/        # Tekrar kullanılabilir UI bileşenleri
├── App.tsx            # Kök uygulama
├── main.tsx           # React giriş noktası
├── index.css          # Tailwind v4 tema ve global stiller
├── data.ts            # Statik veri kaynağı (hizmetler, yorumlar, SSS, iletişim)
└── types.ts           # TypeScript arayüzleri
```

## Dağıtım (Vercel)

Proje Vercel için statik SPA olarak yapılandırıldı. Tüm rotalar `index.html`'e yönlendirilir
(`vercel.json` üzerinden). Sürüm dalını push'lamanız yeterlidir; geri kalanını Vercel halleder.

## İletişim Bilgileri Güncelleme

Telefon, adres, çalışma saatleri ve e-posta gibi tüm iletişim bilgileri **tek bir kaynaktan**
(`src/data.ts` içindeki `CONTACT_INFO` ve `WORKING_HOURS`) yönetilir. Bir değişiklik yapıldığında
Header, Hero, Footer, WhatsAppButton, RepairStatusQuery ve `index.html` içindeki JSON-LD
şeması otomatik olarak güncellenir.
