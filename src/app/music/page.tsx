"use client";

import React, { useState, useRef } from 'react';

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState('popular');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const albums = [
    { id: 1, title: 'Wedding Sessions', artist: 'Oscar Mulere', year: '2024', type: 'Album', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 2, title: 'Jazz Collection', artist: 'Oscar Mulere', year: '2023', type: 'Album', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 3, title: 'Live at Kampala', artist: 'Oscar Mulere', year: '2023', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 4, title: 'Smooth Evening', artist: 'Oscar Mulere', year: '2022', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 5, title: 'Corporate Vibes', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 6, title: 'Romantic Nights', artist: 'Oscar Mulere', year: '2024', type: 'Album', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 7, title: 'Saxophone Soul', artist: 'Oscar Mulere', year: '2023', type: 'Album', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 8, title: 'Urban Jazz', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
  ];

  const singles = [
    { id: 1, title: 'Solo Performance', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 2, title: 'Romantic Sax', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 3, title: 'Wedding March', artist: 'Oscar Mulere', year: '2023', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 4, title: 'Jazz Fusion', artist: 'Oscar Mulere', year: '2023', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 5, title: 'Midnight Melodies', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 6, title: 'Sunset Sessions', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 7, title: 'Classic Covers', artist: 'Oscar Mulere', year: '2023', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
    { id: 8, title: 'Modern Mix', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/charlie puth-Attention.mp3' },
  ];

  const videos = [
    { id: 1, title: 'Wedding Performance Highlights', artist: 'Oscar Mulere', year: '2024', views: '12K', thumbnail: '/oscar-sax.jpg', duration: '5:32' },
    { id: 2, title: 'Corporate Event Jazz Night', artist: 'Oscar Mulere', year: '2024', views: '8.5K', thumbnail: '/oscar-sax.jpg', duration: '4:15' },
    { id: 3, title: 'Live at Serena Hotel', artist: 'Oscar Mulere', year: '2023', views: '15K', thumbnail: '/oscar-sax.jpg', duration: '6:45' },
    { id: 4, title: 'Romantic Sax Covers', artist: 'Oscar Mulere', year: '2024', views: '20K', thumbnail: '/oscar-sax.jpg', duration: '3:28' },
    { id: 5, title: 'Introduction Ceremony Special', artist: 'Oscar Mulere', year: '2023', views: '9K', thumbnail: '/oscar-sax.jpg', duration: '5:10' },
    { id: 6, title: 'Smooth Jazz Sessions', artist: 'Oscar Mulere', year: '2024', views: '11K', thumbnail: '/oscar-sax.jpg', duration: '7:22' },
  ];

  const playVideo = (video: any) => {
    setSelectedVideo(video);
    setIsVideoPlaying(true);
    // Pause audio if playing
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const playTrack = (track: any) => {
    if (audioRef.current) {
      // If clicking the same track that's playing, toggle play/pause
      if (currentTrack?.id === track.id && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Load and play new track
        setCurrentTrack(track);
        audioRef.current.src = track.audio;
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
      const progressBarWidth = progressBar.clientWidth;
      const clickTime = (clickPosition / progressBarWidth) * duration;
      
      audioRef.current.currentTime = clickTime;
      setCurrentTime(clickTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Video Modal Popup */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div 
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition z-10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Player */}
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                className="w-full aspect-video"
                controls
                autoPlay
                src="/sample-video.mp4"
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Video Info */}
              <div className="p-6 bg-[#1a1a1a]">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                <p className="text-[#FFB800] mb-2">{selectedVideo.artist}</p>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <span>{selectedVideo.views} views</span>
                  <span>•</span>
                  <span>{selectedVideo.year}</span>
                  <span>•</span>
                  <span>{selectedVideo.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Section at the Top with Grey Overlay */}
      <section className="relative h-96 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/oscar-sax.jpg')`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-gray-600/70"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              MUSIC
            </h1>
            <p className="text-xl text-white/80">Music & Discography</p>
          </div>
        </div>
      </section>

      {/* Cards Section - Takes available space */}
      <section className="py-12 px-6 bg-[#0a0a0a] flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Discography</h2>
            <button className="text-white/60 hover:text-white font-semibold text-sm uppercase tracking-wider transition">Show all</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-3 mb-8">
            <button onClick={() => setActiveTab('popular')} className={`px-5 py-2 rounded-full font-semibold text-sm transition ${activeTab === 'popular' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>Popular releases</button>
            <button onClick={() => setActiveTab('albums')} className={`px-5 py-2 rounded-full font-semibold text-sm transition ${activeTab === 'albums' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>Albums</button>
            <button onClick={() => setActiveTab('singles')} className={`px-5 py-2 rounded-full font-semibold text-sm transition ${activeTab === 'singles' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>Singles and EPs</button>
            <button onClick={() => setActiveTab('videos')} className={`px-5 py-2 rounded-full font-semibold text-sm transition ${activeTab === 'videos' ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>Videos</button>
          </div>

          {/* Albums/Singles Grid - Shows when not videos tab */}
          {activeTab !== 'videos' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {(activeTab === 'popular' ? albums : activeTab === 'albums' ? albums : singles).slice(0, 8).map((album) => (
                <div key={album.id} className="group cursor-pointer bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#252525] transition duration-300">
                  <div className="relative mb-4 bg-[#282828] rounded-lg overflow-hidden shadow-lg aspect-square">
                    <img src={album.image} alt={album.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    <button 
                      onClick={() => playTrack(album)}
                      className={`absolute bottom-2 right-2 w-12 h-12 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl hover:scale-105 ${
                        currentTrack?.id === album.id && isPlaying ? 'bg-[#FFB800] opacity-100' : 'bg-[#FFB800]'
                      }`}
                    >
                      {currentTrack?.id === album.id && isPlaying ? (
                        <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <h3 className="font-semibold mb-1 truncate group-hover:text-[#FFB800] transition">{album.title}</h3>
                  <p className="text-sm text-white/60">{album.year} • {album.type}</p>
                </div>
              ))}
            </div>
          )}

          {/* Videos Grid - Shows when videos tab is active */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {videos.map((video) => (
                <div key={video.id} className="group cursor-pointer bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#252525] transition duration-300">
                  <div className="relative bg-[#282828] overflow-hidden aspect-video">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold">
                      {video.duration}
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => playVideo(video)}
                        className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center hover:scale-110 transition shadow-2xl"
                      >
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-[#FFB800] transition line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-white/60 mb-1">{video.artist}</p>
                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{video.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MP3 Player - Positioned at top of footer, matching cards width */}
      <div className="bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] w-full py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 w-full shadow-2xl">
            <div className="flex items-center gap-4">
              {/* Album Art - Smaller */}
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={currentTrack ? currentTrack.image : '/oscar-sax.jpg'} 
                  alt="Now Playing" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Track Info - Compact */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-bold text-white truncate">
                    {currentTrack ? currentTrack.title : 'Select a track'}
                  </h3>
                  <p className="text-[#FFB800] text-sm whitespace-nowrap">
                    {currentTrack ? currentTrack.artist : 'Oscar Mulere'}
                  </p>
                </div>
                
                {/* Progress Bar - Smaller */}
                <div 
                  className="w-full h-1.5 bg-white/20 rounded-full mb-1 cursor-pointer"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-[#FFB800] rounded-full transition-all duration-100"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                
                {/* Time Display */}
                <div className="flex justify-between text-xs text-white/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls - Compact */}
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition hover:scale-110">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                  </svg>
                </button>
                
                <button 
                  onClick={togglePlayPause}
                  className="w-10 h-10 bg-[#FFB800] rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                
                <button className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition hover:scale-110">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                  </svg>
                </button>

                {/* Volume Control - Compact */}
                <div className="flex items-center gap-2 ml-1">
                  <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  <div className="w-16 h-1 bg-white/20 rounded-full">
                    <div className="w-3/4 h-full bg-[#FFB800] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Audio Element */}
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            >
              {currentTrack && <source src={currentTrack.audio} type="audio/mpeg" />}
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>

      {/* Footer Content Below MP3 Player */}
      <footer className="bg-[#1a1a1a]">
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
                  <a href="/services/weddings" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Wedding Performances
                  </a>
                </li>
                <li>
                  <a href="/services/corporate" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Corporate Events
                  </a>
                </li>
                <li>
                  <a href="/services/introduction" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Introduction Ceremonies
                  </a>
                </li>
                <li>
                  <a href="/services/band" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Live Band
                  </a>
                </li>
                <li>
                  <a href="/services/private" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Private Events
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Pricing
                  </a>
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
                  <a href="/about" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    About Oscar
                  </a>
                </li>
                <li>
                  <a href="/music" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Music & Covers
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/testimonials" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Contact
                  </a>
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

              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <a href="/terms" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Terms & Conditions
                </a>
                <span className="text-white/20">•</span>
                <a href="/privacy" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Privacy Policy
                </a>
                <span className="text-white/20">•</span>
                <a href="/careers" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Careers
                </a>
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