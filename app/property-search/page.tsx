import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PropertySearch } from '@/components/property-search';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { site } from '@/lib/site';

/**
 * Dedicated route for the East of Kailash Property Search tool (see also the
 * homepage section with id="property-search"). A real route gives the tool a
 * shareable link, its own metadata, and a sitemap entry.
 */
export const metadata: Metadata = pageMetadata({
  title: 'East of Kailash Property Search',
  description:
    'Check any Delhi property registration record free: deed history, parties, SRO and registration date, sourced from DORIS. Verify before you buy in East of Kailash, 110065.',
  path: '/property-search',
});

export default function PropertySearchPage() {
  return (
    <section className="py-14 sm:py-20 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
          Free Tool
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight leading-[1.1]">
          East of Kailash Property Search
        </h1>
        <p className="text-secondary-text text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
          Search for any property in Delhi. Find registration details, deed types,
          parties involved, and SRO information to safeguard your investment.
        </p>

        <PropertySearch />

        <p className="mt-6 text-xs text-secondary-text/70 leading-relaxed">
          Data sourced from DORIS (Delhi Ownership Records Information System).
          Results may vary. For accurate verification, consult our experts.
        </p>
        <WhatsAppLink
          message={`Hello, ${site.name}! I checked a property on East of Kailash Property Search and I want your experts to verify it.`}
          phone={site.phone}
          className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold-accent text-primary-navy border-2 border-gold-accent hover:bg-primary-navy hover:text-white hover:border-primary-navy text-[13px] sm:text-sm font-bold uppercase tracking-[0.08em] transition-all duration-300"
        >
          Get Expert Verification
        </WhatsAppLink>
      </div>
    </section>
  );
}
