'use client';

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

          <Link
            href="/contact"
            className="inline-block bg-transparent text-white px-10 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 transition text-sm font-semibold tracking-widest uppercase backdrop-blur-sm"
          >
            BOOK NOW
          </Link>
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
                className="group relative bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-[#FFB800]"
                style={{ height: '450px' }}
              >
                {/* Thumbnail Image with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500"></div>
                  </div>
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
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#FFD700] transition-colors duration-500">{video.title}</h3>
                  <p className="text-[#B3B3B3] text-sm group-hover:text-[#FFD700]/80 transition-colors duration-500">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

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
                <div
                  key={idx}
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
                </div>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <p className="text-[#B3B3B3] text-sm">← Scroll to explore →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="bg-[#0a0a0a] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              EVENTS & SERVICES
            </h2>
            <p className="text-lg text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed">
              From intimate celebrations to grand corporate affairs, I bring the perfect soundtrack to your special moments.
            </p>
          </div>

          <div className="space-y-8">
            {/* Wedding Card */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-[#FFB800] transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover grayscale"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/wedding.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg mb-6 font-bold text-lg">
                    WEDDINGS
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition">
                    Make Your Special Day Unforgettable
                  </h3>
                  <p className="text-xl text-[#B3B3B3] mb-8 max-w-2xl">
                    Live saxophone performances that add elegance and romance to your wedding ceremony, cocktail hour, and reception. From classical pieces to modern love songs, I'll create the perfect ambiance for your celebration of love.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Introduction Ceremonies Card */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-[#FFB800] transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover grayscale"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/introduction.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg mb-6 font-bold text-lg">
                    INTRODUCTION CEREMONIES
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition">
                    Celebrate Your Culture in Style
                  </h3>
                  <p className="text-xl text-[#B3B3B3] mb-8 max-w-2xl">
                    Traditional introduction ceremonies deserve exceptional entertainment. I blend contemporary saxophone with cultural authenticity to honor your heritage while creating a modern, sophisticated atmosphere that your guests will remember.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Corporate Events Card */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-[#FFB800] transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover grayscale"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/corporate.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg mb-6 font-bold text-lg">
                    CORPORATE EVENTS
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition">
                    Elevate Your Corporate Function
                  </h3>
                  <p className="text-xl text-[#B3B3B3] mb-8 max-w-2xl">
                    Professional live music for product launches, company galas, conferences, and networking events. Create a sophisticated atmosphere that impresses clients and motivates your team with smooth jazz and contemporary instrumental music.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Birthdays Card */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-[#FFB800] transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover grayscale"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/birthday.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg mb-6 font-bold text-lg">
                    BIRTHDAY CELEBRATIONS
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition">
                    Make Their Day Extra Special
                  </h3>
                  <p className="text-xl text-[#B3B3B3] mb-8 max-w-2xl">
                    Whether it's a milestone birthday or an intimate gathering, live saxophone music adds that personal touch that makes celebrations truly memorable. Custom song selections and special birthday serenades available upon request.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Live Band Card */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden hover:border-[#FFB800] transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover grayscale"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/band.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-lg mb-6 font-bold text-lg">
                    LIVE BAND PERFORMANCES
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition">
                    Full Band Experience
                  </h3>
                  <p className="text-xl text-[#B3B3B3] mb-8 max-w-2xl">
                    Looking for more than solo saxophone? I lead a professional band that delivers high-energy performances for large events, festivals, and concerts. Full sound production, vocalists, and a repertoire spanning jazz, soul, Afrobeat, and contemporary hits.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-block bg-[#FFB800] text-black px-12 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-[#FFD700] transition"
            >
              BOOK YOUR EVENT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}