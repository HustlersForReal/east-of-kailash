'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Home, MapPin, Plus, BarChart3, Star, Info } from 'lucide-react';
import { areaProfiles } from '@/lib/data';
import { site } from '@/lib/site';

export function Navbar() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExplore, setMobileExplore] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white border-b border-border-color">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-8">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-primary-navy whitespace-nowrap">
                EastOfKailash<span className="text-gold-accent">.com</span>
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-5">
              <Link href="/" className="text-sm font-semibold text-primary-navy hover:text-gold-accent transition-colors">Home</Link>
              <div className="relative" onMouseEnter={() => setExploreOpen(true)} onMouseLeave={() => setExploreOpen(false)}>
                <button className="flex items-center gap-1 text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">
                  Explore East of Kailash
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
                </button>
                {exploreOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                    <div className="bg-white border border-border-color shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-xl p-3 w-[680px] max-h-[420px] overflow-y-auto">
                      <div className="grid grid-cols-3 gap-0.5">
                        {areaProfiles.map((area) => (
                          <Link key={area.slug} href={`/area/${area.slug}`} className="flex items-center gap-1.5 text-[12px] text-secondary-text hover:text-gold-accent hover:bg-light-navy/60 rounded-md px-2.5 py-2 transition-all duration-150">
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
              <Link href="/list-your-property" className="text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">List Your Property</Link>
              <Link href="/circle-rates" className="text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">Circle Rates</Link>
              <Link href="/exclusive-deals" className="text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">Exclusive Deals</Link>
              <Link href="/about" className="text-sm font-semibold text-secondary-text hover:text-gold-accent transition-colors">About Us</Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a href={site.whatsapp(`Hello ${site.name}, I want to get in touch.`)} target="_blank" rel="noopener noreferrer" className={`bg-primary-navy text-white px-3 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-sm font-semibold uppercase tracking-wider hover:bg-gold-accent hover:text-primary-navy transition-colors whitespace-nowrap ${mobileOpen ? 'hidden lg:inline-flex' : 'inline-flex'}`}>Contact</a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 -mr-1 text-primary-navy hover:text-gold-accent transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute top-16 sm:top-20 left-0 right-0 bottom-0 bg-white shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${mobileOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <nav className="px-3 py-4 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-primary-navy hover:bg-light-navy rounded-xl transition-colors"><Home className="w-4 h-4 text-gold-accent" /> Home</Link>
            <button onClick={() => setMobileExplore(!mobileExplore)} className="w-full flex items-center justify-between px-3 py-3 text-sm font-semibold text-secondary-text hover:bg-light-navy rounded-xl transition-colors">
              <span className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold-accent" /> Explore East of Kailash</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExplore ? 'rotate-180' : ''}`} />
            </button>
            {mobileExplore && (
              <div className="ml-4 pl-3 border-l border-border-color space-y-0.5 max-h-[260px] overflow-y-auto py-1">
                {areaProfiles.map((area) => (
                  <Link key={area.slug} href={`/area/${area.slug}`} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-secondary-text hover:text-gold-accent hover:bg-light-navy/60 rounded-md transition-colors">{area.name}</Link>
                ))}
              </div>
            )}
            <Link href="/list-your-property" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gold-accent bg-gold-accent/10 hover:bg-gold-accent/20 rounded-xl transition-colors"><Plus className="w-4 h-4" /> List Your Property</Link>
            <Link href="/circle-rates" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-secondary-text hover:bg-light-navy rounded-xl transition-colors"><BarChart3 className="w-4 h-4 text-gold-accent" /> Circle Rates</Link>
            <Link href="/exclusive-deals" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-secondary-text hover:bg-light-navy rounded-xl transition-colors"><Star className="w-4 h-4 text-gold-accent" /> Exclusive Deals</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-secondary-text hover:bg-light-navy rounded-xl transition-colors"><Info className="w-4 h-4 text-gold-accent" /> About Us</Link>
            <div className="pt-4 mt-2 border-t border-border-color">
              <a href={site.whatsapp(`Hello ${site.name}, I want to get in touch.`)} target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-primary-navy text-white px-4 py-3 text-sm font-semibold uppercase tracking-wider rounded-xl hover:bg-gold-accent hover:text-primary-navy transition-colors w-full">Contact / WhatsApp</a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
