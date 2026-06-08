import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // İletişim numarası tek kaynaktan (data.ts) çekilir
  const message = encodeURIComponent(
    'Merhaba, aracımın hasar durumu/fiyatı hakkında bilgi almak istiyorum.'
  );
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.phoneE164}?text=${message}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-[#212529] text-white text-xs font-black uppercase tracking-widest px-4 py-2.5 border-2 border-black shadow-2xl relative select-none whitespace-nowrap"
          >
            Hızlı Fiyat Al!
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#212529] border-t-2 border-r-2 border-black rotate-45 transform" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.45)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.6)] hover:bg-[#20ba5a] transition-all duration-300 border-2 border-white focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 cursor-pointer"
        aria-label={`WhatsApp üzerinden Turgutlar Oto Servis ile iletişime geç (${CONTACT_INFO.phone})`}
        id="whatsapp-floating-btn"
      >
        <MessageCircle size={28} className="fill-white" />
      </motion.a>
    </div>
  );
}
