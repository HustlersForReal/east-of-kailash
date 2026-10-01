'use client';

import { useState } from 'react';
import { StampDutyCalculator } from './StampDutyCalculator';
import { RentCalculator } from './RentCalculator';

type Tab = 'stamp' | 'rent';

const TABS: { key: Tab; label: string; short: string }[] = [
  { key: 'stamp', label: 'Stamp Duty Calculator', short: 'Stamp Duty' },
  { key: 'rent', label: 'Rent Agreement Calculator', short: 'Rent Agreement' },
];

export function CalculatorsSection() {
  const [tab, setTab] = useState<Tab>('stamp');

  return (
    <section id="calculators" className="py-14 sm:py-20 md:py-24 lg:py-32 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
            Free Tools
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-3 sm:mb-4 tracking-tight leading-[1.1]">
            Work Out Your Costs Before You Move
          </h2>
          <p className="text-secondary-text text-base sm:text-lg">
            The actual numbers behind a Delhi property deal: what the government will charge you,
            and what a rent agreement will run you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-6" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={tab === t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 px-3 sm:px-6 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider border transition-colors whitespace-nowrap ${
                  tab === t.key
                    ? 'bg-primary-navy text-white border-primary-navy'
                    : 'bg-white text-secondary-text border-border-color hover:border-gold-accent/40 hover:text-gold-accent'
                }`}
              >
                <span className="sm:hidden">{t.short}</span>
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="border border-border-color p-5 sm:p-8 bg-panel-bg">
            {tab === 'stamp' ? <StampDutyCalculator /> : <RentCalculator />}
          </div>
        </div>
      </div>
    </section>
  );
}
