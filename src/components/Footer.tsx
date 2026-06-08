import { Phone, MapPin, Mail, Clock, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, WORKING_HOURS } from '../data';

interface FooterProps {
  onNavClick: (id: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="iletisim" className="bg-[#212529] text-white pt-16 pb-8 border-t-8 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Absolute 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 mb-12 text-left">
          
          {/* Sütun 1: Firma Hakkında Kısa Bilgi ve Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white text-[#212529] p-2 rounded-none border-2 border-[#D4AF37] flex items-center justify-center font-[900] text-lg select-none">
                <span className="text-[#D4AF37]">T</span>O
              </div>
              <div>
                <h3 className="text-md font-[900] tracking-wider leading-none text-white">TURGUTLAR</h3>
                <span className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest block mt-1">Oto Tamir & Bakım</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 font-semibold leading-relaxed">
              Turgutlar Oto Tamir ve Hasar Onarım Merkezi, Adana Seyhan sanayisinde uzman kadrosuyla hizmet vermektedir. Göçükçü İzzet Usta ve profesyonel ustalarımız eşliğinde kasko/sigorta hasar dosyalarınızı yönetiyor, araçlarınızı fabrika standartlarında onarıyoruz.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <div className="text-emerald-500 bg-emerald-500/10 p-1.5 rounded-none border border-emerald-500/20">
                <ShieldCheck size={16} />
              </div>
              <p className="text-[11px] text-gray-300 font-extrabold">Yapılan Tüm Onarımlar 1 Yıl Garantilidir</p>
            </div>
          </div>

          {/* Sütun 2: Hızlı Linkler (Hizmetler) */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-gray-800 pb-2">
              Hizmetlerimiz & Hızlı Linkler
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              <button
                onClick={() => onNavClick('hizmetler')}
                className="text-left text-gray-400 hover:text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="Hizmetlerimiz bölümüne git"
              >
                <span>• Mekanik Bakım</span>
              </button>
              <button
                onClick={() => onNavClick('hizmetler')}
                className="text-left text-gray-400 hover:text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="Göçük düzeltme hizmetlerine git"
              >
                <span>• Boyasız Göçük Düzeltme</span>
              </button>
              <button
                onClick={() => onNavClick('hizmetler')}
                className="text-left text-gray-400 hover:text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="Oto kaporta ve boya işlemlerine git"
              >
                <span>• Fırınlı Oto Boya</span>
              </button>
              <button
                onClick={() => onNavClick('hizmetler')}
                className="text-left text-gray-400 hover:text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="Elektrik diyagnoz arıza teşhisine git"
              >
                <span>• Arıza Teşhis & Test</span>
              </button>
              <button
                onClick={() => onNavClick('hakkimizda')}
                className="text-left text-gray-400 hover:text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="Kurumsal hakkımızda sayfasına git"
              >
                <span>• Hakkımızda</span>
              </button>
              <button
                onClick={() => onNavClick('hasar-durumu')}
                className="text-left text-gray-400 hover:text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="Aracınızın tamir durumunu sorgulayın"
              >
                <span>• Hasar Durumu Sorgula</span>
              </button>
              <button
                onClick={() => onNavClick('yorumlar')}
                className="text-left text-gray-400 hover:text-[#D4AF37] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="Müşteri yorumlarına git"
              >
                <span>• Detaylı Yorumlar</span>
              </button>
              <button
                onClick={() => onNavClick('randevu-form')}
                className="text-left text-[#D4AF37] hover:text-[#F39C12] font-black uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
                aria-label="Kuponlu Randevu Formunu doldurun"
              >
                <span>• Online Randevu %10</span>
              </button>
            </div>
          </div>

          {/* Sütun 3: İletişim Bilgileri (Adres, Telefon, E-posta) ve Çalışma Saatleri */}
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider mb-3.5 border-b border-gray-800 pb-2">
                İletişim & Konum (Adana Seyhan)
              </h4>
              <div className="space-y-2.5 text-xs text-gray-300 font-semibold">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{CONTACT_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <a
                    href={`tel:${CONTACT_INFO.phoneE164}`}
                    className="hover:text-[#D4AF37] font-extrabold text-white text-xs sm:text-sm"
                    aria-label={`Turgutlar telefon numarası: ${CONTACT_INFO.phone}`}
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={15} className="text-[#D4AF37] shrink-0" aria-hidden="true" />
                  <a 
                    href={`mailto:${CONTACT_INFO.email}`} 
                    className="hover:text-[#D4AF37]"
                    aria-label={`E-posta gönder: ${CONTACT_INFO.email}`}
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Çalışma Saatleri Segment inside the third column */}
            <div className="pt-2 border-t border-gray-800/80">
              <h5 className="text-xs font-black text-white uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                <Clock size={13} className="text-[#D4AF37]" aria-hidden="true" />
                Mesaî Saatlerimiz
              </h5>
              <div className="space-y-1.5 text-xs text-gray-400 font-semibold">
                <div className="flex justify-between">
                  <span>Pazartesi - Cuma:</span>
                  <span className="font-extrabold text-white">{WORKING_HOURS.weekdays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cumartesi:</span>
                  <span className="font-extrabold text-white">{WORKING_HOURS.saturday}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span>Pazar Günü:</span>
                  <span className="text-red-500 font-extrabold bg-red-950/40 px-2 py-0.5 rounded-none border border-red-500/20 uppercase tracking-widest">{WORKING_HOURS.sunday}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & custom signatures */}
        <div className="border-t border-gray-800 pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-400">
          <p className="text-center sm:text-left">
            Turgutlar Oto Tamir Merkezi © {currentYear}. Tüm Hakları Saklıdır. | Adana Seyhan Oto Sanayi
          </p>
          <div className="flex items-center gap-3 text-gray-500 font-extrabold uppercase text-[9px] tracking-wider">
            <span>DÜRÜST HİZMET</span>
            <span>•</span>
            <span>ÖZGÜN ENTEGRASYON</span>
            <span>•</span>
            <span>%100 KUSURSUZ MÜŞTERİ MEMNUNİYETİ</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
