import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import CircleRatesClient from './client';

/**
 * Server wrapper. The rate table is an interactive search, so the component
 * itself has to be a client component, and a client component cannot export
 * metadata. Splitting it here keeps the markup identical while letting this page
 * own its title, description and canonical URL.
 */
export const metadata: Metadata = pageMetadata({
  title: 'East of Kailash Circle Rates 110065',
  description:
    'Delhi circle rates for East of Kailash, broken down by category. Land value per sq m, construction value, and how both feed your stamp duty bill.',
  path: '/circle-rates',
});

export default function CircleRatesPage() {
  return <CircleRatesClient />;
}