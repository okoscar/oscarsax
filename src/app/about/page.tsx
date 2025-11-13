'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Main Content Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
        {/* Background Image - Blurred */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('/oscar-sax.jpg')`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Centered About Card */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Left Side - Dark with Logo and Badge */}
            <div className="w-full lg:w-1/2 bg-[#2a2a2a] relative overflow-hidden flex items-center justify-center p-12 lg:p-16">
              {/* Background texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#3a3a3a] opacity-90"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Logo/Brand */}
                <div className="mb-12">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#FFB800]">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('/oscar-sax.jpg')` }}
                      ></div>
                    </div>
                    <h2 className="text-3xl font-bold text-[#FFB800] tracking-wider">OSCAR MULERE</h2>
                    <p className="text-white/70 text-sm uppercase tracking-widest mt-2">Professional Saxophonist</p>
                    <p className="text-white/50 text-xs mt-1">Est. 2014</p>
                  </div>
                </div>

                {/* 10 Years Anniversary Badge */}
                <div className="relative">
                  <div className="w-48 h-48 rounded-full border-8 border-[#FFB800] bg-transparent flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-bold text-[#FFB800] leading-none mb-2" style={{ fontFamily: 'serif' }}>10</div>
                      <div className="text-xs text-[#FFB800] font-bold uppercase tracking-widest">Years</div>
                      <div className="w-16 h-0.5 bg-[#FFB800] mx-auto my-2"></div>
                      <div className="text-xs text-[#FFB800] font-bold uppercase tracking-widest">Anniversary</div>
                      <div className="text-[10px] text-[#FFB800]/70 mt-1">2014 - 2024</div>
                    </div>
                  </div>
                  {/* Laurel wreath decoration */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg className="w-56 h-56 text-[#FFB800]/30" viewBox="0 0 200 200" fill="currentColor">
                      <path d="M100,20 Q110,25 115,35 Q120,30 130,28 Q125,40 122,50 Q130,48 140,50 Q132,60 128,70 Q138,70 148,75 Q138,82 132,92 Q142,95 150,102 Q140,108 132,118 Q140,123 145,133 Q135,135 128,142 Q133,150 135,160 Q125,158 118,162 Q120,172 118,182 Q110,175 105,168 Q100,175 95,182 Q93,172 95,162 Q88,158 78,160 Q80,150 85,142 Q78,135 68,133 Q73,123 78,118 Q70,108 60,102 Q68,95 75,92 Q68,82 60,75 Q70,70 80,70 Q76,60 68,50 Q78,48 86,50 Q83,40 78,28 Q88,30 93,35 Q98,25 100,20 Z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5" style={{ 
                backgroundImage: 'radial-gradient(circle, #FFB800 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Right Side - Content (White/Light) */}
            <div className="w-full lg:w-1/2 bg-[#f5f5f5] flex items-center p-8 lg:p-16">
              <div className="w-full">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-8 tracking-tight">
                  About Oscar Mulere
                </h2>
                
                <div className="space-y-6 mb-10">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Oscar Mulere is a professional saxophonist based in Kampala, Uganda, with over a decade of experience captivating audiences with his soulful melodies and passionate performances.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    His journey with music began at an early age, and through years of dedication and practice, he has mastered the art of bringing emotion and life to every note he plays.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    From intimate wedding ceremonies to grand corporate events, Oscar's versatility and professionalism have made him one of the most sought-after saxophonists in East Africa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="bg-[#1a1a1a] border-t border-white/10">
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
                  <Link href="/services/weddings" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Wedding Performances
                  </Link>
                </li>
                <li>
                  <Link href="/services/corporate" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Corporate Events
                  </Link>
                </li>
                <li>
                  <Link href="/services/introduction" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Introduction Ceremonies
                  </Link>
                </li>
                <li>
                  <Link href="/services/band" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Live Band
                  </Link>
                </li>
                <li>
                  <Link href="/services/private" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Private Events
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Pricing
                  </Link>
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
                  <Link href="/about" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    About Oscar
                  </Link>
                </li>
                <li>
                  <Link href="/music" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Music & Covers
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-[#B3B3B3] hover:text-[#FFB800] transition text-sm">
                    Contact
                  </Link>
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
                <Link href="/terms" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Terms & Conditions
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/privacy" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Privacy Policy
                </Link>
                <span className="text-white/20">•</span>
                <Link href="/careers" className="text-[#B3B3B3] hover:text-[#FFB800] transition">
                  Careers
                </Link>
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