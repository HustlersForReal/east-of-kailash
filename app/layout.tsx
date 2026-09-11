import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'EastOfKailash.com - The Home of Real Estate in East of Kailash',
  description: 'Hyperlocal real estate platform for East of Kailash, South Delhi (110065). Properties, Blocks A-G, DDA Flats, schools, hospitals, Community Centre markets and services.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-primary-text flex flex-col min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
