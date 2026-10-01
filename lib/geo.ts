// Rough boundary of East of Kailash (Blocks A-G, Kailash Hills), pincode
// 110065. Used to keep map pins inside the area this portal actually covers.
//
// This is an APPROXIMATION, not the official India Post polygon. It is
// deliberately generous around the edges so a legitimate address is never
// rejected. Blocks are spread around Captain Gaur Marg, Garhi and Kailash
// Hills, so this ring covers the whole neighbourhood rather than a tight
// pincode box. Neighbours deliberately excluded: Nehru Place to the NE,
// Amritpuri to the W, Greater Kailash to the N.
export const PINCODE_110065_RING: [number, number][] = [
  [28.5020, 77.2300], // SW
  [28.5060, 77.2480], // S
  [28.5080, 77.2680], // SE
  [28.5180, 77.2760], // E
  [28.5290, 77.2730], // NE
  [28.5340, 77.2600], // N
  [28.5330, 77.2420], // NW
  [28.5250, 77.2280], // W
  [28.5120, 77.2230], // WSW
];

export const PINCODE_110065_CENTER: [number, number] = [28.5170, 77.2500];

/**
 * Ray-casting point-in-polygon test.
 * `ring` is treated as closed, so the last point does not need to repeat
 * the first.
 */
export function isInsidePolygon(
  lat: number,
  lng: number,
  ring: [number, number][]
): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [yi, xi] = ring[i];
    const [yj, xj] = ring[j];
    const intersects =
      yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

export function isInsideEastOfKailash(lat: number, lng: number): boolean {
  return isInsidePolygon(lat, lng, PINCODE_110065_RING);
}