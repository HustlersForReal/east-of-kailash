import type { Metadata } from 'next';

/**
 * Central SEO configuration for EastOfKailash.com (South Delhi pincode 110065).
 *
 * This mirrors lib/seo.ts on the 110024 portal. The two portals target the same
 * city and overlapping keywords, so the file structures are deliberately
 * parallel and should stay that way, but every value is specific to 110065 and
 * to East of Kailash. Do not merge these and do not copy 110024 strings across.
 *
 * Canonical host is the non-www apex, matching the 110024 portal. Edge-level
 * www/non-www redirection is a hosting concern and is not handled here.
 */
export const SITE_URL = 'https://eastofkailash.com';

export const DEFAULT_TITLE = 'EastOfKailash.com | Property in East of Kailash, Delhi';

export const TITLE_TEMPLATE = '%s | EastOfKailash.com';

export const DEFAULT_DESCRIPTION =
  'Hyperlocal real estate portal for East of Kailash, South Delhi 110065. Builder floors, DDA flats, shops and land across Blocks A to G and the Community Centre markets, with valuation and documentation support.';

/** Turns a site-relative path into an absolute canonical URL. */
export function absoluteUrl(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

/**
 * Trims a string to a meta-description budget without cutting mid-word. Google
 * truncates around 155-160 characters. Area pages concatenate a tagline with
 * body copy, so they need a word-aware trim rather than a blind slice.
 */
export function truncateMeta(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = cut.slice(0, lastSpace > 40 ? lastSpace : max);

  return `${trimmed.replace(/[,;:.\s]+$/, '')}...`;
}

/**
 * Builds a page's Metadata block consistently. Canonical, Open Graph and Twitter
 * all derive from the same title/description so they cannot drift apart, and the
 * description is trimmed centrally so no page can ship one Google will cut off.
 *
 * The OG card is a static PNG in public/. This portal builds with
 * output: 'export', so an ImageResponse route would have to be prerendered at
 * build time; a committed file is the reliable option here.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description: truncateMeta(description),
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      type,
      url,
      siteName: 'EastOfKailash.com',
      title,
      description: truncateMeta(description),
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: truncateMeta(description),
      images: [ogImage],
    },
  };
}

/**
 * Keywords taken from the actual site content: the 14 localities that have a
 * real /area page, the DDA/builder-floor vocabulary the forms use, and the
 * informational terms the blogs target. Kept short to avoid stuffing.
 */
export const KEYWORDS = [
  'East of Kailash property',
  'property in 110065',
  'DDA flats East of Kailash',
  'builder floor East of Kailash',
  'flat for sale East of Kailash',
  'flat for rent East of Kailash',
  'Block C flat for sale',
  'Block D flat for rent',
  'property in Block A to G',
  'Community Centre 1 shops',
  'Community Centre 2 shops',
  'commercial property East of Kailash',
  'shop for rent East of Kailash',
  'East of Kailash circle rates',
  'stamp duty and mutation Delhi',
  'property valuation East of Kailash',
  'property verification South Delhi',
  'real estate liaisoning Delhi',
  'NRI property services Delhi',
  'rent my property East of Kailash',
];