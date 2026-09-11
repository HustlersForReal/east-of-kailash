'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Camera, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { blockImages } from '@/lib/block-images';
import { areaProfiles } from '@/lib/data';

const blockLabels: Record<string, string> = {
  'block-a': 'Block A', 'block-b': 'Block B', 'block-c': 'Block C', 'block-d': 'Block D',
  'block-e': 'Block E', 'block-f': 'Block F', 'block-g': 'Block G',
  'community-centre-1': 'Community Centre 1', 'community-centre-2': 'Community Centre 2',
};

const allSlugs = Object.keys(blockImages).filter(k => blockImages[k].length > 0);

type Photo = { slug: string; filename: string; label: string };

export default function GalleryClient() {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const photos: Photo[] = useMemo(() => {
    const slugs = filter === 'all' ? allSlugs : [filter];
    const out: Photo[] = [];
    for (const slug of slugs) {
      const label = blockLabels[slug] || slug;
      for (const f of blockImages[slug] || []) {
        if (search && !label.toLowerCase().includes(search.toLowerCase()) && !f.toLowerCase().includes(search.toLowerCase())) continue;
        out.push({ slug, filename: f, label });
      }
    }
    // sort by slug then numeric filename for stable grid
    return out.sort((a, b) => {
      if (a.slug !== b.slug) return a.slug.localeCompare(b.slug);
      const na = parseInt(a.filename, 10), nb = parseInt(b.filename, 10);
      return na - nb;
    });
  }, [filter, search]);

  const getSrc = (p: Photo) => `/east-of-kailash-images/${p.slug}/${p.filename}`;

  const next = useCallback(() => { if (lightbox !== null) setLightbox((lightbox + 1) % photos.length); }, [lightbox, photos.length]);
  const prev = useCallback(() => { if (lightbox !== null) setLightbox((lightbox - 1 + photos.length) % photos.length); }, [lightbox, photos.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [lightbox, next, prev]);

  return (
    <>
      <section className="bg-primary-navy text-white py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6 transition-colors">
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 rotate-180" /> Back to Home
          </Link>
          <span className="text-gold-accent font-semibold tracking-widest uppercase text-[11px] sm:text-xs mb-2 sm:mb-3 block">Gallery</span>
          <h1 className="text-[28px] xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-3">
            All Photos<br /><span className="text-gold-accent">East of Kailash</span>
          </h1>
          <p className="text-light-navy/60 text-sm sm:text-base max-w-2xl leading-relaxed">
            {photos.length} photos across {allSlugs.length} blocks • Tap any photo to view fullscreen
          </p>
        </div>
      </section>

      <section className="bg-white border-b border-border-color sticky top-16 sm:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
              <button onClick={() => setFilter('all')} className={`shrink-0 px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-colors ${filter === 'all' ? 'bg-primary-navy text-white border-primary-navy' : 'bg-white text-secondary-text border-border-color hover:border-gold-accent/30'}`}>All ({allSlugs.reduce((s, k) => s + blockImages[k].length, 0)})</button>
              {allSlugs.map(slug => (
                <button key={slug} onClick={() => setFilter(slug)} className={`shrink-0 px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-colors ${filter === slug ? 'bg-primary-navy text-white border-primary-navy' : 'bg-white text-secondary-text border-border-color hover:border-gold-accent/30'}`}>
                  {blockLabels[slug] || slug}
                </button>
              ))}
            </div>
            <div className="relative shrink-0 w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-text/60" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search block..." className="w-full pl-9 pr-8 py-2.5 text-sm border border-border-color rounded-full bg-light-navy/30 focus:outline-none focus:border-gold-accent focus:bg-white transition-colors" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary-text/60 hover:text-primary-navy"><X className="w-4 h-4" /></button>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-light-navy/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {photos.length === 0 ? (
            <div className="text-center py-16 text-secondary-text">No photos found</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {photos.map((p, idx) => (
                <button
                  key={`${p.slug}-${p.filename}`}
                  onClick={() => setLightbox(idx)}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-white border border-border-color shadow-sm hover:shadow-md transition-all"
                >
                  <img src={getSrc(p)} alt={`${p.label} ${p.filename}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                    {p.label}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <span className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                      <Camera className="w-4 h-4 text-primary-navy" />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
          <div className="mt-6 text-center text-xs text-secondary-text/60">
            Showing {photos.length} photos {filter !== 'all' ? `• ${blockLabels[filter]}` : '• All blocks'}
          </div>
        </div>
      </section>

      {lightbox !== null && photos[lightbox] && (
        <div className="fixed inset-0 z-[100] bg-[#0B0B0F]/95 backdrop-blur-sm flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white z-10"><X className="w-5 h-5" /></button>
          <div className="absolute top-5 left-5 hidden sm:flex items-center gap-2 text-white/70 text-xs bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
            <Camera className="w-3.5 h-3.5 text-gold-accent" /> {photos[lightbox].label} • {lightbox + 1} / {photos.length}
          </div>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full flex items-center justify-center text-white"><ChevronLeft className="w-6 h-6" /></button>
          <div className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-[16/10] mx-4 sm:mx-20" onClick={(e) => e.stopPropagation()}>
            <img src={getSrc(photos[lightbox])} alt={photos[lightbox].label} className="w-full h-full object-contain rounded-xl" />
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 bg-white text-primary-navy hover:bg-gold-accent rounded-full flex items-center justify-center shadow-xl"><ChevronRight className="w-6 h-6" /></button>
        </div>
      )}
    </>
  );
}
