'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const originalReleases = [
  { title: 'LIVE AT THE ROYAL ALBERT HALL', tracks: 14 },
  { title: 'LIVE IN LOS ANGELES', tracks: 16 },
  { title: 'ROAD LESS TRAVELED', tracks: 12 },
  { title: 'ROAD LESS TRAVELED (INSTRUMENTAL)', tracks: 12 },
  { title: 'ACOUSTIC SESSIONS', tracks: 10 },
  { title: 'UNPLUGGED STORIES', tracks: 15 },
  { title: 'MIDNIGHT MELODIES', tracks: 11 },
  { title: 'SOULFUL REFLECTIONS', tracks: 13 },
];

export default function ReleasesCarousel() {
  const [centerIndex, setCenterIndex] = useState(2);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCenter = (index: number) => {
    setCenterIndex(index);
  };

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex(prev => (prev + 1) % originalReleases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#121212] py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Centered Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            ORIGINAL RELEASES
          </h2>
          <p className="text-[#B3B3B3] text-lg max-w-2xl mx-auto">
            Explore my collection of original music and live recordings. Each album tells a unique story through carefully crafted compositions.
          </p>
        </div>

        <div className="relative">
          <div className="flex space-x-8 overflow-x-auto py-8 scrollbar-hide">
            {originalReleases.map((release, index) => (
              <div
                key={index}
                className={`group relative flex-shrink-0 w-80 h-96 bg-[#1a1a1a] border rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                  index === centerIndex 
                    ? 'scale-110 border-[#FFB800] shadow-2xl z-20' 
                    : 'scale-100 border-white/10'
                }`}
                onClick={() => scrollToCenter(index)}
              >
                {/* Album Art */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-b transition-all duration-700 ${
                    index === centerIndex ? 'from-black/30 via-transparent to-black/90' : 'from-black/60 via-transparent to-black/90'
                  }`}></div>
                </div>

                <div className={`absolute inset-0 transition-all duration-700 ${
                  index === centerIndex ? 'bg-[#FFB800]/15' : 'bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10'
                }`}></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`border-2 rounded-full flex items-center justify-center transition-all duration-700 bg-black/30 backdrop-blur-sm ${
                    index === centerIndex 
                      ? 'w-20 h-20 border-[#FFD700] scale-125' 
                      : 'w-16 h-16 border-white/40 group-hover:border-[#FFD700] group-hover:scale-110'
                  }`}>
                    <div className={`w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-b-[10px] border-b-transparent ml-1 transition-all duration-700 ${
                      index === centerIndex ? 'border-l-[#FFD700]' : 'border-l-white group-hover:border-l-[#FFD700]'
                    }`}></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6">
                  <h3 className={`font-bold mb-2 transition-all duration-700 leading-tight ${
                    index === centerIndex ? 'text-[#FFD700] text-xl' : 'text-white text-lg group-hover:text-[#FFD700]'
                  }`}>
                    {release.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm transition-all duration-700 ${
                      index === centerIndex ? 'text-[#FFD700]/90' : 'text-[#B3B3B3] group-hover:text-[#FFD700]/80'
                    }`}>
                      {release.tracks} {release.tracks === 1 ? 'track' : 'tracks'}
                    </p>
                    <span className={`text-xs px-3 py-1 rounded-full transition-all duration-700 ${
                      index === centerIndex 
                        ? 'bg-[#FFB800]/40 text-[#FFD700] px-4' 
                        : 'bg-[#FFB800]/20 text-[#FFD700] group-hover:bg-[#FFB800]/30'
                    }`}>
                      STREAM
                    </span>
                  </div>
                </div>

                {index === centerIndex && (
                  <div className="absolute top-4 left-4">
                    <span className="text-xs bg-[#FFB800] text-black px-3 py-1 rounded-full font-semibold">
                      FEATURED
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-black/70 text-white px-2 py-1 rounded-full backdrop-blur-sm">
                    {2020 + index}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-3 h-3 bg-[#FFB800]/50 rounded-full animate-pulse"></div>
              <p className="text-[#FFB800] text-sm font-medium">Featured release auto-scrolls every 5 seconds</p>
              <div className="w-3 h-3 bg-[#FFB800]/50 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-6">
            {originalReleases.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCenter(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === centerIndex ? 'bg-[#FFB800] scale-125' : 'bg-[#B3B3B3] hover:bg-[#FFB800]/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link
            href="/releases"
            className="inline-flex items-center space-x-3 bg-transparent text-[#FFB800] px-10 py-4 border-2 border-[#FFB800] text-sm font-semibold uppercase tracking-widest hover:bg-[#FFB800] hover:text-black transition-all duration-300 rounded-xl group"
          >
            <span>EXPLORE ALL RELEASES</span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}