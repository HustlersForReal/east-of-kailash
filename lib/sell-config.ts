export const PROPERTY_TYPE_OPTIONS = [
  { group: 'Residential', options: ['Flat', 'Apartment', 'Residential House', 'Villa', 'Builder Floor Apartment', 'Residential Land / Plot', 'Penthouse', 'Studio Apartment'] },
  { group: 'Commercial', options: ['Commercial Office Space', 'Office / IT Park', 'Commercial Shop', 'Commercial Showroom', 'Commercial Land'] },
];

export const BEDROOM_OPTS = ['1 RK / 1 BHK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'];
export const BATHROOM_OPTS = ['1', '2', '3', '3+'];
export const BALCONY_OPTS = ['0', '1', '2', '3', '3+'];
export const FURNISHING_OPTS = ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'];
export const AREA_UNIT_OPTS = ['sq. ft.', 'sq. yd.', 'sq. m.'];
export const OPEN_SIDES_OPTS = ['1', '2', '3', '4'];
export const YES_NO_OPTS = ['Yes', 'No'];
export const TRANSACTION_OPTS = ['New Property', 'Resale Property'];
export const POSSESSION_STATUS_OPTS = ['Under Construction', 'Ready to Move'];
export const OCCUPANCY_OPTS = ['Vacant', 'Currently Occupied'];
export const NEGOTIABILITY_OPTS = ['Negotiable', 'Non-Negotiable'];
export const AGE_OPTS = ['New', '0–1 Year', '1–5 Years', '5–10 Years', '10+ Years'];
export const FLOORING_OPTS = ['Marble', 'Granite', 'Tiles', 'Wooden', 'Cement', 'Other'];
export const WATER_OPTS = ['24×7', 'Limited Hours', 'Municipal', 'Borewell', 'Other'];
export const OWNERSHIP_OPTS = ['Freehold', 'Leasehold', 'Power of Attorney'];
export const LOAN_OPTS = ['No Loan', 'Loan Exists'];
export const DOCS_OPTS = ['Sale Deed', 'Registry', 'Property Tax Receipt', 'Possession Letter', 'Other relevant documents'];

export const RESIDENTIAL_AMENITIES = [
  'Reserved Parking', 'Visitor Parking', 'Lift', 'Power Backup',
  'Security / CCTV', 'Swimming Pool', 'Gym', 'Club House',
  'Garden / Park', "Children's Play Area", 'Intercom', 'Water Supply',
  'Internet / Wi-Fi', 'Fire Safety',
];

export const COMMERCIAL_AMENITIES = [
  'Reserved Parking', 'Visitor Parking', 'Lift', 'Power Backup',
  'Security / CCTV', 'Fire Safety', 'Internet / Connectivity',
  'Water Supply', 'Loading / Unloading Facility',
];

export const LAND_TYPES = ['Residential Land / Plot', 'Commercial Land'];
export const AMENITY_RES_TYPES = ['Flat', 'Apartment', 'Builder Floor Apartment', 'Residential House', 'Villa', 'Penthouse', 'Studio Apartment'];
export const AMENITY_COMM_TYPES = ['Commercial Office Space', 'Office / IT Park', 'Commercial Shop', 'Commercial Showroom', 'Commercial Land'];

export interface SellFieldDef {
  key: string;
  label: string;
  kind: 'chips' | 'text' | 'select' | 'toggle';
  options?: string[];
  span?: 1 | 2;
  placeholder?: string;
  required?: boolean;
}

const chips = (key: string, label: string, options: string[], extra?: Partial<SellFieldDef>): SellFieldDef => ({
  key, label, kind: 'chips', options, ...extra,
});

const text = (key: string, label: string, placeholder: string, extra?: Partial<SellFieldDef>): SellFieldDef => ({
  key, label, kind: 'text', placeholder, ...extra,
});

const sel = (key: string, label: string, options: string[], extra?: Partial<SellFieldDef>): SellFieldDef => ({
  key, label, kind: 'select', options, ...extra,
});

function apartmentLike(): SellFieldDef[] {
  return [
    chips('bedrooms', 'Bedrooms *', BEDROOM_OPTS, { span: 2, required: true }),
    chips('bathrooms', 'Bathrooms *', BATHROOM_OPTS, { required: true }),
    chips('balconies', 'Balconies', BALCONY_OPTS),
    text('propertyFloor', 'Property Floor *', 'e.g. Ground, 1st, 5th', { required: true }),
    text('totalFloors', 'Total Floors in Building *', 'Number', { required: true }),
    text('carpetArea', 'Carpet Area (sq. ft.)', 'Sq. ft.'),
    text('builtupArea', 'Built-up Area (sq. ft.)', 'Sq. ft.'),
    chips('furnishing', 'Furnishing Status', FURNISHING_OPTS, { span: 2 }),
  ];
}

