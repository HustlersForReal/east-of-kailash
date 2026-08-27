# EastOfKailash.com

Hyperlocal real estate platform for **East of Kailash, South Delhi (110065)** — Blocks A–G, DDA Flats, schools, hospitals, nursing homes, the two Community Centre markets and the colony cinema hall.

Built with Next.js (App Router), React 19, Tailwind CSS v4 and motion.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Area Pages

Area profiles live in `lib/data.ts`. Each slug has a page at `/area/[slug]` and a photo gallery that reads `public/east-of-kailash-images/<slug>/01.jpeg … 03.jpeg` (`.jpg` also supported). Missing photos show a "Photo coming soon" placeholder — just drop real photos into the folders to activate galleries.

## Contact

All WhatsApp CTAs use the phone number and brand constants defined in `lib/site.ts`.
