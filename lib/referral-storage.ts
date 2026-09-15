'use client';

import { useState, useEffect } from 'react';

const REF_KEY = 'pb_referred_by';
const REF_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function setReferredBy(code: string) {
  try {
    localStorage.setItem(REF_KEY, JSON.stringify({ code, ts: Date.now() }));
  } catch {
    // storage unavailable
  }
  try {
    window.dispatchEvent(new CustomEvent('pb-ref-updated'));
  } catch {
    // ignore
  }
}

export function getReferredBy(): string | null {
  try {
    const raw = localStorage.getItem(REF_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { code?: unknown; ts?: unknown };
    if (typeof parsed.code !== 'string' || !parsed.code || typeof parsed.ts !== 'number') {
      localStorage.removeItem(REF_KEY);
      return null;
    }
    if (Date.now() - parsed.ts > REF_TTL_MS) {
      localStorage.removeItem(REF_KEY);
      return null;
    }
    return parsed.code;
  } catch {
    return null;
  }
}

export function normalizeRefCode(raw: string): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/^#/, '');
  if (!/^PB[0-9]{5}[A-Z]$/.test(cleaned)) return null;
  return `#${cleaned}`;
}

export function useReferredByCode(): string | null {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    setCode(getReferredBy());
    const onUpdate = () => setCode(getReferredBy());
    window.addEventListener('pb-ref-updated', onUpdate);
    return () => window.removeEventListener('pb-ref-updated', onUpdate);
  }, []);
  return code;
}

export function withReferral(url: string, code: string | null): string {
  if (!code) return url;
  const short = code.startsWith('#') ? code.slice(1) : code;
  try {
    const u = new URL(url);
    u.searchParams.set('ref', short);
    return u.toString();
  } catch {
    return url.includes('?') ? `${url}&ref=${short}` : `${url}?ref=${short}`;
  }
}

export function getReferralUrl(url: string): string {
  return withReferral(url, getReferredBy());
}

export function getReferralMessage(message: string): string {
  const code = getReferredBy();
  if (!code) return message;
  const short = code.startsWith('#') ? code.slice(1) : code;
  return `${message}\n\nReferral Code: ${short}`;
}
