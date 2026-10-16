import { ArrowUpRight } from 'lucide-react';
import { PropertySearch } from './property-search';
import { WhatsAppLink } from './WhatsAppLink';
import { site } from '@/lib/site';

const BENEFITS = [
  'Verify before buying',
  'Check deed history',
  'Find party names',
  'SRO details',
  'Registration date',
  'Property type',
];

export function PropertySearchSection() {
  return (
    <section
      id="property-search"
      className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
              Free Tool
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight leading-[1.1]">
              East of Kailash Property Search
            </h2>
            <p className="text-secondary-text text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              Search for any property in Delhi. Find registration details, deed types,
              parties involved, and SRO information to safeguard your investment.
            </p>

            <ul className="space-y-2.5 mb-8">
              {BENEFITS.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 text-sm sm:text-[15px] text-primary-navy font-medium"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-accent" />
                  {b}
                </li>
              ))}
            </ul>

            <WhatsAppLink
              message={`Hello, ${site.name}! I checked a property on East of Kailash Property Search and I want your experts to verify it.`}
              phone={site.phone}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 sm:px-8 py-4 bg-gold-accent text-primary-navy border-2 border-gold-accent hover:bg-primary-navy hover:text-white hover:border-primary-navy text-[13px] sm:text-sm font-bold uppercase tracking-[0.08em] sm:tracking-[0.15em] transition-all duration-300 text-center"
            >
              <span>Get Expert Verification</span>
              <ArrowUpRight className="w-[18px] h-[18px] sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </WhatsAppLink>

            <p className="mt-4 text-xs text-secondary-text/70 leading-relaxed">
              Data sourced from DORIS (Delhi Ownership Records Information System).
              Results may vary. For accurate verification, consult our experts.
            </p>
          </div>

          <div>
            <PropertySearch />
          </div>
        </div>
      </div>
    </section>
  );
}
