import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const COOKIE = 'pb_ref';
const MAX_AGE_SECONDS = 400 * 24 * 60 * 60; // 400 days (browser cap)

const CURRENT_CODE_RE = /^BAAP[0-9]{5}[A-Z]$/;
const LEGACY_CODE_RE = /^PB[0-9]{5}[A-Z]$/;

function normalize(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase().replace(/^#/, '');
  if (!CURRENT_CODE_RE.test(cleaned) && !LEGACY_CODE_RE.test(cleaned)) return null;
  return cleaned;
}

// GET: read the cookie anchor, or set it when ?code= is supplied.
export async function GET(request: NextRequest) {
  const codeParam = request.nextUrl.searchParams.get('code');
  const normalized = normalize(codeParam);

  if (normalized) {
    const res = NextResponse.json({ code: normalized });
    res.cookies.set(COOKIE, normalized, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: MAX_AGE_SECONDS,
    });
    return res;
  }

  const cookieCode = normalize(request.cookies.get(COOKIE)?.value ?? null);
  return NextResponse.json({ code: cookieCode });
}

// DELETE: clear the cookie anchor.
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE);
  return res;
}