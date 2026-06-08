import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, AlertCircle, PlusCircle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '../data';
import { Review } from '../types';

export default function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // New Review Inputs values
  const [newAuthor, setNewAuthor] = useState('');
  const [newVehicle, setNewVehicle] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [errorWord, setErrorWord] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newVehicle.trim() || !newText.trim()) {
      setErrorWord('Lütfen tüm alanları eksiksiz doldurunuz.');
      return;
    }

    const addedReview: Review = {
      id: `custom-rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      text: newText.trim(),
      vehicle: newVehicle.trim(),
      date: 'Bugün'
    };

    const updatedReviews = [addedReview, ...reviews];
    setReviews(updatedReviews);
    setIsSuccess(true);
    setActiveSlide(0); // Show the newly added review first
    
    // Reset fields
    setNewAuthor('');
    setNewVehicle('');
    setNewRating(5);
    setNewText('');
    setErrorWord('');

    setTimeout(() => {
      setIsSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  const activeReview = reviews[activeSlide] || reviews[0];

  return (
    <section id="yorumlar" className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Titles */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block mb-2">Müşteri Yorumları</span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#212529]">
            Müşterilerimizin Gözünden Turgutlar Servis Hizmeti
          </h2>
          <div className="geometric-line-indicator mx-auto mt-4" />
          <p className="text-gray-500 font-semibold mt-4 text-xs sm:text-sm">
            Dürüst işçiliğin karşılığı olarak Adanalı hemşehrilerimizden aldığımız destek bizi her gün daha iyi çalışmaya teşvik ediyor.
          </p>
        </div>

        {/* Aggregate Ratings & Dynamic additions tools block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Aggregate Left Widget stats */}
          <div className="lg:col-span-4 bg-[#212529] text-white p-6 sm:p-8 border-2 border-b-8 border-b-[#D4AF37] border-black shadow-xl text-center">
            <h3 className="text-xs font-black text-gray-300 uppercase tracking-widest block mb-4">GÜVEN SKORUMUZ</h3>
            
            <div className="text-5xl font-extrabold text-[#D4AF37] mb-2">{averageRating}</div>
            
            <div className="flex justify-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.round(Number(averageRating)) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-600"}
                  aria-hidden="true"
                />
              ))}
            </div>

            <p className="text-xs text-gray-400 font-bold mb-6">
              Toplam {reviews.length} doğrulanmış araç sahibi ve parça değişimi gerçekleştiren müşterimizin Google Haritalar puan ortalamasıdır.
            </p>

            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D4AF37] hover:bg-white text-[#212529] hover:text-[#212529] py-3.5 rounded-none font-black uppercase text-xs tracking-widest transition-all border-2 border-transparent hover:border-[#212529] select-none cursor-pointer"
              id="write-review-toggle"
              aria-label="Turgutlar Oto Servis için kendi deneyiminizi ve yorumunuzu ekleyin"
            >
              <PlusCircle size={16} />
              Yorum Ekle
            </button>
          </div>

          {/* Dynamic Testimonials Horizontal Carousel & Form Area */}
          <div className="lg:col-span-8 w-full">
            <AnimatePresence mode="wait">
              {showForm ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-6 sm:p-8 rounded-none border-2 border-black shadow-xl"
                  id="write-review-form-box"
                >
                  <h3 className="text-sm sm:text-base font-black uppercase text-[#212529] mb-4 flex items-center gap-2">
                    <MessageSquareCode size={18} className="text-[#D4AF37]" aria-hidden="true" />
                    Yorumunuzu Paylaşın
                  </h3>

                  {isSuccess ? (
                    <div className="p-6 bg-emerald-50 text-emerald-700 font-extrabold text-sm sm:text-base text-center rounded-none border-2 border-emerald-500 flex flex-col items-center gap-2">
                      <CheckCircle size={32} className="text-emerald-500" />
                      Yorumunuz başarıyla carousel listesine eklendi!
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black text-gray-600 uppercase tracking-wider mb-2">Adınız Soyadınız / Rumuz *</label>
                          <input
                            type="text"
                            required
                            placeholder="Örn: Serhat Demir"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            aria-label="Ad Soyad"
                            className="w-full px-4 py-2.5 text-sm font-semibold bg-white border-2 border-gray-200 rounded-none focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black text-gray-600 uppercase tracking-wider mb-2">Aracınızın Marka ve Modeli *</label>
                          <input
                            type="text"
                            required
                            placeholder="Örn: Renault Megane IV"
                            value={newVehicle}
                            onChange={(e) => setNewVehicle(e.target.value)}
                            aria-label="Araç Marka ve Model"
                            className="w-full px-4 py-2.5 text-sm font-semibold bg-white border-2 border-gray-200 rounded-none focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                          />
                        </div>
                      </div>

                      {/* Stars Picker value */}
                      <div>
                        <span className="block text-[10px] font-black text-gray-600 uppercase tracking-wider mb-2">Memnuniyet Puanı *</span>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((starNum) => (
                            <button
                              key={starNum}
                              type="button"
                              onClick={() => setNewRating(starNum)}
                              className="focus:outline-none select-none cursor-pointer"
                              aria-label={`${starNum} Yıldız Ver`}
                            >
                              <Star
                                size={28}
                                className={starNum <= newRating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300 hover:text-amber-400"}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black text-gray-600 uppercase tracking-wider mb-2">Yorumunuz / Düşünceleriniz *</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="Aracınız hakkında yapılan işlemleri ve memnuniyetinizi anlatabilirsiniz..."
                          value={newText}
                          onChange={(e) => setNewText(e.target.value)}
                          aria-label="Yorum Metni"
                          className="w-full px-4 py-2.5 text-sm font-semibold bg-white border-2 border-gray-200 rounded-none focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20"
                        />
                      </div>

                      {errorWord && (
                        <div className="text-xs p-2.5 bg-red-50 text-red-700 rounded-none border-l-4 border-l-red-500 flex items-center gap-2">
                          <AlertCircle size={14} /> {errorWord}
                        </div>
                      )}

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="px-4 py-2 border-2 border-[#212529] hover:bg-gray-50 rounded-none font-black uppercase text-xs tracking-wider select-none cursor-pointer"
                        >
                          İptal Et
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-[#212529] hover:bg-[#D4AF37] text-white hover:text-[#212529] border-2 border-transparent hover:border-[#212529] rounded-none font-black uppercase text-xs tracking-widest transition-all select-none"
                          id="submit-review-btn"
                        >
                          Yorumu Yayınla
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              ) : (
                /* Interactive Horizontal Carousel View */
                <div className="flex flex-col gap-6" key="carousel-view">
                  
                  {/* Active Slide Card Container with Framer Motion Transition */}
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[220px] bg-white p-6 sm:p-10 border-2 border-[#212529] shadow-xl text-left relative flex flex-col justify-between"
                  >
                    
                    {/* Google Map badge simulation tag */}
                    <div className="absolute right-4 top-4 flex items-center gap-1.5 bg-[#F8F9FA] border border-gray-200 px-3 py-1 text-[9px] font-black uppercase text-gray-500 tracking-wider">
                      <span className="w-1.5 h-1.5 bg-[#4285F4] rounded-full" />
                      <span>Google Harita Yorumu</span>
                    </div>

                    <div className="space-y-4">
                      {/* Active Stars rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, s) => (
                          <Star
                            key={s}
                            size={16}
                            className={s < activeReview.rating ? "fill-[#F39C12] text-[#F39C12]" : "text-gray-200"}
                            aria-hidden="true"
                          />
                        ))}
                      </div>

                      {/* Testimonial message */}
                      <p className="text-xs sm:text-base text-gray-700 font-semibold leading-relaxed italic pr-6">
                        "{activeReview.text}"
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] sm:text-xs">
                      <div>
                        <span className="font-extrabold uppercase text-[#212529] tracking-wider block text-xs sm:text-sm">
                          {activeReview.author}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                          {activeReview.vehicle}
                        </span>
                      </div>
                      <span className="text-gray-400 font-extrabold text-[10px] uppercase">
                        {activeReview.date}
                      </span>
                    </div>

                  </motion.div>

                  {/* Carousel Controls (JS indicators & arrow triggers) */}
                  <div className="flex items-center justify-between">
                    
                    {/* Slider Nav Indicators Dots */}
                    <div className="flex gap-2">
                      {reviews.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlide(idx)}
                          className={`w-3.5 h-1.5 transition-all outline-none rounded-none cursor-pointer ${
                            idx === activeSlide ? 'bg-[#D4AF37] w-6' : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Yorum sayfası ${idx + 1}`}
                        />
                      ))}
                    </div>

                    {/* Left & Right Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={handlePrevSlide}
                        className="p-2 sm:p-3 bg-white border-2 border-[#212529] hover:bg-[#D4AF37] hover:text-[#212529] text-[#212529] transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        aria-label="Önceki Yorum"
                        id="prev-review-btn"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={handleNextSlide}
                        className="p-2 sm:p-3 bg-white border-2 border-[#212529] hover:bg-[#D4AF37] hover:text-[#212529] text-[#212529] transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        aria-label="Sonraki Yorum"
                        id="next-review-btn"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>

                  </div>

                </div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
