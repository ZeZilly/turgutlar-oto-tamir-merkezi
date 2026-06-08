import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Phone, Sparkles, CheckSquare, ShieldCheck, HeartHandshake, Wrench, Calendar } from 'lucide-react';

import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import ServicesSection from './components/ServicesSection';
import RepairStatusQuery from './components/RepairStatusQuery';
import InsurancePartners from './components/InsurancePartners';
import InsuranceSection from './components/InsuranceSection';
import AppointmentForm from './components/AppointmentForm';
import ReviewList from './components/ReviewList';
import FaqAccordion from './components/FaqAccordion';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Preloader from './components/Preloader';
import SchemaOrg from './components/SchemaOrg';

import { CONTACT_INFO } from './data';
import { Booking } from './types';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('periyodik-bakim');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Monitor page scroll to show button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    if (sectionId === 'root') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    // Instant smooth scroll directly to appointment form
    const element = document.getElementById('randevu-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNotificationMsg('Hizmet başarıyla seçildi! Randevu detaylarını doldurabilirsiniz.');
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  const handleBookingSuccess = (booking: Booking) => {
    setNotificationMsg(`Randevunuz Referans No: ${booking.id} ile başarıyla kaydedilmiştir!`);
    setTimeout(() => setNotificationMsg(null), 6000);
  };

  const handleScrollToBookingForm = () => {
    const element = document.getElementById('randevu-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToServices = () => {
    const element = document.getElementById('hizmetler');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] font-sans antialiased flex flex-col justify-between" id="app-root-container">

      {/* SEO: LocalBusiness/AutoRepair JSON-LD şeması (tek kaynak: data.ts) */}
      <SchemaOrg />

      
      {/* Dynamic Toast Notification alerts */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-6 left-4 right-4 sm:left-auto sm:right-6 z-50 bg-[#212529] text-white border-l-4 border-[#D4AF37] px-5 py-4 rounded-xl shadow-xl max-w-sm flex items-start gap-3"
            id="global-toast-notification"
          >
            <ShieldCheck className="text-[#D4AF37] shrink-0 mt-0.5" size={20} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">Sistem Bildirimi</p>
              <p className="text-xs font-semibold mt-1 leading-normal text-gray-200">{notificationMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Top Header Navigation */}
      <Header 
        onNavClick={handleNavClick} 
        onBookClick={handleScrollToBookingForm} 
      />

      {/* Hero Visual Area Section */}
      <main className="flex-grow">
        <Hero 
          onBookClick={handleScrollToBookingForm} 
          onExploreClick={handleScrollToServices} 
        />

        {/* Dynamic promotional row: Trust icons */}
        <div className="bg-[#FFFFFF] py-6 border-b border-gray-100 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#212529]">20+ Yıl</span>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                <Sparkles size={11} className="text-[#D4AF37]" /> Sektör Tecrübesi
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#212529]">1 Yıl Hakiki</span>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                <CheckSquare size={11} className="text-[#D4AF37]" /> İşçilik Garantisi
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#212529]">%10 On-Line</span>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                <HeartHandshake size={11} className="text-[#D4AF37]" /> Randevu İndirimi
              </span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-xl sm:text-2xl font-black text-[#212529]">30 Dakika</span>
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                <ShieldCheck size={11} className="text-[#D4AF37]" /> Hızlı Arıza Teşhisi
              </span>
            </div>

          </div>
        </div>

        {/* Corporate core details - About */}
        <About />

        {/* Interactive catalog with detail lists - Services */}
        <ServicesSection 
          onSelectServiceForBooking={handleSelectServiceForBooking} 
        />

        {/* Damage status check component */}
        <RepairStatusQuery />

        {/* Pure CSS infinite scrolling brand marquee */}
        <InsurancePartners />

        {/* Contracted insurance list - Hasar & Sigorta */}
        <InsuranceSection />

        {/* Live validation Form - Appointmentbooking */}
        <AppointmentForm 
          selectedServiceId={selectedServiceId}
          onBookingSuccess={handleBookingSuccess}
        />

        {/* Customer reviews and testimonials */}
        <ReviewList />

        {/* Collapsible FAQ accordion items */}
        <FaqAccordion />

      </main>

      {/* Standard bottom branding & Address contact details */}
      <Footer onNavClick={handleNavClick} />

      {/* Mobile Sticky Quick Action bar for instant accessibility */}
      <div className="fixed bottom-0 inset-x-0 bg-[#212529] border-t-2 border-[#D4AF37] text-white flex md:hidden justify-around items-center h-16 z-50 shadow-xl" aria-label="Hızlı Erişim">
        <button 
          onClick={() => handleNavClick('hizmetler')} 
          className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-[#D4AF37] cursor-pointer"
        >
          <Wrench size={18} />
          <span className="text-[10px] mt-1 font-bold">Hizmetler</span>
        </button>
        <button 
          onClick={() => handleNavClick('randevu-form')} 
          className="flex flex-col items-center justify-center w-full h-full text-[#D4AF37] cursor-pointer"
        >
          <div className="bg-[#D4AF37] text-[#212529] p-2.5 rounded-full -mt-6 border-4 border-[#212529] shadow-lg flex items-center justify-center">
            <Calendar size={18} />
          </div>
          <span className="text-[10px] mt-1 font-bold">Randevu</span>
        </button>
        <a
          href={`tel:${CONTACT_INFO.phoneE164}`}
          className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-[#D4AF37] cursor-pointer"
          aria-label="Bizi Arayın"
        >
          <Phone size={18} />
          <span className="text-[10px] mt-1 font-bold">Hemen Ara</span>
        </a>
      </div>

      {/* Floating WhatsApp and Scroll to Top tool */}
      <WhatsAppButton />

      {/* Intro Preloader Mask screen */}
      <Preloader />

      {/* Floating Scroll to Top tool */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => handleNavClick('root')}
            className="fixed bottom-36 sm:bottom-4 right-4 z-40 bg-[#212529] hover:bg-[#D4AF37] text-white hover:text-[#212529] p-3 rounded-full shadow-lg transition-colors border border-[#D4AF37]/50 cursor-pointer"
            aria-label="Yukarı Çık"
            id="scroll-to-top-btn"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
