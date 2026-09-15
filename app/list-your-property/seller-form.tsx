'use client';

import { useState, useMemo, useEffect, FormEvent } from 'react';
import { ArrowRight, ArrowLeft, Send, CheckCircle2, ChevronDown } from 'lucide-react';
import { getReferredBy } from '@/lib/referral-storage';
import {
  PROPERTY_TYPE_OPTIONS, SELL_CONFIG,
  TRANSACTION_OPTS, POSSESSION_STATUS_OPTS, OCCUPANCY_OPTS,
  NEGOTIABILITY_OPTS, OWNERSHIP_OPTS, LOAN_OPTS, DOCS_OPTS,
  LAND_TYPES, AMENITY_RES_TYPES, AMENITY_COMM_TYPES,
  RESIDENTIAL_AMENITIES, COMMERCIAL_AMENITIES, YES_NO_OPTS,
  AGE_OPTS, FLOORING_OPTS, WATER_OPTS,
  type SellFieldDef,
} from '@/lib/sell-config';
import { areaProfiles } from '@/lib/data';
import { site } from '@/lib/site';
import {
  sanitizeSellField, validateName, validatePhone,
  isPriceValid,
} from '@/lib/validation';

interface StepDef { key: string; title: string }

const SELL_STEPS: StepDef[] = [
  { key: 'basic', title: 'Basic Details' },
  { key: 'location', title: 'Property Location' },
  { key: 'specs', title: 'Property Specifications' },
  { key: 'transaction', title: 'Transaction Details' },
  { key: 'price', title: 'Price Details' },
  { key: 'amenities', title: 'Amenities & Facilities' },
  { key: 'extra', title: 'Additional Details' },
  { key: 'ownership', title: 'Ownership & Docs' },
  { key: 'referral', title: 'Referral Code' },
];

const STEP_FIELDS: Record<string, string[]> = {
  basic: ['sellerName', 'mobile', 'assetType'],
  location: ['locality', 'address'],
  specs: [],
  transaction: ['transactionType', 'possessionStatus', 'occupancyStatus'],
  price: ['expectedValue'],
  ownership: ['ownershipType', 'existingLoan', 'legalDispute'],
  referral: ['referralCode'],
};

