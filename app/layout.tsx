import type {Metadata} from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ReferralWelcome } from '@/components/ReferralWelcome';
import { FloatingActions } from '@/components/FloatingActions';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { JsonLd } from '@/components/JsonLd';
import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  KEYWORDS,
  SITE_URL,
  TITLE_TEMPLATE,
} from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: 'EastOfKailash.com',
  authors: [{ name: 'EastOfKailash.com', url: SITE_URL }],
  creator: 'EastOfKailash.com',
  publisher: 'EastOfKailash.com',
  keywords: KEYWORDS,
  category: 'real estate',
  alternates: {
    canonical: absoluteUrl('/'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: absoluteUrl('/'),
    siteName: 'EastOfKailash.com',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: absoluteUrl('/og-image.png'),
        width: 1200,
        height: 630,
        alt: 'EastOfKailash.com - Property in East of Kailash, Delhi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl('/og-image.png')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/manifest.webmanifest',
};

/**
 * Organisation-level schema. Every field comes from lib/site.ts or from content
 * that is visible on the site. Nothing is invented.
 *
 * There is no logo image in public/ on this portal yet, so the logo field is
 * omitted rather than pointing at an unrelated photo. Add a real logo file and
 * set logo.image once one exists.
 */
const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${SITE_URL}/#organisation`,
  name: site.name,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  email: site.email,
  telephone: site.phoneDisplay,
  image: absoluteUrl('/og-image.png'),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'East of Kailash',
    addressLocality: 'South Delhi',
    addressRegion: 'Delhi',
    postalCode: site.pincode,
    addressCountry: 'IN',
  },
  areaServed: [
    'East of Kailash',
    'Block A',
    'Block B',
    'Block C',
    'Block D',
    'Block E',
    'Block F',
    'Block G',
    'DDA Flats',
    'Community Centre 1',
    'Community Centre 2',
  ].map((name) => ({
    '@type': 'Place',
    name,
  })),
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: site.name,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  publisher: { '@id': `${SITE_URL}/#organisation` },
  inLanguage: 'en-IN',
};

// LayoutProps is the framework-generated global type. Next 15.5 validates the
// root layout's props against it, which requires `params` alongside `children`.
export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN">
      <body className="antialiased bg-white text-primary-text flex flex-col min-h-screen" suppressHydrationWarning>
        <JsonLd data={organisationSchema} />
        <JsonLd data={websiteSchema} />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Suspense fallback={null}>
          <ReferralWelcome />
        </Suspense>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}