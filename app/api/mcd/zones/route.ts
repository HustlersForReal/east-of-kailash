import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/api-security';

export const runtime = 'edge';

const API_URL = 'https://mcdwrapper-c28e8b77.fastapicloud.dev';

export async function GET(req: Request) {
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(ip, 30, 60000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Try again later.' },
      { status: 429 }
    );
  }

  try {
    const res = await fetch(`${API_URL}/zones`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch zones' }, { status: 502 });
  }
}
