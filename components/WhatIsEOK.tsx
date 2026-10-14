import { ArrowUpRight } from 'lucide-react';
import { WhatsAppLink } from './WhatsAppLink';
import { site } from '@/lib/site';

export function WhatIsEOK() {
  return (
    <>
      <section className="py-14 sm:py-20 md:py-24 lg:py-32 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-[0.07]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-gold-accent">
            <polygon points="0,100 100,0 100,100" />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
            Who We Are
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 sm:mb-8 tracking-tight leading-[1.1]">
            What Is EastOfKailash.com?
          </h2>

          <div className="space-y-5 sm:space-y-6 text-light-navy/70 text-sm sm:text-[15px] leading-[1.9]">
            <p>
              Unlike the generic portals where you search like a needle in the grass, we at
              EastOfKailash.com bring to you an offer that suits your preferences and aligns with
              your financial plans, and do not keep you thinking: can I get something better?
            </p>
            <p>
              We are a first ever hyper-local market that offers specialized schemes and end-to-end
              property services with the deepest knowledge of the neighbourhood. Thus making us
              proudly say:
            </p>
          </div>

          <p className="text-gold-accent font-extrabold tracking-[0.08em] uppercase text-xl sm:text-2xl lg:text-3xl mt-8 sm:mt-10 drop-shadow-[0_2px_12px_rgba(201,162,39,0.35)]">
            Aapki Talaash, East of Kailash
          </p>
        </div>
      </section>

      <div className="flex justify-center px-4 sm:px-6 py-8 sm:py-10 bg-white">
        <WhatsAppLink
          message={`Hello, ${site.name}! I Want To Know How You Are Better Than The Other Platforms.`}
          phone={site.phone}
          className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 sm:gap-2.5 px-5 sm:px-8 py-4 bg-gold-accent text-primary-navy border-2 border-gold-accent hover:bg-primary-navy hover:text-white hover:border-primary-navy text-[13px] sm:text-sm font-bold uppercase tracking-[0.08em] sm:tracking-[0.15em] leading-snug sm:leading-normal transition-all duration-300 text-center text-balance"
        >
          <span>60 Seconds To Prove EastOfKailash.com Is Better!</span>
          <ArrowUpRight className="w-[18px] h-[18px] sm:w-4 sm:h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </WhatsAppLink>
      </div>
    </>
  );
}