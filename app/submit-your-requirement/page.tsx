import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ArrowRight, Shield, TrendingUp, Users, MapPin, Handshake, CheckCircle2, BarChart3 } from 'lucide-react';
import { BuyerForm } from './buyer-form';

export const metadata: Metadata = pageMetadata({
  title: 'Submit Your Requirement',
  description:
    'Looking to buy or rent in East of Kailash? Tell us your budget, block and configuration. We shortlist verified homes across Blocks A to G and DDA flats.',
  path: '/submit-your-requirement',
});

const whyBuy = [
  {
    icon: Shield,
    title: 'Verified Before You See It',
    desc: 'Every property is physically checked by our team, for ownership, condition and pricing, before it reaches you.',
  },
  {
    icon: MapPin,
    title: 'Block-Level Detail',
    desc: 'Block, society, floor, lift, parking, facing, the details that actually decide a home, not just a locality.',
  },
  {
    icon: TrendingUp,
    title: 'Honest Pricing Guidance',
    desc: 'We tell you what homes are really transacting at, so you are not negotiating against a made-up number.',
  },
  {
    icon: Users,
    title: 'Shortlisted For You',
    desc: 'Share your requirement once. We match it against live and off-market options and send you only the relevant ones.',
  },
  {
    icon: Handshake,
    title: 'Viewings On Your Terms',
    desc: 'We schedule site visits around your day, and we are there at every one of them to answer the real questions.',
  },
  {
    icon: BarChart3,
    title: '3+ Generations of Trust',
    desc: 'Families have bought and sold through us across this neighbourhood for three generations.',
  },
];

const steps = [
  { step: '01', title: 'Tell Us What You Want', desc: 'Share your budget, preferred block, configuration and timeline. Two minutes, nothing committed.' },
  { step: '02', title: 'We Shortlist', desc: 'Our team matches your requirement against live and quietly available homes across East of Kailash.' },
  { step: '03', title: 'View With Us', desc: 'We arrange the visits. Inspect the home, the block and the neighbourhood at your own pace.' },
  { step: '04', title: 'Negotiate & Close', desc: 'We negotiate price and terms on your behalf, then handle paperwork through registry.' },
];

const assurances = [
  'Zero cost to you as a buyer, no brokerage surprises later',
  'Every listing verified in person before we share it with you',
  'Clear title and ownership checks before you commit anything',
  'We stay with you from the first shortlist to the registry',
];

export default function SubmitYourRequirementPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-navy text-white py-14 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
            For Buyers
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Find Your Home<br />
            <span className="text-gold-accent">in East of Kailash</span>
          </h1>
          <p className="text-light-navy/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Buying or renting across Blocks A to G, DDA flats or the wider Kailash Hills area? Tell
            us your budget and what you are looking for, and we will come back with homes worth your
            time, not a flood of listings.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Form, first on mobile, right on desktop */}
            <div className="lg:col-span-5 lg:order-2 order-1">
              <div className="bg-primary-navy text-white p-6 sm:p-8 lg:sticky lg:top-24">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Submit Your Requirement</h2>
                <p className="text-light-navy/60 text-sm mb-6 sm:mb-8">Fill the details below. We&apos;ll get back to you on WhatsApp.</p>
                <BuyerForm />
              </div>
            </div>

            {/* Info, second on mobile, left on desktop */}
            <div className="lg:col-span-7 lg:order-1 order-2">
              <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
                Why Buy With Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy mb-8 sm:mb-10 tracking-tight">
                Buy With Clarity, Not Guesswork
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-16">
                {whyBuy.map((item, idx) => (
                  <div key={idx} className="border border-border-color p-5 hover:border-gold-accent/40 hover:shadow-md transition-all duration-200 group">
                    <div className="w-10 h-10 bg-light-navy rounded-lg flex items-center justify-center mb-3 group-hover:bg-gold-accent/10 transition-colors">
                      <item.icon className="w-5 h-5 text-gold-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-primary-navy mb-1 group-hover:text-gold-accent transition-colors">{item.title}</h3>
                    <p className="text-xs text-secondary-text leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
                How It Works
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy mb-8 sm:mb-10 tracking-tight">
                4 Simple Steps
              </h2>

              <div className="space-y-4 sm:space-y-5 mb-12 sm:mb-16">
                {steps.map((item, idx) => (
                  <div key={idx} className="flex gap-4 sm:gap-5 items-start">
                    <div className="w-12 h-12 bg-primary-navy text-gold-accent flex items-center justify-center text-sm font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-primary-navy mb-1">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Assurance */}
              <div className="bg-light-navy/50 border border-border-color p-6 sm:p-8">
                <h3 className="text-lg font-bold text-primary-navy mb-4">EastOfKailash.com Assures</h3>
                <div className="space-y-3">
                  {assurances.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-secondary-text leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
