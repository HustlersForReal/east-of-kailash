'use client';

const services = [
  '100% Verified Properties',
  'Full Cheque Deals On Demand',
  'Zero Brokerage Deals For Buyers',
  'Direct Owner Deals',
  'Property Title Due Diligence',
  'Property Mutation Certificate',
  'Property Valuation Reports',
  'Property Freehold Conversion',
  'Property Deed Drafting',
  'Property Deed Registration',
  'Property Liaisoning',
  'Property NOC',
  'DDA',
  'L&Do',
  'MCD',
  'Property Tax Assessment',
  'Sub-Registrar Office',
  'Property Disputes',
  'Disputed Property Disposal',
  'Old & dilapidated property services',
  'East of Kailash Exclusive Properties',
  'DDA Flats Exclusive Properties',
  'Exclusive Luxury Property Services',
  'Buy Exclusive Properties In Dubai',
  'Property Verification',
  'Sale Deed',
  'Gift Deed',
  'Will Deed',
  'Relinquishment Deed',
  'Release Deed',
  'Rectification Deed',
  'Exchange Deed',
  'Partition Deed',
  'Trust Deed',
  'Adoption Deed',
  'Collaboration Deed',
  'Mortgage Deed',
  'Surrender Deed',
  'Quit Claim Deed',
  'Grant Deed',
  'Warranty Deed',
  'Special Warranty Deed',
  'Fiduciary Deed',
  'Court Order Deed',
  'Conveyance Deed',
  'General Power of Attorney',
  'Special Power of Attorney',
  'Agreement to Sell',
  'Builder Buyer Agreement',
  'Rent/Lease Agreement',
  'Joint Development Agreement',
  'NOC',
  'Surviving Member Certificate',
  'Structural Stability Certificate',
  'Encumbrance Certificate',
  'Regularisation',
  'Red Stamp Removal',
  'De-sealing',
  'Property Tax Assessment',
  'Substitution of Property',
  'Parent Deed Handling',
  'Conversion Charges',
  'Change of Land Use (CLU)',
  'Loan Liaisoning',
  'Residential Liaisoning',
  'Commercial Liaisoning',
  'Industrial Liaisoning',
  'Institutional Liaisoning',
  'BSES / TPDDL',
  'Delhi Jal Board (DJB)',
  'Land Liaisoning',
  'Architectural Design 2D Layout Plan',
  'New Building Plan',
  'Addition / Alteration',
  'Completion Certificate',
  'Occupancy Certificate',
  'Regularization Certificate',
  'De-Sealing',
  'Buyer Services',
  'Seller Services',
  'Landlord Services',
  'Tenant Services',
  'Builder/Developer Services',
  'Institutional Services',
  'NRI Services',
  'End-to-End Services',
  'Notary Services',
  'Loan Services',
  'Buyer Package',
  'Seller Package',
  'NRI Buy-Sell Package',
];

export function ServicesMarquee() {
  const loop = [...services, ...services];

  return (
    <div className="w-screen max-w-[100vw] border-t border-white/20 pt-2 sm:pt-2.5 pb-2.5 sm:pb-3.5">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="animate-marquee flex w-max gap-2.5 pr-2.5 hover:[animation-play-state:paused] sm:gap-3 sm:pr-3">
          {loop.map((service, i) => (
            <div
              key={`${service}-${i}`}
              aria-hidden={i >= services.length}
              className="flex shrink-0 items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/20 bg-white/12 px-5 py-2.5 sm:px-6 sm:py-3.5 backdrop-blur-md shadow-sm"
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold-accent" />
              <span className="whitespace-nowrap text-[14px] sm:text-[15px] md:text-base font-semibold text-white/90">
                {service}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
