import Link from 'next/link';

export default function Home() {
  const coverSongs = [
    { 
      title: 'Acoustic Cover', 
      description: 'Intimate acoustic arrangements',
      thumbnail: '/thumbnails/acoustic.jpg'
    },
    { 
      title: 'Live Performance', 
      description: 'Captivating stage presence',
      thumbnail: '/thumbnails/live.jpg'
    },
    { 
      title: 'Jazz Session', 
      description: 'Smooth jazz interpretations',
      thumbnail: '/thumbnails/jazz.jpg'
    },
    { 
      title: 'Soul Covers', 
      description: 'Emotional soul performances',
      thumbnail: '/thumbnails/soul.jpg'
    },
    { 
      title: 'Classic Hits', 
      description: 'Timeless classics reimagined',
      thumbnail: '/thumbnails/classics.jpg'
    },
    { 
      title: 'Wedding Songs', 
      description: 'Perfect for special moments',
      thumbnail: '/thumbnails/wedding.jpg'
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: `url('/oscar-sax.jpg')`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight">
            <span className="text-white">MUSIC IN</span>
            <br />
            <span className="text-white">KAMPALA</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 tracking-wide">
            Experience live music and unforgettable performances – for every occasion and every soul.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-transparent text-white px-10 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 transition text-sm font-semibold tracking-widest uppercase backdrop-blur-sm"
          >
            BOOK NOW
          </Link>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </section>

      {/* Music Section */}
      <section className="bg-[#121212] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
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

          {/* Cover Songs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverSongs.map((video, idx) => (
              <div
                key={idx}
                className="group relative bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800]"
                style={{ height: '400px' }}
              >
                {/* Thumbnail Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{
                    backgroundImage: `url('/oscar-sax.jpg')`,
                  }}
                >
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500"></div>
                </div>

                {/* Gold Overlay on Hover */}
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/20 transition-all duration-500 z-10"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white group-hover:border-l-[#FFD700] border-b-[12px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                
                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-30">
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-[#FFD700] transition-colors duration-500">{video.title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link
              href="/music"
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
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              ORIGINAL RELEASES
            </h2>
            <p className="text-[#B3B3B3] text-lg">
              Explore my collection of original music and live recordings
            </p>
          </div>

          {/* Horizontal Scrollable Cards - Mixed Sizes */}
          <div className="relative">
            <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
              {/* Small Card */}
              <div className="group relative flex-shrink-0 w-64 h-64 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-12 h-12 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white group-hover:border-l-[#FFD700] border-b-[8px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 z-30">
                  <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[0].title}</h3>
                  <p className="text-[#B3B3B3] text-xs group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[0].tracks} tracks</p>
                </div>
              </div>

              {/* Large Card */}
              <div className="group relative flex-shrink-0 w-96 h-96 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white group-hover:border-l-[#FFD700] border-b-[12px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-30">
                  <h3 className="text-white font-bold text-xl mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[1].title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[1].tracks} tracks</p>
                </div>
              </div>

              {/* Medium Card */}
              <div className="group relative flex-shrink-0 w-80 h-72 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white group-hover:border-l-[#FFD700] border-b-[10px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 z-30">
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[2].title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[2].tracks} tracks</p>
                </div>
              </div>

              {/* Tall Card */}
              <div className="group relative flex-shrink-0 w-72 h-96 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white group-hover:border-l-[#FFD700] border-b-[10px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 z-30">
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[3].title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[3].tracks} tracks</p>
                </div>
              </div>

              {/* Wide Short Card */}
              <div className="group relative flex-shrink-0 w-96 h-64 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white group-hover:border-l-[#FFD700] border-b-[10px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 z-30">
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[4].title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[4].tracks} tracks</p>
                </div>
              </div>

              {/* Medium Square Card */}
              <div className="group relative flex-shrink-0 w-80 h-80 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white group-hover:border-l-[#FFD700] border-b-[10px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 z-30">
                  <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[5].title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[5].tracks} tracks</p>
                </div>
              </div>

              {/* Small Tall Card */}
              <div className="group relative flex-shrink-0 w-64 h-80 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-14 h-14 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[9px] border-t-transparent border-l-[14px] border-l-white group-hover:border-l-[#FFD700] border-b-[9px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 z-30">
                  <h3 className="text-white font-bold text-sm mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[6].title}</h3>
                  <p className="text-[#B3B3B3] text-xs group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[6].tracks} tracks</p>
                </div>
              </div>

              {/* Extra Large Card */}
              <div className="group relative flex-shrink-0 w-[28rem] h-96 bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800] snap-start">
                <div 
                  className="absolute inset-0 bg-cover bg-center grayscale"
                  style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                >
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
                </div>
                <div className="absolute inset-0 bg-[#FFB800]/0 group-hover:bg-[#FFB800]/10 transition-all duration-500 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 border-2 border-white/40 rounded-full flex items-center justify-center group-hover:border-[#FFD700] group-hover:scale-110 transition-all duration-500 bg-black/30 backdrop-blur-sm">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white group-hover:border-l-[#FFD700] border-b-[12px] border-b-transparent ml-1 transition-all duration-500"></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 z-30">
                  <h3 className="text-white font-bold text-xl mb-1 group-hover:text-[#FFD700] transition-colors duration-500 leading-tight">{originalReleases[7].title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{originalReleases[7].tracks} tracks</p>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="text-center mt-6">
              <p className="text-[#B3B3B3] text-sm">← Scroll to explore more →</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}