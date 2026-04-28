'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

import { getMediaItems, MediaItem } from '@/lib/supabaseServices';
import { isYouTubeURL, getEmbedUrl } from '@/lib/mediaUtils';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function loadMedia() {
      const items = await getMediaItems();
      setMediaItems(items);
      console.log('--- EVENTS DATA DEBUG ---');
      console.table(items.map(i => ({ id: i.id, title: i.title, type: i.type, url: i.url })));
      setLoading(false);
    }
    loadMedia();
  }, []);


  const categories = [
    { id: 'all',          name: 'All' },
    { id: 'weddings',     name: 'Weddings' },
    { id: 'corporate',    name: 'Corporate' },
    { id: 'live',         name: 'Live Shows' },
    { id: 'introduction', name: 'Introduction' },
    { id: 'private',      name: 'Private Events' },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === selectedCategory);



  // Video error handler
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>, item: any) => {
    console.log(`Video error for ${item.video}:`, e);
    const video = e.currentTarget;
    video.style.display = 'none';
    const fallback = document.getElementById(`fallback-${item.id}`);
    if (fallback) {
      fallback.classList.remove('hidden');
    }
  };

  // Image error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    console.log('Image failed to load');
    const div = e.currentTarget;
    div.style.backgroundImage = 'none';
    div.classList.add('bg-gradient-to-br', 'from-gray-800', 'to-gray-900');
    div.innerHTML = `
      <div class="absolute inset-0 flex items-center justify-center text-white/60">
        <div class="text-center">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-sm">Image not available</p>
        </div>
      </div>
    `;
  };

  // Video play/pause handler
  const handleVideoPlayPause = (index: number, item: any) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play().catch(err => {
          console.log('Play failed:', err);
          const fallback = document.getElementById(`fallback-${item.id}`);
          if (fallback) {
            fallback.classList.remove('hidden');
            video.style.display = 'none';
          }
        });
      } else {
        video.pause();
      }
    }
  };

  // Featured video play/pause handler
  const handleFeaturedVideoPlayPause = () => {
    const video = featuredVideoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(err => {
          console.log('Featured video play failed:', err);
        });
      } else {
        video.pause();
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FFB800] animate-pulse font-black tracking-widest uppercase">Loading Gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header Section */}
      <section className="bg-[#121212] py-20 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            GALLERY
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8">
            Moments captured from performances, events, and behind-the-scenes
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#FFB800] text-black'
                    : 'bg-black/50 text-white border border-white/20 hover:border-[#FFB800] hover:text-[#FFB800]'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid Gallery */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[500px]">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-white/10 hover:border-[#FFB800] transition-all duration-500 shadow-2xl bg-white/5
                  ${item.size === 'tall' ? 'row-span-2' : ''}
                  ${item.size === 'wide' ? 'col-span-2' : ''}
                  ${item.size === 'normal' ? 'row-span-1' : ''}
                `}

              >
                {/* Image Cards */}
                {item.type === 'image' && (
                  <img 
                    src={item.url}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={(e) => {
                      console.error(`Failed to load event image: ${item.url}`);
                      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Event+Image+Missing';
                    }}
                  />

                )}


                {/* Video Cards */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 transition-all duration-700">

                    {isYouTubeURL(item.url) ? (
                      <iframe
                        src={getEmbedUrl(item.url)}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-125"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                      />
                    ) : (
                      <video 
                        ref={el => { videoRefs.current[index] = el }}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                      >
                        <source src={item.url} />
                      </video>

                    )}
                  </div>
                )}


                {/* Overlay Color on Hover */}
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>

                {/* Gradient Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFB800] rounded-2xl transition-colors duration-500 pointer-events-none z-40"></div>

                {/* Info overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 z-30">
                  <div>
                    <p className="text-[10px] text-[#FFB800] font-black uppercase tracking-widest mb-1">{item.category}</p>
                    <h3 className="text-white font-bold text-lg leading-tight uppercase">{item.title}</h3>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>
      </section>

      {/* Featured Section - UPDATED WITH VIDEO */}
      <section className="bg-[#121212] py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              FEATURED MOMENTS
            </h2>
            <p className="text-lg text-white/70">
              Highlights from recent performances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaItems.filter(m => m.type === 'video').slice(0, 2).map((video, vIdx) => (
              <div key={video.id || vIdx} className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer bg-gray-800 grayscale hover:grayscale-0 transition-all duration-700">
                {isYouTubeURL(video.url) ? (
                  <iframe
                    src={getEmbedUrl(video.url)}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-125"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={video.url} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFB800] rounded-2xl transition-colors duration-500 pointer-events-none z-40"></div>
                <div className="absolute bottom-6 left-6 z-30">
                  <p className="text-[10px] text-[#FFB800] font-black uppercase tracking-widest mb-2">{video.category}</p>
                  <h3 className="text-xl font-bold text-white uppercase tracking-tight">{video.title}</h3>
                </div>
              </div>
            ))}
            
            {mediaItems.filter(m => m.type === 'video').length === 0 && (
              <div className="col-span-2 p-20 text-center border border-white/5 rounded-2xl text-white/20">
                No featured videos available yet.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FFB800] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
            WANT TO BE FEATURED?
          </h2>
          <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
            Book Oscar for your next event and create memories that last forever
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-10 py-4 rounded-lg font-bold hover:bg-black/90 transition text-sm uppercase tracking-widest"
          >
            BOOK NOW
          </Link>
        </div>
      </section>

    </div>
  );
}