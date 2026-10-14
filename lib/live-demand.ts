export interface LiveDemand {
  id: string;
  /** Stable public reference quoted back over WhatsApp. */
  ref: string;
  size?: string;
  bhk?: string;
  floor?: string;
  kind: string;
  deal: 'sale' | 'rent';
  outright?: boolean;
  location: string;
  block?: string;
  tags: string[];
}

export const liveDemands: LiveDemand[] = [
  // Sale (6)
  { id: 'e1', ref: 'EK-YVRQ', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', tags: [] },
  { id: 'e2', ref: 'EK-PDS2', size: '200 sq yd', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', tags: [] },
  { id: 'e3', ref: 'EK-64QR', size: '325 sq yd', kind: 'Independent House', deal: 'sale', location: 'East of Kailash', block: 'Block A', tags: [] },
  { id: 'e4', ref: 'EK-JSUF', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', block: 'Block F', tags: [] },
  { id: 'e5', ref: 'EK-WC2N', size: '208 sq yd', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', tags: [] },
  { id: 'e6', ref: 'EK-DTZA', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', block: 'Block D', tags: [] },
  // Rent (5)
  { id: 'e7', ref: 'EK-5QCP', size: '200 sq yd', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', tags: [] },
  { id: 'e8', ref: 'EK-Y5QS', bhk: '5 BHK', kind: 'Flat', deal: 'rent', location: 'East of Kailash', tags: [] },
  { id: 'e9', ref: 'EK-TY9W', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', block: 'Block E', tags: [] },
  { id: 'e10', ref: 'EK-VZRW', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', block: 'Block D', tags: [] },
  { id: 'e11', ref: 'EK-V7JM', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', block: 'Block A', tags: [] },
];
