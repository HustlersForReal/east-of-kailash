'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, MapPin, Building2, X } from 'lucide-react';
import { circleRates, type CircleRateArea } from '@/lib/circle-rates';

export default function CircleRatesClient() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return circleRates.filter((area) =>
      search === '' || area.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-navy text-white py-10 sm:py-14 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-colors">
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" />
            Back to Home
          </Link>
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-2 sm:mb-3 block">
            Circle Rates
          </span>
          <h1 className="text-[28px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-3 sm:mb-4">
            Circle Rates for<br />
            <span className="text-gold-accent">East of Kailash</span>
          </h1>
          <p className="text-light-navy/60 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            Official Delhi Government circle rates for East of Kailash (110065). Rates as per latest government notification.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white border-b border-border-color sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col xs:flex-row gap-3 xs:items-center justify-between">
            <div className="relative flex-1 xs:max-w-[320px] sm:max-w-[360px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text" />
              <input
                type="text"
                placeholder="Search area..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-9 py-3 sm:py-2.5 text-sm border border-border-color bg-light-navy/30 focus:outline-none focus:border-gold-accent focus:bg-white transition-colors rounded-lg"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-secondary-text hover:text-primary-navy transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <span className="text-xs sm:text-sm text-secondary-text shrink-0">
              <span className="font-semibold text-primary-navy">{filtered.length}</span> of {circleRates.length} areas
            </span>
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-6 sm:py-10 lg:py-14 bg-light-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white border border-border-color rounded-xl">
              <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-border-color mx-auto mb-3" />
              <p className="text-secondary-text text-base sm:text-lg font-medium">No areas found</p>
              <p className="text-secondary-text/60 text-xs sm:text-sm mt-1">Try a different search.</p>
            </div>
          ) : (
            <div className="bg-white border border-border-color rounded-xl overflow-hidden shadow-sm">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary-navy text-white">
                      <th className="text-left px-4 lg:px-6 py-3.5 lg:py-4 text-[11px] font-semibold uppercase tracking-wider">#</th>
                      <th className="text-left px-4 lg:px-6 py-3.5 lg:py-4 text-[11px] font-semibold uppercase tracking-wider">Area</th>
                      <th className="text-left px-4 lg:px-6 py-3.5 lg:py-4 text-[11px] font-semibold uppercase tracking-wider">Category</th>
                      <th className="text-right px-4 lg:px-6 py-3.5 lg:py-4 text-[11px] font-semibold uppercase tracking-wider">Rate / m²</th>
                      <th className="text-right px-4 lg:px-6 py-3.5 lg:py-4 text-[11px] font-semibold uppercase tracking-wider">Rate / sq ft</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((area, idx) => (
                      <tr key={area.slug} className="border-t border-border-color hover:bg-light-navy/40 transition-colors">
                        <td className="px-4 lg:px-6 py-3.5 lg:py-4 text-sm text-secondary-text">{idx + 1}</td>
                        <td className="px-4 lg:px-6 py-3.5 lg:py-4">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-lg bg-light-navy flex items-center justify-center shrink-0">
                              <Building2 className="w-4 h-4 text-gold-accent" />
                            </span>
                            <span className="text-sm font-semibold text-primary-navy whitespace-nowrap">{area.name}</span>
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-3.5 lg:py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-primary-navy bg-light-navy rounded-lg">
                            {area.category}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-3.5 lg:py-4 text-right">
                          <span className="text-sm font-bold text-primary-navy font-mono">{formatCurrency(area.ratePerSqMeter)}</span>
                        </td>
                        <td className="px-4 lg:px-6 py-3.5 lg:py-4 text-right">
                          <span className="text-sm font-semibold text-primary-text font-mono">{formatCurrency(area.ratePerSqFeet)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-border-color">
                {filtered.map((area) => (
                  <div key={area.slug} className="p-4 sm:p-5 hover:bg-light-navy/30 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-9 h-9 rounded-lg bg-light-navy flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-gold-accent" />
                        </span>
                        <span className="text-[15px] font-bold text-primary-navy leading-tight truncate">{area.name}</span>
                      </div>
                      <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-primary-navy bg-light-navy rounded-lg shrink-0">
                        {area.category}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-light-navy/50 rounded-lg px-3 py-2.5">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-secondary-text mb-1">Per m²</div>
                        <div className="text-sm font-bold text-primary-navy font-mono leading-none">{formatCurrency(area.ratePerSqMeter)}</div>
                      </div>
                      <div className="bg-light-navy/50 rounded-lg px-3 py-2.5">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-secondary-text mb-1">Per sq ft</div>
                        <div className="text-sm font-bold text-primary-navy font-mono leading-none">{formatCurrency(area.ratePerSqFeet)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 sm:mt-6">
            <div className="flex items-center gap-2.5 bg-white border border-border-color rounded-lg px-3 py-2.5 w-fit">
              <span className="w-7 h-7 flex items-center justify-center text-xs font-bold text-primary-navy bg-light-navy rounded-md shrink-0">C</span>
              <span className="text-xs text-secondary-text">Standard residential — all blocks in East of Kailash</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 lg:py-20 bg-primary-navy text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 tracking-tight leading-tight">
            Need Expert Guidance on Circle Rates?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-light-navy/60 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Our team can help you understand circle rates and how they impact your property transaction in East of Kailash.
          </p>
          <Link href="/exclusive-deals" className="inline-flex items-center justify-center gap-2 bg-gold-accent text-primary-navy hover:bg-white px-6 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg w-full xs:w-auto">
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
