import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/api-security';

export const runtime = 'edge';

const API_URL = 'https://doris-api.fastapicloud.dev';

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const { allowed, remaining } = checkRateLimit(ip, 15, 60000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many captcha requests. Wait a minute.' },
      { status: 429 }
    );
  }

  try {
    const res = await fetch(`${API_URL}/captcha`);
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = null;
    }

    if (!data || !data.success) {
      return NextResponse.json(
        { success: false, error: 'Captcha service unavailable' },
        { status: 502 }
      );
    }

    // CRITICAL: rewrite upstream URL to our own proxy. Without this the
    // browser would call the CORS-less upstream directly and the image fails.
    data.image_url = `/api/property/captcha-image?sid=${data.session_id}`;
    const resp = NextResponse.json(data);
    resp.headers.set('X-RateLimit-Remaining', String(remaining));
    return resp;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch captcha' },
      { status: 500 }
    );
  }
}