export function SellerForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const code = getReferredBy();
    if (code) {
      const short = code.replace(/^#/, '');
      setValues(prev => (prev.referralCode ? prev : { ...prev, referralCode: short }));
    }
  }, []);

  const propType = values.assetType || '';
  const typeConfig = useMemo(() => SELL_CONFIG[propType] || [], [propType]);
  const configKeys = useMemo(() => new Set(typeConfig.map(f => f.key)), [typeConfig]);
  const isLandType = LAND_TYPES.includes(propType);
  const showAmenities = AMENITY_RES_TYPES.includes(propType) || AMENITY_COMM_TYPES.includes(propType);
  const showExtraDetails = !!propType && !isLandType;
  const showPossessionStatus = !!propType && !isLandType;
  const isResale = values.transactionType === 'Resale Property';
  const showCoveredArea = values.existingConstruction === 'Yes' && configKeys.has('coveredArea');

  const activeSteps = useMemo(() => {
    return SELL_STEPS.filter(s => {
      if (s.key === 'location') return !!propType;
      if (s.key === 'specs') return !!propType && typeConfig.length > 0;
      if (s.key === 'transaction') return !!propType;
      if (s.key === 'price') return !!propType;
      if (s.key === 'amenities') return showAmenities;
      if (s.key === 'extra') return showExtraDetails;
      if (s.key === 'ownership') return !!propType;
      return true;
    });
  }, [propType, typeConfig, showAmenities, showExtraDetails]);

  const currentStep = activeSteps[step];
  const progress = ((step + 1) / activeSteps.length) * 100;

  const set = (key: string, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }));
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  };

  const handleAssetTypeChange = (newType: string) => {
    const oldKeys = new Set(typeConfig.map(f => f.key));
    const newConfig = SELL_CONFIG[newType] || [];
    const newKeys = new Set(newConfig.map(f => f.key));
    const next = { ...values };
    oldKeys.forEach(k => { if (!newKeys.has(k)) delete next[k]; });
    delete next['amenities'];
    next.assetType = newType;
    setValues(next);
    setErrors(prev => {
      const n = { ...prev }; delete n['assetType']; return n;
    });
  };

  const handleTransactionChange = (val: string) => {
    set('transactionType', val);
    if (val === 'New Property') {
      setValues(prev => { const n = { ...prev }; delete n['occupancyStatus']; return n; });
    }
  };

  const handleConstructionToggle = (val: string) => {
    set('existingConstruction', val);
    if (val !== 'Yes') {
      setValues(prev => { const n = { ...prev }; delete n['coveredArea']; return n; });
    }
  };

  const toggleMulti = (key: string, opt: string) => {
    const current = values[key] ? values[key].split(', ').filter(Boolean) : [];
    const next = current.includes(opt) ? current.filter(v => v !== opt) : [...current, opt];
    set(key, next.join(', '));
  };

  const validateStep = (stepKey: string): Record<string, string> => {
    const e: Record<string, string> = {};

    if (stepKey === 'basic') {
      const n = validateName(values.sellerName || '');
      if (n) e.sellerName = n;
      const p = validatePhone(values.mobile || '');
      if (p) e.mobile = p;
      if (!values.assetType) e.assetType = 'Select a property type';
    }

    if (stepKey === 'location') {
      if (!values.locality) e.locality = 'Select a locality';
      if (!values.address || values.address.trim().length < 5) e.address = 'Enter a valid address (min 5 chars)';
    }

    if (stepKey === 'specs') {
      typeConfig.forEach(fd => {
        if (fd.required && fd.kind === 'chips' && !values[fd.key]) {
          e[fd.key] = `${fd.label.replace(' *', '')} is required`;
        }
        if (fd.required && fd.kind === 'select' && !values[fd.key]) {
          e[fd.key] = `${fd.label.replace(' *', '')} is required`;
        }
        if (fd.required && fd.kind === 'text' && (!values[fd.key] || !values[fd.key].trim())) {
          e[fd.key] = `${fd.label.replace(' *', '')} is required`;
        }
      });
      if (showCoveredArea && (!values.coveredArea || !values.coveredArea.trim())) {
        e.coveredArea = 'Covered Area is required when existing construction is Yes';
      }
      ['carpetArea', 'builtupArea', 'coveredArea', 'plotArea', 'roadWidth'].forEach(k => {
        if (configKeys.has(k) && values[k] && !isPriceValid(values[k].replace(/,/g, '')) && parseFloat(values[k].replace(/,/g, '')) <= 0) {
          // soft validation — just check it's a number
        }
      });
    }

    if (stepKey === 'transaction') {
      if (!values.transactionType) e.transactionType = 'Select transaction type';
      if (showPossessionStatus && !values.possessionStatus) e.possessionStatus = 'Select possession status';
      if (isResale && !values.occupancyStatus) e.occupancyStatus = 'Select occupancy status';
    }

    if (stepKey === 'price') {
      if (!values.expectedValue || !values.expectedValue.trim()) {
        e.expectedValue = 'Expected price is required';
      } else if (!isPriceValid(values.expectedValue)) {
        e.expectedValue = 'Enter a valid price (min ₹1,000)';
      }
    }

    if (stepKey === 'ownership') {
      if (!values.ownershipType) e.ownershipType = 'Select ownership type';
      if (!values.existingLoan) e.existingLoan = 'Select loan status';
      if (!values.legalDispute) e.legalDispute = 'Select dispute status';
    }

    return e;
  };

  const goNext = () => {
    const e = validateStep(currentStep.key);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    if (step < activeSteps.length - 1) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const allErrors: Record<string, string> = {};
    activeSteps.forEach(s => {
      Object.assign(allErrors, validateStep(s.key));
    });
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      for (let i = 0; i < activeSteps.length; i++) {
        const fields = STEP_FIELDS[activeSteps[i].key] || [];
        const specKeys = activeSteps[i].key === 'specs' ? typeConfig.map(f => f.key) : [];
        const allKeys = [...fields, ...specKeys];
        if (allKeys.some(fk => allErrors[fk])) {
          setStep(i);
          break;
        }
      }
      return;
    }

    setSubmitting(true);

    const lines: string[] = [
      '━━━━━━━━━━━━━━━━━━━━',
      '*EastOfKailash.com*',
      'New Property Submission',
      '━━━━━━━━━━━━━━━━━━━━',
      '',
      `*Name:* ${values.sellerName}`,
      `*Mobile:* ${values.mobile}`,
      `*Property Type:* ${propType}`,
      '',
      `*City:* Delhi`,
      `*Locality / Area:* ${values.locality || '—'}`,
      `*Address:* ${values.address || '—'}`,
      `*Pincode:* 110065`,
    ];

    if (currentStep?.key === 'specs' || activeSteps.some(s => s.key === 'specs')) {
      lines.push('');
      typeConfig.forEach(fd => {
        if (values[fd.key]) {
          lines.push(`*${fd.label.replace(' *', '')}:* ${values[fd.key]}`);
        }
      });
    }

    if (values.amenities) {
      lines.push('', `*Amenities:* ${values.amenities}`);
    }

    lines.push(
      '',
      `*Transaction Type:* ${values.transactionType || '—'}`,
      `*Possession Status:* ${values.possessionStatus || '—'}`,
    );
    if (isResale) lines.push(`*Occupancy Status:* ${values.occupancyStatus || '—'}`);

    lines.push(
      '',
      `*Expected Price:* ₹${values.expectedValue || '—'}`,
      `*Negotiability:* ${values.negotiability || '—'}`,
    );

    if (!isLandType) {
      lines.push(`*Property Age:* ${values.propertyAge || '—'}`);
      lines.push(`*Flooring:* ${values.flooring || '—'}`);
      lines.push(`*Water Supply:* ${values.waterSupply || '—'}`);
    }

    lines.push(
      '',
      `*Ownership Type:* ${values.ownershipType || '—'}`,
      `*Existing Loan:* ${values.existingLoan || '—'}`,
      `*Dispute/Litigation:* ${values.legalDispute || '—'}`,
      `*Documents Available:* ${values.documentsAvailable || '—'}`,
    );

    if (values.referralCode?.trim()) {
      lines.push(`*Referral Code:* ${values.referralCode.trim()}`);
    }

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    lines.push('', `*Date:* ${dateStr}`, `*Time:* ${timeStr}`, '━━━━━━━━━━━━━━━━━━━━');

    const message = lines.join('\n');
    const url = site.whatsapp(message);
    window.open(url, '_blank');
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-14 h-14 bg-gold-accent/15 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-gold-accent" />
        </div>
        <h3 className="text-lg font-bold mb-2">Property Listed!</h3>
        <p className="text-light-navy/60 text-sm leading-relaxed max-w-xs mx-auto">
          We&apos;ll review your property details and get in touch with you shortly on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-light-navy/50">
            Step {step + 1} of {activeSteps.length}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-accent">
            {currentStep?.title}
          </span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gold-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step Content */}
        <div className="min-h-[320px]">
          {currentStep?.key === 'basic' && (
            <div className="space-y-4">
              <FieldInput
                label="Full Name *"
                value={values.sellerName || ''}
                onChange={v => set('sellerName', sanitizeSellField('sellerName', v))}
                error={errors.sellerName}
                placeholder="Your full name"
              />
              <FieldInput
                label="Mobile Number *"
                value={values.mobile || ''}
                onChange={v => set('mobile', sanitizeSellField('mobile', v))}
                error={errors.mobile}
                placeholder="10-digit mobile number"
                type="tel"
              />
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">
                  Property Type *
                </label>
                <CustomSelect
                  value={values.assetType || ''}
                  onChange={handleAssetTypeChange}
                  groups={PROPERTY_TYPE_OPTIONS}
                  placeholder="Select property type"
                />
                {errors.assetType && <p className="text-red-400 text-xs mt-1">{errors.assetType}</p>}
              </div>
            </div>
          )}

          {currentStep?.key === 'location' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">Locality / Area *</label>
                <CustomSelect
                  value={values.locality || ''}
                  onChange={v => set('locality', v)}
                  options={areaProfiles.filter(a => a.category !== 'amenities').map(a => a.name)}
                  placeholder="Select locality in East of Kailash"
                />
                {errors.locality && <p className="text-red-400 text-xs mt-1">{errors.locality}</p>}
              </div>
              <FieldInput
                label="Full Address *"
                value={values.address || ''}
                onChange={v => set('address', v)}
                error={errors.address}
                placeholder="House / Block No., Street"
              />
              <p className="text-light-navy/40 text-xs">City: Delhi • Pincode: 110065 (auto-filled)</p>
            </div>
          )}

          {currentStep?.key === 'specs' && (
            <div className="space-y-4">
              {typeConfig.map(fd => {
                if (fd.key === 'coveredArea' && !showCoveredArea) return null;
                return (
                  <FieldRenderer
                    key={fd.key}
                    field={fd}
                    value={values[fd.key] || ''}
                    onChange={v => set(fd.key, sanitizeSellField(fd.key, v))}
                    error={errors[fd.key]}
                  />
                );
              })}
            </div>
          )}

          {currentStep?.key === 'transaction' && (
            <div className="space-y-4">
              <FieldChips
                label="Transaction Type *"
                options={TRANSACTION_OPTS}
                value={values.transactionType || ''}
                onChange={handleTransactionChange}
                error={errors.transactionType}
              />
              {showPossessionStatus && (
                <FieldChips
                  label="Possession Status *"
                  options={POSSESSION_STATUS_OPTS}
                  value={values.possessionStatus || ''}
                  onChange={v => set('possessionStatus', v)}
                  error={errors.possessionStatus}
                />
              )}
              {isResale && (
                <FieldChips
                  label="Occupancy Status *"
                  options={OCCUPANCY_OPTS}
                  value={values.occupancyStatus || ''}
                  onChange={v => set('occupancyStatus', v)}
                  error={errors.occupancyStatus}
                />
              )}
            </div>
          )}

          {currentStep?.key === 'price' && (
            <div className="space-y-4">
              <FieldInput
                label="Expected Price (₹) *"
                value={values.expectedValue || ''}
                onChange={v => set('expectedValue', sanitizeSellField('expectedValue', v) || v.replace(/[^0-9.,]/g, ''))}
                error={errors.expectedValue}
                placeholder="e.g. 85,00,000"
              />
              <FieldChips
                label="Price Negotiability"
                options={NEGOTIABILITY_OPTS}
                value={values.negotiability || ''}
                onChange={v => set('negotiability', v)}
              />
            </div>
          )}

          {currentStep?.key === 'amenities' && (
            <div className="space-y-4">
              <FieldToggleChips
                label="Amenities & Facilities"
                options={showAmenities ? (AMENITY_RES_TYPES.includes(propType) ? RESIDENTIAL_AMENITIES : COMMERCIAL_AMENITIES) : []}
                value={values.amenities || ''}
                onChange={v => set('amenities', v)}
              />
            </div>
          )}

          {currentStep?.key === 'extra' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">Property Age</label>
                <CustomSelect
                  value={values.propertyAge || ''}
                  onChange={v => set('propertyAge', v)}
                  options={AGE_OPTS}
                  placeholder="Select age"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">Flooring</label>
                <CustomSelect
                  value={values.flooring || ''}
                  onChange={v => set('flooring', v)}
                  options={FLOORING_OPTS}
                  placeholder="Select flooring type"
                />
              </div>
              <FieldChips
                label="Water Supply"
                options={WATER_OPTS}
                value={values.waterSupply || ''}
                onChange={v => set('waterSupply', v)}
              />
            </div>
          )}

          {currentStep?.key === 'ownership' && (
            <div className="space-y-4">
              <FieldChips
                label="Ownership Type *"
                options={OWNERSHIP_OPTS}
                value={values.ownershipType || ''}
                onChange={v => set('ownershipType', v)}
                error={errors.ownershipType}
              />
              <FieldChips
                label="Existing Loan *"
                options={LOAN_OPTS}
                value={values.existingLoan || ''}
                onChange={v => set('existingLoan', v)}
                error={errors.existingLoan}
              />
              <FieldChips
                label="Dispute / Litigation *"
                options={YES_NO_OPTS}
                value={values.legalDispute || ''}
                onChange={v => set('legalDispute', v)}
                error={errors.legalDispute}
              />
              <FieldToggleChips
                label="Documents Available"
                options={DOCS_OPTS}
                value={values.documentsAvailable || ''}
                onChange={v => set('documentsAvailable', v)}
              />
            </div>
          )}
          {currentStep?.key === 'referral' && (
            <div className="space-y-4">
              <p className="text-white/60 text-sm mb-2">Have a referral code? Enter it below to give credit to your referrer.</p>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 block mb-1.5">Referral Code (Optional)</label>
                <input
                  type="text"
                  value={values.referralCode || ''}
                  onChange={e => set('referralCode', e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-white/20 bg-white/10 text-white text-sm outline-none focus:border-gold-accent transition-colors placeholder:text-white/30"
                  placeholder="e.g. PB12345A"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 bg-white/10 text-white px-5 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <div className="flex-1" />
          {step < activeSteps.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 bg-gold-accent text-primary-navy px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-gold-accent text-primary-navy px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Property'}
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// --- Sub-components ---

function FieldInput({
  label, value, onChange, error, placeholder, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm outline-none focus:border-gold-accent transition-colors placeholder:text-white/30"
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FieldChips({
  label, options, value, onChange, error,
}: {
  label: string; options: string[]; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 text-xs font-semibold border transition-all duration-200 ${
              value === opt
                ? 'bg-gold-accent text-primary-navy border-gold-accent'
                : 'bg-white/5 text-white/70 border-white/20 hover:border-gold-accent/40'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

function FieldToggleChips({
  label, options, value, onChange,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const selected = value ? value.split(', ').filter(Boolean) : [];

  const toggle = (opt: string) => {
    const next = selected.includes(opt) ? selected.filter(v => v !== opt) : [...selected, opt];
    onChange(next.join(', '));
  };

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-1.5 text-xs font-semibold border transition-all duration-200 ${
              selected.includes(opt)
                ? 'bg-gold-accent text-primary-navy border-gold-accent'
                : 'bg-white/5 text-white/70 border-white/20 hover:border-gold-accent/40'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function FieldRenderer({
  field, value, onChange, error,
}: {
  field: SellFieldDef; value: string; onChange: (v: string) => void; error?: string;
}) {
  if (field.kind === 'chips' && field.options) {
    return (
      <FieldChips
        label={field.label}
        options={field.options}
        value={value}
        onChange={onChange}
        error={error}
      />
    );
  }
  if (field.kind === 'select' && field.options) {
    return (
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-light-navy/50 mb-2">{field.label}</label>
        <CustomSelect
          value={value}
          onChange={onChange}
          options={field.options}
          placeholder="Select"
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>
    );
  }
  return (
    <FieldInput
      label={field.label}
      value={value}
      onChange={onChange}
      error={error}
      placeholder={field.placeholder}
    />
  );
}

function CustomSelect({
  value, onChange, options, groups, placeholder,
}: {
  value: string; onChange: (v: string) => void;
  options?: string[]; groups?: { group: string; options: string[] }[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const allOptions = useMemo(() => {
    if (groups) {
      return groups.flatMap(g => g.options);
    }
    return options || [];
  }, [options, groups]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-sm outline-none focus:border-gold-accent transition-colors text-left flex items-center justify-between"
      >
        <span className={value ? '' : 'text-white/30'}>{value || placeholder || 'Select'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-primary-navy border border-white/20 max-h-60 overflow-y-auto z-50">
          {groups ? (
            groups.map(g => (
              <div key={g.group}>
                <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-gold-accent/60">{g.group}</div>
                {g.options.map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { onChange(opt); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      value === opt ? 'bg-gold-accent/15 text-gold-accent' : 'text-white hover:bg-white/5'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ))
          ) : (
            allOptions.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  value === opt ? 'bg-gold-accent/15 text-gold-accent' : 'text-white hover:bg-white/5'
                }`}
              >
                {opt}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
