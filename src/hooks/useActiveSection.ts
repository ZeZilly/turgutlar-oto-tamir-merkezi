import { useEffect, useState } from 'react';

/**
 * Scroll sırasında görünüm alanına giren section'ların id'lerini döner.
 * Header nav'ında aktif bağlantıyı vurgulamak ve scroll progress'i ölçmek için kullanılır.
 *
 * - rootMargin: header yüksekliği (sticky) hesaba katılarak ayarlandı
 *   üstten -120px bırakılarak nav çubuğunun arkasındaki içerik de "aktif" sayılır.
 * - threshold: section ekranın %15'ini kapladığında aktif sayılır.
 */
export function useActiveSection(ids: string[]): {
  activeId: string | null;
  scrollProgress: number;
} {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScrollProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setScrollProgress(progress);
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      // Görünür olan section'ları viewport'a göre üst-mesafe sırasıyla diz,
      // en yukarıdaki aktif section olarak işaretlenir.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        const id = visible[0].target.id;
        if (id) setActiveId(id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      // Header yüksekliği kadar negatif üst margin: section üst kenarı header'ın
      // hemen altına geldiğinde "görünür" kabul edilir.
      rootMargin: '-120px 0px -55% 0px',
      threshold: [0, 0.15, 0.35, 0.5]
    });

    const watched: Element[] = [];
    ids.forEach((id) => {
      if (id === 'root') return;
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        watched.push(el);
      }
    });

    handleScrollProgress();
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    window.addEventListener('resize', handleScrollProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollProgress);
      window.removeEventListener('resize', handleScrollProgress);
      void watched;
    };
  }, [ids]);

  return { activeId, scrollProgress };
}
