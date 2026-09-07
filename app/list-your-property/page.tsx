import type { Metadata } from 'next';
import { Shield, TrendingUp, Users, Eye, Handshake, CheckCircle2 } from 'lucide-react';
import { SellerForm } from './seller-form';

export const metadata: Metadata = {
  title: 'List Your Property - EastOfKailash.com',
  description: 'List your property for sale in East of Kailash with EastOfKailash.com. Reach genuine buyers across Blocks A-G, DDA Flats and Community Centre.',
};

const whyList = [
  {
    icon: Users,
    title: '1,000+ Genuine Buyers',
    desc: 'Access our network of serious, verified buyers actively searching in East of Kailash.',
  },
  {
    icon: TrendingUp,
    title: 'Best Market Price',
    desc: 'Our hyperlocal expertise ensures your property is priced right — not too low, not too high.',
  },
  {
    icon: Shield,
    title: 'Complete Privacy',
    desc: 'Your listing stays confidential. No public shouting, no unwanted attention.',
  },
  {
    icon: Eye,
    title: 'Maximum Visibility',
    desc: 'Featured placement on EastOfKailash.com — the go-to portal for this colony.',
  },
  {
    icon: Handshake,
    title: 'End-to-End Support',
    desc: 'From listing to registration — we handle paperwork, negotiation, and closing.',
  },
];

const steps = [
  { step: '01', title: 'Share Your Property', desc: 'Fill the form with your property details — type, locality, and expected price.' },
  { step: '02', title: 'We Verify & List', desc: 'Our team verifies the details, takes photos, and creates a premium listing.' },
  { step: '03', title: 'Buyers Come to You', desc: 'Qualified buyers view your property. We facilitate showings and negotiate on your behalf.' },
  { step: '04', title: 'Deal Closed', desc: 'From agreement to registration — we manage the entire closing process.' },
];

export default function ListYourPropertyPage() {
  return (
    <>
      <section className="bg-primary-navy text-white py-14 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
            For Sellers
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            List Your Property<br />
            <span className="text-gold-accent">in East of Kailash</span>
          </h1>
          <p className="text-light-navy/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Sell at the best price with the colony&apos;s most trusted hyperlocal platform. Reach genuine buyers actively looking in Blocks A–G, DDA Flats and Community Centre.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Form — first on mobile, right on desktop */}
            <div className="lg:col-span-5 lg:order-2 order-1">
              <div className="bg-primary-navy text-white p-6 sm:p-8 lg:sticky lg:top-24">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">List Your Property</h2>
                <p className="text-light-navy/60 text-sm mb-6 sm:mb-8">Fill the details below. We&apos;ll get back to you on WhatsApp.</p>
                <SellerForm />
              </div>
            </div>

            {/* Info — second on mobile, left on desktop */}
            <div className="lg:col-span-7 lg:order-1 order-2">
              <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
                Why List With Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-navy mb-8 sm:mb-10 tracking-tight">
                Sell Smarter, Not Harder
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-16">
                {whyList.map((item, idx) => (
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

              <div className="bg-light-navy/50 border border-border-color p-6 sm:p-8">
                <h3 className="text-lg font-bold text-primary-navy mb-4">EastOfKailash.com Assures</h3>
                <div className="space-y-3">
                  {[
                    'Your property details stay 100% confidential',
                    'No hidden charges — our service is free for sellers',
                    'Direct access to pre-qualified, serious buyers',
                    'Complete support from listing to registration',
                  ].map((item, idx) => (
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
