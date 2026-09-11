import type { Metadata } from 'next';
import GalleryClient from './client';

export const metadata: Metadata = {
  title: 'Gallery - EastOfKailash.com',
  description: 'Explore all photos of East of Kailash — Blocks A-G, Community Centres and more. 688+ images.',
};

export default function GalleryPage() {
  return <GalleryClient />;
}
