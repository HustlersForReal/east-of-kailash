'use client';

import { Home as HomeIcon, BadgeIndianRupee, Key, Users, Globe, FileCheck, FileSignature, Landmark, Hammer, Truck, Wallet, Handshake, Scale, PenLine, Ruler, Building2, HardHat, Briefcase, ArrowRight } from 'lucide-react';
import { servicesData } from '@/lib/data';
import { site } from '@/lib/site';
import { WhatsAppLink } from './WhatsAppLink';

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

function ServiceCard({ service }: { service: typeof servicesData[number] }) {
  const Icon = iconMap[service.icon] || HomeIcon;
  return (
    <WhatsAppLink
      message={`Hello ${site.name}, ${service.message}`}
      className="group flex items-start gap-4 px-5 sm:px-6 py-5 sm:py-6 bg-white border-[3px] border-primary-navy hover:border-gold-accent hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="w-11 h-11 rounded-lg bg-primary-navy flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
        <Icon className="w-5 h-5 text-white group-hover:text-primary-navy transition-colors" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="text-sm sm:text-base font-bold text-primary-navy mb-1 group-hover:text-gold-accent transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed">
          {service.description}
        </p>
      </div>
      <ArrowRight className="w-5 h-5 text-secondary-text/40 group-hover:text-gold-accent group-hover:translate-x-1 transition-all shrink-0 self-center" />
    </WhatsAppLink>
  );
}

const roleSlugs = ['buyer', 'seller', 'landlord', 'tenant', 'nri'];

const legalDocServices = [
  'All Deeds Drafting & Registration',
  'Property Verification',
  'Sale Deed',
  'Gift Deed',
  'Relinquishment Deed',
  'Rent Agreement',
  'No Objection Certificate (NOC)',
  'Valuation Report',
  'Mutation',
  'Real Estate Liaisoning',
  'MCD / DDA / L&DO / NDMC',
  'Regularisation',
  'Property Tax Assessment',
  'Surviving Member Certificate',
  'Plan Sanctioning',
  'Residential / Commercial / Industrial',
  'Capital Gain',
  'Structural Stability Certificate',
  'Renovation',
  'Relocation',
  'Property Filming',
  'Vaastu Consultation',
  'NRI Property Assistance',
  'Buy / Sell / Rent At Minimum Commission',
  'A To Z Buying / Selling Assistance',
];

export function OurServices() {
  const roles = servicesData.filter((s) => roleSlugs.includes(s.slug));
  const services = servicesData.filter((s) => !roleSlugs.includes(s.slug));

  return (
    <section id="services" className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Who Are You</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Actions Speaks Louder Than Words
          </h2>
          <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
            Whatever your property need is, we have got you covered. From beginning till the end every step with EastOfKailash.com is handled with care and total discretion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {roles.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* End-To-End Property & Legal Support subsection — temporarily hidden.
        <div className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-border-color">
          <h3 className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl font-bold text-primary-navy tracking-tight leading-[1.1] mb-8 sm:mb-10">
            <span className="inline-block h-7 sm:h-8 w-1 sm:w-1.5 bg-gold-accent shrink-0" />
            End-To-End Property & Legal Support
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5 sm:gap-3">
            {legalDocServices.map((item, i) => (
              <WhatsAppLink
                key={item}
                message={`Hello EastOfKailash.com, I need assistance with ${item}.`}
                className="group flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-3 sm:py-3.5 bg-primary-navy hover:bg-gold-accent transition-colors duration-200 cursor-pointer"
              >
                <span className="text-[10px] sm:text-[11px] font-black tracking-wider text-gold-accent/70 group-hover:text-primary-navy/60 transition-colors shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-primary-navy transition-colors leading-snug">
                  {item}
                </span>
              </WhatsAppLink>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
