import { motion } from 'motion/react';
import { MapPin, Star } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onBookClick, onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#212529] via-[#2d3238] to-[#15181a] text-white py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b-8 border-[#D4AF37]">
      {/* Background illustration of auto repair shop with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 pointer-events-none select-none"
        style={{ backgroundImage: `url('/hero-bg.svg')` }}
      />
      {/* Backdrops */}
      <div className="absolute inset-0 bg-black/75 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#212529] via-transparent to-black/30 z-0" />

      {/* Decorative vector grid overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] z-0" />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
          
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <span className="geometric-line-indicator shrink-0"></span>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-black text-[#D4AF37] uppercase tracking-[4px]"
            >
              Adana Seyhan Turgutlar Oto Servis
            </motion.div>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-tight uppercase"
          >
            Adana'nın Güvenilir <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F39C12] border-b-4 border-[#D4AF37]">Oto Tamir</span> ve <br className="hidden sm:inline" /> 
            Kaporta Merkezi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto lg:mx-0 font-semibold leading-relaxed"
          >
            Turgutlar güvencesi ve Göçükçü İzzet Usta tecrübesiyle Adana'da 1 numaralı otomatik hasar onarım, kaporta, boya ve mekanik bakım merkezi. Tüm kasko ve trafik sigortası dosyalarınız sıfır maliyetle çözülür.
          </motion.p>

          {/* Anlaşmalı Yetkili Sigorta Şirketleri Badges Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-2 text-left"
          >
            <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[3px] block mb-3.5">
              ✓ ANLAŞMALI YETKİLİ HASAR & SİGORTA KAPORTA ONARIM MERKEZİ
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-xl">
              {[
                { name: 'Allianz', meta: 'Yetkili Anlaşmalı' },
                { name: 'Anadolu Sigorta', meta: 'Yetkili Anlaşmalı' },
                { name: 'Axa Sigorta', meta: 'Sözleşmeli Yetkili' },
                { name: 'Sompo Sigorta', meta: 'Yetkili Hasar' },
                { name: 'Türkiye Sigorta', meta: 'Yetkili Anlaşmalı' },
                { name: 'Neova & AkSigorta', meta: 'Yerel Yetkili Servis' }
              ].map((badge, idx) => (
                <div key={idx} className="bg-black/50 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/50 px-3.5 py-2.5 flex flex-col justify-center rounded-none select-none transition-all">
                  <span className="font-extrabold text-[11px] sm:text-xs text-white uppercase tracking-wider">
                    {badge.name}
                  </span>
                  <span className="text-[8px] text-[#D4AF37] font-black uppercase mt-1 tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                    {badge.meta}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 font-semibold mt-3 leading-relaxed">
              * Tüm trafik ve kasko poliçelerinizde hasar tespiti, ikame araç, orijinal onarım ve sigorta onay takibi bizzat servisimizce bedelsiz yürütülmektedir.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4"
          >
            <button
              onClick={onBookClick}
              className="bg-gradient-to-r from-[#D4AF37] to-[#F39C12] text-[#212529] hover:brightness-110 font-black uppercase text-xs tracking-widest px-8 py-[1.125rem] rounded-none transition-all shadow-lg select-none cursor-pointer text-center"
              id="hero-cta-book-now"
            >
              Randevu Al
            </button>
            <button
              onClick={onExploreClick}
              className="bg-transparent hover:bg-white/10 text-white font-black uppercase text-xs tracking-widest px-7 py-[1.125rem] rounded-none border-2 border-gray-500 hover:border-white transition-all select-none cursor-pointer text-center"
            >
              Hizmetlerimizi İncele
            </button>
          </motion.div>

        </div>

        {/* Highlight Feature Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 bg-white text-[#212529] p-6 rounded-none shadow-2xl border-t-8 border-b-8 border-r-2 border-l-2 border-[#D4AF37] relative"
          id="hero-floating-card"
        >
          {/* Badge */}
          <div className="absolute -top-3.5 right-6 bg-[#212529] text-[#D4AF37] text-[10px] font-black px-4 py-1 rounded-none border-2 border-[#D4AF37] tracking-widest uppercase">
            HIZLI İLETİŞİM
          </div>

          <h2 className="text-xl font-black tracking-tight uppercase mb-4 flex items-center gap-2">
            Turgutlar Oto Servis
          </h2>
          
          <div className="space-y-4">
            
            <div className="bg-[#F8F9FA] p-3.5 rounded-none border-l-4 border-[#F39C12] border-r border-t border-b border-gray-200 flex items-start gap-3">
              <MapPin size={18} className="text-[#F39C12] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black text-gray-500 block uppercase tracking-wider">Adresimiz</span>
                <span className="text-xs sm:text-sm font-semibold">{CONTACT_INFO.address}</span>
              </div>
            </div>

            <div className="bg-[#F8F9FA] p-3.5 rounded-none border-l-4 border-[#D4AF37] border-r border-t border-b border-gray-200 flex items-start gap-3">
              <Star size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-black text-gray-500 block uppercase tracking-wider">Müşteri Puanı</span>
                <span className="text-xs sm:text-sm font-bold flex items-center gap-1">
                  4.9 / 5.0 <span className="text-xs font-medium text-gray-500">(250+ google yorumu)</span>
                </span>
              </div>
            </div>

            <div className="border-t-2 border-[#212529] pt-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-wider">Hafta İçi:</span>
                <span className="font-black text-[#212529]">08:30 - 18:30</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-wider">Cumartesi:</span>
                <span className="font-black text-[#212529]">08:30 - 16:30</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-wider">Pazar:</span>
                <span className="font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-none uppercase">Kapalı</span>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-[#D4AF37] border-r border-t border-b border-[#D4AF37]/20 p-3 rounded-none text-xs font-semibold text-amber-900 leading-normal">
              🚘 <strong>Gecikmeyin!</strong> Adana Seyhan sanayisinde arızalı silecekler ve klima sistemleri sürüş güvenliğini ve konforunu doğrudan etkiler. Aynı gün teşhis ve tamir imkanı sunuyoruz.
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
