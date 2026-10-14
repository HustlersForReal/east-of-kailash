import type { MetadataRoute } from 'next';

// Required under output: 'export'. Without this the route is treated as
// dynamic and the build fails with a "force-static not configured" error.
export const dynamic = 'force-static';
import { absoluteUrl, SITE_URL } from '@/lib/seo';

/**
 * Native App Router robots, prerendered to out/robots.txt by output: 'export'.
 *
 * Every public page is indexable, so nothing is disallowed. The forms post to
 * Firestore from the client and have no server routes, and there is no admin or
 * API surface to hide.
 *
 * Query strings such as ?area= and ?ref= are deliberately NOT disallowed.
 * Disallow does not stop indexing, it only stops crawling, so blocking them
 * would hide real pages from discovery. Duplicate-URL control is handled by the
 * per-page canonical tags in lib/seo.ts instead.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  };
}