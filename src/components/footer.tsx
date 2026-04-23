'use client';

import Link from 'next/link';
import { useState } from 'react';
import { subscribeToNewsletter } from '@/lib/firebaseServices';

import { useEffect } from 'react';
import { getSiteSettings, SiteSettings } from '@/lib/cmsServices';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const sets = await getSiteSettings();
      if (sets) setSettings(sets);
    }
    loadSettings();
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    const result = await subscribeToNewsletter(email);

    if (result.success) {
      setStatus('success');
      setMessage(result.message || 'Successfully subscribed!');
      setEmail('');
    } else {
      setStatus('error');
      setMessage(result.message || 'Subscription failed');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 font-sans relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFB800]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Mission */}
          <div className="space-y-8">
            <Link href="/" className="group inline-block">
              <h2 className="text-2xl font-black tracking-tighter text-white group-hover:text-[#FFB800] transition-colors duration-300">
                OSCAR<span className="text-[#FFB800] group-hover:text-white transition-colors duration-300">MULELE</span>
              </h2>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-medium">
              Elevating life's most precious moments with the soulful, sophisticated sound of the saxophone. Experience world-class artistry in Kampala and beyond.
            </p>
            <div className="flex gap-4">
              {[
                { label: 'IG', href: settings?.socials?.instagram || 'https://instagram.com/oscarmulele' },
                { label: 'FB', href: settings?.socials?.facebook || 'https://facebook.com/oscarmulele' },
                { label: 'YT', href: settings?.socials?.youtube || 'https://youtube.com/@oscarmulele' },
                { label: 'TK', href: settings?.socials?.tiktok || 'https://tiktok.com/@oscarmulele' }
              ].map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/60 hover:bg-[#FFB800] hover:text-black hover:border-[#FFB800] transition-all duration-500 hover:-translate-y-1 shadow-lg"
                  aria-label={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#FFB800] mb-8 opacity-80">Explore</h4>
            <ul className="space-y-4">
              {[
                ['About Oscar', '/about'],
                ['Performances', '/gallery'],
                ['Music & Covers', '/music'],
                ['Event Booking', '/contact'],
                ['Admin Portal', '/admin']
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/40 hover:text-white transition-all duration-300 text-sm font-medium hover:pl-2 flex items-center group">
                    <span className="w-0 h-[1px] bg-[#FFB800] mr-0 group-hover:w-3 group-hover:mr-2 transition-all duration-300"></span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#FFB800] mb-8 opacity-80">Connect</h4>
            <ul className="space-y-8">
              <li className="group">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Inquiries</p>
                {settings?.contactPhone ? (
                  <a href={`tel:${settings.contactPhone}`} className="text-sm text-white/70 hover:text-[#FFB800] transition-colors duration-300 font-semibold block">
                    {settings.contactPhone}
                  </a>
                ) : (
                  <>
                    <a href="tel:+256707397560" className="text-sm text-white/70 hover:text-[#FFB800] transition-colors duration-300 font-semibold block">
                      +256 707 397 560
                    </a>
                    <a href="tel:+256792885211" className="text-sm text-white/70 hover:text-[#FFB800] transition-colors duration-300 font-semibold block mt-1">
                      +256 792 885 211
                    </a>
                  </>
                )}
                <a href={`mailto:${settings?.contactEmail || 'oscarmulele1@gmail.com'}`} className="text-sm text-white/40 hover:text-[#FFB800] transition-colors duration-300 mt-2 block">
                  {settings?.contactEmail || 'oscarmulele1@gmail.com'}
                </a>
              </li>
              <li>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Location</p>
                <p className="text-sm text-white/70 font-semibold">Kampala, Uganda</p>
                <p className="text-xs text-white/30 mt-1">Available for travel worldwide</p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-[#FFB800] mb-8 opacity-80">Newsletter</h4>
            <p className="text-white/40 text-xs leading-relaxed mb-6 font-medium">
              Join the inner circle for exclusive updates, new releases, and event highlights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#FFB800]/50 focus:bg-white/[0.05] transition-all duration-300"
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="absolute right-2 top-2 bottom-2 bg-[#FFB800] text-black px-4 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-white transition-all duration-300 disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : 'Join'}
                </button>
              </div>
              {message && (
                <p className={`text-[10px] font-bold uppercase tracking-widest ${status === 'success' ? 'text-green-500' : 'text-red-500'} animate-pulse`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <p className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase">
              © {new Date().getFullYear()} OSCAR MULELE
            </p>
            <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors duration-300">Privacy</Link>
              <Link href="/terms" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors duration-300">Terms</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-white/10 text-[10px] font-bold uppercase tracking-widest">Crafted with</span>
            <div className="w-4 h-4 bg-[#FFB800]/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#FFB800] rounded-full animate-pulse"></div>
            </div>
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">by Advanced Agentic Coding</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
