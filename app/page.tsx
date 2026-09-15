import { Hero } from '@/components/Hero';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { ExploreEOK } from '@/components/ExploreEOK';
import { OurServices } from '@/components/OurServices';
import { SaveMyMoney } from '@/components/SaveMyMoney';
import { StrategicPartnerships } from '@/components/StrategicPartnerships';
import { StoryOfEOK } from '@/components/StoryOfEOK';
import { OriginOfEOK } from '@/components/OriginOfEastOfKailash';
import { WhyInvest } from '@/components/WhyInvest';
import { TrustStats } from '@/components/TrustStats';
import { Insights } from '@/components/Insights';
import { FinalCTA } from '@/components/FinalCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <OriginOfEOK />
      <ExploreEOK />
      <OurServices />
      <SaveMyMoney />
      <StrategicPartnerships />
      <StoryOfEOK />
      <WhyInvest />
      <TrustStats />
      <Insights />
      <FinalCTA />
    </>
  );
}
