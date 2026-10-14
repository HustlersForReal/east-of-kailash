'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * GA4 via the official Google tag (gtag.js).
 *
 * This is the EastOfKailash.com property. It is deliberately NOT the same ID as
 * the 110024 portal (G-WTX22HCSCX): sending East of Kailash traffic into that
 * property would corrupt the 110024 analytics.
 *
 * A GA4 Measurement ID is published in client-side JavaScript by design, so
 * hardcoding it is correct and leaks nothing.
 *
 * useSearchParams is deliberately not used. Query strings such as ?area= and
 * ?ref= would either trigger duplicate page views or force the whole layout into
 * client-side rendering, and neither is wanted for analytics.
 */
const MEASUREMENT_ID = 'G-XXZ75PKQYE';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();

  // Inject the tag once per document load.
  useEffect(() => {
    if (!MEASUREMENT_ID) return;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = window.gtag || gtag;

    if (!document.getElementById('ga4-tag')) {
      gtag('js', new Date());
      gtag('config', MEASUREMENT_ID, { send_page_view: false });

      const script = document.createElement('script');
      script.id = 'ga4-tag';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }
  }, []);

  // App Router does not reload the document on client-side navigation, so the
  // automatic page_view never fires for those routes. Send one explicitly per
  // pathname change. Only the path is sent, never the query string.
  useEffect(() => {
    if (!MEASUREMENT_ID || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}