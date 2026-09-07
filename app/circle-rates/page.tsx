'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, MapPin, Building2 } from 'lucide-react';
import { circleRates, type CircleRateArea } from '@/lib/circle-rates';

export default function CircleRatesPage() {
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
      <section className="bg-primary-navy text-white py-14 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-6 sm:mb-8 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
            Circle Rates
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
            Circle Rates for<br />
            <span className="text-gold-accent">East of Kailash</span>
          </h1>
          <p className="text-light-navy/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Official Delhi Government circle rates for East of Kailash (110065). Rates are as per the latest government notification.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="bg-white border-b border-border-color sticky top-16 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text" />
            <input
              type="text"
              placeholder="Search area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-border-color bg-light-navy/30 focus:outline-none focus:border-gold-accent transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Table */}
      <section className="py-10 sm:py-14 md:py-20 bg-light-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <MapPin className="w-12 h-12 text-border-color mx-auto mb-4" />
              <p className="text-secondary-text text-lg font-medium">No areas found</p>
              <p className="text-secondary-text/60 text-sm mt-1">Try a different search.</p>
            </div>
          ) : (
            <div className="bg-white border border-border-color overflow-hidden">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary-navy text-white">
                      <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">#</th>
                      <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Area</th>
                      <th className="text-left px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Category</th>
                      <th className="text-right px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Rate / m²</th>
                      <th className="text-right px-6 py-4 text-[11px] font-semibold uppercase tracking-wider">Rate / sq ft</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((area, idx) => (
                      <tr key={area.slug} className="border-t border-border-color hover:bg-light-navy/40 transition-colors">
                        <td className="px-6 py-4 text-sm text-secondary-text">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gold-accent shrink-0" />
                            <span className="text-sm font-semibold text-primary-navy">{area.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-primary-navy bg-light-navy rounded">
                            {area.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-bold text-primary-navy font-mono">{formatCurrency(area.ratePerSqMeter)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-primary-text font-mono">{formatCurrency(area.ratePerSqFeet)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-border-color">
                {filtered.map((area, idx) => (
                  <div key={area.slug} className="p-4 hover:bg-light-navy/40 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gold-accent shrink-0" />
                        <span className="text-sm font-bold text-primary-navy">{area.name}</span>
                      </div>
                      <span className="inline-flex items-center justify-center w-7 h-7 text-[11px] font-bold text-primary-navy bg-light-navy rounded shrink-0">
                        {area.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-primary-navy font-mono">{formatCurrency(area.ratePerSqMeter)}</span>
                      <span className="text-secondary-text text-xs">/m²</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-secondary-text">
            <span>Category <strong className="text-primary-navy">C</strong> = Standard residential</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 md:py-24 bg-primary-navy text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
            Need Expert Guidance on Circle Rates?
          </h2>
          <p className="text-base sm:text-lg text-light-navy/60 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
            Our team can help you understand circle rates and how they impact your property transaction in East of Kailash.
          </p>
          <Link href="/exclusive-deals" className="inline-flex items-center justify-center gap-2 bg-gold-accent text-primary-navy hover:bg-white px-8 sm:px-10 py-3.5 sm:py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300">
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
