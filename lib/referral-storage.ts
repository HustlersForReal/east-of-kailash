'use client';

import { useState, useEffect } from 'react';

const REF_KEY = 'pb_referred_by';
const REF_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 365 days (sliding window)

const IDB_NAME = 'pb-ref-db';
const IDB_STORE = 'ref';
const CACHE_NAME = 'pb-ref-cache-v1';
const CACHE_PATH = '/__pb_ref__';

const CURRENT_CODE_RE = /^BAAP[0-9]{5}[A-Z]$/;
const LEGACY_CODE_RE = /^PB[0-9]{5}[A-Z]$/;
const CODE_RES = [CURRENT_CODE_RE, LEGACY_CODE_RE];

type RefRecord = { code: string; ts: number };

function parseRecord(raw: unknown): RefRecord | null {
  let parsed: unknown = raw;
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (typeof parsed !== 'object' || parsed === null) return null;
  const rec = parsed as { code?: unknown; ts?: unknown };
  if (typeof rec.code !== 'string' || typeof rec.ts !== 'number' || !isFinite(rec.ts)) {
    return null;
  }
  const normalized = normalizeRefCode(rec.code);
  if (!normalized) return null;
  return { code: normalized, ts: rec.ts };
}

function expired(ts: number): boolean {
  return Date.now() - ts > REF_TTL_MS;
}

export function isSupportedRefCode(code: string): boolean {
  const cleaned = String(code ?? '').trim().toUpperCase().replace(/^#/, '');
  return CODE_RES.some((re) => re.test(cleaned));
}

export function normalizeRefCode(raw: string): string | null {
  const cleaned = String(raw ?? '').trim().toUpperCase().replace(/^#/, '');
  if (!CODE_RES.some((re) => re.test(cleaned))) return null;
  return `#${cleaned}`;
}

export function refCodeDocIdCandidates(code: string): string[] {
  const short = String(code ?? '').trim().toUpperCase().replace(/^#/, '');
  if (!short) return [];
  const hashed = `#${short}`;
  return Array.from(new Set([hashed, short]));
}

function syncStores(): Storage[] {
  const out: Storage[] = [];
  try {
    if (typeof localStorage !== 'undefined') out.push(localStorage);
  } catch {
    // ignore
  }
  try {
    if (typeof sessionStorage !== 'undefined') out.push(sessionStorage);
  } catch {
    // ignore
  }
  return out;
}

function readSyncRecords(): RefRecord[] {
  const records: RefRecord[] = [];
  for (const store of syncStores()) {
    try {
      const raw = store.getItem(REF_KEY);
      if (!raw) continue;
      const rec = parseRecord(raw);
      if (!rec) {
        store.removeItem(REF_KEY);
        continue;
      }
      if (expired(rec.ts)) {
        store.removeItem(REF_KEY);
        continue;
      }
      records.push(rec);
    } catch {
      // ignore storage errors
    }
  }
  return records;
}

function pruneSyncStorage(): void {
  for (const store of syncStores()) {
    try {
      store.removeItem(REF_KEY);
    } catch {
      // ignore
    }
  }
}

function writeSyncStorage(rec: RefRecord): void {
  const payload = JSON.stringify(rec);
  for (const store of syncStores()) {
    try {
      store.setItem(REF_KEY, payload);
    } catch {
      // ignore
    }
  }
}

function openIdb(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null);
      return;
    }
    let req: IDBOpenDBRequest;
    try {
      req = indexedDB.open(IDB_NAME, 1);
    } catch {
      resolve(null);
      return;
    }
    req.onupgradeneeded = () => {
      try {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE);
      } catch {
        // ignore
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
    req.onblocked = () => resolve(null);
  });
}

async function readIndexedDb(): Promise<RefRecord | null> {
  try {
    const db = await openIdb();
    if (!db) return null;
    return await new Promise<RefRecord | null>((resolve) => {
      let settled = false;
      const finish = (v: RefRecord | null) => {
        if (!settled) {
          settled = true;
          resolve(v);
        }
      };
      try {
        const tx = db.transaction(IDB_STORE, 'readonly');
        const store = tx.objectStore(IDB_STORE);
        const request = store.get(REF_KEY);
        request.onsuccess = () => finish(parseRecord(request.result));
        request.onerror = () => finish(null);
        tx.oncomplete = () => db.close();
        tx.onerror = () => {
          db.close();
          finish(null);
        };
        tx.onabort = () => {
          db.close();
          finish(null);
        };
      } catch {
        try {
          db.close();
        } catch {
          // ignore
        }
        finish(null);
      }
    });
  } catch {
    return null;
  }
}

async function writeIndexedDb(rec: RefRecord): Promise<void> {
  try {
    const db = await openIdb();
    if (!db) return;
    await new Promise<void>((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(rec, REF_KEY);
        tx.oncomplete = () => {
          db.close();
          resolve();
        };
        tx.onerror = () => {
          db.close();
          resolve();
        };
        tx.onabort = () => {
          db.close();
          resolve();
        };
      } catch {
        try {
          db.close();
        } catch {
          // ignore
        }
        resolve();
      }
    });
  } catch {
    // ignore
  }
}

async function deleteIndexedDb(): Promise<void> {
  try {
    const db = await openIdb();
    if (!db) return;
    await new Promise<void>((resolve) => {
      try {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).delete(REF_KEY);
        tx.oncomplete = () => {
          db.close();
          resolve();
        };
        tx.onerror = () => {
          db.close();
          resolve();
        };
        tx.onabort = () => {
          db.close();
          resolve();
        };
      } catch {
        try {
          db.close();
        } catch {
          // ignore
        }
        resolve();
      }
    });
  } catch {
    // ignore
  }
}

