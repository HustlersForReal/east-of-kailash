'use client';

import { useEffect, useState } from 'react';
import { areaProfiles } from './data';

/**
 * Reads ?area=<slug> from the URL and returns the matching area name.
 *
 * Used to pre-select an area when someone arrives from /area/<slug>, e.g.
 * /list-your-property?area=defence-colony.
 *
 * Deliberately reads window.location instead of next/navigation's
 * useSearchParams: that hook forces a Suspense boundary at build time and
 * breaks the East of Kailash portal, which builds with `output: 'export'`.
 * The cost is that the pre-select lands one frame after hydration.
 */
export function useAreaPrefill(): string | null {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    let slug: string | null = null;
    try {
      slug = new URLSearchParams(window.location.search).get('area');
    } catch {
      return; // URL parsing unavailable
    }
    if (!slug) return;
    const area = areaProfiles.find((a) => a.slug === slug);
    if (area) setName(area.name);
  }, []);

  return name;
}
