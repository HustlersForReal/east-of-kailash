import type {Metadata} from 'next';
import { Suspense } from 'react';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ReferralWelcome } from '@/components/ReferralWelcome';

export const metadata: Metadata = {
  title: 'EastOfKailash.com - The Home of Real Estate in East of Kailash',
  description: 'Hyperlocal real estate platform for East of Kailash, South Delhi (110065). Properties, Blocks A-G, DDA Flats, schools, hospitals, Community Centre markets and services.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-primary-text flex flex-col min-h-screen" suppressHydrationWarning>
        <Suspense fallback={null}>
          <ReferralWelcome />
        </Suspense>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