async function readCacheStorage(): Promise<RefRecord | null> {
  try {
    if (typeof caches === 'undefined') return null;
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(CACHE_PATH);
    if (!response) return null;
    const data = await response.json();
    const rec = parseRecord(data);
    if (!rec || expired(rec.ts)) {
      try {
        await cache.delete(CACHE_PATH);
      } catch {
        // ignore
      }
      return null;
    }
    return rec;
  } catch {
    return null;
  }
}

async function writeCacheStorage(rec: RefRecord): Promise<void> {
  try {
    if (typeof caches === 'undefined') return;
    const cache = await caches.open(CACHE_NAME);
    const response = new Response(JSON.stringify(rec), {
      headers: { 'content-type': 'application/json' },
    });
    await cache.put(CACHE_PATH, response);
  } catch {
    // ignore
  }
}

async function readServerCookie(): Promise<string | null> {
  try {
    if (typeof fetch === 'undefined') return null;
    const res = await fetch('/api/referral', { credentials: 'same-origin' });
    if (!res.ok) return null;
    const data = (await res.json()) as { code?: unknown };
    return typeof data?.code === 'string' ? data.code : null;
  } catch {
    return null;
  }
}

function setServerCookie(code: string): void {
  const short = code.replace(/^#/, '');
  if (typeof fetch === 'undefined') return;
  void fetch(`/api/referral?code=${encodeURIComponent(short)}`, {
    credentials: 'same-origin',
  }).catch(() => {});
}

export function setReferredBy(code: string) {
  const normalized = normalizeRefCode(code);
  if (!normalized) return;
  const rec: RefRecord = { code: normalized, ts: Date.now() };
  writeSyncStorage(rec);
  void writeIndexedDb(rec);
  void writeCacheStorage(rec);
  setServerCookie(normalized);
  try {
    window.dispatchEvent(new CustomEvent('pb-ref-updated'));
  } catch {
    // ignore
  }
}

export function getReferredBy(): string | null {
  const records = readSyncRecords();
  if (records.length === 0) return null;
  const winner = records.reduce((a, b) => (a.ts >= b.ts ? a : b));
  if (expired(winner.ts)) {
    pruneSyncStorage();
    return null;
  }
  writeSyncStorage(winner);
  if (Date.now() - winner.ts > REF_TTL_MS / 2) {
    const refreshed: RefRecord = { code: winner.code, ts: Date.now() };
    writeSyncStorage(refreshed);
    void writeIndexedDb(refreshed);
    void writeCacheStorage(refreshed);
    setServerCookie(refreshed.code);
    return refreshed.code;
  }
  void writeIndexedDb(winner);
  void writeCacheStorage(winner);
  return winner.code;
}

export async function hydrateReferredBy(): Promise<string | null> {
  const asyncResults = await Promise.allSettled([readIndexedDb(), readCacheStorage()]);
  const asyncRecords: RefRecord[] = [];
  for (const r of asyncResults) {
    if (r.status === 'fulfilled' && r.value) asyncRecords.push(r.value);
  }
  const syncRecords = readSyncRecords();
  const candidates = [...syncRecords, ...asyncRecords].filter((r) => !expired(r.ts));

  let serverCode: string | null = null;
  try {
    serverCode = await readServerCookie();
  } catch {
    serverCode = null;
  }

  if (candidates.length === 0) {
    const normalized = serverCode ? normalizeRefCode(serverCode) : null;
    if (!normalized) {
      pruneSyncStorage();
      return null;
    }
    const recovered: RefRecord = { code: normalized, ts: Date.now() };
    writeSyncStorage(recovered);
    void writeIndexedDb(recovered);
    void writeCacheStorage(recovered);
    try {
      window.dispatchEvent(new CustomEvent('pb-ref-updated'));
    } catch {
      // ignore
    }
    return normalized;
  }

  const winner = candidates.reduce((a, b) => (a.ts >= b.ts ? a : b));
  let repaired = winner;
  if (Date.now() - winner.ts > REF_TTL_MS / 2) {
    repaired = { code: winner.code, ts: Date.now() };
  }
  writeSyncStorage(repaired);
  void writeIndexedDb(repaired);
  void writeCacheStorage(repaired);
  if (!serverCode) setServerCookie(repaired.code);
  try {
    window.dispatchEvent(new CustomEvent('pb-ref-updated'));
  } catch {
    // ignore
  }
  return winner.code;
}

export async function clearReferredBy(): Promise<void> {
  pruneSyncStorage();
  await deleteIndexedDb();
  try {
    if (typeof caches !== 'undefined') {
      const cache = await caches.open(CACHE_NAME);
      await cache.delete(CACHE_PATH);
    }
  } catch {
    // ignore
  }
  try {
    await fetch('/api/referral', { method: 'DELETE', credentials: 'same-origin' });
  } catch {
    // ignore
  }
  try {
    window.dispatchEvent(new CustomEvent('pb-ref-updated'));
  } catch {
    // ignore
  }
}

export function useReferredByCode(): string | null {
  const [code, setCode] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    const update = (next: string | null) => {
      window.setTimeout(() => {
        if (!cancelled) setCode(next);
      }, 0);
    };
    update(getReferredBy());
    void (async () => {
      const hydrated = await hydrateReferredBy();
      if (!cancelled) update(hydrated);
    })();
    const onUpdate = () => update(getReferredBy());
    window.addEventListener('pb-ref-updated', onUpdate);
    return () => {
      cancelled = true;
      window.removeEventListener('pb-ref-updated', onUpdate);
    };
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