function houseLike(): SellFieldDef[] {
  return [
    chips('bedrooms', 'Bedrooms *', BEDROOM_OPTS, { span: 2, required: true }),
    chips('bathrooms', 'Bathrooms *', BATHROOM_OPTS, { required: true }),
    chips('balconies', 'Balconies', BALCONY_OPTS),
    text('numFloors', 'Number of Floors *', 'Number', { required: true }),
    text('plotArea', 'Plot Area (sq. ft.) *', 'Sq. ft.', { required: true }),
    text('builtupArea', 'Built-up Area (sq. ft.) *', 'Sq. ft.', { required: true }),
    text('coveredArea', 'Covered Area (sq. ft.)', 'Sq. ft.'),
    chips('openSides', 'Number of Open Sides', OPEN_SIDES_OPTS),
    text('roadWidth', 'Road Width Facing Property (ft)', 'e.g. 30'),
    chips('furnishing', 'Furnishing Status', FURNISHING_OPTS, { span: 2 }),
  ];
}

function landLike(unitOpts: string[], reqRoad: boolean): SellFieldDef[] {
  return [
    text('plotArea', 'Plot Area *', 'Area', { required: true }),
    sel('areaUnit', 'Area Unit *', unitOpts, { required: true }),
    text('totalFloorsAllowed', 'Total Floors Allowed for Construction', 'Number'),
    chips('openSides', 'Number of Open Sides', OPEN_SIDES_OPTS),
    text('roadWidth', 'Road Width Facing Plot *', 'e.g. 30 ft', { required: reqRoad }),
    chips('cornerPlot', 'Corner Plot', YES_NO_OPTS),
    chips('existingConstruction', 'Existing Construction', YES_NO_OPTS, { span: 2 }),
    text('coveredArea', 'Covered Area (sq. ft.)', 'Sq. ft.'),
  ];
}

function officeLike(): SellFieldDef[] {
  return [
    text('carpetArea', 'Carpet Area (sq. ft.)', 'Sq. ft.'),
    text('builtupArea', 'Built-up Area (sq. ft.)', 'Sq. ft.'),
    text('propertyFloor', 'Property Floor', 'e.g. Ground, 1st, 5th'),
    text('totalFloors', 'Total Floors', 'Number'),
    chips('furnishing', 'Furnishing Status', FURNISHING_OPTS, { span: 2 }),
    text('parkingAvailability', 'Parking Availability', 'e.g. Covered / Open / Number of slots'),
    text('powerBackup', 'Power Backup', 'e.g. Full / Partial / None'),
  ];
}

function shopLike(): SellFieldDef[] {
  return [
    text('carpetArea', 'Carpet Area (sq. ft.)', 'Sq. ft.'),
    text('builtupArea', 'Built-up Area (sq. ft.)', 'Sq. ft.'),
    text('propertyFloor', 'Property Floor', 'e.g. Ground, 1st'),
    text('totalFloors', 'Total Floors', 'Number'),
    chips('position', 'Position', ['Main Road Facing', 'Inside Market / Complex'], { span: 2 }),
    chips('furnishing', 'Furnishing Status', FURNISHING_OPTS, { span: 2 }),
    text('parkingAvailability', 'Parking Availability', 'e.g. Covered / Open / Number of slots'),
  ];
}

function showroomLike(): SellFieldDef[] {
  return [
    text('carpetArea', 'Carpet Area (sq. ft.)', 'Sq. ft.'),
    text('builtupArea', 'Built-up Area (sq. ft.)', 'Sq. ft.'),
    text('propertyFloor', 'Property Floor', 'e.g. Ground, 1st'),
    text('totalFloors', 'Total Floors', 'Number'),
    chips('position', 'Position', ['Main Road Facing', 'Inside Commercial Complex'], { span: 2 }),
    chips('furnishing', 'Furnishing Status', FURNISHING_OPTS, { span: 2 }),
    text('parkingAvailability', 'Parking Availability', 'e.g. Covered / Open / Number of slots'),
  ];
}

function studioLike(): SellFieldDef[] {
  return [
    chips('studioConfig', 'Studio Configuration *', ['Studio', '1 RK'], { span: 2, required: true }),
    chips('bathrooms', 'Bathrooms *', BATHROOM_OPTS, { required: true }),
    chips('balconies', 'Balconies', BALCONY_OPTS),
    text('propertyFloor', 'Property Floor *', 'e.g. Ground, 1st, 5th', { required: true }),
    text('totalFloors', 'Total Floors in Building', 'Number'),
    text('carpetArea', 'Carpet Area (sq. ft.)', 'Sq. ft.'),
    text('builtupArea', 'Built-up Area (sq. ft.)', 'Sq. ft.'),
    chips('furnishing', 'Furnishing Status', FURNISHING_OPTS, { span: 2 }),
  ];
}

export const SELL_CONFIG: Record<string, SellFieldDef[]> = {
  'Flat': apartmentLike(),
  'Apartment': apartmentLike(),
  'Builder Floor Apartment': apartmentLike(),
  'Penthouse': apartmentLike(),
  'Residential House': houseLike(),
  'Villa': houseLike(),
  'Residential Land / Plot': landLike(AREA_UNIT_OPTS, true),
  'Commercial Land': landLike(AREA_UNIT_OPTS, true),
  'Commercial Office Space': officeLike(),
  'Office / IT Park': officeLike(),
  'Commercial Shop': shopLike(),
  'Commercial Showroom': showroomLike(),
  'Studio Apartment': studioLike(),
};
