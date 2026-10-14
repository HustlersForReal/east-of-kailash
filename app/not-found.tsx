import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for is not on EastOfKailash.com.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-3 sm:mb-4 block">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-navy mb-4 sm:mb-6 tracking-tight leading-[1.1]">
          We could not find that page.
        </h1>
        <p className="text-secondary-text text-base sm:text-lg leading-relaxed mb-8 sm:mb-10">
          The link may be outdated, or the property may no longer be listed. Browse the
          blocks and localities we cover, or tell us what you were looking for.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-navy text-white text-sm font-semibold uppercase tracking-wider hover:bg-gold-accent hover:text-primary-navy transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/submit-your-requirement"
            className="inline-flex items-center justify-center px-6 py-3 border border-border-color text-primary-navy text-sm font-semibold uppercase tracking-wider hover:border-gold-accent hover:text-gold-accent transition-colors"
          >
            Submit Your Requirement
          </Link>
        </div>
      </div>
    </section>
  );
}