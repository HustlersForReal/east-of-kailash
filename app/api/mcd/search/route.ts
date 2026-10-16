import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/api-security';

export const runtime = 'edge';

const API_URL = 'https://mcdwrapper-c28e8b77.fastapicloud.dev';

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(ip, 10, 60000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { zone_id, address } = body ?? {};

    if (typeof zone_id !== 'string' || !zone_id.trim() || zone_id.length > 100) {
      return NextResponse.json({ error: 'Missing zone' }, { status: 400 });
    }
    if (typeof address !== 'string' || address.trim().length < 3 || address.length > 500) {
      return NextResponse.json({ error: 'Missing address' }, { status: 400 });
    }

    const res = await fetch(`${API_URL}/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ zone_id, address: address.trim(), property_type: 'booked' }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Search failed' }, { status: 502 });
  }
}
