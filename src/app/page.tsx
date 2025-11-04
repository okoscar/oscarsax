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
      <section className="bg-[#f5f3ed] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#2a2a2a] mb-6 tracking-tight">
              EVENTS & SERVICES
            </h2>
            <p className="text-lg text-[#6a6a6a] max-w-3xl mx-auto leading-relaxed">
              From intimate celebrations to grand corporate affairs, I bring the perfect soundtrack to your special moments.
            </p>
          </div>

          <div className="space-y-8">
            {/* Wedding Card - Soft Pink/Rose */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#fef5f5] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/wedding.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#8B4B4B]/90 via-[#8B4B4B]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#5a3535]/95 via-[#5a3535]/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-xl mb-6 font-bold text-lg shadow-lg">
                    WEDDINGS
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition drop-shadow-lg">
                    Make Your Special Day Unforgettable
                  </h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
                    Live saxophone performances that add elegance and romance to your wedding ceremony, cocktail hour, and reception. From classical pieces to modern love songs, I'll create the perfect ambiance for your celebration of love.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#FFD700] hover:scale-105 transition shadow-xl">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Introduction Ceremonies Card - Warm Terracotta */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#f9ede4] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/introduction.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#A0604D]/90 via-[#A0604D]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#6b4035]/95 via-[#6b4035]/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-xl mb-6 font-bold text-lg shadow-lg">
                    INTRODUCTION CEREMONIES
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition drop-shadow-lg">
                    Celebrate Your Culture in Style
                  </h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
                    Traditional introduction ceremonies deserve exceptional entertainment. I blend contemporary saxophone with cultural authenticity to honor your heritage while creating a modern, sophisticated atmosphere that your guests will remember.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#FFD700] hover:scale-105 transition shadow-xl">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Corporate Events Card - Navy Blue */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#e8ecf0] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/corporate.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C4A5E]/90 via-[#2C4A5E]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2f3d]/95 via-[#1a2f3d]/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-xl mb-6 font-bold text-lg shadow-lg">
                    CORPORATE EVENTS
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition drop-shadow-lg">
                    Elevate Your Corporate Function
                  </h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
                    Professional live music for product launches, company galas, conferences, and networking events. Create a sophisticated atmosphere that impresses clients and motivates your team with smooth jazz and contemporary instrumental music.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#FFD700] hover:scale-105 transition shadow-xl">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Birthdays Card - Warm Purple/Plum */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#f4eff5] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/birthday.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#6B4B6B]/90 via-[#6B4B6B]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a344a]/95 via-[#4a344a]/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-xl mb-6 font-bold text-lg shadow-lg">
                    BIRTHDAY CELEBRATIONS
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition drop-shadow-lg">
                    Make Their Day Extra Special
                  </h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
                    Whether it's a milestone birthday or an intimate gathering, live saxophone music adds that personal touch that makes celebrations truly memorable. Custom song selections and special birthday serenades available upon request.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#FFD700] hover:scale-105 transition shadow-xl">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Live Band Card - Deep Green */}
            <div className="group relative h-[80vh] min-h-[600px] bg-[#eff5f0] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/band.mp4" type="video/mp4" />
                <source src="/oscar-sax.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D5A4D]/90 via-[#3D5A4D]/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2a3d33]/95 via-[#2a3d33]/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
                <div className="max-w-4xl">
                  <div className="inline-block bg-[#FFB800] text-black px-6 py-3 rounded-xl mb-6 font-bold text-lg shadow-lg">
                    LIVE BAND PERFORMANCES
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 group-hover:text-[#FFD700] transition drop-shadow-lg">
                    Full Band Experience
                  </h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl drop-shadow-md">
                    Looking for more than solo saxophone? I lead a professional band that delivers high-energy performances for large events, festivals, and concerts. Full sound production, vocalists, and a repertoire spanning jazz, soul, Afrobeat, and contemporary hits.
                  </p>
                  <button className="bg-[#FFB800] text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#FFD700] hover:scale-105 transition shadow-xl">
                    INQUIRE NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-block bg-[#2a2a2a] text-white px-12 py-4 text-sm font-semibold uppercase tracking-widest hover:bg-black transition rounded-xl shadow-xl"
            >
              BOOK YOUR EVENT
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#121212] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div className="relative h-[600px] rounded-lg overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale"
                style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                ABOUT OSCAR
              </h2>
              <div className="space-y-6 text-lg text-[#B3B3B3] leading-relaxed">
                <p>
                  Oscar Mulere is a Kampala-based saxophonist and bandleader who has been captivating audiences for over a decade. With a passion for jazz, soul, and contemporary music, Oscar brings a unique blend of technical mastery and emotional depth to every performance.
                </p>
                <p>
                  From intimate wedding ceremonies to large-scale corporate events, Oscar's versatile repertoire and professional approach have made him one of Uganda's most sought-after live musicians. His ability to read the room and adapt his performance to suit any occasion sets him apart in the industry.
                </p>
                <p>
                  Whether performing solo, with his band, or collaborating with other artists, Oscar's commitment to excellence and genuine love for music shines through in every note. His performances don't just entertain—they create lasting memories and elevate the atmosphere of any event.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-4xl font-bold text-[#FFB800] mb-2">500+</div>
                    <div className="text-sm text-[#B3B3B3]">Events</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#FFB800] mb-2">15+</div>
                    <div className="text-sm text-[#B3B3B3]">Years</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#FFB800] mb-2">100%</div>
                    <div className="text-sm text-[#B3B3B3]">Satisfaction</div>
                  </div>
                </div>

                {/* CTA */}
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
              LET'S CREATE SOMETHING SPECIAL
            </h2>
            <p className="text-lg text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed">
              Ready to add live music to your event? Get in touch and let's discuss how we can make your occasion unforgettable.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-8 md:p-12">
            <form className="space-y-6">
              {/* Name & Email Row */}
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

              {/* Phone & Event Type Row */}
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

              {/* Date & Venue Row */}
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

              {/* Message */}
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

              {/* Submit Button */}
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

          {/* Contact Info */}
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
    </div>
  );
}