import { NextRequest } from 'next/server';
import { checkRateLimit, getClientIp, isValidSessionId } from '@/lib/api-security';

export const runtime = 'edge';

const API_URL = 'https://doris-api.fastapicloud.dev';

export async function GET(req: NextRequest) {
  const ip = getClientIp(req);
  const { allowed } = checkRateLimit(ip, 20, 60000);
  if (!allowed) {
    return new Response('Rate limited', { status: 429 });
  }

  const sid = req.nextUrl.searchParams.get('sid');
  if (!sid || !isValidSessionId(sid)) {
    return new Response('Invalid session', { status: 400 });
  }

  try {
    const res = await fetch(`${API_URL}/captcha-image/${sid}`);
    if (!res.ok) {
      return new Response('Captcha expired or invalid', { status: 404 });
    }
    const body = await res.arrayBuffer();
    // Plain-text errors are intentional here: this route is an <img> source,
    // the browser only cares about a 2xx or a broken image.
    return new Response(body, {
      headers: {
        // Verified upstream content-type is image/jpeg; pass it through.
        'Content-Type': res.headers.get('content-type') || 'image/jpeg',
        // Mandatory: a cached captcha image is a security hole.
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch {
    return new Response('Failed to load captcha', { status: 500 });
  }
}
