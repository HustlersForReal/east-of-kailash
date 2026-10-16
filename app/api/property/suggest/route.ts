import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIp, sanitizeInput } from '@/lib/api-security';

export const runtime = 'edge';

const API_URL = 'https://doris-api.fastapicloud.dev';

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(ip, 30, 60000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Try again later.' },
      { status: 429 }
    );
  }

  const q = req.nextUrl.searchParams.get('q');
  if (!q || q.trim().length < 2) {
    return NextResponse.json(
      { success: false, error: 'q is required (min 2 chars)' },
      { status: 400 }
    );
  }

  const clean = sanitizeInput(q);

  try {
    const res = await fetch(`${API_URL}/suggest?q=${encodeURIComponent(clean)}`);
    const data = await res.json();
    // Upstream returns up to 500 rows with duplicates. Dedupe and cap here
    // so the payload stays small; the client dedupes again as a second layer.
    if (data && Array.isArray(data.results)) {
      data.results = [...new Set<string>(data.results)].slice(0, 20);
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}
