'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';

const TOTAL = 3;

export function AreaGallery({ slug, name }: { slug: string; name: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  const getSrc = (num: number) => `/east-of-kailash-images/${slug}/${String(num).padStart(2, '0')}.jpeg`;

  const handleError = (num: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src.endsWith('.jpeg')) {
      img.src = `/east-of-kailash-images/${slug}/${String(num).padStart(2, '0')}.jpg`;
    } else if (!img.src.endsWith('.jpg')) {
      setFailed((prev) => {
        const next = new Set(prev);
        next.add(num);
        return next;
      });
    } else {
      setFailed((prev) => {
        const next = new Set(prev);
        next.add(num);
        return next;
      });
    }
  };

  const next = useCallback(() => {
    if (active !== null) setActive(active === TOTAL ? 1 : active + 1);
  }, [active]);

  const prev = useCallback(() => {
    if (active !== null) setActive(active === 1 ? TOTAL : active - 1);
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [active, next, prev]);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {Array.from({ length: TOTAL }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => !failed.has(num) && setActive(num)}
            className="aspect-square overflow-hidden bg-light-navy border border-border-color cursor-pointer relative"
          >
            {failed.has(num) ? (
              <span className="w-full h-full flex flex-col items-center justify-center gap-2 text-secondary-text/60">
                <ImageOff className="w-6 h-6" />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider">Photo coming soon</span>
              </span>
            ) : (
              <img
                src={getSrc(num)}
                alt={`${name} ${num}`}
                onError={(e) => handleError(num, e)}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            )}
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          >
            <X className="w-7 h-7" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="relative w-full max-w-3xl aspect-square mx-16 sm:mx-20" onClick={(e) => e.stopPropagation()}>
            <img
              src={getSrc(active)}
              alt={`${name} ${active}`}
              onError={(e) => handleError(active, e)}
              className="w-full h-full object-contain"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute bottom-5 flex gap-2">
            {Array.from({ length: TOTAL }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={(e) => { e.stopPropagation(); setActive(num); }}
                className={`w-2 h-2 rounded-full transition-colors ${active === num ? 'bg-gold-accent' : 'bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
