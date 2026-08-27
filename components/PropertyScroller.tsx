'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { PropertyCard } from './PropertyCard';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bhk: string | null;
  area: string;
  bathrooms: number;
  parking: number | null;
  type: string;
  status: string;
  image: string;
  badges: string[];
  description: string;
}

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

export function PropertyScroller({ properties }: { properties: Property[] }) {
  const perView = usePerView();
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, properties.length - perView);

  useEffect(() => {
    x.set(0);
  }, [perView, x]);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev >= maxIndex ? 0 : Math.min(prev + perView, maxIndex);
        const containerWidth = containerRef.current?.offsetWidth ?? 0;
        animate(x, next * -(containerWidth / perView), {
          type: 'spring',
          bounce: 0,
          duration: 0.7,
        });
        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [paused, perView, maxIndex, x]);

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div ref={containerRef} className="overflow-hidden">
        <motion.div className="flex" style={{ x }}>
          {properties.map((property) => (
            <div
              key={property.id}
              className="shrink-0 px-2 sm:px-3"
              style={{ width: `calc(100% / ${perView})` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
