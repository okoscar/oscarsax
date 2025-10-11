import Link from 'next/link';

export default function Home() {
  const coverSongs = [
    { 
      title: 'Acoustic Cover', 
      videoId: 'dQw4w9WgXcQ',
      description: 'Intimate acoustic arrangements'
    },
    { 
      title: 'Live Performance', 
      videoId: 'dQw4w9WgXcQ',
      description: 'Captivating stage presence'
    },
    { 
      title: 'Jazz Session', 
      videoId: 'dQw4w9WgXcQ',
      description: 'Smooth jazz interpretations'
    },
    { 
      title: 'Soul Covers', 
      videoId: 'dQw4w9WgXcQ',
      description: 'Emotional soul performances'
    },
    { 
      title: 'Classic Hits', 
      videoId: 'dQw4w9WgXcQ',
      description: 'Timeless classics reimagined'
    },
    { 
      title: 'Wedding Songs', 
      videoId: 'dQw4w9WgXcQ',
      description: 'Perfect for special moments'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Your existing code */}
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
            className="inline-block bg-transparent text-white px-10 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 text-sm font-semibold tracking-widest uppercase backdrop-blur-sm hover:scale-105"
          >
            BOOK NOW
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </section>

      {/* Enhanced Music Section */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              MUSIC
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              A holistic concept of musical artistry and performance awaits you. 
              Whether wedding ceremonies, corporate events or intimate performances – 
              you will find the perfect sound here as a music lover or event organizer. 
              Not an ordinary performer, but a place for real emotion, inspiration and community.
            </p>
          </div>

          {/* Enhanced Cover Songs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coverSongs.map((video, idx) => (
              <div
                key={idx}
                className="group relative aspect-video bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Video Thumbnail with Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                  {/* YouTube Thumbnail - Replace with actual thumbnails */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg)`,
                    }}
                  ></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full flex items-center justify-center group-hover:border-white group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </div>

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-white/90 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors">
                    {video.description}
                  </p>
                </div>

                {/* YouTube Play Link */}
                <Link 
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Watch ${video.title}`}
                >
                  <span className="sr-only">Watch {video.title}</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Link
              href="/music"
              className="inline-block bg-white text-black px-12 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 text-sm font-semibold tracking-widest uppercase shadow-lg hover:shadow-xl hover:scale-105"
            >
              VIEW ALL COVERS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}