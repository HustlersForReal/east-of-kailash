'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { getDb } from '@/lib/firebase';
import { normalizeRefCode, setReferredBy } from '@/lib/referral-storage';

const PERKS = [
  'Complete property ecosystem under one roof',
  'East of Kailash Blocks A–G specialists',
  'DDA flats, local markets & community expertise',
];

export function ReferralWelcome() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get('ref');
    if (!raw) return;
    const parsed = normalizeRefCode(raw);
    if (!parsed) return;
    setReferredBy(parsed);
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('pb_ref_welcomed') === '1';
    } catch {
      // storage unavailable
    }
    if (dismissed) return;
    let cancelled = false;
    (async () => {
      try {
        const db = getDb();
        const snap = await getDoc(doc(db, 'referral_codes', parsed));
        if (!cancelled && snap.exists()) {
          const n = (snap.data() as { name?: string }).name;
          if (n) setName(n);
        }
      } catch {
        // code-only fallback
      }
      if (!cancelled) setCode(parsed);
    })();
    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  if (!code) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem('pb_ref_welcomed', '1');
    } catch {
      // ignore
    }
    setCode(null);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="ref-pop-in w-full max-w-md overflow-hidden rounded-2xl border border-[#C9953C]/40 bg-[#0B0B0C] shadow-[0_0_60px_rgba(201,149,60,0.15)]">
        <div className="border-b border-[#C9953C33] px-6 pt-6 pb-5 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9953C]">You&apos;re invited</p>
          <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-[#E8E8E8]">
            Welcome to EastOfKailash.com
          </h2>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-4 rounded-xl border border-[#C9953C33] bg-[#121212] p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C9953C] text-lg font-black text-[#0B0B0C]">
              {(name ?? 'P').charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 text-left">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#E8E8E8]/60">Referred by</p>
              <p className="truncate text-[15px] font-bold text-[#E8E8E8]">{name ?? 'An EastOfKailash.com partner'}</p>
              <p className="mt-0.5 inline-block rounded-md bg-[#C9953C]/10 px-2 py-0.5 text-[12px] font-black tracking-[0.15em] text-[#C9953C]">{code}</p>
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-[13px] md:text-[14px] text-[#E8E8E8CC] font-light">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9953C]" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={dismiss}
            className="mt-6 w-full rounded-xl bg-[#C9953C] px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest text-[#0B0B0C] hover:bg-[#D4A74A] transition-colors"
          >
            Explore Site
          </button>
          <p className="mt-3 text-center text-[11px] text-[#E8E8E8]/40">Your invite is saved for 30 days.</p>
        </div>
      </div>
    </div>
  );
}
