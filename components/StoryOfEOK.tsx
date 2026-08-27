import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function StoryOfEOK() {
  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-primary-navy text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.07]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-gold-accent">
          <polygon points="0,100 100,0 100,100" />
        </svg>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-4 sm:mb-5 block">Our Heritage</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 leading-[1.1] tracking-tight">
          The Story Behind EastOfKailash.com
        </h2>
        <div className="space-y-5 sm:space-y-6 text-light-navy/70 text-sm sm:text-[15px] leading-[1.9] mb-10 sm:mb-12 text-justify">
          <p>
            The EastOfKailash.com story is forged by a 50+ year old legacy, driven by 3 generations of real estate pioneers and industry leaders: <span className="text-gold-accent font-semibold">The Saxenas</span>.
          </p>
          <p>
            Since the early days, we&apos;ve done more than just watch East of Kailash grow — we were here, charting every new lane, seeing the first foundations laid, and tracking the growth of every block from A to G.
          </p>
          <p>
            This deep, hands-on history means we hold the inherent, true knowledge required to assess the potential and value of every property you consider. To put this in simple words: we know this market better than anyone else, because we built its history.
          </p>
          <p>
            Our expertise is not alone in property deals but also in real estate liaisoning. We are masters in all the building bye-laws applicable here. We have done liaisoning for 1000+ properties in this colony.
          </p>
          <p className="text-gold-accent font-medium">
            Reach us to know the ins and outs of East of Kailash.
          </p>
        </div>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 bg-transparent border-2 border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-primary-navy px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
        >
          Explore the Story
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
