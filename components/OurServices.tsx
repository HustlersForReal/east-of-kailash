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

        <p className="text-primary-navy font-bold text-sm sm:text-base mb-5 sm:mb-6">
          Tell Us Who You Are.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {roles.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        <div className="mt-12 sm:mt-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-primary-navy mb-2 sm:mb-3 tracking-tight">
            Explore Our Services
          </h3>
          <p className="text-secondary-text text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-3xl">
            Professional services for every step of your property journey — documentation, liaisoning and beyond.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
