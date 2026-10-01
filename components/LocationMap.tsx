'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { isInsidePolygon } from '@/lib/geo';

interface LocationMapProps {
  onLocationSelect: (address: string) => void;
  initialLocation?: string;
  /** Closed ring the pin is confined to. Omit for no restriction. */
  restrictTo?: [number, number][];
  /** Called when the user clicks outside `restrictTo`. */
  onBlockedClick?: () => void;
  center?: L.LatLngExpression;
  zoom?: number;
}

// New Delhi / NCR, the primary service area.
const DEFAULT_CENTER: L.LatLngExpression = [28.6139, 77.209];
const DEFAULT_ZOOM = 11;
const SEARCH_ZOOM = 14;
const DEBOUNCE_MS = 800;
const PHOTON = 'https://photon.komoot.io';

// Leaflet's default teardrop does not match the brand, so use a blue dot.
const makeIcon = () =>
  L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width:24px; height:24px;
      background:#4169E1;
      border:3px solid #fff;
      border-radius:50%;
      box-shadow:0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

export default function LocationMap({
  onLocationSelect,
  initialLocation,
  restrictTo,
  onBlockedClick,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
}: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Address this map last emitted from a click. Parents often write it into a
  // controlled text field, which would feed straight back into the geocode
  // effect and make the pin drift off the exact clicked point.
  const lastSelectedRef = useRef('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [searching, setSearching] = useState(false);

  // Callbacks are usually inline arrows in the parent, so they get a new
  // identity every render. Hold them in refs so the map is not torn down
  // and rebuilt on each one.
  const onSelectRef = useRef(onLocationSelect);
  const onBlockedRef = useRef(onBlockedClick);
  useEffect(() => {
    onSelectRef.current = onLocationSelect;
    onBlockedRef.current = onBlockedClick;
  });

  // Create once. The early-exit guard also survives React StrictMode
  // double-invoking effects.
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const ring = restrictTo;
    const options: L.MapOptions = { center, zoom, zoomControl: false };
    if (ring) {
      // Stop the user panning away from the covered area entirely.
      options.maxBounds = L.latLngBounds(ring).pad(0.25);
    }

    const map = L.map(mapRef.current, options);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    if (ring) {
      // Tint the covered area so the boundary is obvious.
      L.polygon(ring, {
        color: '#C9A227',
        weight: 1.5,
        dashArray: '5 4',
        fillColor: '#C9A227',
        fillOpacity: 0.08,
        interactive: false,
      }).addTo(map);
    }

    map.on('click', async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      if (ring && !isInsidePolygon(lat, lng, ring)) {
        onBlockedRef.current?.();
        return;
      }

      if (markerRef.current) map.removeLayer(markerRef.current);
      markerRef.current = L.marker([lat, lng], { icon: makeIcon() }).addTo(map);

      try {
        const res = await fetch(`${PHOTON}/reverse?lat=${lat}&lon=${lng}&limit=1`);
        const data = await res.json();
        if (data.features && data.features.length > 0) {
          const props = data.features[0].properties;
          const parts: string[] = [];
          if (props.name) parts.push(props.name);
          if (props.city || props.town || props.village) {
            parts.push(props.city || props.town || props.village);
          }
          if (props.state) parts.push(props.state);
          if (props.country) parts.push(props.country);
          const shortAddress =
            parts.length > 0 ? parts.join(', ') : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          lastSelectedRef.current = shortAddress;
          onSelectRef.current?.(shortAddress);
        }
      } catch {
        const fallback = `Pinned at ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        lastSelectedRef.current = fallback;
        onSelectRef.current?.(fallback);
      }
    });

    mapInstanceRef.current = map;
    setIsLoaded(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [restrictTo, center, zoom]);

  // Text -> map. Debounced so typing does not fire a request per keystroke.
  useEffect(() => {
    if (!initialLocation || initialLocation.length < 3) return;

    // The parent echoed back the address we just gave it. Already positioned
    // here at the exact clicked point, so re-geocoding would only make the pin
    // drift. Clear the guard so a later manual edit still works.
    if (initialLocation === lastSelectedRef.current) {
      lastSelectedRef.current = '';
      return;
    }

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);

    searchTimerRef.current = setTimeout(async () => {
      if (!mapInstanceRef.current) return;

      setSearching(true);
      try {
        const res = await fetch(
          `${PHOTON}/api/?q=${encodeURIComponent(initialLocation)}&limit=1&lang=en`
        );
        const data = await res.json();
        if (data.features?.length > 0 && mapInstanceRef.current) {
          // Photon returns [longitude, latitude], the reverse of Leaflet's order.
          const [lon, lat] = data.features[0].geometry.coordinates;

          // A same-named place elsewhere must not drag the map out of range.
          if (restrictTo && !isInsidePolygon(lat, lon, restrictTo)) {
            onBlockedRef.current?.();
            setSearching(false);
            return;
          }

          mapInstanceRef.current.setView([lat, lon], SEARCH_ZOOM, { animate: true });

          if (markerRef.current) mapInstanceRef.current.removeLayer(markerRef.current);
          markerRef.current = L.marker([lat, lon], { icon: makeIcon() })
            .addTo(mapInstanceRef.current);
        }
      } catch (err) {
        console.error('Map search failed:', err);
      }
      setSearching(false);
    }, DEBOUNCE_MS);

    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [initialLocation, restrictTo]);

  return (
    <div className="relative rounded-lg overflow-hidden border border-white/15 z-0">
      <div ref={mapRef} className="w-full h-[200px] sm:h-[260px] z-0" />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary-navy text-xs text-light-navy/60 z-[1000]">
          Loading map...
        </div>
      )}

      {searching && (
        <div className="absolute top-2 right-2 z-[1000] bg-primary-navy/90 text-white text-[10px] px-2 py-1 rounded">
          Searching...
        </div>
      )}

      <div className="absolute top-2 left-2 z-[1000] bg-primary-navy/90 text-white text-[10px] px-2 py-1 rounded">
        Click on map to pin location
      </div>
    </div>
  );
}
