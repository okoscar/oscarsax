'use client';

import { useState, useEffect } from 'react';
import { uploadMedia, getMediaItems, deleteMediaItem, MediaItem } from '@/lib/firebaseServices';
import { 
  getSiteSettings, updateSiteSettings, SiteSettings,
  getMusicTracks, addMusicTrack, deleteMusicTrack, MusicTrack,
  getReviews, addReview, deleteReview, Review
} from '@/lib/cmsServices';
import Link from 'next/link';
import { 
  Trash2, ExternalLink, Image as ImageIcon, Video as VideoIcon, 
  Plus, Copy, Check, Lock, ChevronRight, Settings, Music, Star, Layout
} from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

type TabType = 'gallery' | 'music' | 'reviews' | 'settings';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('gallery');
  
  // --- Gallery States ---
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('weddings');
  const [type, setType] = useState<'image' | 'video'>('image');
  const [size, setSize] = useState<'normal' | 'wide' | 'tall'>('normal');
  const [isUploading, setIsUploading] = useState(false);
  const [recentMedia, setRecentMedia] = useState<MediaItem[]>([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);

  // --- Settings States ---
  const [settings, setSettings] = useState<SiteSettings>({
    heroTitle: 'SOULFUL SAXOPHONE',
    heroSubtitle: 'Live music that moves souls',
    bio: '',
    contactEmail: '',
    contactPhone: '',
    socials: { instagram: '', facebook: '', youtube: '', tiktok: '' }
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // --- Music States ---
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
  const [isLoadingMusic, setIsLoadingMusic] = useState(false);
  const [newTrack, setNewTrack] = useState<Omit<MusicTrack, 'id' | 'createdAt'>>({
    title: '', artist: '', duration: '', url: '', type: 'original'
  });

  // --- Review States ---
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [newReview, setNewReview] = useState<Omit<Review, 'id' | 'createdAt'>>({
    name: '', event: '', date: '', text: '', rating: 5
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  const fetchAllData = async () => {
    setIsLoadingMedia(true);
    setIsLoadingMusic(true);
    setIsLoadingReviews(true);
    
    const [media, sets, music, revs] = await Promise.all([
      getMediaItems(undefined, undefined, 20),
      getSiteSettings(),
      getMusicTracks(),
      getReviews()
    ]);

    setRecentMedia(media);
    if (sets) setSettings(sets);
    setMusicTracks(music);
    setReviews(revs);

    setIsLoadingMedia(false);
    setIsLoadingMusic(false);
    setIsLoadingReviews(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'oscar2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      fetchAllData();
    } else {
      setLoginError('Invalid secret password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  // --- Actions ---

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    const result = await updateSiteSettings(settings);
    if (result.success) setMessage({ type: 'success', text: 'Settings updated!' });
    else setMessage({ type: 'error', text: result.error || 'Failed' });
    setIsSavingSettings(false);
  };

  const handleAddTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addMusicTrack({ ...newTrack, createdAt: Timestamp.now() });
    if (result.success) {
      setMessage({ type: 'success', text: 'Track added!' });
      setNewTrack({ title: '', artist: '', duration: '', url: '', type: 'original' });
      const music = await getMusicTracks();
      setMusicTracks(music);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addReview({ ...newReview, createdAt: Timestamp.now() });
    if (result.success) {
      setMessage({ type: 'success', text: 'Review added!' });
      setNewReview({ name: '', event: '', date: '', text: '', rating: 5 });
      const revs = await getReviews();
      setReviews(revs);
    }
  };

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFB800]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-md w-full relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black tracking-tighter mb-2">OSCAR<span className="text-[#FFB800]">MULERE</span></h1>
            <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Admin Login</p>
          </div>
          <form onSubmit={handleLogin} className="bg-[#111] border border-white/5 p-8 rounded-3xl shadow-2xl">
            <div className="space-y-6">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-[#FFB800] outline-none"
                required
              />
              {loginError && <p className="text-red-500 text-[10px] font-bold text-center uppercase">{loginError}</p>}
              <button type="submit" className="w-full bg-[#FFB800] text-black py-4 rounded-2xl font-bold uppercase hover:bg-[#FFD700] transition-all">
                Enter Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold tracking-tighter">OSCAR<span className="text-[#FFB800]">MULERE</span></Link>
            <div className="hidden md:flex items-center gap-4">
              {[
                { id: 'gallery', label: 'Gallery', icon: Layout },
                { id: 'music', label: 'Music', icon: Music },
                { id: 'reviews', label: 'Reviews', icon: Star },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold tracking-widest uppercase transition ${
                    activeTab === tab.id ? 'bg-[#FFB800] text-black' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={handleLogout} className="text-[10px] font-bold tracking-widest uppercase text-white/20 hover:text-red-500 transition">Logout</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {message && (
          <div className={`mb-8 p-4 rounded-xl border text-sm ${
            message.type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 'bg-red-500/10 border-red-500/50 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* --- GALLERY TAB --- */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#121212] border border-white/5 p-8 rounded-3xl">
                <h2 className="text-xl font-bold mb-6">Upload Media</h2>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!file) return;
                  setIsUploading(true);
                  const res = await uploadMedia(file, { title, category, type, size });
                  if (res.success) {
                    setMessage({ type: 'success', text: 'Uploaded!' });
                    setTitle(''); setFile(null);
                    const media = await getMediaItems(); setRecentMedia(media);
                  }
                  setIsUploading(false);
                }}>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" required />
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm">
                    <option value="weddings">Weddings</option>
                    <option value="corporate">Corporate</option>
                    <option value="live">Live Shows</option>
                  </select>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setType('image')} className={`flex-1 p-3 rounded-xl text-[10px] font-bold uppercase border ${type === 'image' ? 'bg-[#FFB800] border-[#FFB800] text-black' : 'border-white/10'}`}>Image</button>
                    <button type="button" onClick={() => setType('video')} className={`flex-1 p-3 rounded-xl text-[10px] font-bold uppercase border ${type === 'video' ? 'bg-[#FFB800] border-[#FFB800] text-black' : 'border-white/10'}`}>Video</button>
                  </div>
                  <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-xs" required />
                  <button disabled={isUploading} className="w-full bg-[#FFB800] text-black py-4 rounded-xl font-bold uppercase">{isUploading ? 'Uploading...' : 'Publish'}</button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#121212] border border-white/5 rounded-3xl divide-y divide-white/5">
                {recentMedia.map(item => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-black overflow-hidden flex-shrink-0">
                      {item.type === 'video' ? <div className="w-full h-full flex items-center justify-center bg-white/5"><VideoIcon className="w-4 h-4" /></div> : <img src={item.url} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1"><h4 className="text-sm font-bold">{item.title}</h4><p className="text-[10px] text-white/20 uppercase">{item.category}</p></div>
                    <button onClick={() => handleDelete(item)} className="p-2 text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- MUSIC TAB --- */}
        {activeTab === 'music' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#121212] border border-white/5 p-8 rounded-3xl">
                <h2 className="text-xl font-bold mb-6">Add New Track</h2>
                <form className="space-y-4" onSubmit={handleAddTrack}>
                  <input type="text" placeholder="Track Title" value={newTrack.title} onChange={e => setNewTrack({...newTrack, title: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" required />
                  <input type="text" placeholder="Artist" value={newTrack.artist} onChange={e => setNewTrack({...newTrack, artist: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" />
                  <input type="text" placeholder="Duration (e.g. 3:45)" value={newTrack.duration} onChange={e => setNewTrack({...newTrack, duration: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" />
                  <input type="text" placeholder="YouTube or Audio URL" value={newTrack.url} onChange={e => setNewTrack({...newTrack, url: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" required />
                  <div className="flex gap-2">
                    {['original', 'cover', 'video'].map(t => (
                      <button key={t} type="button" onClick={() => setNewTrack({...newTrack, type: t as any})} className={`flex-1 p-2 rounded-lg text-[9px] font-bold uppercase border ${newTrack.type === t ? 'bg-[#FFB800] text-black' : 'border-white/10'}`}>{t}</button>
                    ))}
                  </div>
                  <button className="w-full bg-[#FFB800] text-black py-4 rounded-xl font-bold uppercase">Add Track</button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#121212] border border-white/5 rounded-3xl divide-y divide-white/5">
                {musicTracks.map(track => (
                  <div key={track.id} className="p-4 flex items-center justify-between">
                    <div><h4 className="text-sm font-bold">{track.title}</h4><p className="text-[10px] text-white/20 uppercase">{track.type} • {track.duration}</p></div>
                    <button onClick={async () => {
                      if (track.id) {
                        await deleteMusicTrack(track.id);
                        const music = await getMusicTracks(); setMusicTracks(music);
                      }
                    }} className="p-2 text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- REVIEWS TAB --- */}
        {activeTab === 'reviews' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#121212] border border-white/5 p-8 rounded-3xl">
                <h2 className="text-xl font-bold mb-6">Add Review</h2>
                <form className="space-y-4" onSubmit={handleAddReview}>
                  <input type="text" placeholder="Client Name" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" required />
                  <input type="text" placeholder="Event Type" value={newReview.event} onChange={e => setNewReview({...newReview, event: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" />
                  <textarea placeholder="Testimonial text..." value={newReview.text} onChange={e => setNewReview({...newReview, text: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm h-32" required />
                  <button className="w-full bg-[#FFB800] text-black py-4 rounded-xl font-bold uppercase">Add Review</button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-[#121212] border border-white/5 rounded-3xl divide-y divide-white/5">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-sm font-bold">{rev.name}</h4>
                      <button onClick={async () => {
                        if (rev.id) {
                          await deleteReview(rev.id);
                          const r = await getReviews(); setReviews(r);
                        }
                      }} className="text-white/20 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                    </div>
                    <p className="text-xs text-white/60 italic mb-2">"{rev.text}"</p>
                    <p className="text-[10px] text-[#FFB800] uppercase tracking-widest">{rev.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#121212] border border-white/5 p-8 rounded-3xl">
              <h2 className="text-xl font-bold mb-8">Global Site Settings</h2>
              <form onSubmit={handleSettingsSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase">Hero Title</label>
                    <input type="text" value={settings.heroTitle} onChange={e => setSettings({...settings, heroTitle: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase">Hero Subtitle</label>
                    <input type="text" value={settings.heroSubtitle} onChange={e => setSettings({...settings, heroSubtitle: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase">Biography</label>
                  <textarea value={settings.bio} onChange={e => setSettings({...settings, bio: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm h-40" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase">Email</label>
                    <input type="email" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/40 uppercase">Phone</label>
                    <input type="text" value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm" />
                  </div>
                </div>
                <button disabled={isSavingSettings} className="w-full bg-[#FFB800] text-black py-5 rounded-xl font-bold uppercase shadow-lg">
                  {isSavingSettings ? 'Saving...' : 'Save All Settings'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
