import { motion } from 'motion/react';
import { Wrench, Settings, Sparkles, Cpu, Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  
  // Icon selector map
  const renderIcon = (id: string) => {
    const iconProps = { className: "text-[#D4AF37]", size: 26 };
    switch (id) {
      case 'mekanik-elektrik':
        return <Wrench {...iconProps} />;
      case 'periyodik-bakim':
        return <Settings {...iconProps} />;
      case 'kaporta-boya':
        return <Sparkles {...iconProps} />;
      case 'ariza-tespiti':
        return <Cpu {...iconProps} />;
      case 'motor-revizyonu':
        return <Wrench {...iconProps} />;
      case 'sanziman-tamiri':
        return <Settings {...iconProps} />;
      default:
        return <Wrench {...iconProps} />;
    }
  };

  return (
    <section id="hizmetler" className="py-16 sm:py-24 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block mb-2">Hizmetlerimiz</span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212529]">
            Profesyonel Oto Servis Hizmetlerimiz
          </h2>
          <div className="geometric-line-indicator mx-auto mt-4" />
          <p className="text-gray-500 font-medium mt-4 text-xs sm:text-sm leading-relaxed">
            Aracınızın markası ve modeli ne olursa olsun, en üstün teknolojik ekipmanlarımız ve dürüst esnaflık ahlakımızla tüm sorunlarınıza garantili ve adil çözümler üretiyoruz.
          </p>
        </div>

        {/* 3-Column Responsive CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-[#F8F9FA] p-6 sm:p-8 flex flex-col justify-between border-2 border-black hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-2xl relative group"
            >
              {/* Card Label Tag */}
              <div className="absolute top-0 right-0 bg-[#212529] group-hover:bg-[#D4AF37] group-hover:text-[#212529] text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 border-b-2 border-l-2 border-black transition-colors">
                {service.category === 'elektronik' ? 'Elektronik' : service.category === 'bakim' ? 'Bakım' : 'Mekanik'}
              </div>

              <div>
                {/* Icon Container */}
                <div className="p-3 bg-[#212529] w-fit border-2 border-[#D4AF37] mb-6 flex items-center justify-center">
                  {renderIcon(service.id)}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-black uppercase text-[#212529] tracking-tight mb-2.5 group-hover:text-[#F39C12] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 font-semibold mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Checklist Bullet Points */}
                <div className="space-y-2 border-t border-gray-200/80 pt-4 mb-6">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-left">
                      <div className="p-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-none shrink-0 mt-0.5">
                        <Check size={10} className="stroke-[3.5px]" />
                      </div>
                      <span className="text-[11.5px] font-semibold text-gray-700 leading-normal">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Tag & Booking Button Footer */}
              <div className="border-t-2 border-dashed border-gray-300 pt-5 mt-2">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Öngörülen Ücret</span>
                  <span className="text-xs font-black text-emerald-600 uppercase bg-emerald-50 px-2 py-0.5 border border-emerald-200">{service.priceEst}</span>
                </div>

                <button
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#212529] group-hover:bg-[#D4AF37] text-white group-hover:text-[#212529] py-3.5 rounded-none font-black uppercase text-[10px] tracking-widest transition-all duration-300 border border-transparent select-none cursor-pointer"
                  id={`services-grid-book-${service.id}`}
                >
                  <span>Randevu Al</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
