import { ShieldAlert, HeartHandshake } from 'lucide-react';

export default function InsurancePartners() {
  const brands = [
    { name: 'Allianz', meta: 'Kasko & Trafik' },
    { name: 'Anadolu Sigorta', meta: 'Tam Yetkili' },
    { name: 'Ak Sigorta', meta: 'Anlaşmalı Servis' },
    { name: 'Mapfre', meta: 'Kasko Onaylı' },
    { name: 'Sompo', meta: 'Yetkili Hasar' },
    { name: 'Quick Sigorta', meta: 'Dolu & Kaporta' },
    { name: 'HDI', meta: 'Anlaşmalı Acenta' },
    { name: 'Ergo', meta: 'Hızlı Dosya' }
  ];

  // We duplicate array to ensure smooth continuous looping
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <section className="py-16 bg-white overflow-hidden border-b border-gray-200 relative">
      {/* Self-contained CSS for the infinite marquee */}
      <style>{`
        @keyframes turgut-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: turgut-marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block mb-2">SİGORTA GÜVENCESİ</span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#212529]">
            Tüm Kasko ve Trafik Sigortaları İle Anlaşmalıyız
          </h2>
          <div className="geometric-line-indicator mx-auto mt-3" />
          <p className="text-gray-400 font-semibold mt-3 text-xs leading-relaxed">
            Aracınız kaza yaptıysa endişelenmeyin. Anlaşmalı acentelerimiz ve hasar protokollerimiz eşliğinde dosyanızı açıyor, orijinal parçalarla tamir ediyor ve ikame aracınızı kapınıza getiriyoruz.
          </p>
        </div>
      </div>

      {/* CSS Infinite Marquee Strip */}
      <div className="relative w-full overflow-hidden py-4 border-y border-gray-100 bg-white select-none cursor-grab">
        {/* Shadow overlays on the edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-15 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-15 pointer-events-none" />

        <div className="animate-marquee gap-8 items-center px-4">
          {marqueeItems.map((brand, idx) => (
            <div 
              key={idx} 
              className="bg-[#F8F9FA] hover:bg-white border-2 border-black hover:border-[#D4AF37] px-6 sm:px-8 py-3.5 flex flex-col justify-center items-center text-center transition-all min-w-[160px] sm:min-w-[190px] shadow-sm hover:shadow-md"
            >
              <span className="font-extrabold text-xs sm:text-sm text-[#212529] uppercase tracking-wider block leading-none">
                {brand.name}
              </span>
              <span className="text-[9px] text-[#F39C12] font-black uppercase tracking-widest mt-1.5 flex items-center gap-1.5 leading-none">
                <span className="w-1 h-1 bg-[#D4AF37] rounded-full inline-block animate-ping"></span>
                {brand.meta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Compact Info Footer */}
      <div className="max-w-4xl mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left text-[11px] text-gray-400">
        <div className="flex items-center gap-2 font-semibold">
          <ShieldAlert size={14} className="text-[#D4AF37] shrink-0" />
          <span>Süreç boyunca sigortanız üzerinden dosya takibi, hukuki süreçler ve işlemler ücretsiz yürütülür.</span>
        </div>
        <div className="hidden sm:block text-gray-300">|</div>
        <div className="flex items-center gap-1.5 font-bold text-[#212529]">
          <HeartHandshake size={13} className="text-[#F39C12]" />
          <span>%100 Kusursuz Müşteri Memnuniyeti Hedefi</span>
        </div>
      </div>

    </section>
  );
}
