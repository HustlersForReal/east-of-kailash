'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { WhatsAppLink } from './WhatsAppLink';
import { site } from '@/lib/site';

/* Two fixed action buttons that stay put while the page scrolls.
   Direct call on the left edge, WhatsApp on the right.

   z-30 puts them above page content (Leaflet is forced to z-index 0 in
   globals.css) but below the sticky navbar (z-50) and the mobile drawer
   overlay (z-40), so opening the menu dims them behind it instead of the
   buttons floating over the drawer. */
export function FloatingActions() {
  return (
    <>
      <a
        href={`tel:${site.phone}`}
        aria-label={`Call ${site.name} on ${site.phoneDisplay}`}
        className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 z-30 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-primary-navy text-white shadow-lg shadow-primary-navy/25 hover:bg-gold-accent hover:text-primary-navy transition-colors duration-300"
      >
        <Phone className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </a>

      <WhatsAppLink
        message={`Hello ${site.name}, I want to talk to an expert about a property in my area.`}
        phone={site.phone}
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-30 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:bg-[#1EBE5A] transition-colors duration-300"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
        <span className="sr-only">Chat on WhatsApp</span>
      </WhatsAppLink>
    </>
  );
}