import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { ArrowRight, Target, Users, Award, Shield, TrendingUp, Handshake, CheckCircle2 } from 'lucide-react';
import { site } from '@/lib/site';
import { WhatsAppLink } from '@/components/WhatsAppLink';

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description:
    'Built on heritage, driven by expertise in East of Kailash. The team behind EastOfKailash.com and how we work for owners, buyers and landlords across 110065.',
  path: '/about',
});

const values = [
  { icon: Shield, title: 'Trust & Integrity', desc: '50+ years of legacy built on transparency and honest dealings.' },
  { icon: TrendingUp, title: 'Hyperlocal Expertise', desc: 'Deep knowledge of East of Kailash — from bylaws to hidden opportunities.' },
  { icon: Handshake, title: 'End-to-End Service', desc: 'One platform for buying, selling, renting, and documentation.' },
  { icon: Users, title: '100+ Experts', desc: 'A team spanning real estate, legal, liaisoning, and property management.' },
];

const milestones = [
  { year: '1960s', title: 'The Beginning', desc: 'The Saxena family starts real estate operations in South Delhi.' },
  { year: '1990s', title: 'Expansion', desc: 'Growing expertise across East of Kailash and the surrounding colonies.' },
  { year: '2010s', title: 'Digital Era', desc: 'Launch of propertybaap.com and comprehensive online services.' },
  { year: 'Today', title: 'EastOfKailash.com', desc: 'A hyperlocal platform serving 1,000+ families across the colony.' },
];

const stats = [
  { value: '50+', label: 'Years of Legacy' },
  { value: '100+', label: 'Team Experts' },
  { value: '3', label: 'Generations' },
  { value: '1000+', label: 'Properties Managed' },
  { value: '14', label: 'Areas Covered' },
  { value: '24/7', label: 'Support Available' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-gold-accent">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-6 sm:mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-4 sm:mb-5 block">About Us</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl">
            Built on Heritage,<br />
            <span className="text-gold-accent">Driven by Expertise</span> in East of Kailash
          </h1>
          <p className="mt-6 sm:mt-8 text-light-navy/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Three generations of real estate pioneers. Over five decades of trust. One colony of unmatched expertise.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
            <div>
              <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-6 sm:mb-8 tracking-tight leading-[1.1]">
                The Saxena Legacy in South Delhi
              </h2>
              <div className="space-y-5 text-secondary-text text-sm sm:text-[15px] leading-[1.9] text-justify">
                <p>
                  The EastOfKailash.com story is forged by a 50+ year old legacy, driven by 3 generations of real estate pioneers and industry leaders: <span className="text-gold-accent font-semibold">The Saxenas</span>.
                </p>
                <p>
                  Since the early days, we have done more than just watch East of Kailash grow — we were here, charting every new lane, seeing the first foundations laid, and tracking the growth of every block.
                </p>
                <p>
                  This deep, hands-on history means we hold the inherent, true knowledge required to assess the potential and value of every property you consider. We know this market better than anyone else, because we built its history.
                </p>
                <p>
                  Our expertise is not limited to property deals but also extends to real estate liaisoning. We are masters in all the building bye-laws applicable here. We have done liaisoning for 1,000+ properties in this colony.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {values.map((value, idx) => (
                <div key={idx} className="p-5 sm:p-6 border border-border-color hover:border-gold-accent/40 hover:shadow-md transition-all duration-200 bg-white group">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-light-navy flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-gold-accent/10 transition-colors">
                    <value.icon className="w-5 h-5 text-gold-accent" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-primary-navy mb-1 group-hover:text-gold-accent transition-colors">{value.title}</h3>
                  <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary-navy text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gold-accent mb-1">{stat.value}</div>
                <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-14 sm:py-20 md:py-24 bg-light-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy mb-4 sm:mb-6 tracking-tight">
              Making Every Deal Stress-Free & Complete
            </h2>
            <p className="text-secondary-text text-sm sm:text-base leading-relaxed text-justify">
              Our goal is to make your real estate deal not only stress-free but also complete, ensuring no legal flaw is left or created in the process. We don&apos;t follow a one-size-fits-all approach — instead, we carve and plan every case according to its unique requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {['No legal flaw left or created', 'Case-specific planning', 'Maximise exemptions & benefits'].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-5 sm:p-6 border border-border-color">
                <CheckCircle2 className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-primary-navy font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-14 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Journey</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-navy tracking-tight">Five Decades of Trust</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border-color -translate-x-1/2 hidden sm:block" />
            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, idx) => (
                <div key={idx} className="relative flex flex-col sm:flex-row items-start sm:items-center">
                  {idx % 2 === 0 ? (
                    <>
                      <div className="sm:w-1/2 sm:pr-10 sm:text-right order-2 sm:order-1">
                        <div className="bg-white p-5 sm:p-6 border border-border-color hover:border-gold-accent/40 hover:shadow-md transition-all duration-200 inline-block text-left sm:text-right">
                          <span className="text-gold-accent font-bold text-xs uppercase tracking-wider">{milestone.year}</span>
                          <h3 className="text-base sm:text-lg font-bold text-primary-navy mt-1 mb-1">{milestone.title}</h3>
                          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">{milestone.desc}</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center justify-center w-4 h-4 rounded-full bg-gold-accent border-4 border-white shadow shrink-0 absolute left-1/2 -translate-x-1/2 order-1 sm:order-2" />
                      <div className="sm:hidden flex items-center justify-center w-4 h-4 rounded-full bg-gold-accent border-4 border-white shadow shrink-0 absolute left-4 -translate-x-1/2 order-1" />
                      <div className="sm:w-1/2 order-3" />
                    </>
                  ) : (
                    <>
                      <div className="sm:w-1/2 order-2 sm:order-3" />
                      <div className="hidden sm:flex items-center justify-center w-4 h-4 rounded-full bg-gold-accent border-4 border-white shadow shrink-0 absolute left-1/2 -translate-x-1/2 order-2" />
                      <div className="sm:hidden flex items-center justify-center w-4 h-4 rounded-full bg-gold-accent border-4 border-white shadow shrink-0 absolute left-4 -translate-x-1/2 order-2" />
                      <div className="sm:w-1/2 sm:pl-10 order-3 sm:order-3">
                        <div className="bg-white p-5 sm:p-6 border border-border-color hover:border-gold-accent/40 hover:shadow-md transition-all duration-200">
                          <span className="text-gold-accent font-bold text-xs uppercase tracking-wider">{milestone.year}</span>
                          <h3 className="text-base sm:text-lg font-bold text-primary-navy mt-1 mb-1">{milestone.title}</h3>
                          <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">{milestone.desc}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 sm:py-20 md:py-24 bg-primary-navy text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-[0.03] pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold-accent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            Ready to Explore East of Kailash?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-light-navy/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Whether you&apos;re buying, selling, renting, or investing — discover the right property with hyperlocal expertise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/#explore" className="inline-flex items-center justify-center gap-2 bg-gold-accent text-primary-navy hover:bg-white px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300">
              Explore Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppLink message={`Hello ${site.name}, I want to know more about your services`} className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/5 px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300">
              Talk to an Expert
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  );
}
