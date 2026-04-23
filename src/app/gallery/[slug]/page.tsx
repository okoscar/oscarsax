'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { getMediaItems, MediaItem } from '@/lib/firebaseServices';

export default function GalleryItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [item, setItem] = useState<MediaItem | null>(null);
  const [loading, setLoading] = useState(true);

  // For now, since 'slug' isn't directly a Firestore ID in the hardcoded links, 
  // we'll try to find a matching item or show a placeholder based on the slug name.
  // In a real scenario, the 'link' would be /gallery/[id].
  
  useEffect(() => {
    // Fetch all media and find one that matches the slug or just show the first one for demo
    async function fetchData() {
      setLoading(true);
      const items = await getMediaItems();
      // Placeholder logic for slug matching
      const found = items.find(i => i.id === slug || i.title.toLowerCase().replace(/\s+/g, '-') === slug);
      if (found) {
        setItem(found);
      } else {
        // Fallback for demo: use a mock item if slug doesn't match
        const isVideo = slug.includes('video');
        setItem({
          title: slug.replace(/-/g, ' ').toUpperCase(),
          category: 'Events',
          type: isVideo ? 'video' : 'image',
          url: isVideo ? '/wedding.mp4' : '/oscar-sax.jpg',
          createdAt: { seconds: 0, nanoseconds: 0 } as any,
          size: 'normal'
        });
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#FFB800]/20 border-t-[#FFB800] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* ── HEADER ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
        <Link href="/gallery" className="pointer-events-auto bg-black/50 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-all group">
          <svg className="w-4 h-4 transition group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-bold tracking-widest uppercase">Back to Gallery</span>
        </Link>
      </nav>

      <main className="flex flex-col lg:flex-row h-screen">
        {/* Media Container */}
        <div className="flex-grow bg-black flex items-center justify-center p-4 lg:p-12 mt-20 lg:mt-0">
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl shadow-black">
            {item?.type === 'video' ? (
              <video 
                src={item.url} 
                className="w-full h-full object-contain" 
                controls 
                autoPlay 
                loop
              />
            ) : (
              <img 
                src={item?.url || '/oscar-sax.jpg'} 
                alt={item?.title || 'Gallery item'} 
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="w-full lg:w-[450px] bg-[#121212] border-l border-white/5 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase mb-4">
              {item?.category || 'General'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none mb-6">
              {item?.title || 'Untitled Moment'}
            </h1>
            <p className="text-white/40 text-lg leading-relaxed">
              {item?.description || "A beautiful moment captured from one of Oscar Mulere's live performances. The soulful sound of the saxophone echoing through the venue, creating an unforgettable atmosphere."}
            </p>
          </div>

          <div className="space-y-6 border-t border-white/10 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Date Published</p>
                <p className="text-sm font-medium">Recently Uploaded</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#FFB800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Location</p>
                <p className="text-sm font-medium">Kampala, Uganda</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link 
              href="/contact" 
              className="group block w-full bg-white text-black py-5 rounded-xl font-bold tracking-widest uppercase text-center hover:bg-[#FFB800] transition-all relative overflow-hidden"
            >
              <span className="relative z-10">Inquire for Event</span>
              <div className="absolute inset-0 bg-[#FFB800] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
