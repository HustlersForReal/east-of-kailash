import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, TrendingUp, Phone } from 'lucide-react';
import { areaProfiles } from '@/lib/data';
import { site } from '@/lib/site';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { AreaGallery } from './gallery';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata, truncateMeta } from '@/lib/seo';
import type { Metadata } from 'next';

// Required for output: 'export'. Without it Next cannot know the full route set
// up front and will try to render unknown slugs on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return areaProfiles.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = areaProfiles.find((a) => a.slug === slug);
  if (!area) return { title: 'Area Not Found' };

  return pageMetadata({
    // Layout template already appends " | EastOfKailash.com", so the locality is
// not repeated in the title. Keeps "Community Centre 1" inside the 60-char budget.
title: `${area.name} Property`,
    description: truncateMeta(`${area.tagline}. ${area.description}`),
    path: `/area/${area.slug}`,
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = areaProfiles.find((a) => a.slug === slug);

  if (!area) notFound();

  const currentIndex = areaProfiles.findIndex((a) => a.slug === slug);
  const prevArea = currentIndex > 0 ? areaProfiles[currentIndex - 1] : null;
  const nextArea =
    currentIndex < areaProfiles.length - 1
      ? areaProfiles[currentIndex + 1]
      : null;

  const categoryLabel: Record<string, string> = {
    residential: 'Residential Area',
    amenities: 'Amenities & Lifestyle',
    commercial: 'Market & Commercial',
  };

  const categoryColor: Record<string, string> = {
    residential: 'bg-gold-accent/10 text-gold-accent border-gold-accent/20',
    amenities: 'bg-blue-500/10 text-blue-400 border-blue-400/20',
    commercial: 'bg-emerald-500/10 text-emerald-400 border-emerald-400/20',
  };

  return (
    <>
      {/* Breadcrumb trail mirrors the visible back-link and area heading above. */}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://eastofkailash.com/' },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Explore East of Kailash',
              item: 'https://eastofkailash.com/#explore',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: area.name,
              item: `https://eastofkailash.com/area/${area.slug}`,
            },
          ],
        }}
      />
      {/* Hero Header */}
      <section className="relative bg-primary-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-gold-accent">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20">
          <Link
            href="/#explore"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-8 sm:mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explore East of Kailash
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gold-accent" />
                </div>
                <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border ${categoryColor[area.category] || 'bg-white/10 text-white/70 border-white/10'}`}>
                  {categoryLabel[area.category] || 'Area'}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 tracking-tight leading-[1.05]">
                {area.name}
              </h1>

              <p className="text-gold-accent font-semibold text-base sm:text-lg md:text-xl tracking-wide">
                {area.tagline}
              </p>
            </div>

            <div className="shrink-0">
              <WhatsAppLink
                message={`Hello ${site.name}, I want to talk to an expert about ${area.name}, East of Kailash.`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-gold-accent hover:text-primary-navy text-white border border-white/15 px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Talk to an Expert
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="max-w-3xl">
                <div className="mb-8 sm:mb-10">
                  <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Area Profile</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy mb-6 sm:mb-8 tracking-tight">
                    About {area.name}
                  </h2>
                </div>

                <AreaGallery slug={area.slug} name={area.name} />

                <div className="text-secondary-text text-sm sm:text-[15px] leading-[1.9] text-justify space-y-5 mt-8 sm:mt-10">
                  <p>{area.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 sm:mt-10 border border-border-color divide-x divide-border-color">
                  <div className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-text block mb-1">Pincode</span>
                    <span className="text-sm sm:text-base font-semibold text-primary-navy">110065</span>
                  </div>
                  <div className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-text block mb-1">Category</span>
                    <span className="text-sm sm:text-base font-semibold text-primary-navy">{categoryLabel[area.category]}</span>
                  </div>
                  <div className="px-4 sm:px-6 py-4 sm:py-5 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-text block mb-1">Location</span>
                    <span className="text-sm sm:text-base font-semibold text-primary-navy">South Delhi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28 space-y-6">
                {/* Investment Card */}
                <div className="bg-primary-navy text-white p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gold-accent/15 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-gold-accent" />
                    </div>
                    <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                      Suggested Investment
                    </h3>
                  </div>
                  <p className="text-light-navy/70 text-sm leading-relaxed">
                    {area.suggestedInvestment}
                  </p>
                </div>

                {/* Act on this area — carries the area into both forms */}
                <div className="border border-border-color p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-primary-navy mb-2">
                    Looking in {area.name}?
                  </h3>
                  <p className="text-secondary-text text-sm mb-5 leading-relaxed">
                    Tell us what you need, or list what you have. We&apos;ll call you back.
                  </p>
                  <div className="space-y-2.5">
                    <Link
                      href={`/submit-your-requirement?area=${area.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-gold-accent hover:bg-white text-primary-navy py-3 text-sm font-semibold transition-all duration-300 uppercase tracking-wider"
                    >
                      Submit Your Requirement
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/list-your-property?area=${area.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-primary-navy hover:bg-gold-accent text-white hover:text-primary-navy py-3 text-sm font-semibold transition-all duration-300 uppercase tracking-wider"
                    >
                      List Your Property
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <p className="text-[11px] text-secondary-text/50 mt-3.5 leading-relaxed">
                    {area.name} is pre-selected in the form.
                  </p>
                </div>

                {/* CTA Card */}
                <div className="border border-border-color p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-primary-navy mb-2">
                    Interested in {area.name}?
                  </h3>
                  <p className="text-secondary-text text-sm mb-5 leading-relaxed">
                    Get expert advice on properties and investment opportunities in this area.
                  </p>
                  <WhatsAppLink
                    message={`Hello ${site.name}, I am interested in ${area.name}, East of Kailash.`}
                    className="w-full flex items-center justify-center gap-2 bg-primary-navy hover:bg-gold-accent text-white hover:text-primary-navy py-3 text-sm font-semibold transition-all duration-300 uppercase tracking-wider"
                  >
                    Get in Touch
                    <ArrowUpRight className="w-4 h-4" />
                  </WhatsAppLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="bg-light-navy/30 border-t border-border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {prevArea ? (
              <Link
                href={`/area/${prevArea.slug}`}
                className="group flex items-center gap-4 py-8 sm:py-10 border-b sm:border-b-0 sm:border-r border-border-color hover:bg-white transition-colors px-4 sm:px-6 -mx-4 sm:mx-0"
              >
                <ArrowLeft className="w-5 h-5 text-secondary-text group-hover:text-gold-accent transition-colors shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-text block mb-1">
                    Previous Area
                  </span>
                  <span className="text-base sm:text-lg font-bold text-primary-navy group-hover:text-gold-accent transition-colors block truncate">
                    {prevArea.name}
                  </span>
                  <span className="text-xs text-secondary-text truncate block">
                    {prevArea.tagline}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="py-8 sm:py-10 px-4 sm:px-6" />
            )}
            {nextArea ? (
              <Link
                href={`/area/${nextArea.slug}`}
                className="group flex items-center justify-end gap-4 py-8 sm:py-10 border-t sm:border-t-0 sm:border-l border-border-color hover:bg-white transition-colors px-4 sm:px-6 -mx-4 sm:mx-0 text-right"
              >
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-text block mb-1">
                    Next Area
                  </span>
                  <span className="text-base sm:text-lg font-bold text-primary-navy group-hover:text-gold-accent transition-colors block truncate">
                    {nextArea.name}
                  </span>
                  <span className="text-xs text-secondary-text truncate block">
                    {nextArea.tagline}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-secondary-text group-hover:text-gold-accent transition-colors shrink-0" />
              </Link>
            ) : (
              <div className="py-8 sm:py-10 px-4 sm:px-6" />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
