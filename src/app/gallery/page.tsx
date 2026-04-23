'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getMediaItems, MediaItem } from '@/lib/firebaseServices';

type Category = 'all' | 'weddings' | 'corporate' | 'live' | 'introduction' | 'private';

const categories: { key: Category; label: string }[] = [
  { key: 'all',          label: 'ALL' },
  { key: 'weddings',     label: 'WEDDINGS' },
  { key: 'corporate',    label: 'CORPORATE' },
  { key: 'live',         label: 'LIVE SHOWS' },
  { key: 'introduction', label: 'INTRODUCTION' },
  { key: 'private',      label: 'PRIVATE EVENTS' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMedia() {
      const items = await getMediaItems();
      // If DB is empty, use some high-quality fallbacks
      if (items.length === 0) {
        setMediaItems([
          { title: 'Live Performance', category: 'live', url: '/oscar-sax.jpg', type: 'image', size: 'tall', createdAt: { seconds: 0, nanoseconds: 0 } as any },
          { title: 'Wedding Ceremony', category: 'weddings', url: '/oscar-sax.jpg', type: 'image', size: 'normal', createdAt: { seconds: 0, nanoseconds: 0 } as any },
          { title: 'Corporate Gala', category: 'corporate', url: '/oscar-sax.jpg', type: 'image', size: 'wide', createdAt: { seconds: 0, nanoseconds: 0 } as any },
        ]);
      } else {
        setMediaItems(items);
      }
      setLoading(false);
    }
    loadMedia();
  }, []);

  const filtered = mediaItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e]">

      {/* ── HERO ── */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-50"
          style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0e0e0e]" />

        <div className="relative z-10 text-center px-6">
          <p className="text-[#FFB800] text-xs font-semibold tracking-[0.4em] uppercase mb-4">
            Oscar Mulele
          </p>
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none mb-6">
            GALLERY
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Moments captured through music — weddings, corporate events, live performances,
            and intimate celebrations across Kampala and beyond.
          </p>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="sticky top-[60px] z-40 bg-[#0e0e0e]/90 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex-shrink-0 px-5 py-2 text-xs font-bold tracking-widest rounded-full border transition-all duration-300 ${
                  activeCategory === cat.key
                    ? 'bg-[#FFB800] border-[#FFB800] text-black'
                    : 'bg-transparent border-white/20 text-white/60 hover:border-[#FFB800] hover:text-[#FFB800]'
                }`}
              >
                {cat.label}
              </button>
            ))}
            {!loading && (
              <span className="flex-shrink-0 ml-auto text-[#B3B3B3] text-xs tracking-wider whitespace-nowrap">
                {filtered.length} items
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── MASONRY GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {loading ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`bg-white/5 rounded-2xl animate-pulse ${i % 2 === 0 ? 'h-[400px]' : 'h-[250px]'}`} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#B3B3B3] text-xl">No content in this category yet.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((item, idx) => (
              <div
                key={item.id || idx}
                onClick={() => openLightbox(idx)}
                className={`group relative overflow-hidden cursor-pointer break-inside-avoid rounded-xl border border-white/5 hover:border-[#FFB800] transition-all duration-500 shadow-2xl ${
                  item.size === 'tall' ? 'h-[520px]' : item.size === 'wide' ? 'h-[300px]' : 'h-[380px]'
                }`}
              >
                {/* Media */}
                {item.type === 'video' ? (
                   <video 
                    src={item.url} 
                    className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${item.url}')` }}
                  />
                )}

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />

                {/* Golden accent overlay */}
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500" />

                {/* Caption slide-up */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#FFB800] text-[10px] font-bold tracking-widest uppercase">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-white text-sm font-medium leading-snug">{item.title}</p>
                </div>

                {/* Media icon */}
                <div className="absolute top-3 right-3 w-9 h-9 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.type === 'video' ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-[#FFB800] py-16 px-6 mt-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight mb-4 uppercase">
            Book Oscar for Your Event
          </h2>
          <p className="text-black/70 text-lg mb-8 max-w-2xl mx-auto">
            Make your special day unforgettable. From weddings to corporate galas — live saxophone
            that people will talk about for years.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-12 py-4 text-sm font-bold tracking-widest uppercase hover:bg-black/80 transition-colors duration-300 rounded-xl shadow-2xl"
          >
            INQUIRE NOW
          </Link>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-11 h-11 bg-white/10 hover:bg-[#FFB800] rounded-full flex items-center justify-center transition-all duration-300 group"
          >
            <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 z-10 w-12 h-12 bg-white/10 hover:bg-[#FFB800] rounded-full flex items-center justify-center transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-white group-hover:text-black transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Media Container */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {filtered[lightboxIndex].type === 'video' ? (
              <video 
                src={filtered[lightboxIndex].url} 
                className="w-full h-full max-h-[80vh] object-contain" 
                controls 
                autoPlay
              />
            ) : (
              <div
                className="w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${filtered[lightboxIndex].url}')`,
                  aspectRatio: '16/9',
                }}
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
              <p className="text-[#FFB800] text-[10px] font-black tracking-[0.3em] uppercase mb-1">
                {filtered[lightboxIndex].category}
              </p>
              <h3 className="text-white font-bold text-2xl tracking-tight leading-tight">
                {filtered[lightboxIndex].title}
              </h3>
              
              <Link 
                href={`/gallery/${filtered[lightboxIndex].id || filtered[lightboxIndex].title.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-2 mt-4 text-[#FFB800] text-xs font-bold tracking-widest uppercase hover:text-white transition"
              >
                View Details
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 z-10 w-12 h-12 bg-white/10 hover:bg-[#FFB800] rounded-full flex items-center justify-center transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-white group-hover:text-black transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
