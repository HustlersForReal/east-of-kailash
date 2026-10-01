import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { areaProfiles } from '@/lib/data';

const groups = [
  { category: 'residential', title: 'Residential Blocks & Housing' },
  { category: 'amenities', title: 'Amenities & Lifestyle' },
  { category: 'commercial', title: 'Commercial & Entertainment' },
];

export function ExploreEOK() {
  return (
    <section id="explore" className="py-14 sm:py-20 md:py-24 lg:py-32 bg-light-navy/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Neighbourhood</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight">
            Explore East of Kailash
          </h2>
          <p className="text-secondary-text text-base sm:text-lg">
            Discover the Blocks A&ndash;G, DDA flats, amenities and commercial hubs that make East of Kailash unique.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {groups.map((group) => {
            const areas = areaProfiles.filter((a) => a.category === group.category);
            if (areas.length === 0) return null;
            return (
              <div key={group.category}>
                <h3 className="text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-primary-navy mb-4 sm:mb-5 pb-2 border-b-[3px] border-primary-navy">
                  {group.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/area/${area.slug}`}
                      className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-6 py-4 sm:py-5 bg-white border-[3px] border-primary-navy hover:border-gold-accent hover:shadow-md transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-navy flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
                        <MapPin className="w-5 h-5 text-white group-hover:text-primary-navy transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm sm:text-base font-semibold text-primary-navy leading-tight block group-hover:text-gold-accent transition-colors">
                          {area.name}
                        </span>
                        <span className="text-[11px] text-secondary-text leading-tight block mt-1 truncate">
                          {area.tagline}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-14">
          <div className="overflow-hidden rounded-xl border border-border-color shadow-sm">
            <iframe
              title="Map of East of Kailash"
              src="https://maps.google.com/maps?q=East+of+Kailash,+New+Delhi&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[300px] sm:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
