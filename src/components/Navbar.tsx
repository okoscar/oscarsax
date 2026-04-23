'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MUSIC', path: '/music' },
    { name: 'EVENTS', path: '/events' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-2' 
          : 'bg-transparent backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group flex-shrink-0"
          >
            <div className="relative">
              <Music className="w-8 h-8 text-white group-hover:text-yellow-400 transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </div>
            <span className="text-xl font-bold text-white tracking-widest group-hover:text-yellow-400 transition-colors duration-300">
              OSCAR MULELE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm font-medium tracking-widest transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-yellow-400 font-semibold'
                    : 'text-white/80 hover:text-yellow-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 transform rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 transform rotate-0 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen 
          ? 'max-h-96 opacity-100 bg-black/95 backdrop-blur-xl border-t border-white/10' 
          : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-8 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-medium tracking-wider transition-all duration-300 py-2 px-4 rounded-lg ${
                isActive(link.path)
                  ? 'text-yellow-400 bg-white/10'
                  : 'text-white/80 hover:text-yellow-400 hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}