import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ArrowRight, Shield, Eye, Handshake } from 'lucide-react';
import { ExclusiveDealsForm } from './form';

export const metadata: Metadata = pageMetadata({
  title: 'Hot Property Deals',
  description:
    'Share your property requirements with EastOfKailash.com. We work with all our might to give you the best practical solution based on logic and facts.',
  path: '/exclusive-deals',
});

export default function ExclusiveDealsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary-navy text-white py-14 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Exclusive Deals</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            1+1 = 2, and 2 + 2 = 4.
          </h1>
          <p className="text-light-navy/60 text-base sm:text-lg max-w-xl leading-relaxed">
            Toh Aao Milte Hain, Na Humaare Dil Mein, Na Tumhaare Dil Mein Chor.
          </p>
        </div>
      </section>

      {/* Content + Form */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="space-y-6 text-secondary-text text-sm sm:text-[15px] leading-[1.9] text-justify mb-10 sm:mb-12">
                <p>
                  At EastOfKailash.com we believe in keeping life simple. Whatever we speak should be a truth without manipulation. Our business process follows the same ethics. We invite you to share your buy, sell, rent or any other property requirements with us.
                </p>
                <p>
                  We will work with all our might to give you the best practical solution based on logic and facts at our earliest.
                </p>
                <p>
                  You will stay free to accept or reject our offer.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
                {[
                  { icon: Shield, title: 'Privacy First', desc: 'We don\'t scream in the market for your property needs.' },
                  { icon: Handshake, title: 'Trusted Channels', desc: 'Personalized trusted channels to carry out the process.' },
                  { icon: Eye, title: 'Minimalist & Dignified', desc: 'A minimalist & dignified procedure, always.' },
                ].map((item, idx) => (
                  <div key={idx} className="border border-border-color p-5 hover:border-gold-accent/40 hover:shadow-md transition-all duration-200">
                    <div className="w-10 h-10 bg-light-navy rounded-lg flex items-center justify-center mb-3">
                      <item.icon className="w-5 h-5 text-gold-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-primary-navy mb-1">{item.title}</h3>
                    <p className="text-xs text-secondary-text leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-light-navy/50 border border-border-color p-6 sm:p-8">
                <h3 className="text-lg font-bold text-primary-navy mb-4">EastOfKailash.com Assures</h3>
                <p className="text-sm sm:text-[15px] text-secondary-text leading-relaxed">
                  Your Neighbor Won&apos;t Say To You – <span className="text-primary-navy font-semibold">&quot;Maine Suna Hain, Aap Apni Property Bech Rahe Ho.&quot;</span>
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-5">
              <div className="bg-primary-navy text-white p-6 sm:p-8 sticky top-24">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Just Share Your Details</h2>
                <p className="text-light-navy/60 text-sm mb-6 sm:mb-8">Then Sit, Relax &amp; Enjoy The Game.</p>
                <ExclusiveDealsForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
