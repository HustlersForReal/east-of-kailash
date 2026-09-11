export interface LiveDemand {
  id: string;
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
  { id: 'e1', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', tags: [] },
  { id: 'e2', size: '200 sq yd', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', tags: [] },
  { id: 'e3', size: '325 sq yd', kind: 'Independent House', deal: 'sale', location: 'East of Kailash', block: 'Block A', tags: [] },
  { id: 'e4', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', block: 'Block F', tags: [] },
  { id: 'e5', size: '208 sq yd', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', tags: [] },
  { id: 'e6', bhk: '3 BHK', kind: 'Builder Floor', deal: 'sale', location: 'East of Kailash', block: 'Block D', tags: [] },
  // Rent (5)
  { id: 'e7', size: '200 sq yd', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', tags: [] },
  { id: 'e8', bhk: '5 BHK', kind: 'Flat', deal: 'rent', location: 'East of Kailash', tags: [] },
  { id: 'e9', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', block: 'Block E', tags: [] },
  { id: 'e10', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', block: 'Block D', tags: [] },
  { id: 'e11', bhk: '3 BHK', kind: 'Builder Floor', deal: 'rent', location: 'East of Kailash', block: 'Block A', tags: [] },
];
