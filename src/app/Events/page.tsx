'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const featuredVideoRef = useRef<HTMLVideoElement>(null);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'weddings', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate' },
    { id: 'live', name: 'Live Shows' },
    { id: 'studio', name: 'Studio' },
  ];

  // Optimized gallery items with better media distribution
  const galleryItems = [
    // Wedding Photos (3 items)
    {
      id: 1,
      category: 'weddings',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'tall',
      link: '/gallery/serena-wedding',
      title: 'Serena Wedding'
    },
    {
      id: 2,
      category: 'weddings',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'normal',
      link: '/gallery/garden-wedding',
      title: 'Garden Wedding'
    },
    {
      id: 3,
      category: 'weddings',
      video: '/wedding.mp4',
      poster: '/oscar-sax.jpg',
      type: 'video',
      size: 'wide',
      link: '/gallery/wedding-video',
      title: 'Wedding Performance'
    },

    // Corporate Content (3 items)
    {
      id: 4,
      category: 'corporate',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'normal',
      link: '/gallery/corporate-event',
      title: 'Corporate Event'
    },
    {
      id: 5,
      category: 'corporate',
      video: '/introduction.mp4',
      poster: '/oscar-sax.jpg',
      type: 'video',
      size: 'tall',
      link: '/gallery/corporate-video',
      title: 'Corporate Introduction'
    },
    {
      id: 6,
      category: 'corporate',
      video: '/introduction.mp4',
      poster: '/oscar-sax.jpg',
      type: 'video',
      size: 'normal',
      link: '/gallery/product-launch',
      title: 'Product Launch'
    },

    // Live Shows (4 items)
    {
      id: 7,
      category: 'live',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'wide',
      link: '/gallery/live-show',
      title: 'Live Performance'
    },
    {
      id: 8,
      category: 'live',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'tall',
      link: '/gallery/concert',
      title: 'Concert Night'
    },
    {
      id: 9,
      category: 'live',
      video: '/wedding.mp4',
      poster: '/oscar-sax.jpg',
      type: 'video',
      size: 'normal',
      link: '/gallery/live-video',
      title: 'Live Show Highlights'
    },
    {
      id: 10,
      category: 'live',
      video: '/introduction.mp4',
      poster: '/oscar-sax.jpg',
      type: 'video',
      size: 'normal',
      link: '/gallery/jazz-night',
      title: 'Jazz Night'
    },

    // Studio (4 items)
    {
      id: 11,
      category: 'studio',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'normal',
      link: '/gallery/studio-session',
      title: 'Studio Session'
    },
    {
      id: 12,
      category: 'studio',
      video: '/introduction.mp4',
      poster: '/oscar-sax.jpg',
      type: 'video',
      size: 'wide',
      link: '/gallery/studio-video',
      title: 'Studio Recording'
    },
    {
      id: 13,
      category: 'studio',
      video: '/wedding.mp4',
      poster: '/oscar-sax.jpg',
      type: 'video',
      size: 'tall',
      link: '/gallery/recording-session',
      title: 'Recording Session'
    },
    {
      id: 14,
      category: 'studio',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'normal',
      link: '/gallery/music-production',
      title: 'Music Production'
    },

    // Additional Wedding Content (2 items)
    {
      id: 15,
      category: 'weddings',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'wide',
      link: '/gallery/traditional-wedding',
      title: 'Traditional Wedding'
    },
    {
      id: 16,
      category: 'weddings',
      image: '/oscar-sax.jpg',
      type: 'image',
      size: 'tall',
      link: '/gallery/beach-wedding',
      title: 'Beach Wedding'
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

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
                className={`group relative overflow-hidden rounded-2xl cursor-pointer
                  ${item.size === 'tall' ? 'row-span-2' : ''}
                  ${item.size === 'wide' ? 'col-span-2' : ''}
                  ${item.size === 'normal' ? 'row-span-1' : ''}
                `}
              >
                {/* Image Cards */}
                {item.type === 'image' && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 bg-gray-800"
                    style={{ backgroundImage: `url('${item.image}')` }}
                    onError={handleImageError}
                  />
                )}

                {/* Video Cards */}
                {item.type === 'video' && (
                  <div className="absolute inset-0">
                    <video 
                      ref={el => { videoRefs.current[index] = el }}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={item.poster}
                      onError={(e) => handleVideoError(e, item)}
                    >
                      <source src={item.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video fallback */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-gray-800 hidden"
                      style={{ backgroundImage: `url('${item.poster}')` }}
                      id={`fallback-${item.id}`}
                    />
                  </div>
                )}

                {/* Overlay Color on Hover */}
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>

                {/* Gradient Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFB800] rounded-2xl transition-colors duration-500 pointer-events-none z-40"></div>

                {/* Link overlay */}
                <Link href={item.link} className="absolute inset-0 z-50" />
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
            {/* Featured Video - LEFT SIDE */}
            <div className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer bg-gray-800">
              <video 
                ref={featuredVideoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/oscar-sax.jpg"
              >
                <source src="/wedding.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
              
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFB800] rounded-2xl transition-colors duration-500 pointer-events-none z-40"></div>
            </div>

            {/* Featured Video - RIGHT SIDE */}
            <div className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer bg-gray-800">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                poster="/oscar-sax.jpg"
              >
                <source src="/introduction.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
              
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#FFB800] rounded-2xl transition-colors duration-500 pointer-events-none z-40"></div>
            </div>
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