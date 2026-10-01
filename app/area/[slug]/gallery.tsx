'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff, Camera, Eye } from 'lucide-react';
import { blockImages } from '@/lib/block-images';

export function AreaGallery({ slug, name }: { slug: string; name: string }) {
  const images = blockImages[slug] || [];
  const [active, setActive] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  // One photo per slide, shown full width.
  const perPage = 1;
  const totalPages = Math.ceil(images.length / perPage);
  const getSrc = (filename: string) => `/east-of-kailash-images/${slug}/${filename}`;

  const nextPage = useCallback(() => setPage((p) => (p + 1) % totalPages), [totalPages]);
  const prevPage = useCallback(() => setPage((p) => (p - 1 + totalPages) % totalPages), [totalPages]);
  const nextLightbox = useCallback(() => { if (active !== null) setActive(active === images.length - 1 ? 0 : active + 1); }, [active, images.length]);
  const prevLightbox = useCallback(() => { if (active !== null) setActive(active === 0 ? images.length - 1 : active - 1); }, [active, images.length]);

  useEffect(() => {
    if (paused || totalPages <= 1) return;
    const id = setInterval(nextPage, 4000);
    return () => clearInterval(id);
  }, [paused, totalPages, nextPage]);

  useEffect(() => {
    if (active === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [active, nextLightbox, prevLightbox]);

  if (images.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-border-color bg-light-navy/30 p-10 sm:p-14 flex flex-col items-center justify-center gap-3 text-secondary-text/60">
        <div className="w-12 h-12 rounded-full bg-white border border-border-color flex items-center justify-center">
          <ImageOff className="w-6 h-6" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.15em]">Photos coming soon</span>
        <span className="text-xs text-secondary-text/50">We are curating the best shots for {name}</span>
      </div>
    );
  }

  return (
    <>
      <div
        className="rounded-2xl border border-border-color bg-white shadow-sm overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-border-color bg-light-navy/20">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-primary-navy flex items-center justify-center">
              <Camera className="w-4 h-4 text-gold-accent" />
            </span>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-secondary-text">Gallery</div>
              <div className="text-sm font-bold text-primary-navy leading-none">{images.length} Photos • {name}</div>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-secondary-text bg-white border border-border-color rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {String(page + 1).padStart(2, '0')} / {images.length}
          </span>
        </div>

        {/* Carousel */}
        <div className="relative bg-light-navy/20">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ transform: `translateX(-${page * 100}%)` }}>
              {Array.from({ length: totalPages }).map((_, p) => {
                const filename = images[p * perPage];
                return (
                  <div key={filename} className="w-full shrink-0 p-2.5 sm:p-3.5">
                    <button onClick={() => setActive(p * perPage)} className="group relative block w-full h-[260px] xs:h-[300px] sm:h-[400px] md:h-[480px] lg:h-[560px] overflow-hidden rounded-xl bg-white border border-border-color shadow-sm hover:shadow-md transition-all duration-300">
                      <img src={getSrc(filename)} alt={`${name} ${p + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        {String(p + 1).padStart(2, '0')} / {images.length}
                      </span>
                      <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                          <Eye className="w-4 h-4 text-primary-navy" />
                        </span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {totalPages > 1 && (
            <>
              <button onClick={prevPage} className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-white border border-border-color rounded-full flex items-center justify-center text-primary-navy shadow-lg hover:shadow-xl hover:border-gold-accent/30 transition-all" aria-label="Previous">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button onClick={nextPage} className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-primary-navy hover:bg-secondary-navy text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all" aria-label="Next">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </>
          )}
        </div>

        {/* Progress */}
        {totalPages > 1 && (
          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 bg-white border-t border-border-color">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-light-navy">
              <span
                className="block h-full rounded-full bg-gold-accent transition-[width] duration-500"
                style={{ width: `${((page + 1) / totalPages) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-bold tracking-widest text-secondary-text shrink-0 tabular-nums">
              {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div className="fixed inset-0 z-[100] bg-[#0B0B0F]/95 backdrop-blur-sm flex items-center justify-center" onClick={() => setActive(null)}>
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          <button onClick={() => setActive(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white transition-colors z-10">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute top-5 left-5 hidden sm:flex items-center gap-2 text-white/70 text-xs font-medium bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
            <Camera className="w-3.5 h-3.5 text-gold-accent" /> {name} • {active + 1} / {images.length}
          </div>
          <button onClick={(e) => { e.stopPropagation(); prevLightbox(); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white transition-colors">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[4/3] mx-14 sm:mx-20" onClick={(e) => e.stopPropagation()}>
            <img src={getSrc(images[active])} alt={`${name} ${active + 1}`} className="w-full h-full object-contain rounded-xl" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); nextLightbox(); }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 bg-white text-primary-navy hover:bg-gold-accent rounded-full flex items-center justify-center shadow-xl transition-colors">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </>
  );
}
