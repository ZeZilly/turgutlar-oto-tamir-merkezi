import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, Car, FileText, CheckCircle2, ChevronRight, AlertCircle, RefreshCw, Wrench } from 'lucide-react';
import { SERVICES, CONTACT_INFO } from '../data';
import { Booking } from '../types';

interface AppointmentFormProps {
  selectedServiceId: string;
  onBookingSuccess: (booking: Booking) => void;
}

export default function AppointmentForm({ selectedServiceId, onBookingSuccess }: AppointmentFormProps) {
  // Bugün + 1 gün (yyyy-aa-gg) formatında dinamik varsayılan tarih
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  // Bugünün tarihi (date input min değeri için)
  const todayIso = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    plate: '',
    carBrandModel: '',
    serviceId: selectedServiceId || SERVICES[0].id,
    date: defaultDate,
    timeSlot: '10:00',
    note: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Sync selected service when prop changes
  useEffect(() => {
    if (selectedServiceId) {
      setFormData(prev => ({ ...prev, serviceId: selectedServiceId }));
    }
  }, [selectedServiceId]);

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Simple plate validation rules (e.g., Turkish plate pattern format)
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Ad Soyad alanı boş bırakılamaz.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası boş bırakılamaz.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz (örn: 5321234567).';
    }
    if (!formData.plate.trim()) {
      newErrors.plate = 'Araç plakası girilmelidir.';
    } else {
      const cleanPlate = formData.plate.toUpperCase().replace(/\s+/g, '');
      if (!/^\d{2}[A-Z]{1,3}\d{2,4}$/.test(cleanPlate)) {
        newErrors.plate = 'Geçerli bir plaka formatı olmalıdır (örn: 01ABC123 veya 01A1234)';
      }
    }
    if (!formData.carBrandModel.trim()) newErrors.carBrandModel = 'Araç marka ve modelini belirtiniz.';
    if (!formData.date) newErrors.date = 'Randevu tarihi seçilmelidir.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate server side request for instant real-time feel
    setTimeout(() => {
      const referenceId = `TR-${Math.floor(100000 + Math.random() * 900000)}`;
      const booking: Booking = {
        id: referenceId,
        customerName: formData.customerName,
        phone: formData.phone,
        plate: formData.plate.toUpperCase().trim(),
        carBrandModel: formData.carBrandModel,
        serviceId: formData.serviceId,
        date: formData.date,
        timeSlot: formData.timeSlot,
        status: 'onaylandi',
        note: formData.note
      };
      
      setSuccessBooking(booking);
      onBookingSuccess(booking);
      setIsSubmitting(false);
    }, 1200);
  };

  const selectedServiceDetails = SERVICES.find(s => s.id === formData.serviceId);

  if (successBooking) {
    const serviceObj = SERVICES.find(s => s.id === successBooking.serviceId);
    return (
      <div className="bg-white p-6 sm:p-10 rounded-none border-2 border-b-8 border-b-emerald-600 border-emerald-500 shadow-2xl max-w-2xl mx-auto text-center" id="booking-success-box">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-none flex items-center justify-center mx-auto mb-6 border-2 border-emerald-300"
        >
          <CheckCircle2 size={36} />
        </motion.div>

        <h3 className="text-xl sm:text-2xl font-black uppercase text-[#212529] mb-2">Randevunuz Başarıyla Alındı!</h3>
        <p className="text-gray-500 text-sm font-semibold mb-6">
          Gerekli tüm onaylar ve indirim kuponunuz plakanıza tanımlanmıştır.
        </p>

        {/* Dynamic Ticket */}
        <div className="bg-[#F8F9FA] border-2 border-gray-300 p-5 rounded-none text-left space-y-4 mb-6 relative overflow-hidden">
          {/* Ticket styling accents */}
          <div className="absolute right-0 -top-12 opacity-5 text-gray-800 pointer-events-none select-none font-bold text-7xl">
            {successBooking.plate}
          </div>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-dashed border-gray-300 text-xs text-gray-500">
            <div>
              <span className="block font-black uppercase text-[9px] tracking-wider text-gray-400">REFERANS NO</span>
              <span className="text-sm font-extrabold text-[#212529]" id="success-reference">{successBooking.id}</span>
            </div>
            <div className="text-right">
              <span className="block font-black uppercase text-[9px] tracking-wider text-gray-400">DURUM</span>
              <span className="inline-block bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-none font-bold text-xs uppercase border border-emerald-200">Onaylandı</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">MÜŞTERİ BİLGİSİ</p>
              <p className="font-bold text-[#212529]">{successBooking.customerName}</p>
              <p className="font-semibold text-gray-500 text-xs">{successBooking.phone}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">ARAÇ / PLAKA</p>
              <p className="font-bold text-[#212529]">{successBooking.carBrandModel}</p>
              <p className="font-extrabold text-[#D4AF37] tracking-wider text-xs">{successBooking.plate}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">HİZMET TÜRÜ</p>
              <p className="font-bold text-gray-800">{serviceObj?.title || 'Genel Bakım'}</p>
            </div>
            <div>
              <p className="text-[9px] uppercase font-black text-gray-400 block tracking-wider">TARİH & SAAT</p>
              <p className="font-bold text-gray-800 flex items-center gap-1.5">
                {successBooking.date} / {successBooking.timeSlot}
              </p>
            </div>
          </div>

          {successBooking.note && (
            <div className="bg-white border-2 border-gray-200 p-3 rounded-none text-xs text-gray-600 block leading-relaxed">
              <strong>Müşteri Notu:</strong> "{successBooking.note}"
            </div>
          )}
        </div>

        <div className="bg-amber-50 border-l-4 border-l-[#D4AF37] border-r border-t border-b border-[#D4AF37]/20 text-[#212529] p-4 rounded-none text-xs font-semibold text-left space-y-1 mb-8 leading-relaxed">
          <p className="font-black text-[#212529] uppercase tracking-wider text-[11px]">📌 Lütfen Dikkat Edin:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 font-semibold leading-relaxed">
            <li>Lütfen randevu saatinizden 10 dakika önce Seyhan şubemizde olunuz.</li>
            <li>Randevunuzu ertelemek veya iptal etmek isterseniz ücretsiz deaktif etmek için bizi <strong>{formData.phone ? formData.phone : CONTACT_INFO.phone}</strong> numaramızdan doğrudan arayabilirsiniz.</li>
            <li>Sitemize özel %10 indirim ödeme aşamasında faturanıza otomatik yansıtılacaktır.</li>
          </ul>
        </div>

        <button
          onClick={() => {
            setFormData(prev => ({
              ...prev,
              customerName: '',
              phone: '',
              plate: '',
              carBrandModel: '',
              note: ''
            }));
            setSuccessBooking(null);
          }}
          className="inline-flex items-center gap-2 bg-[#212529] hover:bg-[#D4AF37] text-white hover:text-[#212529] px-6 py-[1.125rem] rounded-none font-black uppercase text-xs tracking-widest transition-all border-2 border-transparent hover:border-[#212529]"
        >
          Yeni Randevu Oluştur
          <RefreshCw size={14} />
        </button>
      </div>
    );
  }

  return (
    <section id="randevu-form" className="py-16 sm:py-24 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block mb-2">Hızlı Randevu</span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#212529] tracking-tight">
            1 Dakikada Servis Randevunuzu Oluşturun
          </h2>
          <div className="geometric-line-indicator mx-auto mt-3" />
          <p className="text-gray-500 font-medium mt-3 text-xs sm:text-sm">
            Lütfen aşağıdaki bilgileri eksiksiz doldurunuz. Adana Seyhan şubemizdeki uzmanlarımız en kısa sürede hazırlıklarını tamamlayacaktır.
          </p>
        </div>

        {/* Input Form Body */}
        <div className="bg-[#F8F9FA] p-6 sm:p-10 rounded-none border-2 border-[#212529] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-name">
                  <User size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  Ad Soyad *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ahmet Yılmaz"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    aria-label="Ad Soyad"
                    aria-describedby="label-name"
                    className={`w-full px-4 py-3 bg-white border-2 rounded-none text-sm font-semibold transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)] ${
                      errors.customerName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.customerName && (
                  <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.customerName}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-phone">
                  <Phone size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Örn: 5321234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  aria-label="Telefon Numarası"
                  aria-describedby="label-phone"
                  className={`w-full px-4 py-3 bg-white border-2 rounded-none text-sm font-semibold transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)] ${
                    errors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                />
                <p className="text-[10px] text-gray-400 mt-1">Başında 0 olmadan 10 hane giriniz.</p>
                {errors.phone && (
                  <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Vehicle License Plate */}
              <div>
                <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-plate">
                  <Car size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  Araç Plakası *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 01ABC123"
                  value={formData.plate}
                  onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                  aria-label="Araç Plakası"
                  aria-describedby="label-plate"
                  className={`w-full px-4 py-3 bg-white border-2 rounded-none text-sm font-bold placeholder:font-normal uppercase tracking-wider transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)] ${
                    errors.plate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.plate && (
                  <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.plate}
                  </p>
                )}
              </div>

              {/* Car Brand / Model */}
              <div>
                <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-brand">
                  <Car size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  Araç Marka / Model *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2018 Opel Astra"
                  value={formData.carBrandModel}
                  onChange={(e) => setFormData({ ...formData, carBrandModel: e.target.value })}
                  aria-label="Araç Marka ve Model"
                  aria-describedby="label-brand"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-none text-sm font-semibold transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                />
                {errors.carBrandModel && (
                  <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.carBrandModel}
                  </p>
                )}
              </div>

              {/* Service Select Type */}
              <div>
                <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-service">
                  <Wrench size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  Yapılacak Servis / İşlem *
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  aria-label="Yapılacak Servis İşlem"
                  aria-describedby="label-service"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-none text-sm font-bold text-gray-800 transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id} className="font-semibold text-gray-800">
                      {s.title} ({s.priceEst})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date selection Grid */}
              <div className="grid grid-cols-2 gap-3">
                
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-date">
                    <Calendar size={13} className="text-[#D4AF37]" aria-hidden="true" />
                    Tarih *
                  </label>
                  <input
                    type="date"
                    required
                    min={todayIso}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    aria-label="Randevu Tarihi"
                    aria-describedby="label-date"
                    className="w-full px-3 py-3 bg-white border-2 border-gray-300 rounded-none text-xs sm:text-sm font-bold text-gray-800 transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                  />
                </div>

                {/* Hour Select Grid slots */}
                <div>
                  <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-time">
                    <Clock size={13} className="text-[#D4AF37]" aria-hidden="true" />
                    Saat Dilimi *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    aria-label="Randevu Saati"
                    aria-describedby="label-time"
                    className="w-full px-3 py-3 bg-white border-2 border-gray-300 rounded-none text-xs sm:text-sm font-bold text-gray-800 transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                  >
                    {timeSlots.map(timeObj => (
                      <option key={timeObj} value={timeObj}>{timeObj}</option>
                    ))}
                  </select>
                </div>

              </div>

            </div>

            {/* General Description Note */}
            <div>
              <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-note">
                <FileText size={13} className="text-[#D4AF37]" aria-hidden="true" />
                Şikayetiniz / Talebiniz
              </label>
              <textarea
                rows={3}
                placeholder="Örn: Klimam bazen sıcak üflüyor, sol frenden gıcırtı şeklinde ses geliyor..."
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                aria-label="Şikayetiniz veya Talebiniz"
                aria-describedby="label-note"
                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-none text-sm font-semibold transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
              />
            </div>

            {/* Dynamic Details preview based on selected service */}
            {/* {selectedServiceDetails && ( */}
            {selectedServiceDetails && (
              <div className="bg-amber-50 border-l-4 border-l-[#D4AF37] border-r border-t border-b border-[#212529]/10 p-4 rounded-none">
                <p className="text-xs text-amber-900 font-bold mb-1 uppercase tracking-wider">
                  Seçilen Servis Garantisi:
                </p>
                <p className="text-[11px] text-amber-800 font-semibold leading-relaxed">
                  ✓ <strong>{selectedServiceDetails.title}</strong> işlemi Seyhan atölyemizde orijinal ekipman standartlarına uygun cihazlarla gerçekleştirilir. Yapılan işlem ve değişen parçalar 1 yıl güvencemiz altındadır.
                </p>
              </div>
            )}

            {/* Error general notice */}
            {Object.keys(errors).length > 0 && (
              <div className="p-4 bg-red-50 border-l-4 border-l-red-500 border-r border-t border-b border-red-200 rounded-none text-xs text-red-700 font-bold flex items-center gap-2">
                <AlertCircle size={16} />
                Lütfen giriş hatalarını giderip tekrar deneyiniz. Plaka, ad-soyad ve telefon zorunludur.
              </div>
            )}

            {/* Submit Action tools */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-[1.125rem] rounded-none font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all shadow-md select-none cursor-pointer ${
                isSubmitting 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-2 border-gray-300' 
                  : 'bg-[#212529] hover:bg-[#D4AF37] text-white hover:text-[#212529] border-2 border-transparent hover:border-[#212529]'
              }`}
              id="appointment-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Yol Bilgileri Hazırlanıyor...
                </>
              ) : (
                <>
                  Randevu Talebi Oluştur
                  <ChevronRight size={18} />
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}
