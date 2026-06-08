import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings } from 'lucide-react';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1 second timeout as requested before sliding/fading out seamlessly
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center pointer-events-auto select-none"
          id="turgutlar-preloader"
        >
          {/* Animated Centered Spinning Gears */}
          <div className="relative mb-5 flex items-center justify-center">
            
            {/* Outer rotating decorative spinner circle */}
            <div className="absolute w-20 h-20 border-2 border-dashed border-[#D4AF37] rounded-full animate-[spin_10s_linear_infinite]" />
            
            {/* Spinning main gear icon */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
              className="text-[#212529] z-10"
            >
              <Settings size={44} className="stroke-[1.5]" />
            </motion.div>
          </div>

          {/* Heading Logo text with letter spacing */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <h1 className="font-sans font-black tracking-[5px] text-sm uppercase text-[#212529]">
              TURGUTLAR
            </h1>
            <p className="text-[9px] font-bold text-[#F39C12] uppercase tracking-[4px] mt-1.5">
              OTO TAMİR MERKEZİ
            </p>
          </motion.div>

          {/* Bottom security assurance tags */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span>Adana Güvenilir Servis</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
