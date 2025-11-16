'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const coverSongs = [
    { 
      title: 'Acoustic Cover', 
      description: 'Intimate acoustic arrangements',
      thumbnail: '/thumbnails/acoustic.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Live Performance', 
      description: 'Captivating stage presence',
      thumbnail: '/thumbnails/live.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Jazz Session', 
      description: 'Smooth jazz interpretations',
      thumbnail: '/thumbnails/jazz.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Soul Covers', 
      description: 'Emotional soul performances',
      thumbnail: '/thumbnails/soul.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Classic Hits', 
      description: 'Timeless classics reimagined',
      thumbnail: '/thumbnails/classics.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    { 
      title: 'Wedding Songs', 
      description: 'Perfect for special moments',
      thumbnail: '/thumbnails/wedding.jpg',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
  ];

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

  const reviews = [
    {
      name: "Sarah & James",
      event: "Wedding Ceremony",
      date: "October 2024",
      rating: 5,
      text: "Oscar made our wedding absolutely magical! His saxophone performance during our ceremony brought tears to everyone's eyes. Professional, punctual, and incredibly talented.",
      avatar: "🎭"
    },
    {
      name: "David Mukasa",
      event: "Corporate Gala",
      date: "September 2024",
      rating: 5,
      text: "Hired Oscar for our annual corporate dinner. He read the room perfectly and kept the energy just right. Our guests are still talking about it!",
      avatar: "💼"
    },
    {
      name: "Patricia Nambi",
      event: "Introduction Ceremony",
      date: "August 2024",
      rating: 5,
      text: "Oscar beautifully blended traditional and contemporary music at our kwanjula. His respect for our culture while adding his unique touch was phenomenal.",
      avatar: "👰"
    },
    {
      name: "Robert Okello",
      event: "Birthday Celebration",
      date: "July 2024",
      rating: 5,
      text: "Surprised my wife with Oscar's performance for her 50th birthday. She was absolutely blown away! Worth every penny and more.",
      avatar: "🎂"
    },
    {
      name: "Grace Namusoke",
      event: "Private Event",
      date: "June 2024",
      rating: 5,
      text: "Oscar's professionalism and talent are unmatched. He took time to understand what we wanted and delivered beyond our expectations.",
      avatar: "✨"
    },
    {
      name: "Michael Wasswa",
      event: "Wedding Reception",
      date: "May 2024",
      rating: 5,
      text: "The best decision we made for our wedding! Oscar's live saxophone during cocktail hour was the highlight. So many compliments!",
      avatar: "🎵"
    },
    {
      name: "Jennifer Atim",
      event: "Corporate Launch",
      date: "April 2024",
      rating: 5,
      text: "Oscar performed at our product launch and created exactly the sophisticated atmosphere we needed. Highly recommend!",
      avatar: "🚀"
    },
    {
      name: "Emmanuel Ssemakula",
      event: "Anniversary Party",
      date: "March 2024",
      rating: 5,
      text: "Celebrated 25 years with my wife and Oscar's music made it unforgettable. His song selection was perfect for the occasion.",
      avatar: "💑"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Video Modal */}
      {selectedVideo !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-[#FFB800] rounded-full flex items-center justify-center transition-all duration-300 group"
              aria-label="Close video"
            >
              <svg className="w-6 h-6 text-white group-hover:text-black transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              src={coverSongs[selectedVideo].videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: `url('/oscar-sax.jpg')`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight">
            <span className="text-white">MUSIC IN</span>
            <br />
            <span className="text-white">KAMPALA</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 tracking-wide">
            Experience live music and unforgettable performances – for every occasion and every soul.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact"
              className="inline-block bg-transparent text-white px-10 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 transition text-sm font-semibold tracking-widest uppercase backdrop-blur-sm"
            >
              BOOK NOW
            </Link>
            <Link
              href="/music"
              className="inline-block bg-[#FFB800] text-black px-10 py-4 border-2 border-[#FFB800] hover:bg-[#FFD700] hover:border-[#FFD700] transition text-sm font-semibold tracking-widest uppercase"
            >
              LISTEN TO OUR MUSIC
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent"></div>
      </section>

      {/* Music Section */}
      <section className="bg-[#121212] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              MUSIC
            </h2>
            <p className="text-lg text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed">
              A holistic concept of musical artistry and performance awaits you. 
              Whether wedding ceremonies, corporate events or intimate performances – 
              you will find the perfect sound here as a music lover or event organizer. 
              Not an ordinary performer, but a place for real emotion, inspiration and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverSongs.map((video, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedVideo(idx)}
                className="group relative bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800]"
                style={{ height: '450px' }}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500"></div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/20 transition-all duration-500 z-10"></div>
                
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white group-hover:border-l-[#FFD700] border-b-[12px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-30">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#FFD700] transition-colors duration-500">{video.title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/music#videos"
              className="inline-block bg-[#FFB800] text-black px-12 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#FFD700] transition"
            >
              VIEW ALL COVERS
            </Link>
          </div>
        </div>
      </section>

      {/* Original Releases Section */}
      <section className="bg-[#121212] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                ORIGINAL RELEASES
              </h2>
              <p className="text-[#B3B3B3] text-lg max-w-3xl">
                Discover my collection of original music, live recordings, and studio projects
              </p>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => {
                  const container = document.getElementById('releases-scroll');
                  if (container) container.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                aria-label="Scroll left"
              >
                <svg className="w-6 h-6 text-white group-hover:text-black transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  const container = document.getElementById('releases-scroll');
                  if (container) container.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="w-12 h-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:border-[#FFB800] transition-all duration-300 group"
                aria-label="Scroll right"
              >
                <svg className="w-6 h-6 text-white group-hover:text-black transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div 
              id="releases-scroll"
              className="flex space-x-6 overflow-x-auto pb-8 px-4 scrollbar-hide snap-x snap-center"
            >
              {originalReleases.map((album, idx) => (
                <Link
                  key={idx}
                  href={`/music#album-${idx}`}
                  className="group relative flex-shrink-0 w-80 h-96 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-700 ease-out hover:border-[#FFB800] snap-center hover:scale-110 hover:z-10"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale"
                    style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                  >
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                  </div>

                  <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/15 transition-all duration-500 z-10"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-125 transition-all duration-700 bg-black/30 backdrop-blur-sm">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white group-hover:border-l-[#FFD700] border-b-[10px] border-b-transparent ml-1 transition-all duration-500"></div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-30 transition-all duration-500">
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{album.title}</h3>
                    <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{album.tracks} tracks</p>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 shadow-2xl shadow-[#FFB800]/30"></div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <p className="text-[#B3B3B3] text-sm">← Scroll to explore →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-[#f5f5f5] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#2a2a2a] mb-6 tracking-tight">
              EVENTS & SERVICES
            </h2>
            <p className="text-lg text-[#6a6a6a] max-w-3xl mx-auto leading-relaxed">
              From intimate celebrations to grand corporate affairs, I bring the perfect soundtrack to your special moments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Wedding */}
            <div className="group relative h-[600px] bg-[#e8e8e8] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/wedding.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md mb-3 font-bold text-xs">WEDDINGS</div>
                <h3 className="text-xl font-bold text-white mb-2">Make Your Special Day Unforgettable</h3>
                <p className="text-sm text-white/90 mb-4 line-clamp-3">Live saxophone performances that add elegance and romance to your wedding ceremony and reception.</p>
                <Link href="/contact?event=wedding" className="block w-full bg-[#FFB800] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFD700] transition text-center">
                  INQUIRE NOW
                </Link>
              </div>
            </div>

            {/* Introduction */}
            <div className="group relative h-[600px] bg-[#d4d4d4] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/introduction.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md mb-3 font-bold text-xs">INTRODUCTION CEREMONIES</div>
                <h3 className="text-xl font-bold text-white mb-2">Celebrate Your Culture in Style</h3>
                <p className="text-sm text-white/90 mb-4 line-clamp-3">Traditional ceremonies with contemporary saxophone blending cultural authenticity.</p>
                <Link href="/contact?event=introduction" className="block w-full bg-[#FFB800] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFD700] transition text-center">
                  INQUIRE NOW
                </Link>
              </div>
            </div>

            {/* Corporate */}
            <div className="group relative h-[600px] bg-[#c0c0c0] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/corporate.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md mb-3 font-bold text-xs">CORPORATE EVENTS</div>
                <h3 className="text-xl font-bold text-white mb-2">Elevate Your Corporate Function</h3>
                <p className="text-sm text-white/90 mb-4 line-clamp-3">Professional live music for product launches, galas, and networking events.</p>
                <Link href="/contact?event=corporate" className="block w-full bg-[#FFB800] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFD700] transition text-center">
                  INQUIRE NOW
                </Link>
              </div>
            </div>

            {/* Birthdays */}
            <div className="group relative h-[600px] bg-[#dbdbdb] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/birthday.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md mb-3 font-bold text-xs">BIRTHDAY CELEBRATIONS</div>
                <h3 className="text-xl font-bold text-white mb-2">Make Their Day Extra Special</h3>
                <p className="text-sm text-white/90 mb-4 line-clamp-3">Live saxophone music adds that personal touch to milestone birthdays.</p>
                <Link href="/contact?event=birthday" className="block w-full bg-[#FFB800] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFD700] transition text-center">
                  INQUIRE NOW
                </Link>
              </div>
            </div>

            {/* Live Band */}
            <div className="group relative h-[600px] bg-[#cecece] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/band.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md mb-3 font-bold text-xs">LIVE BAND PERFORMANCES</div>
                <h3 className="text-xl font-bold text-white mb-2">Full Band Experience</h3>
                <p className="text-sm text-white/90 mb-4 line-clamp-3">Professional band delivering high-energy performances for large events.</p>
                <Link href="/contact?event=band" className="block w-full bg-[#FFB800] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFD700] transition text-center">
                  INQUIRE NOW
                </Link>
              </div>
            </div>

            {/* Private Events */}
            <div className="group relative h-[600px] bg-[#d8d8d8] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <div className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md mb-3 font-bold text-xs">PRIVATE EVENTS</div>
                <h3 className="text-xl font-bold text-white mb-2">Exclusive Performances</h3>
                <p className="text-sm text-white/90 mb-4 line-clamp-3">Custom performances for intimate gatherings and special occasions.</p>
                <Link href="/contact?event=private" className="block w-full bg-[#FFB800] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFD700] transition text-center">
                  INQUIRE NOW
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link href="/contact" className="inline-block bg-[#2a2a2a] text-white px-12 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-black transition rounded-xl shadow-xl">
              BOOK YOUR EVENT
            </Link>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 border-t border-b border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2a2a2a] mb-4 tracking-tight">
              WHAT OUR CLIENTS SAY
            </h2>
            <p className="text-lg text-[#6a6a6a] max-w-3xl mx-auto">
              Real experiences from real people who trusted us with their special moments
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-6 h-6 text-[#FFB800]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-[#2a2a2a] font-bold ml-2">5.0</span>
              <span className="text-[#6a6a6a]">• 150+ Reviews</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex overflow-hidden">
              <div className="flex space-x-6 animate-scroll-reviews">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
              
              <div className="flex space-x-6 animate-scroll-reviews" aria-hidden="true">
                {reviews.map((review, index) => (
                  <ReviewCard key={`dup-${index}`} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll-reviews {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll-reviews {
            animation: scroll-reviews 40s linear infinite;
          }
          .animate-scroll-reviews:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* About Section */}
      <section className="bg-[#121212] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale"
                style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                ABOUT OSCAR
              </h2>
              <div className="space-y-6 text-lg text-[#B3B3B3] leading-relaxed">
                <p>
                  Oscar Mulere is a Kampala-based saxophonist and bandleader who has been captivating audiences for over a decade. With a passion for jazz, soul, and contemporary music, Oscar brings a unique blend of technical mastery and emotional depth to every performance.
                </p>
                <p>
                  From intimate wedding ceremonies to large-scale corporate events, Oscar&apos;s versatile repertoire and professional approach have made him one of Uganda&apos;s most sought-after live musicians. His ability to read the room and adapt his performance to suit any occasion sets him apart in the industry.
                </p>
                <p>
                  Whether performing solo, with his band, or collaborating with other artists, Oscar&apos;s commitment to excellence and genuine love for music shines through in every note. His performances don&apos;t just entertain—they create lasting memories and elevate the atmosphere of any event.
                </p>

                                <div className="pt-6">
                  <Link
                    href="/about"
                    className="inline-block bg-transparent border-2 border-[#FFB800] text-[#FFB800] px-10 py-4 rounded-lg font-bold hover:bg-[#FFB800] hover:text-black transition"
                  >
                    READ MORE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#0a0a0a] py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              LET&apos;S CREATE SOMETHING SPECIAL
            </h2>
            <p className="text-lg text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed">
              Ready to add live music to your event? Get in touch and let&apos;s discuss how we can make your occasion unforgettable.
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-white font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="+256 XXX XXX XXX"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-white font-semibold mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none transition"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="introduction">Introduction Ceremony</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday</option>
                    <option value="band">Live Band Performance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-white font-semibold mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label htmlFor="venue" className="block text-white font-semibold mb-2">
                    Venue/Location
                  </label>
                  <input
                    type="text"
                    id="venue"
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="Kampala"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition resize-none"
                  placeholder="Tell me more about your event and any special requirements..."
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#FFB800] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Phone</h3>
              <p className="text-[#B3B3B3]">+256 XXX XXX XXX</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Email</h3>
              <p className="text-[#B3B3B3]">info@oscarmulere.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Location</h3>
              <p className="text-[#B3B3B3]">Kampala, Uganda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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

          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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
                  <svg className="w-5 h-5 text-white group-hover:text-black transition" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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

function ReviewCard({ review }: { review: { name: string; event: string; date: string; rating: number; text: string; avatar: string } }) {
  return (
    <div className="flex-shrink-0 w-[400px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 group hover:border-[#FFB800]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFB800] to-[#FFD700] rounded-full flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300">
            {review.avatar}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base group-hover:text-[#FFB800] transition-colors duration-300">
              {review.name}
            </h3>
            <p className="text-xs text-gray-500">{review.event}</p>
          </div>
        </div>
        <div className="text-xs text-gray-400">{review.date}</div>
      </div>

      <div className="flex gap-1 mb-3">
        {[...Array(review.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-[#FFB800]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">
        &quot;{review.text}&quot;
      </p>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-xs text-gray-500 font-medium">Verified Client</span>
      </div>
    </div>
  );
}