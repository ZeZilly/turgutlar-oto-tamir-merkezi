import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  ShieldCheck,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Shield,
  Tag,
  ChevronRight,
  Settings
} from 'lucide-react';
import {
  CONTACT_INFO,
  WORKING_HOURS,
  INSURANCE_BADGES,
  SERVICE_TAGS,
  PROMISES,
  NAV_LINKS
} from '../data';
import { useActiveSection } from '../hooks/useActiveSection';

interface HeaderProps {
  onNavClick: (sectionId: string) => void;
  onBookClick: () => void;
}

// Promise ikon map (veri tarafında string-union, burada component map)
const PROMISE_ICONS = {
  shield: Shield,
  clock: Clock,
  tag: Tag,
  check: CheckCircle2
} as const;

export default function Header({ onNavClick, onBookClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Header'ın izlediği section id'leri (NAV_LINKS'ten türetilir)
  const sectionIds = useMemo(
    () => NAV_LINKS.map((n) => n.id).filter((id) => id !== 'root'),
    []
  );
  const { activeId, scrollProgress } = useActiveSection(sectionIds);

  // Body scroll lock mobil drawer açıkken
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Sticky gölge yoğunluğu
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavClick(id);
  };

  const isActive = (id: string) => {
    if (id === 'root') return activeId === null;
    return activeId === id;
  };

  // Marquee için listeyi 3 kez tekrarla (dikişsiz akış)
  const marqueeItems = useMemo(
    () => [...INSURANCE_BADGES, ...INSURANCE_BADGES, ...INSURANCE_BADGES],
    []
  );

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          KATMAN 1 — ÜST UTILITY BAR
          Adres + çalışma saati + hızlı aksiyon (WhatsApp / Telefon)
          Mobil: sadece tek satır kompakt; desktop: 3 sütun
         ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="bg-[#212529] text-[#F8F9FA] text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-[#D4AF37]/30 relative z-50"
        id="header-utility-bar"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Sol: Adres + Saat (mobilde sadece adres) */}
          <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                CONTACT_INFO.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-300 hover:text-[#D4AF37] transition-colors min-w-0"
              title="Yol tarifi al"
              aria-label="Adresimizi haritada aç"
            >
              <MapPin size={12} className="text-[#D4AF37] shrink-0" />
              <span className="font-semibold truncate">
                {CONTACT_INFO.city} / {CONTACT_INFO.region}
              </span>
            </a>
            <span className="hidden md:flex items-center gap-1.5 text-gray-300 font-semibold">
              <Clock size={12} className="text-[#D4AF37] shrink-0" />
              <span>Hft içi: {WORKING_HOURS.weekdays}</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-gray-300 font-semibold">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              <span>Şu an açık</span>
            </span>
          </div>

          {/* Sağ: Hızlı aksiyon (masaüstünde açık, mobilde kompakt) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href={`https://wa.me/${CONTACT_INFO.phoneE164}?text=${encodeURIComponent(
                'Merhaba, araç hasar/fiyat bilgisi almak istiyorum.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-gray-300 hover:text-[#25D366] font-bold transition-colors"
              aria-label="WhatsApp ile hızlı fiyat al"
            >
              <MessageCircle size={13} />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <span className="hidden sm:inline w-px h-3 bg-gray-700" />
            <a
              href={`tel:${CONTACT_INFO.phoneE164}`}
              className="flex items-center gap-1.5 text-[#D4AF37] hover:text-white font-black uppercase tracking-wider text-[10px] sm:text-[11px] transition-colors"
              aria-label={`Bizi arayın: ${CONTACT_INFO.phone}`}
            >
              <Phone size={12} className="stroke-[3px]" />
              <span className="hidden sm:inline">{CONTACT_INFO.phone}</span>
              <span className="sm:hidden">Ara</span>
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          KATMAN 2 — ANLAŞMALI SİGORTA MARQUEE BANDı
          12 gerçek marka yatay akar, hover'da durur.
          Mobil/desktop farkı: mobil gizli (yer kaplamaz)
         ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="hidden md:block bg-[#15181a] border-b border-[#D4AF37]/20 py-1.5 overflow-hidden relative"
        id="header-insurance-marquee"
        aria-label="Anlaşmalı sigorta şirketleri"
      >
        <style>{`
          @keyframes turgut-insurance-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
          .turgut-marquee-track {
            display: flex;
            width: max-content;
            animation: turgut-insurance-marquee 38s linear infinite;
            will-change: transform;
          }
          .turgut-marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        {/* Sol/sağ kenar yumuşak gradient maskesi */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#15181a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#15181a] to-transparent z-10 pointer-events-none" />

        <div className="flex items-stretch">
          {/* Sol etiket (statik) */}
          <div className="shrink-0 flex items-center gap-1.5 px-3 bg-[#212529] border-r border-[#D4AF37]/30 z-20 relative">
            <ShieldCheck size={12} className="text-[#D4AF37]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37]">
              Anlaşmalı
            </span>
          </div>

          {/* Marquee track */}
          <div className="flex-1 overflow-hidden">
            <div className="turgut-marquee-track items-center gap-1 px-2">
              {marqueeItems.map((badge, idx) => (
                <button
                  key={`${badge.name}-${idx}`}
                  onClick={() => handleLinkClick('hasar-sigorta')}
                  className="group flex items-center gap-2 px-3 py-1 mx-1.5 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#D4AF37] transition-all cursor-pointer shrink-0"
                  title={`${badge.name} anlaşmalı hasar servisi`}
                  aria-label={`${badge.name} anlaşmalı kurumlar bölümüne git`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: badge.accent }}
                    aria-hidden
                  />
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-gray-200 group-hover:text-white whitespace-nowrap">
                    {badge.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          KATMAN 3 — ANA STICKY HEADER
          Logo + Hizmet etiket chip'leri + Nav + CTA'lar
          Sticky, scroll-aware, aktif section vurgulamalı
         ═══════════════════════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-2xl border-b-4 border-[#D4AF37] py-1.5'
            : 'shadow-md border-b-2 border-[#D4AF37] py-2.5'
        }`}
        id="header-main"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between gap-3 lg:gap-6">
            {/* ── Logo + Marka ── */}
            <button
              onClick={() => handleLinkClick('root')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
              id="header-brand-logo"
              aria-label="Turgutlar ana sayfa"
            >
              <div className="bg-[#212529] p-1.5 sm:p-2 border-2 border-[#D4AF37] flex items-center justify-center relative group-hover:bg-[#D4AF37] transition-colors">
                <Settings
                  size={22}
                  className="text-[#D4AF37] group-hover:text-[#212529] transition-colors"
                  strokeWidth={2.5}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-[#D4AF37] group-hover:text-[#212529] tracking-tighter">
                  T
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <h1 className="text-base sm:text-lg font-black tracking-tighter text-[#212529] uppercase leading-none">
                  TURGUTLAR
                </h1>
                <p className="text-[9px] sm:text-[10px] font-black text-[#D4AF37] uppercase tracking-[2px] mt-1 leading-none">
                  Oto Tamir Merkezi
                </p>
              </div>
            </button>

            {/* ── Hizmet Etiket Şeridi (masaüstü, sadece orta+ ekran) ── */}
            <div
              className="hidden xl:flex items-center gap-1.5 flex-1 justify-center max-w-md"
              id="header-service-strip"
              aria-label="Hizmet etiketleri"
            >
              {SERVICE_TAGS.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-black uppercase tracking-wider text-[#212529]/70 border border-gray-200 px-2 py-1 bg-[#F8F9FA] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors cursor-default whitespace-nowrap"
                  title={tag}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* ── Desktop Navigasyon ── */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Ana navigasyon"
            >
              {NAV_LINKS.map((item) => {
                const active = isActive(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative px-2.5 py-2 text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer group ${
                      active
                        ? 'text-[#D4AF37]'
                        : 'text-[#212529]/95 hover:text-[#D4AF37]'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#D4AF37] transition-all duration-300 ${
                        active
                          ? 'w-full'
                          : 'w-0 group-hover:w-3/4'
                      }`}
                    />
                  </button>
                );
              })}
            </nav>

            {/* ── Desktop CTA'lar ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                onClick={onBookClick}
                className="text-[#212529]/80 hover:text-[#212529] font-black uppercase text-[11px] tracking-wider transition-colors select-none cursor-pointer flex items-center gap-1"
                aria-label="Randevu formuna git"
              >
                <Calendar size={12} />
                <span>Randevu</span>
              </button>
              <a
                href={`tel:${CONTACT_INFO.phoneE164}`}
                className="bg-[#D4AF37] hover:bg-[#212529] text-[#212529] hover:text-[#F8F9FA] px-3 lg:px-4 py-2 lg:py-2.5 font-black text-[11px] uppercase tracking-widest transition-all duration-300 border-2 border-[#D4AF37] hover:border-[#212529] shadow-lg shadow-amber-500/10 flex items-center gap-1.5 select-none"
                id="header-cta-call-btn"
                aria-label="Hemen ara"
              >
                <Phone size={12} className="stroke-[3px]" />
                <span className="hidden xl:inline">Hemen Ara</span>
                <span className="xl:hidden">Ara</span>
              </a>
            </div>

            {/* ── Mobil Aksiyonlar (tel + menü) ── */}
            <div className="lg:hidden flex items-center gap-2 shrink-0">
              <a
                href={`tel:${CONTACT_INFO.phoneE164}`}
                className="p-2 bg-[#D4AF37] text-[#212529] hover:bg-[#212529] hover:text-[#F8F9FA] transition-colors"
                aria-label="Ara"
              >
                <Phone size={15} className="stroke-[3px]" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="p-2 bg-[#212529] text-white border border-[#212529] hover:border-[#D4AF37] transition-colors"
                aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={isMobileMenuOpen}
                id="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress bar (sayfa ne kadar aşağı kaydırıldı) */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F39C12] to-[#D4AF37] transition-opacity"
          style={{
            width: `${scrollProgress * 100}%`,
            opacity: isScrolled ? 1 : 0
          }}
          aria-hidden
        />
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          KATMAN 4 — MOBİL DRAWER (Gelişmiş)
          Navigasyon + Hizmet etiketleri + Çalışma saatleri + Sigorta
         ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50 lg:hidden"
              aria-hidden
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed right-0 top-0 bottom-0 w-[88vw] max-w-sm bg-white shadow-2xl z-50 flex flex-col lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobil gezinme menüsü"
              id="mobile-drawer"
            >
              {/* Drawer başlığı */}
              <div className="flex items-center justify-between p-4 border-b-2 border-[#D4AF37] bg-[#212529] text-white">
                <div className="flex items-center gap-2.5">
                  <div className="bg-[#D4AF37] p-1.5">
                    <Settings size={18} className="text-[#212529]" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-wider">
                      TURGUTLAR
                    </h2>
                    <p className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">
                      Oto Tamir & Servis
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/10 transition-colors"
                  aria-label="Menüyü kapat"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scroll içerik */}
              <div className="flex-1 overflow-y-auto">
                {/* Navigasyon linkleri */}
                <nav className="py-2" aria-label="Mobil navigasyon">
                  {NAV_LINKS.map((item) => {
                    const active = isActive(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleLinkClick(item.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`w-full flex items-center justify-between text-left px-4 py-3 font-black uppercase text-xs tracking-wider border-l-2 transition-all ${
                          active
                            ? 'bg-[#F8F9FA] text-[#D4AF37] border-[#D4AF37]'
                            : 'text-[#212529] border-transparent hover:bg-[#F8F9FA] hover:text-[#D4AF37] hover:border-[#D4AF37]'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight
                          size={14}
                          className={active ? 'text-[#D4AF37]' : 'text-gray-400'}
                        />
                      </button>
                    );
                  })}
                </nav>

                {/* Hizmet etiket chip'leri */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">
                    Hizmetlerimiz
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {SERVICE_TAGS.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleLinkClick('hizmetler')}
                        className="text-[10px] font-bold uppercase tracking-wider text-[#212529] border border-gray-300 px-2 py-1 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Çalışma saatleri */}
                <div className="px-4 py-3 border-t border-gray-100 bg-[#F8F9FA]">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <Clock size={11} className="text-[#D4AF37]" />
                    Çalışma Saatleri
                  </h3>
                  <ul className="space-y-1 text-[11px] font-semibold text-[#212529]">
                    <li className="flex justify-between">
                      <span>Pzt - Cum:</span>
                      <span className="font-black">{WORKING_HOURS.weekdays}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cmt:</span>
                      <span className="font-black">{WORKING_HOURS.saturday}</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Pzr:</span>
                      <span className="text-red-600 font-black bg-red-50 border border-red-200 px-2 py-0.5 uppercase text-[10px]">
                        {WORKING_HOURS.sunday}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Adres */}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    CONTACT_INFO.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 px-4 py-3 border-t border-gray-100 hover:bg-[#F8F9FA] transition-colors"
                >
                  <MapPin size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      Adresimiz
                    </p>
                    <p className="text-[11px] font-bold text-[#212529] leading-snug">
                      {CONTACT_INFO.address}
                    </p>
                  </div>
                </a>

                {/* Müşteri vaatleri (kompakt) */}
                <div className="px-4 py-3 border-t border-gray-100">
                  <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={11} className="text-[#D4AF37]" />
                    Neden Biz?
                  </h3>
                  <ul className="space-y-1.5">
                    {PROMISES.map((p) => {
                      const Icon = PROMISE_ICONS[p.icon];
                      return (
                        <li
                          key={p.text}
                          className="flex items-start gap-2 text-[11px] text-[#212529] font-semibold leading-snug"
                        >
                          <Icon
                            size={11}
                            className="text-[#D4AF37] mt-0.5 shrink-0"
                          />
                          <span>{p.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Drawer alt CTA'lar */}
              <div className="p-4 border-t-2 border-[#D4AF37] bg-white grid grid-cols-2 gap-2">
                <a
                  href={`tel:${CONTACT_INFO.phoneE164}`}
                  className="flex items-center justify-center gap-1.5 bg-[#D4AF37] hover:bg-[#212529] text-[#212529] hover:text-white py-3 font-black uppercase text-[11px] tracking-widest transition-all"
                  aria-label="Hemen ara"
                >
                  <Phone size={13} className="stroke-[3px]" />
                  Hemen Ara
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="bg-[#212529] hover:bg-[#D4AF37] text-white hover:text-[#212529] py-3 font-black uppercase text-[11px] tracking-widest transition-all flex items-center justify-center gap-1.5"
                  id="mobile-drawer-cta"
                >
                  <Calendar size={13} />
                  Randevu Al
                </button>
              </div>

              {/* Footer imza */}
              <div className="bg-[#212529] text-center py-2 text-[9px] uppercase tracking-widest font-bold">
                <span className="text-[#D4AF37]">Seyhan Şubesi</span>
                <span className="text-gray-500 mx-2">•</span>
                <span className="text-gray-400">Adana</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
