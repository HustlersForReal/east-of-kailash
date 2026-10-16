/**
 * Shared security helpers for the Next.js API proxy routes.
 *
 * Single choke point for rate limiting, client IP detection and input
 * validation. Every route under app/api/property/* uses these before
 * touching the upstream DORIS wrapper API.
 *
 * NOTE: the limiter is an in-memory Map. That is correct for this portal's
 * single-instance `standalone` deployment, but it would under-count on a
 * multi-instance / serverless host (each instance keeps its own counter and
 * stale keys are never evicted). If hosting ever moves multi-instance, swap
 * this for @upstash/ratelimit (Redis) or equivalent.
 */

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  ip: string,
  limit = 30,
  windowMs = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: limit - record.count };
}

export function getClientIp(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 500);
}

export function isValidSessionId(sid: string): boolean {
  return /^[a-zA-Z0-9_-]{10,100}$/.test(sid);
}

export function isValidAddress(addr: string): boolean {
  return addr.length >= 3 && addr.length <= 500 && /^[a-zA-Z0-9\s,.\-/()#]+$/.test(addr);
}

export function isValidCaptcha(c: string): boolean {
  return /^[a-zA-Z0-9]{1,10}$/.test(c);
}
