import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import MCDBookedClient from './client';

/**
 * Server wrapper. The tool itself is a client component (zone dropdown,
 * search, pagination), and a client component cannot export metadata, so this
 * page owns the title, description and canonical URL.
 */
export const metadata: Metadata = pageMetadata({
  title: 'MCD Booked Property Check',
  description:
    'Check if a Delhi property is booked by MCD before you buy. Zone-wise booking search, regularisation support and due diligence in East of Kailash, 110065.',
  path: '/mcd-booked',
});

export default function MCDBookedPage() {
  return <MCDBookedClient />;
}
