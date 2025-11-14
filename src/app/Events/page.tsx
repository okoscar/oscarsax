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

      {/* Comprehensive Footer */}
      <footer className="bg-[#1a1a1a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="text-white text-2xl font-bold mb-4 tracking-tight">
                OSCAR MULERE
              </h3>
              <p className="text-[#B3B3B3] text-sm mb-6">
                Live saxophone performances for weddings, corporate events, and special occasions in Kampala.
              </p>
              
              <div className="mb-4">
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                  Subscribe to Newsletter
                </h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-black/50 border border-white/20 rounded-l-lg px-4 py-2.5 text-white text-sm placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                  />
                  <button className="bg-[#FFB800] hover:bg-[#FFD700] px-4 rounded-r-lg transition">
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/services/weddings" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Wedding Performances
                  </Link>
                </li>
                <li>
                  <Link href="/services/corporate" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Corporate Events
                  </Link>
                </li>
                <li>
                  <Link href="/services/introduction" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Introduction Ceremonies
                  </Link>
                </li>
                <li>
                  <Link href="/services/band" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Live Band
                  </Link>
                </li>
                <li>
                  <Link href="/services/private" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Private Events
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/about" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    About Oscar
                  </Link>
                </li>
                <li>
                  <Link href="/music" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Music & Covers
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Locations */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
                Get in Touch
              </h4>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-[#B3B3B3] text-sm">+256 XXX XXX XXX</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-[#B3B3B3] text-sm">info@oscarmulere.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-[#B3B3B3] text-sm">Kampala, Uganda</p>
                  </div>
                </li>
              </ul>

              <div>
                <h5 className="text-white text-xs uppercase tracking-wider mb-2 font-semibold">
                  Service Areas
                </h5>
                <p className="text-[#B3B3B3] text-sm">
                  Kampala • Entebbe • Jinja • Wakiso
                </p>
              </div>
            </div>
          </div>

          {/* Social Media & Copyright */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <Link href="/terms" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Terms & Conditions
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/privacy" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Privacy Policy
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/careers" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Careers
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-center">
              <p className="text-[#B3B3B3] text-sm">
                © Copyright Oscar Mulere {new Date().getFullYear()}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}