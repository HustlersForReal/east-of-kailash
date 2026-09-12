"use client";

import { MapPin, Award, Home } from "lucide-react";
import { site } from "@/lib/site";

export function BrandStorySection() {
  const stats = [
    { icon: <Home className="w-5 h-5" />, value: "1,000+", label: "Families Served" },
    { icon: <Award className="w-5 h-5" />, value: "50+", label: "Years of Trust" },
    { icon: <MapPin className="w-5 h-5" />, value: "14", label: "Areas Mapped" },
  ];

  return (
    <section className="py-10 sm:py-16 bg-light-navy border-b border-primary-navy/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3">
          Our Story
        </p>
        <h2 className="font-extrabold text-2xl sm:text-4xl text-primary-navy tracking-[-0.02em] mb-4">
          {site.quote.charAt(0) + site.quote.slice(1).toLowerCase()}
        </h2>
        <p className="font-sans text-sm sm:text-base text-secondary-text max-w-2xl mx-auto mb-8">
          {site.name} is East of Kailash&apos;s hyperlocal real-estate marketplace — from Blocks A to G, DDA Flats
          to the Community Centre belt. Everything you need to discover, understand, and transact property
          in South Delhi&apos;s most prestigious colony, all in one place.
        </p>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-border-color px-3 py-4 sm:py-5">
              <div className="w-9 h-9 rounded-full bg-gold-accent/15 flex items-center justify-center mx-auto mb-2 text-gold-accent">
                {s.icon}
              </div>
              <div className="font-extrabold text-lg sm:text-2xl text-primary-navy">{s.value}</div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-secondary-text mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
