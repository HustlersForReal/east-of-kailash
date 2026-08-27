import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { articles } from '@/lib/data';

export function Insights() {
  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Knowledge</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight">
              Insights from East of Kailash
            </h2>
            <p className="text-secondary-text text-base sm:text-lg">
              Market trends, locality guides, and property updates from South Delhi&apos;s most balanced postcode.
            </p>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-primary-navy font-semibold hover:text-gold-accent transition-colors group">
            View All Insights
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="relative aspect-[3/2] overflow-hidden mb-5">
                <Image 
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 left-0 bg-gold-accent px-3 py-1.5">
                  <span className="text-primary-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="text-[11px] sm:text-xs text-secondary-text uppercase tracking-wider mb-2">{article.date}</div>
              <h3 className="text-base sm:text-lg font-bold text-primary-navy group-hover:text-gold-accent transition-colors leading-snug">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
