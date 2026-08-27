import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PropertyScroller } from './PropertyScroller';
import { properties } from '@/lib/data';

export function FeaturedProperties() {
  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Handpicked</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight">
              Featured Properties
            </h2>
            <p className="text-secondary-text text-base sm:text-lg">
              Handpicked properties across East of Kailash.
            </p>
          </div>
          <Link href="/properties" className="inline-flex items-center gap-2 text-primary-navy font-semibold hover:text-gold-accent transition-colors group">
            View All Properties
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <PropertyScroller properties={properties} />
      </div>
    </section>
  );
}
