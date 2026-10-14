'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { MapPin, ArrowRight, Flame, Ruler, BedDouble, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { liveDemands, type LiveDemand } from '@/lib/live-demand';
import { site } from '@/lib/site';
import { WhatsAppLink } from './WhatsAppLink';

function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const mqlDesktop = window.matchMedia('(min-width: 1024px)');
    const mqlTablet = window.matchMedia('(min-width: 640px)');

    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 640) setPerView(2);
      else setPerView(1);
    };

    update();
    mqlDesktop.addEventListener('change', update);
    mqlTablet.addEventListener('change', update);
    return () => {
      mqlDesktop.removeEventListener('change', update);
      mqlTablet.removeEventListener('change', update);
    };
  }, []);

  return perView;
}

function DemandCard({ demand, index }: { demand: LiveDemand; index: number }) {
  const config = [demand.bhk, demand.floor].filter(Boolean).join(' • ');
  const messageLines = [
    `Hello ${site.name}, I am interested in this property.`,
    '',
    `Ref: ${demand.ref}`,
    `Size: ${demand.size || '—'}`,
    `Config: ${config || '—'}`,
    `Type: ${demand.kind}${demand.outright ? ' (Outright)' : ''}`,
    `Location: ${demand.location}${demand.block ? `, ${demand.block}` : ''}, 110065`,
    demand.tags.length > 0 ? `Highlights: ${demand.tags.join(', ')}` : '',
  ].filter((l) => l !== '');
  const message = messageLines.join('\n');

  return (
    <div className="group bg-white border border-border-color p-5 sm:p-6 flex flex-col h-full hover:border-gold-accent/40 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-bold text-secondary-text/60 tabular-nums">
          {demand.ref}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${
            demand.deal === 'sale' ? 'bg-primary-navy text-gold-accent' : 'bg-gold-accent text-primary-navy'
          }`}
        >
          {demand.deal === 'sale' ? 'For Sale' : 'For Rent'}
        </span>
      </div>

      <div className="text-2xl sm:text-[26px] font-extrabold text-primary-navy tracking-tight leading-none mb-1">
        {demand.size || config || demand.kind}
      </div>
      <div className="text-[11px] font-bold uppercase tracking-widest text-gold-accent mb-4">
        {demand.kind}
        {demand.outright ? ' • Outright' : ''}
      </div>

      <div className="space-y-2.5 text-sm mb-4">
        {demand.size && (
          <div className="flex items-center gap-2 text-secondary-text">
            <Ruler className="w-4 h-4 text-gold-accent shrink-0" />
            <span className="text-primary-navy font-semibold">{demand.size}</span>
          </div>
        )}
        {config && (
          <div className="flex items-center gap-2 text-secondary-text">
            <BedDouble className="w-4 h-4 text-gold-accent shrink-0" />
            <span className="text-primary-navy font-semibold">{config}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-secondary-text">
          <Building2 className="w-4 h-4 text-gold-accent shrink-0" />
          <span className="text-primary-navy font-semibold">{demand.kind}</span>
        </div>
        <div className="flex items-center gap-2 text-secondary-text">
          <MapPin className="w-4 h-4 text-gold-accent shrink-0" />
          <span className="text-primary-navy font-semibold">
            {demand.location}
            {demand.block ? `, ${demand.block}` : ''}, 110065
          </span>
        </div>
      </div>

      {demand.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {demand.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold uppercase tracking-wider bg-light-navy text-primary-navy px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <WhatsAppLink
        message={message}
        phone={site.phone}
        className="mt-auto w-full flex items-center justify-center gap-2 bg-primary-navy hover:bg-gold-accent text-white hover:text-primary-navy py-3 text-xs font-semibold transition-all duration-300 uppercase tracking-wider"
      >
        I Am Interested
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </WhatsAppLink>
    </div>
  );
}

export function FeaturedProperties() {
  const [tab, setTab] = useState<'sale' | 'rent'>('sale');
  const perView = usePerView();
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const saleDemands = liveDemands.filter((d) => d.deal === 'sale');
  const rentDemands = liveDemands.filter((d) => d.deal === 'rent');
  const visible = tab === 'sale' ? saleDemands : rentDemands;
  const maxIndex = Math.max(0, visible.length - perView);

  // Ref mirrors the index synchronously so autoplay always advances from the
  // latest position — including a manual dot/arrow pick (no stale state).
  // resumeKey restarts the autoplay dwell timer on every manual interaction.
  const indexRef = useRef(0);
  const [resumeKey, setResumeKey] = useState(0);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, maxIndex));
    indexRef.current = clamped;
    setCurrentIndex(clamped);
    const containerWidth = containerRef.current?.offsetWidth ?? 0;
    animate(x, clamped * -(containerWidth / perView), {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
    });
    setResumeKey((k) => k + 1);
  };

  useEffect(() => {
    indexRef.current = 0;
    setCurrentIndex(0);
    x.set(0);
  }, [perView, tab, x]);

  // Desktop (3-up): 6s • Tablet (2-up): 4.5s • Phone (1-up): 3s
  const autoplayMs = perView >= 3 ? 6000 : perView === 2 ? 4500 : 3000;

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const interval = setInterval(() => {
      const prev = indexRef.current;
      const next = prev >= maxIndex ? 0 : Math.min(prev + perView, maxIndex);
      indexRef.current = next;
      setCurrentIndex(next);
      const containerWidth = containerRef.current?.offsetWidth ?? 0;
      animate(x, next * -(containerWidth / perView), {
        type: 'spring',
        bounce: 0,
        duration: 0.7,
      });
    }, autoplayMs);
    return () => clearInterval(interval);
  }, [paused, perView, maxIndex, x, autoplayMs, resumeKey]);

  const totalPages = maxIndex + 1;

  return (
    <section id="live-demand" className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 flex items-center gap-2">
              <Flame className="w-3.5 h-3.5" />
              Live Listings
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight">
              Available Properties Right Now
            </h2>
            <p className="text-secondary-text text-base sm:text-lg">
              Handpicked properties currently available across East of Kailash. Found your match? Get in touch.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setTab('sale')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
                tab === 'sale'
                  ? 'bg-primary-navy text-white border-primary-navy'
                  : 'bg-white text-secondary-text border-border-color hover:border-gold-accent/40 hover:text-gold-accent'
              }`}
            >
              For Sale ({saleDemands.length})
            </button>
            <button
              onClick={() => setTab('rent')}
              className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${
                tab === 'rent'
                  ? 'bg-primary-navy text-white border-primary-navy'
                  : 'bg-white text-secondary-text border-border-color hover:border-gold-accent/40 hover:text-gold-accent'
              }`}
            >
              For Rent ({rentDemands.length})
            </button>
          </div>
        </div>

        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div ref={containerRef} className="overflow-hidden">
            <motion.div className="flex" style={{ x }}>
              {visible.map((demand, idx) => (
                <div key={demand.id} className="shrink-0 px-2 sm:px-3" style={{ width: `calc(100% / ${perView})` }}>
                  <DemandCard demand={demand} index={idx} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <button
              onClick={() => goTo(currentIndex - 1)}
              aria-label="Previous"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-white hover:bg-white border border-border-color rounded-full flex items-center justify-center text-primary-navy shadow-lg hover:shadow-xl hover:border-gold-accent/30 transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentIndex === i ? 'w-6 bg-gold-accent' : 'w-1.5 bg-border-color hover:bg-secondary-text/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => goTo(currentIndex + 1 > maxIndex ? 0 : currentIndex + 1)}
              aria-label="Next"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-primary-navy hover:bg-secondary-navy text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
