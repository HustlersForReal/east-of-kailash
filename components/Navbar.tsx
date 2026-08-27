'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { areaProfiles } from '@/lib/data';
import { site } from '@/lib/site';

export function Navbar() {
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border-color">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-primary-navy whitespace-nowrap">
              EastOfKailash<span className="text-gold-accent">.com</span>
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-5">
            <Link href="/" className="text-sm font-semibold text-primary-navy hover:text-gold-accent transition-colors">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">
                Explore East of Kailash
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>
              {exploreOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-white border border-border-color shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-xl p-3 w-[680px] max-h-[420px] overflow-y-auto">
                    <div className="grid grid-cols-3 gap-0.5">
                      {areaProfiles.map((area) => (
                        <Link
                          key={area.slug}
                          href={`/area/${area.slug}`}
                          className="flex items-center gap-1.5 text-[12px] text-secondary-text hover:text-gold-accent hover:bg-light-navy/60 rounded-md px-2.5 py-2 transition-all duration-150"
                        >
                          <span className="truncate">{area.name}</span>
                          <ChevronDown className="w-3 h-3 -rotate-90 shrink-0 opacity-40" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-3 h-3 bg-white border-l border-t border-border-color rotate-45" />
                </div>
              )}
            </div>
            <Link href="/exclusive-deals" className="text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">
              Exclusive Deals
            </Link>
            <Link href="/about" className="text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">
              About Us
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href={site.whatsapp(`Hello ${site.name}, I want to get in touch.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-navy text-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-gold-accent hover:text-primary-navy transition-colors whitespace-nowrap"
          >
            Contact / WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
