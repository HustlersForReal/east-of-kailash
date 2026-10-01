import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function OriginStoryTeaser() {
  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
          Our Heritage
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-5 sm:mb-8 tracking-tight leading-[1.1]">
          Origin &amp; Story
        </h2>
        <p className="text-secondary-text text-sm sm:text-[15px] leading-[1.9] text-justify mb-8 sm:mb-10">
          East of Kailash came into being in the 1970s, when the Delhi Development Authority laid out a new colony on agricultural land belonging to the old revenue village of Bahpur. It was part of a much larger act of planned urban expansion, as Delhi grew outward and new residential districts were carved across South Delhi to absorb a population the old city could no longer hold. The name is really a description of location, taken from its position directly east of Kailash Colony and Greater Kailash, both established decades earlier in the 1950s and both named after the sacred Mount Kailash. What had been rural periphery quickly filled with DDA housing pockets, cooperative group housing societies and independent residences, forming the Blocks A to G that define the colony today. The pace picked up sharply once the adjacent Nehru Place commercial district began to develop, and again with the arrival of the iconic ISKCON Temple.
        </p>
        <Link
          href="/origin-and-story"
          className="inline-flex items-center justify-center gap-2 bg-primary-navy hover:bg-gold-accent text-white hover:text-primary-navy px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
        >
          View Full Origin
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}