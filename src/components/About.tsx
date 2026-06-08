import { motion } from 'motion/react';
import { Award, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <Award className="text-[#D4AF37]" size={20} />,
      title: 'Uzman Kadro',
      desc: 'Sertifikalı ustalarımızla her işi eksiksiz yürütüyoruz.'
    },
    {
      icon: <ShieldCheck className="text-[#D4AF37]" size={20} />,
      title: 'Garantili İşçilik',
      desc: 'Kullandığımız parçalar ve yaptığımız tamiratlar 1 yıl garantilidir.'
    },
    {
      icon: <ThumbsUp className="text-[#D4AF37]" size={20} />,
      title: 'Hızlı Teslim',
      desc: 'Aracınızı söz verdiğimiz günde ve saatte teslim ediyoruz.'
    }
  ];

  return (
    <section id="hakkimizda" className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Wide Modern White Sign-boarded Storefront exterior illustration */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative border-4 border-black shadow-2xl overflow-hidden group bg-white p-3"
            >
              {/* Modern, modern auto workspace storefront illustration */}
              <img
                src="/about-storefront.svg"
                alt="Turgutlar Oto Servis modern dış cephe illüstrasyonu"
                className="w-full aspect-[4/3] object-cover border-2 border-black filter brightness-95 group-hover:brightness-100 transition-all duration-300 pointer-events-none select-none"
              />

              {/* Aesthetic Overlay Badge */}
              <div className="absolute bottom-6 left-6 bg-[#212529] text-white p-4 border-2 border-[#D4AF37] shadow-xl max-w-xs hidden sm:block">
                <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest block mb-1">
                  YENİLENEN YÜZÜMÜZ
                </span>
                <p className="text-xs font-semibold text-gray-300 leading-normal">
                  Son teknoloji ekipmanlar ve ultra modern yeni dış cephe tabelamızla Seyhan sanayisinde fark yaratıyoruz.
                </p>
              </div>
            </motion.div>

            {/* Geometric accents behind the image container (Architectural Honesty / Brutalist design) */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-dashed border-[#D4AF37] -z-10 bg-[#D4AF37]/5 pointer-events-none" />
          </div>

          {/* Right Column: Roomy, elegant narrative block with exact copy and whitespace design */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block">
              KURUMSAL VİZYON
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#212529] leading-tight">
              Adana'nın En Kapsamlı ve Güvenilir Oto Servis Merkezi
            </h2>

            <div className="w-16 h-1 bg-[#D4AF37] rounded-none" />

            <p className="text-sm sm:text-base text-gray-600 font-semibold leading-relaxed">
              Eski yapımızı tamamen yenileyerek, modern otomotiv teknolojileri ve kurumsal hizmet anlayışıyla Turgutlar Oto Tamir Merkezi'ni kurduk. En büyük gücümüz, tüm yaygın sigorta şirketleriyle olan güçlü anlaşmalarımızdır. Kaza anından aracınızın teslimine kadar tüm yasal süreçleri, hasar dosya takiplerini sizin adınıza ücretsiz ve hızla yürütüyoruz.
            </p>

            <blockquote className="border-l-4 border-black pl-4 italic text-xs sm:text-sm text-gray-500 font-semibold my-4">
              "Biliyoruz ki oto tamir hizmetinde en mühim şey dürüstlüktür. Aracınızı kendi aracımız bilip, her vidayı o özenle sıkıyoruz." — Ahmet Usta, Kurucu.
            </blockquote>

            {/* Premium Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200/80">
              {highlights.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#212529] text-[#D4AF37] border border-[#D4AF37]">
                      {item.icon}
                    </div>
                    <h4 className="text-[11px] font-black uppercase text-[#212529] tracking-wider">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
