'use client';

import Link from 'next/link';
import { useState } from 'react';
import { submitContactForm, subscribeToNewsletter } from '@/lib/supabaseServices';
import { sendBookingNotification } from '@/lib/emailService';

import { useEffect } from 'react';
import { getSiteSettings, getReviews, getMusicTracks, getServices, SiteSettings, Review as CMSReview, MusicTrack, ServiceEvent } from '@/lib/cmsServices';
import { getMediaItems, MediaItem } from '@/lib/supabaseServices';
import { isYouTubeURL, getEmbedUrl, isVideoFile, isSpotifyURL, isSoundCloudURL } from '@/lib/mediaUtils';


export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [dynamicReviews, setDynamicReviews] = useState<CMSReview[]>([]);
  const [dynamicMusic, setDynamicMusic] = useState<MusicTrack[]>([]);
  const [dynamicServices, setDynamicServices] = useState<ServiceEvent[]>([]);
  const [dynamicMedia, setDynamicMedia] = useState<MediaItem[]>([]);


  
  // Contact Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // Newsletter States
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    async function loadCMSData() {
      const [settings, revs, tracks, servs, media] = await Promise.all([
        getSiteSettings(),
        getReviews(),
        getMusicTracks(),
        getServices(),
        getMediaItems(undefined, undefined, 8)
      ]);
      if (settings) setSiteSettings(settings);
      if (revs && revs.length > 0) setDynamicReviews(revs);
      if (tracks && tracks.length > 0) setDynamicMusic(tracks);
      if (servs && servs.length > 0) setDynamicServices(servs);
      if (media && media.length > 0) setDynamicMedia(media);
    }

    loadCMSData();
  }, []);


  const coverSongs = dynamicMusic.length > 0 
    ? dynamicMusic.filter(t => t.type === 'cover').map(t => ({
        title: t.title,
        description: t.artist || 'Cover Performance',
        thumbnail: t.thumbnail || '/oscar-sax.jpg',
        videoUrl: getEmbedUrl(t.url)
      }))

    : [
        { title: 'Acoustic Cover', description: 'Intimate acoustic arrangements', thumbnail: '/oscar-sax.jpg', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'Live Performance', description: 'Captivating stage presence', thumbnail: '/oscar-sax.jpg', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { title: 'Jazz Session', description: 'Smooth jazz interpretations', thumbnail: '/oscar-sax.jpg', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      ];

  const originalReleases = dynamicMusic.length > 0 
    ? dynamicMusic.filter(t => t.type === 'original').map(t => ({
        title: t.title,
        tracks: t.duration || 'Single',
        thumbnail: t.thumbnail || '/oscar-sax.jpg'
      }))
    : [
        { title: 'LIVE AT THE ROYAL ALBERT HALL', tracks: 14, thumbnail: '/oscar-sax.jpg' },
        { title: 'LIVE IN LOS ANGELES', tracks: 16, thumbnail: '/oscar-sax.jpg' },
        { title: 'ROAD LESS TRAVELED', tracks: 12, thumbnail: '/oscar-sax.jpg' },
      ];

  const staticReviews = [
    {
      name: "Sarah & James",
      event: "Wedding Ceremony",
      date: "October 2024",
      rating: 5,
      text: "Oscar made our wedding absolutely magical! His saxophone performance during our ceremony brought tears to everyone's eyes.",
      avatar: "/client_avatar_3_1777306235502.png"
    },
    {
      name: "David K.",
      event: "Corporate Gala",
      date: "November 2024",
      rating: 5,
      text: "Professional, punctual, and incredibly talented. Oscar elevated our company's annual gala with a perfect mix of jazz and modern hits.",
      avatar: "/client_avatar_2_1777306004209.png"
    },
    {
      name: "Emily R.",
      event: "Birthday Celebration",
      date: "December 2024",
      rating: 5,
      text: "Hired Oscar for my husband's 40th birthday. The surprise performance was phenomenal and left all our guests talking about it for weeks!",
      avatar: "/client_avatar_1_1777305961176.png"
    },
    {
      name: "Michael & Chloe",
      event: "Introduction Ceremony",
      date: "January 2025",
      rating: 5,
      text: "The way he blended traditional melodies with his saxophone was breathtaking. It perfectly captured the spirit of our cultural celebration.",
      avatar: "✨"
    },
    {
      name: "The Grand Hotel",
      event: "Residency",
      date: "February 2025",
      rating: 5,
      text: "Oscar is a regular performer at our lounge. His ability to read the room and set the perfect mood is unmatched. Highly recommended.",
      avatar: "🏨"
    },
    {
      name: "Grace T.",
      event: "Private Dinner",
      date: "March 2025",
      rating: 5,
      text: "An unforgettable evening! The music was the perfect backdrop for our anniversary dinner. We will definitely be booking him again.",
      avatar: "🥂"
    }
  ];

  const displayReviews = dynamicReviews.length > 0 ? dynamicReviews : staticReviews;


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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${siteSettings?.heroImage || '/oscar-sax.jpg'}')`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight uppercase">
            {siteSettings?.heroTitle ? (
              <>
                {siteSettings.heroTitle.split(' ').map((word, i) => (
                  <span key={i} className="text-white block">{word}</span>
                ))}
              </>
            ) : (
              <>
                <span className="text-white">MUSIC IN</span>
                <br />
                <span className="text-white">KAMPALA</span>
              </>
            )}
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 tracking-wide">
            {siteSettings?.heroSubtitle || "Experience live music and unforgettable performances – for every occasion and every soul."}
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
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${video.thumbnail}')` }}
                  >
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-500"></div>
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
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 grayscale"
                        style={{ backgroundImage: `url('${album.thumbnail}')` }}
                      >
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"></div>
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
            {(dynamicServices.length > 0 ? dynamicServices : [
              { id: '1', type: 'WEDDINGS', title: 'Make Your Special Day Unforgettable', description: 'Live saxophone performances that add elegance and romance to your wedding ceremony and reception.', mediaUrl: '/wedding.mp4' },
              { id: '2', type: 'INTRODUCTION CEREMONIES', title: 'Celebrate Your Culture in Style', description: 'Traditional ceremonies with contemporary saxophone blending cultural authenticity.', mediaUrl: '/introduction.mp4' },
              { id: '3', type: 'CORPORATE EVENTS', title: 'Elevate Your Corporate Function', description: 'Professional live music for product launches, galas, and networking events.', mediaUrl: '/wedding.mp4' },
              { id: '4', type: 'BIRTHDAY CELEBRATIONS', title: 'Make Their Day Extra Special', description: 'Live saxophone music adds that personal touch to milestone birthdays.', mediaUrl: '/birthday.mp4' },
              { id: '5', type: 'LIVE BAND PERFORMANCES', title: 'Full Band Experience', description: 'Professional band delivering high-energy performances for large events.', mediaUrl: '/introduction.mp4' },
              { id: '6', type: 'PRIVATE EVENTS', title: 'Exclusive Performances', description: 'Custom performances for intimate gatherings and special occasions.', mediaUrl: '/wedding.mp4' }
            ] as any).map((service: any, idx: number) => {
              const isYT = isYouTubeURL(service.mediaUrl);
              const isSpot = isSpotifyURL(service.mediaUrl);
              const isSC = isSoundCloudURL(service.mediaUrl);
              const isVid = isVideoFile(service.mediaUrl) || isYT || isSpot || isSC;
              
              return (
                <div key={service.id || idx} className="group relative h-[600px] bg-[#e8e8e8] rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                    <>
                      {/* Thumbnail fallback/background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                        style={{ backgroundImage: `url('${service.thumbnail || service.mediaUrl}')` }}
                      ></div>
                      {isYT || isSpot || isSC ? (
                        <iframe
                          key={`${isYT ? 'yt' : isSpot ? 'spot' : 'sc'}-${service.id}`}
                          src={getEmbedUrl(service.mediaUrl)}
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-110 grayscale group-hover:grayscale-0 transition-all duration-700"
                          frameBorder="0"
                          allow="autoplay; encrypted-media; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video 
                          key={`vid-${service.id}`}
                          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          preload="auto"
                          poster={service.thumbnail || ''}
                        >
                          <source src={service.mediaUrl} type="video/mp4" />
                        </video>
                      )}


                    </>


                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="inline-block bg-[#FFB800] text-black px-3 py-1 rounded-md mb-3 font-bold text-xs uppercase">{service.type}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-white/90 mb-4 line-clamp-3">{service.description}</p>
                    <Link href={`/contact?event=${service.type.toLowerCase()}`} className="block w-full bg-[#FFB800] text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#FFD700] transition text-center">
                      INQUIRE NOW
                    </Link>
                  </div>
                </div>
              );
            })}
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
            
            <div className="flex overflow-hidden gap-6 group/scroll">
              <div className="flex gap-6 shrink-0 animate-scroll-reviews">
                {displayReviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
              
              <div className="flex gap-6 shrink-0 animate-scroll-reviews" aria-hidden="true">
                {displayReviews.map((review, index) => (
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
              transform: translateX(calc(-100% - 1.5rem));
            }
          }
          .animate-scroll-reviews {
            animation: scroll-reviews 40s linear infinite;
          }
          .group\\/scroll:hover .animate-scroll-reviews {
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
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${siteSettings?.aboutImage || '/oscar-sax.jpg'}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                ABOUT OSCAR
              </h2>
              <div className="space-y-6 text-lg text-[#B3B3B3] leading-relaxed">
                {siteSettings?.bio ? (
                  <div className="whitespace-pre-wrap">{siteSettings.bio}</div>
                ) : (
                  <>
                    <p>
                      Oscar Mulele is a Kampala-based saxophonist and bandleader who has been captivating audiences for over a decade. With a passion for jazz, soul, and contemporary music, Oscar brings a unique blend of technical mastery and emotional depth to every performance.
                    </p>
                    <p>
                      From intimate wedding ceremonies to large-scale corporate events, Oscar&apos;s versatile repertoire and professional approach have made him one of Uganda&apos;s most sought-after live musicians.
                    </p>
                  </>
                )}

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

      {/* Newsletter Section */}
      <section className="bg-[#121212] py-20 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFB800] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">STAY IN THE GROOVE</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">Subscribe to our newsletter for exclusive updates on new releases, live performances, and special announcements.</p>
          
          <form 
            className="flex flex-col sm:flex-row gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setIsSubscribing(true);
              setNewsletterMessage('');
              const result = await subscribeToNewsletter(newsletterEmail);
              if (result.success) {
                setNewsletterMessage('✅ ' + result.message);
                setNewsletterEmail('');
              } else {
                setNewsletterMessage('❌ ' + result.message);
              }
              setIsSubscribing(false);
              setTimeout(() => setNewsletterMessage(''), 5000);
            }}
          >
            <input 
              type="email" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-6 py-4 focus:border-[#FFB800] outline-none transition"
              required
            />
            <button 
              type="submit"
              disabled={isSubscribing}
              className="bg-[#FFB800] text-black px-10 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-[#FFD700] transition-all disabled:opacity-50"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {newsletterMessage && (
            <p className={`mt-4 text-sm font-bold ${newsletterMessage.includes('✅') ? 'text-green-400' : 'text-red-400'} animate-pulse`}>
              {newsletterMessage}
            </p>
          )}
        </div>
      </section>

      {/* Contact Section with Supabase */}
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
            <form 
              className="space-y-6"
              onSubmit={async (e) => {

              e.preventDefault();
              setIsSubmitting(true);
              setFormMessage(null);

             const formData = {
             name: (e.target as any).name.value,
             email: (e.target as any).email.value,
             phone: (e.target as any).phone.value,
            eventType: (e.target as any).eventType.value,
             eventDate: (e.target as any).date.value || '',
           venue: (e.target as any).venue.value || '',
            message: (e.target as any).message.value,
  };

        // Save to Supabase
         const result = await submitContactForm(formData);

       if (result.success) {
       // Send email notification
       await sendBookingNotification(formData);
    
    setFormMessage({ 
      type: 'success', 
      text: '✅ Thank you! We received your inquiry and will contact you within 24 hours.' 
    });
    (e.target as any).reset();
  } else {
    setFormMessage({ 
      type: 'error', 
      text: '❌ Oops! Something went wrong. Please try again or call us directly.' 
    });
  }

  setIsSubmitting(false);
}}
            >
              {formMessage && (
                <div className={`p-4 rounded-lg ${
                  formMessage.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500 text-green-100' 
                    : 'bg-red-500/20 border border-red-500 text-red-100'
                }`}>
                  {formMessage.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
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
                    name="email"
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
                    name="phone"
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="+256 707 397 560"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="eventType" className="block text-white font-semibold mb-2">
                    Event Type *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
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
                    name="date"
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
                    name="venue"
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
                  name="message"
                  rows={5}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition resize-none"
                  placeholder="Tell me more about your event and any special requirements..."
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFB800] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
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
              <p className="text-[#B3B3B3]">+256 707 397 560</p>
              <p className="text-[#B3B3B3]">+256 792 885 211</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2">Email</h3>
              <p className="text-[#B3B3B3]">oscarmulele1@gmail.com</p>
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

function ReviewCard({ review }: { review: { name: string; event: string; date: string; rating: number; text: string; avatar?: string } }) {
  return (
    <div className="flex-shrink-0 w-[320px] sm:w-[350px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 group hover:border-[#FFB800]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-[#FFB800] to-[#FFD700] rounded-full flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform duration-300 overflow-hidden">
            {review.avatar && (review.avatar.startsWith('http') || review.avatar.startsWith('/')) ? (
              <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
            ) : (
              <span>{review.avatar || review.name.charAt(0)}</span>
            )}
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