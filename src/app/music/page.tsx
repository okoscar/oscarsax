"use client";

import React, { useState, useRef } from 'react';

import { useEffect } from 'react';
import { getMusicTracks, MusicTrack } from '@/lib/cmsServices';

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState('popular');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [dynamicTracks, setDynamicTracks] = useState<MusicTrack[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function loadMusic() {
      const tracks = await getMusicTracks();
      if (tracks && tracks.length > 0) setDynamicTracks(tracks);
    }
    loadMusic();
  }, []);

  const staticAlbums = [
    { id: 1, title: 'LIVE AT THE ROYAL ALBERT HALL', artist: 'Oscar Mulere', year: '2024', type: 'Album', image: '/oscar-sax.jpg', audio: '/Charlie Puth - Attention (Official Instrumental with Backing Vocals) [extra adlibs].mp3' },
    { id: 2, title: 'LIVE IN LOS ANGELES', artist: 'Oscar Mulere', year: '2023', type: 'Album', image: '/oscar-sax.jpg', audio: '/Charlie Puth - Attention (Official Instrumental with Backing Vocals) [extra adlibs].mp3' },
    { id: 3, title: 'ROAD LESS TRAVELED', artist: 'Oscar Mulere', year: '2023', type: 'Album', image: '/oscar-sax.jpg', audio: '/Charlie Puth - Attention (Official Instrumental with Backing Vocals) [extra adlibs].mp3' },
    { id: 4, title: 'ROAD LESS TRAVELED (INSTRUMENTAL)', artist: 'Oscar Mulere', year: '2022', type: 'Album', image: '/oscar-sax.jpg', audio: '/Charlie Puth - Attention (Official Instrumental with Backing Vocals) [extra adlibs].mp3' },
  ];

  const staticSingles = [
    { id: 1, title: 'Smooth Jazz Night', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/Charlie Puth - Attention (Official Instrumental with Backing Vocals) [extra adlibs].mp3' },
    { id: 2, title: 'Soulful Sax', artist: 'Oscar Mulere', year: '2024', type: 'Single', image: '/oscar-sax.jpg', audio: '/Charlie Puth - Attention (Official Instrumental with Backing Vocals) [extra adlibs].mp3' },
  ];

  const staticVideos = [
    { id: 1, title: 'Wedding Performance Highlights', artist: 'Oscar Mulere', year: '2024', views: '12K', thumbnail: '/oscar-sax.jpg', duration: '5:32' },
  ];

  // Convert dynamic tracks to the format expected by the UI
  const dynamicAlbums = dynamicTracks
    .filter(t => t.type === 'original')
    .map(t => ({ id: t.id, title: t.title, artist: t.artist, year: '2024', type: 'Album', image: t.thumbnail || '/oscar-sax.jpg', audio: t.url }));

  const dynamicSingles = dynamicTracks
    .filter(t => t.type === 'cover')
    .map(t => ({ id: t.id, title: t.title, artist: t.artist, year: '2024', type: 'Single', image: t.thumbnail || '/oscar-sax.jpg', audio: t.url }));

  const dynamicVideos = dynamicTracks
    .filter(t => t.type === 'video')
    .map(t => ({ id: t.id, title: t.title, artist: t.artist, year: '2024', views: 'New', thumbnail: t.thumbnail || '/oscar-sax.jpg', duration: t.duration }));

  const albums = dynamicAlbums.length > 0 ? dynamicAlbums : staticAlbums;
  const singles = dynamicSingles.length > 0 ? dynamicSingles : staticSingles;
  const videos = dynamicVideos.length > 0 ? dynamicVideos : staticVideos;

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
                src="/wedding.mp4"
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
              {(activeTab === 'popular' ? albums : activeTab === 'albums' ? albums : singles).slice(0, 8).map((album, idx) => (
                <div key={album.id} id={`album-${idx}`} className="group cursor-pointer bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#252525] transition duration-300">
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

    </div>
  );
}