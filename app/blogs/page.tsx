import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogs } from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blogs & Insights - EastOfKailash.com',
  description: 'Market trends, locality guides and buying advice for East of Kailash, South Delhi (110065).',
};

export default function BlogsPage() {
  const [featured, ...rest] = blogs;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-navy text-white py-14 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-6 sm:mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
            Knowledge
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Insights from <span className="text-gold-accent">East of Kailash</span>
          </h1>
          <p className="text-light-navy/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Long-form guides on market trends, localities and buying property in South Delhi&apos;s most balanced colony.
          </p>
        </div>
      </section>

      {/* Featured + grid */}
      <section className="py-10 sm:py-14 md:py-20 bg-light-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          <Link href={`/blogs/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 bg-white border border-border-color overflow-hidden mb-6 sm:mb-8 hover:border-gold-accent/40 hover:shadow-md transition-all duration-200">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-0 left-0 bg-gold-accent px-3 py-1.5">
                <span className="text-primary-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                  {featured.category}
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <div className="text-[11px] sm:text-xs text-secondary-text uppercase tracking-wider mb-2">
                {featured.date} • {featured.readTime}
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-navy group-hover:text-gold-accent transition-colors leading-tight mb-3">
                {featured.title}
              </h2>
              <p className="text-sm sm:text-[15px] text-secondary-text leading-relaxed mb-4">
                {featured.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-primary-navy font-semibold text-sm group-hover:text-gold-accent transition-colors">
                Read Full Guide
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {rest.map((blog) => (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group bg-white border border-border-color overflow-hidden hover:border-gold-accent/40 hover:shadow-md transition-all duration-200">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 left-0 bg-gold-accent px-3 py-1.5">
                    <span className="text-primary-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-widest">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="text-[11px] sm:text-xs text-secondary-text uppercase tracking-wider mb-2">
                    {blog.date} • {blog.readTime}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-navy group-hover:text-gold-accent transition-colors leading-snug mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-secondary-text leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
