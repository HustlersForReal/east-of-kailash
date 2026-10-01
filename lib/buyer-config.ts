// Config for the buyer requirement form on /submit-your-requirement
// Source of truth: BUYER-FORM.txt, scoped to East of Kailash only.

export const BUYER_PROPERTY_TYPES = [
  {
    group: 'Residential',
    options: [
      'Flat',
      'Apartment',
      'Residential House',
      'Villa',
      'Builder Floor Apartment',
      'Residential Land / Plot',
      'Penthouse',
      'Studio Apartment',
    ],
  },
  {
    group: 'Commercial',
    options: [
      'Commercial Office Space',
      'Office / IT Park',
      'Commercial Shop',
      'Commercial Showroom',
      'Commercial Land',
      'Warehouse',
      'Godown',
      'Industrial Land',
      'Industrial Building',
      'Industrial Shed',
    ],
  },
  {
    group: 'Agricultural',
    options: ['Agricultural Land', 'Farmhouse'],
  },
];

// Types that show Plot Area and hide Construction Status.
export const LAND_TYPES = [
  'Residential Land / Plot',
  'Commercial Land',
  'Industrial Land',
  'Agricultural Land',
];

// Types that show Bedrooms.
export const BEDROOM_TYPES = [
  'Flat',
  'Apartment',
  'Residential House',
  'Villa',
  'Builder Floor Apartment',
  'Penthouse',
  'Farmhouse',
];

export const BEDROOM_OPTS = ['1 RK / 1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
export const STUDIO_OPTS = ['Studio', '1 RK'];

export const CONSTRUCTION_OPTS = ['New Launch', 'Under Construction', 'Ready to Move'];

export const POSSESSION_OPTS: Record<string, string[]> = {
  'Ready to Move': ['Immediately', 'Within 1-3 Months', 'Within 3-6 Months', 'Flexible'],
  'Under Construction': ['Within 6 Months', 'Within 1 Year', '1-2 Years', '2+ Years', 'Flexible'],
  'New Launch': ['Within 1 Year', '1-2 Years', '2-3 Years', '3+ Years', 'Flexible'],
};

// Minimum / maximum budget bands, in rupees.
export const BUDGET_OPTS = [
  '5 Lakh',
  '10 Lakh',
  '15 Lakh',
  '20 Lakh',
  '25 Lakh',
  '30 Lakh',
  '40 Lakh',
  '50 Lakh',
  '60 Lakh',
  '75 Lakh',
  '1 Crore',
  '1.25 Crore',
  '1.5 Crore',
  '2 Crore',
  '2.5 Crore',
  '3 Crore',
  '4 Crore',
  '5 Crore',
  '7.5 Crore',
  '10 Crore',
  '15 Crore',
  '20 Crore',
  '25 Crore',
  '50 Crore',
  '100 Crore+',
];

// Plot area bands, in sq. ft.
export const PLOT_AREA_OPTS = [
  '100 - 200',
  '200 - 300',
  '300 - 500',
  '500 - 750',
  '750 - 1000',
  '1000 - 1500',
  '1500 - 2000',
  '2000 - 3000',
  '3000 - 4000',
  '4000+',
];

// Approximate centre of each East of Kailash area, used to place markers on
// the map and to pan to the right spot when a locality is selected.
// These are rough centroids, not exact boundaries: the buyer can still drop
// a precise pin anywhere in the map.
export const LOCALITY_COORDS: Record<string, [number, number]> = {
  'Block A': [28.5150, 77.2450],
  'Block B': [28.5190, 77.2470],
  'Block C': [28.5210, 77.2500],
  'Block D': [28.5230, 77.2530],
  'Block E': [28.5250, 77.2560],
  'Block F': [28.5210, 77.2590],
  'Block G': [28.5170, 77.2610],
  'DDA Flats': [28.5185, 77.2480],
  'Schools': [28.5190, 77.2510],
  'Hospitals': [28.5235, 77.2470],
  'Nursing Home': [28.5165, 77.2550],
  'Community Centre 1': [28.5240, 77.2480],
  'Community Centre 2': [28.5120, 77.2540],
  'Cinema Hall': [28.5215, 77.2430],
};

// Note: the map is positioned by geocoding the selected locality name
// (see map-docs.md), so no hardcoded coordinates are needed here.