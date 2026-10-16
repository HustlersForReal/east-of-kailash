import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIp,
  isValidAddress,
  isValidCaptcha,
  isValidSessionId,
} from '@/lib/api-security';

export const runtime = 'edge';

const API_URL = 'https://doris-api.fastapicloud.dev';

// Only these fields are forwarded to the browser. The upstream error shape
// contains an internal `saved_file` artifact filename that must never leak.
function toSafeRecord(r: unknown) {
  const rec = (r ?? {}) as Record<string, unknown>;
  return {
    reg_no: String(rec.reg_no ?? ''),
    reg_date: String(rec.reg_date ?? ''),
    first_party: String(rec.first_party ?? ''),
    second_party: String(rec.second_party ?? ''),
    property_address: String(rec.property_address ?? ''),
    deed_type: String(rec.deed_type ?? ''),
    property_type: String(rec.property_type ?? ''),
    sro_name: String(rec.sro_name ?? ''),
  };
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed, remaining } = checkRateLimit(ip, 10, 60000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { session_id, address, captcha } = body;

    if (!session_id || !address || !captcha) {
      return NextResponse.json(
        { success: false, error: 'Missing fields' },
        { status: 400 }
      );
    }

    if (
      !isValidSessionId(String(session_id)) ||
      !isValidAddress(String(address)) ||
      !isValidCaptcha(String(captcha).trim())
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid request' },
        { status: 400 }
      );
    }

    const res = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id,
        address,
        captcha: String(captcha).trim(),
      }),
    });
    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'Invalid upstream response' },
        { status: 502 }
      );
    }

    // Classify the expired-session shape before whitelisting, otherwise the
    // client cannot tell "session died" apart from "wrong captcha".
    if (data && data.detail === 'Invalid session') {
      return NextResponse.json({ success: false, error: 'Invalid session', records: [] });
    }

    // Whitelist, never forward the raw upstream body.
    const safe = {
      success: data.success === true,
      records: Array.isArray(data.records) ? data.records.map(toSafeRecord) : [],
    };
    const resp = NextResponse.json(safe);
    resp.headers.set('X-RateLimit-Remaining', String(remaining));
    return resp;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}
