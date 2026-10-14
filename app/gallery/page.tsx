import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import GalleryClient from './client';

export const metadata: Metadata = pageMetadata({
  title: 'Gallery',
  description:
    'Browse photos of East of Kailash: Blocks A to G, DDA flats, both Community Centres, the cinema hall, schools and hospitals across 110065.',
  path: '/gallery',
});

export default function GalleryPage() {
  return <GalleryClient />;
}
