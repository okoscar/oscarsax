import Link from 'next/link';

export default function Home() {
  const coverSongs = [
    { 
      title: 'Acoustic Cover', 
      description: 'Intimate acoustic arrangements'
    },
    { 
      title: 'Live Performance', 
      description: 'Captivating stage presence'
    },
    { 
      title: 'Jazz Session', 
      description: 'Smooth jazz interpretations'
    },
    { 
      title: 'Soul Covers', 
      description: 'Emotional soul performances'
    },
    { 
      title: 'Classic Hits', 
      description: 'Timeless classics reimagined'
    },
    { 
      title: 'Wedding Songs', 
      description: 'Perfect for special moments'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/oscar-sax.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8">
            <span className="text-white">MUSIC IN</span>
            <br />
            <span className="text-white">KAMPALA</span>
          </h1>

          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto mb-12 opacity-80">
            Experience live music and unforgettable performances – for every occasion and every soul.
          </p>

          <Link
            href="/contact"
            className="inline-block bg-transparent text-white px-10 py-4 border-2 border-white opacity-30 hover:opacity-100 text-sm font-semibold uppercase"
          >
            BOOK NOW
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Music Section - No Complex Classes */}
      <section className="bg-black py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              MUSIC
            </h2>
            <p className="text-lg text-white max-w-3xl mx-auto opacity-70">
              A holistic concept of musical artistry and performance awaits you. 
              Whether wedding ceremonies, corporate events or intimate performances – 
              you will find the perfect sound here as a music lover or event organizer. 
              Not an ordinary performer, but a place for real emotion, inspiration and community.
            </p>
          </div>

          {/* Simple Grid - No Hover Classes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverSongs.map((video, idx) => (
              <div
                key={idx}
                className="relative bg-gray-800 border border-gray-600 rounded-lg overflow-hidden"
                style={{ height: '400px' }}
              >
                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 bg-black p-6">
                  <h3 className="text-white font-semibold text-lg">{video.title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/music"
              className="inline-block bg-white text-black px-12 py-4 text-sm font-semibold uppercase rounded-lg"
            >
              VIEW ALL COVERS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}