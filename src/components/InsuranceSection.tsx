import { ShieldCheck, FileText, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function InsuranceSection() {
  const partners = [
    { name: 'Allianz Sigorta', type: 'Anlaşmalı Kasko & Trafik' },
    { name: 'Anadolu Sigorta', type: 'Anlaşmalı Kasko & Trafik' },
    { name: 'Axa Sigorta', type: 'Anlaşmalı Kasko' },
    { name: 'Sompo Sigorta', type: 'Anlaşmalı Kasko & Trafik' },
    { name: 'Mapfre Sigorta', type: 'Anlaşmalı Akreditasyon' },
    { name: 'AkSigorta', type: 'Anlaşmalı Kasko' }
  ];

  const steps = [
    {
      title: 'Tutanak Tutun',
      desc: 'Kazadan sonra karşı tarafla ıslak imzalı kaza tespit tutanağını doldurun ve fotoğraflar çekin.'
    },
    {
      title: 'Bizi Arayın',
      desc: 'Aracınızı sanayiye çekmeden önce doğrudan bizi arayarak ücretsiz çekici desteği talep edin.'
    },
    {
      title: 'Dosya İşlemleri',
      desc: 'Evraklarınızı bize teslim ettikten sonra sigorta hasar dosyanızı biz açıyor ve takip ediyoruz.'
    },
    {
      title: 'Orijinal Onarım',
      desc: 'Aracınız parçalarından boyasına kadar orijinal standartlarda onarılıp sıfır maliyetle teslim edilir.'
    }
  ];

  return (
    <section id="hasar-sigorta" className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block mb-2">Hasar & Sigorta</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#212529]">
            Anlaşmalı Kurumlar ve Hasar Onarım Merkezi
          </h2>
          <div className="geometric-line-indicator mx-auto mt-4" />
          <p className="text-gray-500 font-medium mt-4 text-xs sm:text-sm leading-relaxed">
            Turgutlar Oto Servis olarak, kazaya karışan araçlarınızın hasar tespiti, sigorta ve kasko onay süreçlerini uzman ekibimizle baştan sona yönetiyor, sizi bürokrasiden kurtarıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Anlaşmalı Sigortalar List */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8F9FA] p-6 sm:p-8 border-2 border-black relative">
            <div className="absolute top-0 right-0 bg-[#D4AF37] text-[#212529] font-black text-[9px] uppercase tracking-widest px-4 py-1 border-b-2 border-l-2 border-black">
              Hızlı İşlem
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase text-[#212529] mb-3 flex items-center gap-2">
                <ShieldCheck size={20} className="text-[#D4AF37]" />
                Anlaşmalı Kurumlar
              </h3>
              <p className="text-xs text-gray-500 font-semibold mb-6">
                Aşağıdaki anlaşmalı sigorta şirketleri ve kasko firmaları üzerinden hasar dosyalarınız ücretsiz ikame araç desteğiyle hızlıca onaylatılır.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {partners.map((partner, index) => (
                  <div key={index} className="bg-white p-3 border border-gray-200 hover:border-[#D4AF37] transition-all flex flex-col justify-center">
                    <span className="text-xs font-black uppercase text-[#212529] block">
                      {partner.name}
                    </span>
                    <span className="text-[10px] text-[#F39C12] font-bold uppercase tracking-wider block mt-0.5">
                      {partner.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-[#D4AF37] border-r border-t border-b border-[#D4AF37]/20 p-4 text-xs">
              <span className="font-bold text-amber-900 block mb-1">💡 Diğer Anlaşmalar:</span>
              <p className="text-amber-800 leading-normal font-medium">
                Sigortanız yukarıda listelenmese dahi tüm kasko firmaları ve trafik sigortaları ile ikili servis protokollerimiz ve hukuki danışmanlık ortaklığımız kapsamında işlemlerinizi yürütmekteyiz.
              </p>
            </div>
          </div>

          {/* Hasar Sonrası Süreç Kartları */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h3 className="text-lg sm:text-xl font-black uppercase text-[#212529] mb-3 flex items-center gap-2">
                <FileText size={20} className="text-[#F39C12]" />
                Hasar Süreci Nasıl İşler?
              </h3>
              <p className="text-xs text-gray-400 font-semibold mb-6">
                Kazadan sonra yapmanız gereken temel adımlar ve Turgutlar Oto Servis ekibinin sağladığı kolaylıklar:
              </p>

              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 border-2 border-gray-100 hover:border-[#212529] transition-all">
                    <div className="w-8 h-8 rounded-none border-2 border-black bg-[#212529] text-white flex items-center justify-center font-black text-xs shrink-0">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-wide text-[#212529] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between bg-[#212529] text-white p-5 gap-4">
              <div>
                <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block">7/24 ACİL DESTEK</span>
                <span className="text-xs font-semibold text-gray-300">Sanayide kaza anında evrak sorma veya çekici için hemen arayın.</span>
              </div>
              <a
                href={`tel:${CONTACT_INFO.phoneE164}`}
                className="bg-[#D4AF37] hover:bg-white text-[#212529] hover:text-[#212529] text-xs font-black uppercase tracking-widest py-3 px-5 whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone size={14} className="animate-pulse" />
                Hasar Destek Hareketi
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
