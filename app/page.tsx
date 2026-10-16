import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { Hero } from '@/components/Hero';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { WhatIsEOK } from '@/components/WhatIsEOK';
import { ExploreEOK } from '@/components/ExploreEOK';
import { OriginStoryTeaser } from '@/components/OriginStoryTeaser';
import { OurServices } from '@/components/OurServices';
import { SaveMyMoney } from '@/components/SaveMyMoney';
// TODO: re-enable. Section is temporarily hidden on the homepage.
// import { StrategicPartnerships } from '@/components/StrategicPartnerships';
import { WhyInvest } from '@/components/WhyInvest';
import { CalculatorsSection } from '@/components/CalculatorsSection';
import { PropertySearchSection } from '@/components/PropertySearchSection';
import { TrustStats } from '@/components/TrustStats';
import { Insights } from '@/components/Insights';
import { FinalCTA } from '@/components/FinalCTA';

export const metadata: Metadata = pageMetadata({
  // The layout template appends " | EastOfKailash.com", so the brand is not
  // repeated here. Keeping the title short avoids a truncated SERP line.
  title: 'Property in East of Kailash, Delhi',
  description:
    'Buy, sell or rent property in East of Kailash, South Delhi 110065. Verified builder floors, DDA flats, shops and land in Blocks A to G and the Community Centre markets.',
  path: '/',
});

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhatIsEOK />
      <SaveMyMoney />
      <OurServices />
      <ExploreEOK />
      <OriginStoryTeaser />
      {/* TODO: re-enable. Section is temporarily hidden on the homepage. */}
      {/* <StrategicPartnerships /> */}
      <WhyInvest />
      <CalculatorsSection />
      <PropertySearchSection />
      <TrustStats />
      <Insights />
      <FinalCTA />
    </>
  );
}
