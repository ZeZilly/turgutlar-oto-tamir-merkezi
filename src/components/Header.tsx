import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Clock, Menu, X, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, WORKING_HOURS } from '../data';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  onBookClick: () => void;
}

export default function Header({ onNavClick, onBookClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Ana Sayfa', id: 'root' },
    { label: 'Hakkımızda', id: 'hakkimizda' },
    { label: 'Hizmetlerimiz', id: 'hizmetler' },
    { label: 'Hasar / Sigorta', id: 'hasar-sigorta' },
    { label: 'İletişim', id: 'iletisim' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(id);
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#212529] text-[#F8F9FA] text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center font-semibold">
            <span className="flex items-center gap-1.5 text-gray-300">
              <MapPin size={13} className="text-[#D4AF37]" />
              {CONTACT_INFO.address}
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock size={13} className="text-[#D4AF37]" />
              Cmt: {WORKING_HOURS.saturday} | Pzr: {WORKING_HOURS.sunday}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-[#D4AF37] uppercase tracking-wider text-[10px]">
              <ShieldCheck size={13} /> Bilgisayarlı Arıza Tespit & Anlaşmalı Hasar Servisi
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`sticky top-0 z-50 bg-[#FFFFFF] transition-all duration-300 ${
        isScrolled 
          ? 'shadow-xl border-b-4 border-[#D4AF37] py-2' 
          : 'shadow-md border-b-2 border-[#D4AF37] py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand / Turgutlar Oto Tamir */}
          <div 
            onClick={() => handleLinkClick('root')} 
            className="flex items-center gap-3 cursor-pointer select-none"
            id="header-brand-logo"
          >
            <div className="bg-[#212529] text-white p-2.5 rounded-none border-2 border-[#D4AF37] flex items-center justify-center font-black">
              <span className="text-xl tracking-widest text-[#D4AF37]">T</span>
              <span className="text-xl text-white">O</span>
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tighter text-[#212529] flex items-center gap-1 uppercase leading-none">
                TURGUTLAR
              </h1>
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[2px] mt-1.5 leading-none">
                OTO TAMİR MERKEZİ
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="text-xs font-black uppercase tracking-wider text-[#212529]/95 hover:text-[#D4AF37] transition-all relative py-1.5 group select-none cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Golden highlight CTA Call Button & Quick Appointment */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={onBookClick}
              className="text-[#212529]/80 hover:text-[#212529] font-black uppercase text-[11px] tracking-wider transition-colors select-none cursor-pointer"
            >
              Randevu Al
            </button>
            <a
              href={`tel:${CONTACT_INFO.phoneE164}`}
              className="bg-[#D4AF37] hover:bg-[#212529] text-[#212529] hover:text-[#F8F9FA] px-5 py-3 rounded-none font-black text-xs uppercase tracking-widest transition-all duration-300 border-2 border-[#D4AF37] hover:border-[#212529] shadow-lg shadow-amber-500/10 flex items-center gap-2 select-none"
              id="header-cta-call-btn"
            >
              <Phone size={13} className="stroke-[3px]" />
              Hemen Ara
            </a>
          </div>

          {/* Mobile Actions and Hamburger Toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <a
              href={`tel:${CONTACT_INFO.phoneE164}`}
              className="p-2.5 bg-[#D4AF37] border border-[#D4AF37] rounded-none text-[#212529] hover:bg-[#212529] hover:text-[#F8F9FA] transition-colors"
              aria-label="Ara"
            >
              <Phone size={16} />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 bg-[#212529] text-white rounded-none focus:outline-none border border-[#212529] hover:border-[#D4AF37] transition-colors"
              aria-label="Menü Aç"
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black"
            />
            
            {/* Sidebar content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4 mb-6">
                  <div>
                    <h2 className="text-base font-black uppercase text-[#212529] tracking-wider">TURGUTLAR</h2>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Oto Tamir & Servis</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-400 hover:text-[#212529] hover:bg-gray-100 rounded-none transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex flex-col gap-3">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className="text-left py-3 px-4 rounded-none text-[#212529] hover:bg-[#F8F9FA] hover:text-[#D4AF37] font-black uppercase text-xs tracking-wider border-l-2 border-transparent hover:border-[#D4AF37] transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t-2 border-gray-100 bg-[#F8F9FA] flex flex-col gap-4">
                <a
                  href={`tel:${CONTACT_INFO.phoneE164}`}
                  className="flex items-center justify-center gap-2 w-full text-center bg-[#D4AF37] hover:bg-[#212529] text-[#212529] hover:text-white py-3.5 rounded-none font-black uppercase text-xs tracking-widest transition-all border-2 border-transparent"
                >
                  <Phone size={14} className="stroke-[3px]" />
                  Ustayayı Hemen Ara
                </a>
                
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full bg-[#212529] hover:bg-[#D4AF37] text-white hover:text-[#212529] py-3.5 rounded-none font-black uppercase text-xs tracking-widest transition-all border-2 border-transparent hover:border-[#212529]"
                  id="mobile-drawer-cta"
                >
                  On-Line Randevu Al
                </button>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center">
                  Seyhan Şubesi • Adana
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
