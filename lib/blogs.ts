export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string };

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  readTime: string;
  content: BlogBlock[];
}

export const blogs: Blog[] = [
  {
    id: 'art-1',
    slug: 'blocks-a-to-g-east-of-kailash-locality-guide',
    title: 'Blocks A to G: The Complete East of Kailash Locality Guide',
    category: 'Locality Guide',
    date: 'August 12, 2026',
    image: '/east-of-kailash-images/block-c/01.jpeg',
    excerpt:
      'Seven residential blocks, one DDA pocket and two community centres — what actually differs between Block A and Block G, and which pocket suits buyers, investors and tenants.',
    readTime: '10 min read',
    content: [
      {
        type: 'p',
        text: 'East of Kailash looks like one colony from the Outer Ring Road. Living here teaches you otherwise: each of the seven lettered blocks — A through G — has its own lane widths, park access, community character and price behaviour, with the DDA flats pocket and the two Community Centres adding two more micro-markets. This guide walks the colony block by block, so you can shortlist like a local before you ever pick up the phone.',
      },
      { type: 'h2', text: 'The colony in one picture' },
      {
        type: 'p',
        text: 'East of Kailash (pincode 110065) is a DDA-planned South Delhi colony developed across the 1960s and 1970s: plotted blocks with parks at regular intervals, a DDA flats pocket from the same era, and two dedicated Community Centre markets — a rare commercial luxury for a single residential colony. It sits between Kailash Colony, Greater Kailash, Lajpat Nagar and Nehru Place, with Govindpuri metro station (Violet Line, opened 2010) and the Outer Ring Road feeding connectivity. For circle-rate purposes the entire colony falls in Category C (land Rs 1,60,000 per sq m), which keeps stamp-duty math uniform even as market prices vary sharply block to block.',
      },
      { type: 'h2', text: 'Blocks A–C: the established core' },
      {
        type: 'p',
        text: 'Block A is the colony\u2019s gateway on the Outer Ring Road side — widest lanes, quickest exits toward Nehru Place, Kailash Colony and Lajpat Nagar, and a settled mix of original allottees and upgraded builder floors. Block B sits at the quiet centre with maintained parks and a strong community feel, the classic family-buy block. Block C is the colony\u2019s most sought-after address: premium residential stock, generous plots and the shortest walk to the Community Centre belt, which is why luxury builder floors and independent houses here command the top rents and the fastest resales in 110065.',
      },
      { type: 'h2', text: 'Blocks D–E: parks, space and redevelopment' },
      {
        type: 'p',
        text: 'Block D is defined by its green surroundings — several of the colony\u2019s best-maintained parks fall in and around it — making park-facing floors here carry a visible, durable premium. Block E offers some of the more spacious plots and independent houses with a quieter, low-traffic atmosphere; for long-horizon buyers its real story is redevelopment potential, as large ageing houses on wide plots are the natural candidates for the next rebuild cycle.',
      },
      { type: 'h2', text: 'Blocks F–G: practicality and entry pricing' },
      {
        type: 'p',
        text: 'Block F is the colony\u2019s practical middle — orderly streets, equidistant from the amenity belt (schools, hospitals, nursing homes) and the shopping areas, with dependable tenant demand from professionals working in Nehru Place and Okhla. Block G forms the peaceful edge: calm streets, settled character and comparatively accessible entry prices, often the smartest first step into this micro-market for first-time buyers and yield-focused investors.',
      },
      { type: 'h2', text: 'The two other micro-markets' },
      {
        type: 'list',
        items: [
          'DDA Flats: the colony\u2019s original housing backbone — compact, functional units with unbeatable value per sq ft inside a premium pincode and consistently deep rental demand from students and young professionals. The classic rental-yield play.',
          'Community Centre 1 & 2: the original commercial hub plus its second wave — banks, restaurants, clinics, showrooms and co-working spaces. Ground-floor retail on the main circulation is gold-standard stock with genuine scarcity value.',
          'Amenity belt (schools, hospitals, nursing home): not a market you buy into directly, but the reason family tenancies here run long and vacant periods stay short.',
        ],
      },
      {
        type: 'quote',
        text: 'In East of Kailash you don\u2019t choose a flat. You choose a block — and the block decides your tenant, your resale speed and your peace.',
      },
      { type: 'h2', text: 'How to use this guide' },
      {
        type: 'p',
        text: 'End-use families tend to land in B, D or F; premium buyers target C and E; investors split between DDA flats for yield and C/E for appreciation; commercial money goes to the Community Centre belt. Whatever your bracket, walk the shortlisted block on a weekday evening before you tokenise — parks, parking pressure and lane activity tell you in twenty minutes what listings never will. And for paperwork, pricing and negotiation inside any of these fourteen pockets, that is exactly what a hyperlocal desk is for.',
      },
    ],
  },
  {
    id: 'art-2',
    slug: 'stamp-duty-registration-mutation-south-delhi-guide',
    title: 'Stamp Duty, Registration and Mutation in South Delhi: The Real Cost of Buying',
    category: 'Legal & Documentation',
    date: 'July 28, 2026',
    image: '/east-of-kailash-images/community-centre-1/01.jpeg',
    excerpt:
      'Male 6%, female 4%, joint 5% — plus 1% registration. Then the MCD e-mutation. The full post-deal money trail, with the documents the sub-registrar and the MCD actually ask for.',
    readTime: '10 min read',
    content: [
      {
        type: 'p',
        text: 'Most buyers budget the property price and forget the government\u2019s share until the week of registration. In Delhi that share is large, gender-linked and non-negotiable — and after registration, a second process (mutation) decides whose name the municipal records show. This guide maps the complete money trail for a South Delhi purchase: what you pay, to whom, in what order, and which papers to keep ready.',
      },
      { type: 'h2', text: 'Stamp duty: the gender-linked slabs' },
      {
        type: 'p',
        text: 'Delhi\u2019s stamp duty on a sale deed is 6% for a male buyer, 4% for a female buyer and 5% for joint ownership — calculated on the actual sale price or the circle-rate value of the property, whichever is higher. Registration charges are a flat 1% of the deal value for everyone, plus a nominal pasting charge. So a man registering a property effectively pays 7% over the price, a woman 5%, and a jointly-owned purchase 6%. On an East of Kailash builder floor running into crores, registering in a woman\u2019s name is a fully legal saving of several lakhs — families here use this concession routinely.',
      },
      {
        type: 'list',
        items: [
          'Male buyer: 6% stamp duty + 1% registration = 7% total outflow',
          'Female buyer: 4% stamp duty + 1% registration = 5% total outflow',
          'Joint (male + female): 5% stamp duty + 1% registration = 6% total outflow',
          'Duty applies to the higher of deal price and circle-rate value — under-declaring the price never reduces duty',
        ],
      },
      { type: 'h2', text: 'Registration: what actually happens at the sub-registrar' },
      {
        type: 'p',
        text: 'The sale deed is executed and registered at the sub-registrar\u2019s office of the concerned zone, with stamp duty paid upfront (today largely through online/stock-holding channels) and both parties present with ID proof, photographs and witnesses. Keep the registered deed\u2019s number, date and sub-registrar details safe — every downstream step, from mutation to home-loan disbursement to future resale, references them. One practical tip: verify the circle-rate value of your exact property before the appointment, so there is no last-minute duty shortfall at the counter.',
      },
      { type: 'h2', text: 'Mutation: the step buyers skip (and regret)' },
      {
        type: 'p',
        text: 'Registration transfers title; mutation (e-Change of Name with the MCD) updates the municipal property-tax record to show you as the taxpayer. Under Section 128 of the DMC Act, 1957, mutation is granted for property-tax realisation only — it does not by itself confer legal title — but without it, tax bills, and eventually utility linkages, stay in the seller\u2019s name. Since 2019, deeds registered at the sub-registrar are auto-pushed to the MCD and mutation is substantially auto-triggered, though buyers should still log in, verify the UPIC ledger and download the e-Change of Name certificate rather than assume it happened.',
      },
      { type: 'h2', text: 'The mutation file: documents the MCD asks for' },
      {
        type: 'list',
        items: [
          'Complete registered sale/conveyance deed (not just first and last pages)',
          'Chain of previous ownership documents, where not already reflected in MCD records',
          'Latest property-tax receipt showing zero arrears — mutation is normally held up until dues are cleared',
          'Buyer ID proof (Aadhaar/PAN/passport) plus applicant and property photographs',
          'Notarised affidavit (Rs 10 stamp paper) and indemnity bond (Rs 100 stamp paper) in MCD formats',
          'For inheritance cases: death certificate, will or succession paperwork, and surviving-member/NOC documentation as applicable',
        ],
      },
      {
        type: 'quote',
        text: 'Registration makes you the owner. Mutation makes the city agree with you. Budget an hour for the second the week you finish the first.',
      },
      { type: 'h2', text: 'Timelines and trouble spots' },
      {
        type: 'p',
        text: 'A clean sale-deed mutation is typically processed within 15–30 working days; deficiency flags (illegible deed scans, wrong UPIC, missing affidavit) come back by SMS/email for correction, while rival claims or litigation can stretch cases to months with a hearing before the zonal assessing officer. Older deeds (pre-2019), gift and relinquishment transfers, and inheritance files always need a manual application on the MCD portal rather than relying on auto-trigger. Our documentation desk handles this entire chain — duty computation, registration booking, mutation filing and certificate download — because in our experience, the deal is only truly closed when the UPIC record says your name.',
      },
    ],
  },
  {
    id: 'art-3',
    slug: 'east-of-kailash-history-dda-colony-guide',
    title: 'East of Kailash: How a 1960s DDA Colony Became South Delhi\u2019s Family Address',
    category: 'Locality Guide',
    date: 'June 15, 2026',
    image: '/east-of-kailash-images/block-a/01.jpeg',
    excerpt:
      'Planned by the DDA across the 1960s and 1970s on Delhi\u2019s southern edge, East of Kailash grew from plotted blocks into the colony families refuse to leave.',
    readTime: '8 min read',
    content: [
      {
        type: 'p',
        text: 'Before independence, the ground East of Kailash stands on was open southern outskirts — fields and scrub beyond the imperial city. Partition in 1947 pushed nearly half a million refugees into Delhi and forced the city southward; the Delhi Development Authority, created in 1957, then formalised that expansion into planned colonies through the 1960s and 1970s. East of Kailash is a textbook product of that era: lettered residential blocks (A through G) laid around parks, a DDA flats pocket from the same years, and commercial needs concentrated in community centres rather than scattered across lanes.',
      },
      { type: 'h2', text: 'The DDA template — and why it aged well' },
      {
        type: 'p',
        text: 'The colony\u2019s plan shows the DDA\u2019s 1960s instincts at their best: low-rise plotted housing at human scale, green pockets at regular intervals, schools and healthcare embedded inside the colony, and shopping quarantined into two Community Centres. That separation is the reason East of Kailash never developed the chaotic mixed-use lanes that strain other South Delhi colonies — and why, sixty years on, its residential lanes still feel residential. When the Violet Line reached Govindpuri in 2010 and the Outer Ring Road matured into a crosstown artery, the colony gained metro-grade connectivity without surrendering its layout.',
      },
      { type: 'h2', text: 'From allotments to builder floors' },
      {
        type: 'p',
        text: 'Like much of South Delhi, the colony\u2019s housing stock evolved in waves: original DDA allotments and plotted houses first, then the great builder-floor transformation from the 1980s onward, as single-family homes became stilt-plus-four buildings with separately saleable floors. Today\u2019s market is therefore layered — original houses awaiting redevelopment next to brand-new builder floors, DDA flats trading as the value entry, and commercial stock concentrated in the Community Centre belt. Each layer has different paperwork, different construction quality and different price logic, which is why \u201cEast of Kailash rates\u201d as a single number is meaningless without a block and a building type attached.',
      },
      { type: 'h2', text: 'The neighbourhood effect' },
      {
        type: 'list',
        items: [
          'Kailash Colony and Greater Kailash next door keep the entire belt\u2019s social infrastructure — schools, hospitals, clubs — within minutes',
          'Nehru Place, a 1970s district centre, turned the colony into a walk-to-work or short-commute address for generations of professionals',
          'The Lotus Temple and ISKCON Temple nearby anchor the area\u2019s identity far beyond property circles',
          'Two Community Centres inside one colony give it commercial self-sufficiency most South Delhi colonies lack',
        ],
      },
      {
        type: 'quote',
        text: 'Planned colonies don\u2019t just house people — they protect the way people live. That protection is what six decades of East of Kailash buyers have actually been paying for.',
      },
      { type: 'h2', text: 'Buying into the history' },
      {
        type: 'p',
        text: 'Practically, the history lesson converts into three checks: confirm the DDA-era title chain from the original allotment; treat construction era as a pricing variable, not a footnote; and remember the whole colony sits in circle-rate Category C (land Rs 1,60,000 per sq m), so stamp-duty math is uniform even when market prices are not. Get those three right and you are not just buying square feet — you are buying into the most stable residential franchise in South Delhi.',
      },
    ],
  },
];
