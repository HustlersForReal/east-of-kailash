'use client';

import { Home as HomeIcon, BadgeIndianRupee, Key, Users, Globe, FileCheck, FileSignature, Landmark, Hammer, Truck, Wallet, Handshake, Scale, PenLine, Ruler, Building2, HardHat, Briefcase } from 'lucide-react';
import { servicesData } from '@/lib/data';
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

function ServiceCard({ service }: { service: typeof servicesData[number] }) {
  const Icon = iconMap[service.icon] || HomeIcon;
  return (
    <a
      href={site.whatsapp(`Hello ${site.name}, ${service.message}`)}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-4 px-5 sm:px-6 py-5 sm:py-6 bg-white border-[3px] border-primary-navy hover:border-gold-accent hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="w-11 h-11 rounded-lg bg-primary-navy flex items-center justify-center shrink-0 group-hover:bg-gold-accent transition-colors">
        <Icon className="w-5 h-5 text-white group-hover:text-primary-navy transition-colors" />
      </div>
      <div className="min-w-0 pt-0.5">
        <h3 className="text-sm sm:text-base font-bold text-primary-navy mb-1 group-hover:text-gold-accent transition-colors leading-snug">
          {service.title}
        </h3>
        <p className="text-xs sm:text-[13px] text-secondary-text leading-relaxed">
          {service.description}
        </p>
      </div>
    </a>
  );
}

export function OurServices() {
  const firstNine = servicesData.slice(0, 9);
  const lastTwo = servicesData.slice(9);

  return (
    <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">Our Services</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            Actions Speaks Louder Than Words
          </h2>
          <p className="text-secondary-text text-base sm:text-lg leading-relaxed">
            Whatever your property need is, we have got you covered. From beginning till the end every step with EastOfKailash.com is handled with care and total discretion.
          </p>
        </div>

        <p className="text-primary-navy font-bold text-sm sm:text-base mb-5 sm:mb-6">
          Choose Your Specific Need From Our Services Mentioned Below.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {firstNine.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
          {lastTwo.map((service) => (
            <div key={service.slug} className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
