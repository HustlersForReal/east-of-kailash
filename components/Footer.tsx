import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore East of Kailash', href: '/#explore' },
    { label: 'Exclusive Deals', href: '/exclusive-deals' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: site.whatsapp(`Hello ${site.name}, I want to get in touch.`) },
  ];

  return (
    <footer className="bg-primary-navy text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-14">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                EastOfKailash<span className="text-gold-accent">.com</span>
              </span>
            </Link>
            <p className="text-light-navy/50 text-lg italic">
              &quot;{site.quote}&quot;
            </p>
            <p className="text-xs sm:text-sm text-light-navy/40 leading-relaxed max-w-xs mt-4">
              Your hyperlocal real-estate marketplace for South Delhi. Everything you need to discover, understand, and transact property in East of Kailash.
            </p>
          </div>
          
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-navy/50 hover:text-gold-accent transition-colors text-sm"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className="text-light-navy/50 hover:text-gold-accent transition-colors text-sm">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5 sm:mb-6">Explore</h4>
            <ul className="space-y-2.5">
              {['Block A', 'DDA Flats', 'Community Centre 1', 'Community Centre 2', 'Schools', 'Hospitals'].map((name) => {
                const slug = name.toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={name}>
                    <Link href={`/area/${slug}`} className="text-light-navy/50 hover:text-gold-accent transition-colors text-sm">
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5 sm:mb-6">Contact Us</h4>
            <ul className="space-y-2.5 text-light-navy/50 text-sm">
              <li>{site.phoneDisplay}</li>
              <li>{site.email}</li>
              <li className="pt-2">
                {site.addressLine1}<br/>
                {site.addressLine2}
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-[11px] sm:text-xs text-light-navy/30 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] sm:text-xs text-light-navy/30 uppercase tracking-wider">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
