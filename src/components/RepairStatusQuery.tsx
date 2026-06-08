import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Loader2, ClipboardCheck, HelpCircle, FileSearch, Check } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function RepairStatusQuery() {
  const [plate, setPlate] = useState('');
  const [fileNo, setFileNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [simulatedResult, setSimulatedResult] = useState<any>(null);

  const handleQuery = (e: FormEvent) => {
    e.preventDefault();
    if (!plate.trim() || !fileNo.trim()) return;

    setIsLoading(true);
    setShowResult(false);

    // Simulate search progress for 1.8s
    setTimeout(() => {
      setIsLoading(false);
      setShowResult(true);

      // Randomly simulate a realistic stage based on the input
      const stages = [
        {
          statusName: 'Dosya Açıldı',
          desc: 'Hasar dosyanız yetkili kasko/trafik birimi üzerinden başarıyla oluşturuldu.',
          percent: 20,
          details: 'Eksper atama süreci başlatıldı. Gerekli evraklar sigorta şirketine iletildi.'
        },
        {
          statusName: 'Eksper Raporu Aşamasında',
          desc: 'Eksper heyeti Seyhan servisimizde aracınızı inceledi, hasar raporlama süreci devam ediyor.',
          percent: 45,
          details: 'Orijinal parça listesi ve onarım bütçesi sigorta onayına sunulmuştur.'
        },
        {
          statusName: 'Boyasız Onarım & Kaportada',
          desc: 'Göçükçü İzzet Usta ve uzman montörlerimiz tarafından onarım ve parça montajı yapılmaktadır.',
          percent: 70,
          details: 'Değişmesi gereken hasarlı parçaların tamamı orijinal yedek parçalarla değiştirilmektedir.'
        },
        {
          statusName: 'Fırın Boyada',
          desc: 'Hasarlı bölgelerin boyama ve kurutma (fırınlama) işlemleri hassasiyetle gerçekleştiriliyor.',
          percent: 85,
          details: 'Orijinal renk mikseriyle %100 uyumlu boyama yapılarak parça farkı ortadan kaldırılıyor.'
        },
        {
          statusName: 'Teslime Hazır',
          desc: 'Tüm onarım, pasta cila, dezenfeksiyon ve güvenlik testleri başarıyla tamamlandı.',
          percent: 100,
          details: 'Aracınızı Seyhan servisimizden kasko dosyanız sıfır maliyetle kapatılmış olarak teslim alabilirsiniz.'
        }
      ];

      // Pick a stage based on plate or deterministic formula to look realistic
      const hashIndex = (plate.toUpperCase().charCodeAt(plate.length - 1) || 0) % stages.length;
      setSimulatedResult(stages[hashIndex]);
    }, 1800);
  };

  return (
    <section id="hasar-durumu" className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#F39C12] font-black text-xs tracking-[4px] uppercase block mb-2">HASAR SORGULAMA</span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#212529] tracking-tight">
            Aracınızın Durumunu Sorgulayın
          </h2>
          <div className="geometric-line-indicator mx-auto mt-3" />
          <p className="text-gray-500 font-semibold mt-3 text-xs sm:text-sm">
            Turgutlar Oto Servisi'ne teslim ettiğiniz kasko veya trafik sigortası dosyalı aracınızın güncel onarım durumunu anında öğrenin.
          </p>
        </div>

        {/* Query Card */}
        <div className="bg-white p-6 sm:p-10 rounded-none border-2 border-black shadow-xl relative">
          <form onSubmit={handleQuery} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* License Plate Input */}
              <div>
                <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-query-plate">
                  <ClipboardCheck size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  Plaka No *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 01 ABC 123"
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  aria-label="Plaka No Sorgula"
                  aria-describedby="label-query-plate"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-none text-sm font-bold uppercase tracking-wider transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                />
              </div>

              {/* File No Input */}
              <div>
                <label className="block text-xs font-bold text-[#212529] uppercase tracking-wider mb-2 flex items-center gap-1.5" id="label-query-file">
                  <FileSearch size={13} className="text-[#D4AF37]" aria-hidden="true" />
                  Dosya No *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: 2026/14589"
                  value={fileNo}
                  onChange={(e) => setFileNo(e.target.value)}
                  aria-label="Dosya No Sorgula"
                  aria-describedby="label-query-file"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-none text-sm font-bold transition-all duration-200 outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 focus:shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                />
              </div>

            </div>

            {/* Query Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-none font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isLoading
                  ? 'bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed'
                  : 'bg-[#212529] hover:bg-[#D4AF37] text-white hover:text-[#212529] border border-transparent'
              }`}
              id="query-submit-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin text-[#F39C12]" size={16} />
                  <span>Sorgulanıyor...</span>
                </>
              ) : (
                <>
                  <Search size={15} />
                  <span>Sorgula</span>
                </>
              )}
            </button>
          </form>

          {/* Results Block with AnimatePresence */}
          <AnimatePresence mode="wait">
            {showResult && simulatedResult && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-8 border-t-2 border-dashed border-gray-200 pt-8"
              >
                <div className="bg-[#F8F9FA] p-5 sm:p-6 border-l-4 border-l-[#D4AF37] border-t border-r border-b border-gray-200 relative overflow-hidden">
                  
                  {/* Watermark */}
                  <div className="absolute right-0 bottom-0 opacity-5 text-gray-800 font-extrabold text-5xl pointer-events-none select-none tracking-tighter">
                    {plate.toUpperCase().replace(/\s+/g, '')}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider">GÜNCEL SÜREÇ AŞAMASI</span>
                      <h4 className="text-lg font-black uppercase text-[#212529] tracking-tight">{simulatedResult.statusName}</h4>
                    </div>
                    
                    {/* Visual custom progress bar percentage */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#D4AF37]">{simulatedResult.percent}%</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F39C12] transition-all duration-1000" 
                          style={{ width: `${simulatedResult.percent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Description copy */}
                  <p className="text-xs sm:text-sm text-gray-700 font-semibold leading-relaxed mb-3">
                    {simulatedResult.desc}
                  </p>

                  <p className="text-xs text-gray-500 font-medium leading-relaxed bg-white p-3 border border-gray-200 rounded-none">
                    <strong>Son Operasyon Notu:</strong> {simulatedResult.details}
                  </p>

                  {/* Informational checklist below stages */}
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200/80 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-gray-600">
                      <Check size={12} className="text-emerald-500 stroke-[3px]" />
                      <span>Hasar Dosyası Aktif</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold text-gray-600">
                      <Check size={12} className="text-emerald-500 stroke-[3px]" />
                      <span>İkame Araç Tahsis Edildi</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Help info footer */}
        <div className="text-center mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
          <HelpCircle size={14} className="text-[#D4AF37]" />
          <span>
            Eğer dosya numaranızı bilmiyorsanız, Seyhan servisimize{' '}
            <a
              href={`tel:${CONTACT_INFO.phoneE164}`}
              className="font-extrabold text-[#212529] hover:text-[#D4AF37] transition-colors"
              aria-label={`Sorgu destek hattını ara: ${CONTACT_INFO.phone}`}
            >
              {CONTACT_INFO.phone}
            </a>{' '}
            nolu telefondan ulaşabilirsiniz.
          </span>
        </div>

      </div>
    </section>
  );
}
