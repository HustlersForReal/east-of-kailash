'use client';

const benefits = [
  'Pay in Installments',
  'Free Sale Deed',
  'Free Rent Agreement',
  'Free Mutation',
  'Free Water / Electricity Name Transfer',
];

/* How many times the set is repeated. The animation shifts the track by exactly
   half its width (-50%), so this MUST be even for the copies to tile: each one
   has to be identical and flush against the next.

   Two copies is not enough. The set is roughly 1200px, so a 2-copy track is
   about 2400px wide and shifts only 1200px. On anything wider than 1200px the
   track stops covering the viewport and a blank gap opens up as it scrolls.
   Four copies clears viewports up to about 2400px. Keep it even. */
const REPEATS = 4;

/* Lives inside the sticky Navbar <header>, directly under the nav row, so it
   sticks with the navbar. That makes the header taller by this strip's height
   (h-12 on phones, h-10 from sm up), which the mobile drawer's top offset and
   the Hero's min-h both have to account for. */
export function TopBenefitsMarquee({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="relative z-10 w-full bg-white" aria-hidden={collapsed}>
      <div
        className={`flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] transition-[height] duration-300 ease-out ${
          collapsed ? 'h-0' : 'h-12 sm:h-10'
        }`}
      >
        <div className="animate-marquee-fast flex w-max items-center gap-2 pr-2 hover:[animation-play-state:paused] sm:gap-2.5 sm:pr-2.5">
          {Array.from({ length: REPEATS }).flatMap((_, copy) =>
            benefits.map((benefit, i) => (
              <div
                key={`${copy}-${benefit}-${i}`}
                aria-hidden={copy > 0}
                className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-gold-accent/60 bg-primary-navy px-4 py-2 sm:gap-2 sm:px-4 sm:py-1"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-gold-accent sm:h-1.5 sm:w-1.5" />
                <span className="text-[13px] sm:text-xs font-bold uppercase tracking-[0.08em] text-white">
                  {benefit}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}