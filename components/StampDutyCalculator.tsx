'use client';

import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Dropdown, type DropdownOption } from '@/components/ui/Dropdown';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { site } from '@/lib/site';

const LOCATION_OPTIONS: DropdownOption[] = [{ value: 'delhi', label: 'Delhi' }];

type Ownership = 'male' | 'female' | 'joint';

const OWNERSHIP_OPTIONS: { value: Ownership; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'joint', label: 'Joint' },
];

// Stamp % by location and ownership.
// NDMC and Cantonment are wired up but not selectable: the Location dropdown
// only offers Delhi, so that branch is currently unreachable.
const STAMP_RATES: Record<string, Record<Ownership, number>> = {
  delhi: { male: 6, female: 4, joint: 5 },
  ndmc: { male: 5.5, female: 3.5, joint: 4.5 },
};
const CANTONMENT_FLAT_RATE = 3;

const REGISTRATION_RATE = 0.01;
const REGISTRATION_CAP = 100000;
const MCD_THRESHOLD = 2500000;
const MCD_RATE = 0.01;

const inr = (n: number) =>
  n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

export function StampDutyCalculator() {
  const [value, setValue] = useState('');
  const [location, setLocation] = useState('delhi');
  const [ownership, setOwnership] = useState<Ownership>('male');

  const amount = Number(value);
  const valid = value.trim() !== '' && Number.isFinite(amount) && amount > 0;

  let stampPercent = 0;
  if (location === 'cantonment') {
    stampPercent = CANTONMENT_FLAT_RATE;
  } else {
    stampPercent = STAMP_RATES[location]?.[ownership] ?? STAMP_RATES.delhi[ownership];
  }

  const stampDuty = valid ? (amount * stampPercent) / 100 : 0;
  const regFee = valid ? Math.min(amount * REGISTRATION_RATE, REGISTRATION_CAP) : 0;
  const mcdDuty = valid && amount > MCD_THRESHOLD ? amount * MCD_RATE : 0;
  const total = stampDuty + regFee + mcdDuty;

  const label = 'block text-xs font-semibold uppercase tracking-wider text-secondary-text mb-2';
  const inputCls =
    'w-full bg-white border border-border-color rounded-lg px-3.5 py-2.5 text-sm text-primary-navy placeholder:text-secondary-text/40 outline-none focus:border-gold-accent transition-colors';

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="sdValue">Property Value (₹)</label>
          <input
            id="sdValue"
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, '').slice(0, 12))}
            placeholder="e.g. 5000000"
            className={inputCls}
          />
        </div>
        <div>
          <span className={label}>Location</span>
          <Dropdown
            id="sdLocation"
            value={location}
            onChange={setLocation}
            options={LOCATION_OPTIONS}
            variant="light"
          />
        </div>
      </div>

      <div className="mt-4">
        <span className={label}>Ownership Type</span>
        <div className="grid grid-cols-3 gap-2">
          {OWNERSHIP_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setOwnership(opt.value)}
              className={`py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-colors ${
                ownership === opt.value
                  ? 'bg-primary-navy text-white border-primary-navy'
                  : 'bg-white text-secondary-text border-border-color hover:border-gold-accent/40'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 border border-border-color">
        <Row label="Stamp Duty" value={inr(stampDuty)} note={`${stampPercent}%`} />
        <Row label="Registration Fee" value={inr(regFee)} note="1% Max ₹1 Lakh" />
        {mcdDuty > 0 && (
          <Row label="MCD Transfer Duty" value={inr(mcdDuty)} note="1% if ₹25 Lacs+" />
        )}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4 bg-gold-accent/10 border-t border-border-color">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-navy">
            <Calculator className="w-4 h-4 text-gold-accent" />
            Total Amount
          </span>
          <span className="text-lg font-bold text-gold-accent tabular-nums">₹{inr(total)}</span>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-secondary-text/70 leading-relaxed">
        *Stamp duty and registration fee are paid to the government. Our service charges are separate.
      </p>

      <WhatsAppLink
        message={`Hello ${site.name}, I checked the stamp duty (₹${inr(total)}) and need help with registration.`}
        className="mt-4 inline-flex items-center justify-center gap-2 bg-primary-navy hover:bg-gold-accent text-white hover:text-primary-navy px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors w-full"
      >
        Need Help With Registration?
      </WhatsAppLink>
    </div>
  );
}

function Row({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-3.5 border-b border-border-color last:border-b-0">
      <div>
        <div className="text-sm font-semibold text-primary-navy">{label}</div>
        <div className="text-[11px] text-secondary-text/70">{note}</div>
      </div>
      <span className="text-sm font-semibold text-primary-navy tabular-nums shrink-0">₹{value}</span>
    </div>
  );
}
