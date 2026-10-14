'use client';

import { useState, useEffect, useMemo, FormEvent } from 'react';
import dynamic from 'next/dynamic';
import { Send, X, Plus, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { Dropdown, type DropdownGroup, type DropdownOption } from '@/components/ui/Dropdown';
import { getDb } from '@/lib/firebase';
import { useReferredByCode } from '@/lib/referral-storage';
import { sanitizeName, sanitizePhone } from '@/lib/validation';
import { areaProfiles } from '@/lib/data';
import { useAreaPrefill } from '@/lib/use-area-prefill';
import { PINCODE_110065_RING, PINCODE_110065_CENTER } from '@/lib/geo';
import {
  BUYER_PROPERTY_TYPES,
  LAND_TYPES,
  BEDROOM_TYPES,
  BEDROOM_OPTS,
  STUDIO_OPTS,
  CONSTRUCTION_OPTS,
  POSSESSION_OPTS,
  BUDGET_OPTS,
  PLOT_AREA_OPTS,
} from '@/lib/buyer-config';

// Leaflet touches window at import time, so the map must never render on the
// server. See map-docs.md 3.2.
const LocationMap = dynamic(() => import('@/components/LocationMap'), {
  ssr: false,
});

export function BuyerForm() {
  const referredByCode = useReferredByCode();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [localities, setLocalities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [studioConfig, setStudioConfig] = useState('');
  const [construction, setConstruction] = useState('');
  const [possession, setPossession] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPlot, setMinPlot] = useState('');
  const [maxPlot, setMaxPlot] = useState('');
  const [mapLocation, setMapLocation] = useState('');
  const [mapBlocked, setMapBlocked] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isLandType = LAND_TYPES.includes(propertyType);
  const showBedrooms = BEDROOM_TYPES.includes(propertyType);
  const showStudio = propertyType === 'Studio Apartment';
  const showConstruction = !!propertyType && !isLandType;
  const showPlotArea = isLandType;

  useEffect(() => {
    if (!referredByCode) return;
    const short = referredByCode.replace(/^#/, '');
    const timer = window.setTimeout(() => {
      setReferralCode(prev => (prev ? prev : short));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [referredByCode]);

  // Arriving from /area/<slug>?area=<slug> pre-ticks that locality, which
  // also moves the map via mapQuery below.
  const prefillArea = useAreaPrefill();
  useEffect(() => {
    if (!prefillArea) return;
    const timer = window.setTimeout(() => {
      setLocalities(prev => (prev.includes(prefillArea) ? prev : [prefillArea]));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [prefillArea]);

  const setErr = (key: string, msg: string | null) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) next[key] = msg;
      else delete next[key];
      return next;
    });
  };

  const handleLocalitiesChange = (next: string[]) => {
    setLocalities(next);
    setErr('localities', null);
  };

  // map-docs.md 4.1: the map follows the last selected locality, falling back
  // to nothing so it keeps the New Delhi default.
  const mapQuery = localities.length > 0 ? localities[localities.length - 1] : '';

  const handleTypeChange = (next: string) => {
    setPropertyType(next);
    // Clear fields that no longer apply.
    if (!LAND_TYPES.includes(next)) {
      setMinPlot(''); setMaxPlot('');
    }
    if (!BEDROOM_TYPES.includes(next)) setBedrooms('');
    if (next !== 'Studio Apartment') setStudioConfig('');
    if (LAND_TYPES.includes(next)) { setConstruction(''); setPossession(''); }
    else { setPossession(''); }
    setErr('propertyType', null);
    setErr('plotArea', null);
    setErr('bedrooms', null);
  };

  const handleConstructionChange = (next: string) => {
    setConstruction(next);
    setPossession('');
    setErr('possession', null);
  };

  const buildMessage = () => {
    const lines: string[] = [
      '━━━━━━━━━━━━━━━━━━━━',
      '*EastOfKailash.com*',
      'Buyer Requirement',
      '━━━━━━━━━━━━━━━━━━━━',
      '',
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
      `*Locality / Area:* ${localities.join(', ')}`,
      '*City:* South Delhi',
      '*Pincode:* 110065',
    ];
    if (mapLocation) {
      lines.push(`*Pinned Location:* ${mapLocation}`);
    }
    lines.push(
      '',
      `*Property Type:* ${propertyType}`,
      `*Budget:* ${minPrice} to ${maxPrice}`
    );
    if (showBedrooms) lines.push(`*Bedrooms:* ${bedrooms}`);
    if (showStudio) lines.push(`*Studio Configuration:* ${studioConfig}`);
    if (showConstruction) lines.push(`*Construction Status:* ${construction}`);
    if (showConstruction && possession) lines.push(`*Possession / Availability:* ${possession}`);
    if (showPlotArea) lines.push(`*Plot Area:* ${minPlot} to ${maxPlot} sq. ft.`);
    if (referralCode.trim()) lines.push('', `*Referral Code:* ${referralCode.trim()}`);
    lines.push(
      '',
      `*Date & Time:* ${new Date().toLocaleString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
      })}`,
      '━━━━━━━━━━━━━━━━━━━━'
    );
    return lines.join('\n');
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (name.trim().length < 3) e.name = 'Enter your full name (min 3 letters)';
    if (!/^[6-9]\d{9}$/.test(phone)) e.phone = 'Enter a valid 10-digit mobile number';
    if (localities.length === 0) e.localities = 'Pick at least one area in East of Kailash';
    if (!propertyType) e.propertyType = 'Select a property type';
    if (showBedrooms && !bedrooms) e.bedrooms = 'Select the configuration';
    if (showStudio && !studioConfig) e.studioConfig = 'Select a configuration';
    if (showConstruction && !construction) e.construction = 'Select construction status';
    if (showConstruction && construction && !possession) e.possession = 'Select possession timeline';
    if (!minPrice) e.minPrice = 'Select a minimum budget';
    if (!maxPrice) e.maxPrice = 'Select a maximum budget';
    if (minPrice && maxPrice) {
      const min = BUDGET_OPTS.indexOf(minPrice);
      const max = BUDGET_OPTS.indexOf(maxPrice);
      if (min > max) e.minPrice = 'Minimum budget cannot be higher than maximum';
    }
    if (showPlotArea) {
      if (!minPlot) e.minPlot = 'Select a minimum plot area';
      if (!maxPlot) e.maxPlot = 'Select a maximum plot area';
      if (minPlot && maxPlot && PLOT_AREA_OPTS.indexOf(minPlot) > PLOT_AREA_OPTS.indexOf(maxPlot)) {
        e.minPlot = 'Minimum area cannot be higher than maximum';
      }
    }
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const el = document.getElementById(`bf-${Object.keys(e)[0]}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const message = buildMessage();
    try {
      const payload: Record<string, unknown> = {
        Name: name,
        Mobile_Number: phone,
        City: 'South Delhi',
        Pin_Code: '110065',
        Locality_Area: localities.join(', '),
        Map_Location: mapLocation || undefined,
        Property_Type: propertyType,
        Min_Price: minPrice,
        Max_Price: maxPrice,
        Bedrooms: showBedrooms ? bedrooms : undefined,
        Studio_Configuration: showStudio ? studioConfig : undefined,
        Construction_Status: showConstruction ? construction : undefined,
        Possession_Availability: showConstruction ? possession : undefined,
        Min_Plot_Area: showPlotArea ? minPlot : undefined,
        Max_Plot_Area: showPlotArea ? maxPlot : undefined,
        Referral_Code: referralCode.trim() || undefined,
        datetime: new Date().toLocaleString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
        }),
        type: 'Buyer_Requirement',
      };
      Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined || payload[k] === '') delete payload[k];
      });
      try {
        const db = getDb();
        await addDoc(collection(db, 'form_submissions', 'submissions', 'eastofkailash-buyer'), payload);
      } catch (err) {
        // Never swallow this: a rejected write looks identical to a
        // successful one, and the lead is then lost silently.
        console.error('[buyer-form] Firestore write failed:', err);
        setSaveError(
          err instanceof Error ? err.message : 'Could not save the requirement to our database.'
        );
      }
      window.open(
        `https://api.whatsapp.com/send?phone=919811110065&text=${encodeURIComponent(message)}`,
        '_blank'
      );
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Option lists are memoised so each Dropdown's derived `flat` array keeps
  // the same identity between renders and its scroll effect does not thrash.
  // NOTE: every hook must sit above the `if (submitted)` early return below,
  // or React throws "Rendered fewer hooks than expected".
  const localityOptions: DropdownOption[] = useMemo(
    () => areaProfiles.map((a) => ({ value: a.name, label: a.name })),
    []
  );
  const propertyTypeOptions: DropdownGroup[] = useMemo(
    () => BUYER_PROPERTY_TYPES.map((g) => ({ group: g.group, options: g.options.map((o) => ({ value: o, label: o })) })),
    []
  );
  const bedroomOptions: DropdownOption[] = useMemo(
    () => BEDROOM_OPTS.map((o) => ({ value: o, label: o })),
    []
  );
  const studioOptions: DropdownOption[] = useMemo(
    () => STUDIO_OPTS.map((o) => ({ value: o, label: o })),
    []
  );
  const constructionOptions: DropdownOption[] = useMemo(
    () => CONSTRUCTION_OPTS.map((o) => ({ value: o, label: o })),
    []
  );
  const possessionOptions: DropdownOption[] = useMemo(
    () => (POSSESSION_OPTS[construction] || []).map((o) => ({ value: o, label: o })),
    [construction]
  );
  const budgetOptions: DropdownOption[] = useMemo(
    () => BUDGET_OPTS.map((b) => ({ value: b, label: `₹${b}` })),
    []
  );
  const plotAreaOptions: DropdownOption[] = useMemo(
    () => PLOT_AREA_OPTS.map((a) => ({ value: a, label: `${a} sq. ft.` })),
    []
  );

  const reset = () => {
    setName(''); setPhone(''); setLocalities([]);
    setPropertyType(''); setBedrooms(''); setStudioConfig(''); setConstruction('');
    setPossession(''); setMinPrice(''); setMaxPrice(''); setMinPlot(''); setMaxPlot('');
    setMapLocation(''); setMapBlocked(false); setErrors({}); setSubmitted(false);
    setSaveError('');
  };

  const label = 'block text-xs font-semibold uppercase tracking-wider text-light-navy/70 mb-2';
  const inputCls =
    'w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-light-navy/40 outline-none focus:border-gold-accent transition-colors';
  const errCls = 'text-xs text-red-300 mt-1.5';

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold-accent/15 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-gold-accent" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Requirement Received</h3>
        <p className="text-light-navy/60 text-sm mb-7 max-w-xs mx-auto">
          {saveError ? (
            <>
              We could not save this to our database, so please send the message in the WhatsApp
              tab to make sure we receive it. Our team will call you on {phone} shortly.
            </>
          ) : (
            <>We&apos;ve got your requirement. Our team will call you on {phone} shortly.</>
          )}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 bg-gold-accent hover:bg-white text-primary-navy px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div id="bf-name">
          <label className={label} htmlFor="bfName">Name *</label>
          <input
            id="bfName"
            type="text"
            value={name}
            onChange={(e) => { setName(sanitizeName(e.target.value)); setErr('name', null); }}
            placeholder="Your full name"
            className={inputCls}
          />
          {errors.name && <p className={errCls}>{errors.name}</p>}
        </div>
        <div id="bf-phone">
          <label className={label} htmlFor="bfPhone">Phone Number *</label>
          <input
            id="bfPhone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => { setPhone(sanitizePhone(e.target.value)); setErr('phone', null); }}
            placeholder="10-digit mobile"
            className={inputCls}
          />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>
      </div>

      {/* Locality + map, all inside East of Kailash, 110065 */}
      <div id="bf-localities" className="mb-5">
        <label className={label} htmlFor="bfLocality">Area in East of Kailash *</label>
        <Dropdown
          id="bfLocality"
          multiple
          value={localities}
          onChange={handleLocalitiesChange}
          options={localityOptions}
          placeholder="Select one or more localities"
        />
        {errors.localities && <p className={errCls}>{errors.localities}</p>}

        {localities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {localities.map((l) => (
              <span
                key={l}
                className="inline-flex items-center gap-1.5 bg-gold-accent/15 border border-gold-accent/40 text-white text-xs px-2.5 py-1.5 rounded-full"
              >
                {l}
                <button
                  type="button"
                  onClick={() => handleLocalitiesChange(localities.filter((x) => x !== l))}
                  className="hover:text-gold-accent transition-colors"
                  aria-label={`Remove ${l}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="mt-4">
          <LocationMap
            onLocationSelect={(addr) => { setMapLocation(addr); setMapBlocked(false); }}
            onBlockedClick={() => setMapBlocked(true)}
            restrictTo={PINCODE_110065_RING}
            center={PINCODE_110065_CENTER}
            zoom={13}
            initialLocation={mapQuery}
          />
          {mapLocation && (
            <span className="flex items-start gap-1.5 text-[10px] text-light-navy/60 mt-1.5">
              <MapPin className="w-3 h-3 text-gold-accent shrink-0 mt-px" />
              <span>
                Pinned: <span className="text-gold-accent font-semibold">{mapLocation}</span>
              </span>
            </span>
          )}
          {mapBlocked && (
            <p className="flex items-start gap-1.5 text-[10px] text-red-300 mt-1.5">
              <MapPin className="w-3 h-3 shrink-0 mt-px" />
              This portal only covers East of Kailash, 110065. Please drop the pin inside the marked area.
            </p>
          )}
        </div>
      </div>

      {/* Property type */}
      <div id="bf-propertyType" className="mb-5">
        <label className={label} htmlFor="bfType">Property Type *</label>
        <Dropdown
          id="bfType"
          value={propertyType}
          onChange={handleTypeChange}
          options={propertyTypeOptions}
          placeholder="Select a property type"
        />
        {errors.propertyType && <p className={errCls}>{errors.propertyType}</p>}
      </div>

      {/* Bedrooms / Studio */}
      {showBedrooms && (
        <div id="bf-bedrooms" className="mb-5">
          <label className={label} htmlFor="bfBedrooms">Bedrooms *</label>
          <Dropdown
            id="bfBedrooms"
            value={bedrooms}
            onChange={(v) => { setBedrooms(v); setErr('bedrooms', null); }}
            options={bedroomOptions}
            placeholder="Select configuration"
          />
          {errors.bedrooms && <p className={errCls}>{errors.bedrooms}</p>}
        </div>
      )}

      {showStudio && (
        <div id="bf-studioConfig" className="mb-5">
          <label className={label} htmlFor="bfStudio">Studio Configuration *</label>
          <Dropdown
            id="bfStudio"
            value={studioConfig}
            onChange={(v) => { setStudioConfig(v); setErr('studioConfig', null); }}
            options={studioOptions}
            placeholder="Select configuration"
          />
          {errors.studioConfig && <p className={errCls}>{errors.studioConfig}</p>}
        </div>
      )}

      {/* Construction + possession */}
      {showConstruction && (
        <>
          <div id="bf-construction" className="mb-5">
            <label className={label} htmlFor="bfConstruction">Construction Status *</label>
            <Dropdown
              id="bfConstruction"
              value={construction}
              onChange={handleConstructionChange}
              options={constructionOptions}
              placeholder="Select construction status"
            />
            {errors.construction && <p className={errCls}>{errors.construction}</p>}
          </div>

          {construction && (
            <div id="bf-possession" className="mb-5">
              <label className={label} htmlFor="bfPossession">Possession / Availability *</label>
              <Dropdown
                id="bfPossession"
                value={possession}
                onChange={(v) => { setPossession(v); setErr('possession', null); }}
                options={possessionOptions}
                placeholder="Select possession timeline"
              />
              {errors.possession && <p className={errCls}>{errors.possession}</p>}
            </div>
          )}
        </>
      )}

      {/* Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div id="bf-minPrice">
          <label className={label} htmlFor="bfMin">Minimum Budget *</label>
          <Dropdown
            id="bfMin"
            value={minPrice}
            onChange={(v) => { setMinPrice(v); setErr('minPrice', null); }}
            options={budgetOptions}
            placeholder="Select"
          />
          {errors.minPrice && <p className={errCls}>{errors.minPrice}</p>}
        </div>
        <div id="bf-maxPrice">
          <label className={label} htmlFor="bfMax">Maximum Budget *</label>
          <Dropdown
            id="bfMax"
            value={maxPrice}
            onChange={(v) => { setMaxPrice(v); setErr('maxPrice', null); }}
            options={budgetOptions}
            placeholder="Select"
          />
          {errors.maxPrice && <p className={errCls}>{errors.maxPrice}</p>}
        </div>
      </div>

      {/* Plot area */}
      {showPlotArea && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          <div id="bf-minPlot">
            <label className={label} htmlFor="bfMinPlot">Minimum Plot Area *</label>
            <Dropdown
              id="bfMinPlot"
              value={minPlot}
              onChange={(v) => { setMinPlot(v); setErr('minPlot', null); }}
              options={plotAreaOptions}
              placeholder="Select"
            />
            {errors.minPlot && <p className={errCls}>{errors.minPlot}</p>}
          </div>
          <div id="bf-maxPlot">
            <label className={label} htmlFor="bfMaxPlot">Maximum Plot Area *</label>
            <Dropdown
              id="bfMaxPlot"
              value={maxPlot}
              onChange={(v) => { setMaxPlot(v); setErr('maxPlot', null); }}
              options={plotAreaOptions}
              placeholder="Select"
            />
            {errors.maxPlot && <p className={errCls}>{errors.maxPlot}</p>}
          </div>
        </div>
      )}

      {/* Referral */}
      <div className="mb-6">
        <label className={label} htmlFor="bfRef">Referral Code</label>
        <input
          id="bfRef"
          type="text"
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value.replace(/[^A-Za-z0-9#]/g, '').slice(0, 12))}
          placeholder="Optional"
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-gold-accent hover:bg-white text-primary-navy px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {submitting ? 'Submitting...' : 'Submit Requirement'}
      </button>
      <p className="mt-4 text-center text-xs text-white/50 leading-relaxed">By filling this form, you agree to receive notifications through WhatsApp, call, SMS or email. You can opt out anytime by messaging us.</p>
    </form>
  );
}
