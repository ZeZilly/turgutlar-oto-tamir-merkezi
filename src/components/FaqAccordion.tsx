import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQS, CONTACT_INFO } from '../data';

export default function FaqAccordion() {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  return (
    <section id="sss" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block mb-2">Sıkça Sorulanlar</span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212529]">
            Aklınıza Takılan Popüler Sorular
          </h2>
          <div className="geometric-line-indicator mx-auto mt-3" />
          <p className="text-gray-500 font-medium mt-3 text-xs sm:text-sm">
            Aracınızın tamir süreci, garanti kapsamları, parça tedariği ve ödeme planları hakkında en merak edilen detayları derledik.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-[#F8F9FA] rounded-none border-2 transition-all ${
                  isOpen ? 'border-[#212529] bg-white' : 'border-gray-200'
                }`}
              >
                {/* Header click */}
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-0 select-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle size={18} className="text-[#D4AF37] shrink-0" />
                    <span className="text-[#212529] font-black uppercase text-xs tracking-wider">
                      {faq.question}
                    </span>
                  </div>
                  <div>
                    <ChevronDown
                      size={18}
                      className={`text-[#212529] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#F39C12]' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed border-t-2 border-gray-100 bg-white/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Extra Hotline Banner */}
        <div className="mt-12 bg-[#212529] text-white p-6 rounded-none flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-l-8 border-l-[#D4AF37] border-black shadow-lg">
          <div className="text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-black uppercase tracking-wider text-white mb-1">
              Aradığınız Soruyu Bulamadınız mı?
            </h4>
            <p className="text-[11px] text-gray-400 font-semibold leading-relaxed">
              Dükkan sahibi Ahmet Turgut Ustamız ile veya direkt ofisimizle iletişime geçip özel teknik bilgi alabilirsiniz.
            </p>
          </div>
          <a
            href={`tel:${CONTACT_INFO.phoneE164}`}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-white text-[#212529] hover:text-[#212529] py-3.5 px-6 rounded-none font-black uppercase text-xs tracking-widest transition-all border-2 border-transparent hover:border-[#212529] cursor-pointer"
          >
            <PhoneCall size={14} />
            Hemen Bizi Arayın
          </a>
        </div>

      </div>
    </section>
  );
}
