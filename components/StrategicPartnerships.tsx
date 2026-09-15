'use client';

import { Home as HomeIcon, BadgeIndianRupee, Key, Users, Globe, FileCheck, FileSignature, Landmark, Hammer, Truck, Wallet, Handshake, Scale, PenLine, Ruler, Building2, HardHat, Briefcase, ArrowUpRight } from 'lucide-react';
import { partnershipsData } from '@/lib/data';
import { site } from '@/lib/site';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: HomeIcon,
  BadgeIndianRupee,
  Key,
  Users,
  Globe,
  FileCheck,
  FileSignature,
  Landmark,
  Hammer,
  Truck,
  Wallet,
  Handshake,
  Scale,
  PenLine,
  Ruler,
  Building: Building2,
  HardHat,
  Briefcase,
};

export function StrategicPartnerships() {
  const scrollToPartnerSection = () => {
    document.getElementById('partner-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-light-navy/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Partnerships</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Explore Strategic Partnerships
          </h2>
          <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
            We welcome collaboration with industry peers who share our vision. If you wish to explore a partnership with EastOfKailash.com, please submit your comprehensive profile and business proposal for review. This initiates our confidential vetting process.
          </p>
          <p className="text-secondary-text text-sm sm:text-base mt-3">
            Whether you are an architect, an interior designer, a property dealer, a lawyer, a deed writer, a builder, or just a reference giver, we welcome and assure you of a progressive professional association with EastOfKailash.com.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {partnershipsData.map((partner) => {
            const Icon = iconMap[partner.icon] || Briefcase;
            return (
              <div
                key={partner.slug}
                className="group flex items-start gap-4 px-5 sm:px-6 py-5 sm:py-6 bg-white border-[3px] border-primary-navy hover:border-gold-accent hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-lg bg-primary-navy flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
                  <Icon className="w-5 h-5 text-white group-hover:text-primary-navy transition-colors" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <h3 className="text-sm sm:text-base font-bold text-primary-navy mb-1 leading-snug">
                    {partner.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={scrollToPartnerSection}
            className="inline-flex items-center gap-2 bg-primary-navy text-white hover:bg-gold-accent hover:text-primary-navy px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300"
          >
            Partner With EastOfKailash.com
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
