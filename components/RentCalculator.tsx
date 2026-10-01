'use client';

import { useState } from 'react';
import { AlertTriangle, Calculator } from 'lucide-react';
import { Dropdown, type DropdownOption } from '@/components/ui/Dropdown';
import { WhatsAppLink } from '@/components/WhatsAppLink';
import { site } from '@/lib/site';

const INCREMENT_OPTIONS: DropdownOption[] = [
  { value: '0', label: 'No Increment (0%)' },
  { value: '5', label: '5%' },
  { value: '10', label: '10%' },
  { value: '15', label: '15%' },
  { value: '20', label: '20%' },
];

const EVERY_OPTIONS: DropdownOption[] = [
  { value: '6', label: 'Every 6 Months' },
  { value: '12', label: 'Every 12 Months' },
  { value: '24', label: 'Every 24 Months' },
];

type Lease = 'up_to_11' | 'y1_5' | 'y5_10' | 'y10_plus';

const LEASE_OPTIONS: DropdownOption[] = [
  { value: 'up_to_11', label: 'Up to 11 Months' },
  { value: 'y1_5', label: '1-5 Years' },
  { value: 'y5_10', label: '5-10 Years' },
  { value: 'y10_plus', label: 'Beyond 10 Years' },
];

// Representative length in months for each lease band.
const LEASE_MONTHS: Record<Lease, number> = {
  up_to_11: 11,
  y1_5: 36,
  y5_10: 84,
  y10_plus: 156,
};

const FLAT_STAMP_UNDER_11 = 100;
const REGISTRATION_FEE = 1100;

const inr = (n: number) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

/** Month-by-month rent with compounding increments. */
function calcAvgAnnualRent(
  baseRent: number,
  incrementPct: number,
  incrementMonths: number,
  totalMonths: number
): number {
  let totalRent = 0;
  let currentRent = baseRent;
  for (let m = 0; m < totalMonths; m++) {
    totalRent += currentRent;
    if (incrementPct > 0 && incrementMonths > 0 && (m + 1) % incrementMonths === 0) {
      currentRent = Math.round(currentRent * (1 + incrementPct / 100));
    }
  }
  return Math.round(totalRent / (totalMonths / 12));
}

export function RentCalculator() {
  const [baseRent, setBaseRent] = useState('');
  const [deposit, setDeposit] = useState('');
  const [increment, setIncrement] = useState('0');
  const [every, setEvery] = useState('12');
  const [lease, setLease] = useState<Lease>('up_to_11');

  const rent = Number(baseRent);
  const valid = baseRent.trim() !== '' && Number.isFinite(rent) && rent > 0;

  const incrementPct = Number(increment);
  const incrementMonths = Number(every);
  const totalMonths = LEASE_MONTHS[lease];

  const avgAnnualRent = valid
    ? calcAvgAnnualRent(rent, incrementPct, incrementMonths, totalMonths)
    : 0;

  const stampDuty = !valid
    ? 0
    : lease === 'up_to_11'
      ? FLAT_STAMP_UNDER_11
      : lease === 'y1_5'
        ? (avgAnnualRent * 2) / 100
        : lease === 'y5_10'
          ? (avgAnnualRent * 5) / 100
          : (avgAnnualRent * 2 * 5) / 100;

  const regFee = !valid || lease === 'up_to_11' ? 0 : REGISTRATION_FEE;
  const total = stampDuty + regFee;

  const stampNote =
    lease === 'up_to_11'
      ? '₹100 flat'
      : lease === 'y1_5'
        ? '2% of avg. annual rent'
        : lease === 'y5_10'
          ? '5% of avg. annual rent'
          : '5% of 2x avg. annual rent';

  const regNote = lease === 'up_to_11' ? 'Not required' : '₹1,100 flat';
  const needsRegistration = totalMonths >= 12;

  const label = 'block text-xs font-semibold uppercase tracking-wider text-secondary-text mb-2';
  const inputCls =
    'w-full bg-white border border-border-color rounded-lg px-3.5 py-2.5 text-sm text-primary-navy placeholder:text-secondary-text/40 outline-none focus:border-gold-accent transition-colors';

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={label} htmlFor="rcRent">Base Monthly Rent (₹)</label>
          <input
            id="rcRent"
            type="text"
            inputMode="numeric"
            value={baseRent}
            onChange={(e) => setBaseRent(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
            placeholder="e.g. 25000"
            className={inputCls}
          />
        </div>
        <div>
          <label className={label} htmlFor="rcDeposit">Security Deposit (₹)</label>
          <input
            id="rcDeposit"
            type="text"
            inputMode="numeric"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
            placeholder="e.g. 100000"
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div>
          <span className={label}>Rent Increment</span>
          <Dropdown
            id="rcIncrement"
            value={increment}
            onChange={setIncrement}
            options={INCREMENT_OPTIONS}
            variant="light"
          />
        </div>
        <div>
          <span className={label}>Increment Every</span>
          <Dropdown
            id="rcEvery"
            value={every}
            onChange={setEvery}
            options={EVERY_OPTIONS}
            variant="light"
            className={incrementPct === 0 ? 'opacity-40 pointer-events-none' : ''}
          />
        </div>
      </div>

      <div className="mt-4">
        <span className={label}>Lease Duration</span>
        <Dropdown
          id="rcLease"
          value={lease}
          onChange={(v) => setLease(v as Lease)}
          options={LEASE_OPTIONS}
          variant="light"
        />
      </div>

      {valid && (
        <div className="mt-5 bg-gold-accent/10 border border-gold-accent/30 px-4 py-3.5 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-primary-navy">Calculated Average Annual Rent</span>
          <span className="text-base font-bold text-gold-accent tabular-nums shrink-0">₹{inr(avgAnnualRent)}</span>
        </div>
      )}

      <div className="mt-4 border border-border-color">
        <Row label="Stamp Duty" value={inr(stampDuty)} note={stampNote} />
        <Row label="Registration Fee" value={inr(regFee)} note={regNote} />
        <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4 bg-gold-accent/10 border-t border-border-color">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-navy">
            <Calculator className="w-4 h-4 text-gold-accent" />
            Total Amount
          </span>
          <span className="text-lg font-bold text-gold-accent tabular-nums">₹{inr(total)}</span>
        </div>
      </div>

      {needsRegistration && (
        <p className="mt-3 flex items-start gap-2 text-[11px] text-gold-accent leading-relaxed">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-px" />
          Registration is mandatory for leases of 12 months or more.
        </p>
      )}

      <p className="mt-2 text-[11px] text-secondary-text/70 leading-relaxed">
        *Estimates only. Final charges may vary based on agreement terms. Stamp duty rates as per Delhi Govt.
      </p>

      <WhatsAppLink
        message={`Hello ${site.name}, I need a Rent Agreement. Estimated cost: ₹${inr(total)}`}
        className="mt-4 inline-flex items-center justify-center gap-2 bg-primary-navy hover:bg-gold-accent text-white hover:text-primary-navy px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors w-full"
      >
        Get Your Rent Agreement
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
