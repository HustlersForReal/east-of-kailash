import type { MetadataRoute } from 'next';

// Required under output: 'export'. Without this the route is treated as
// dynamic and the build fails with a "force-static not configured" error.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EastOfKailash.com - Property in East of Kailash, 110065',
    short_name: 'EastOfKailash',
    description:
      'Hyperlocal real estate portal for East of Kailash, South Delhi 110065: Blocks A to G, DDA flats and the Community Centre markets.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#163825',
  };
}