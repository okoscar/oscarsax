'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { submitContactForm } from '@/lib/firebaseServices';
import { sendBookingNotification } from '@/lib/emailService';
import { getSiteSettings, SiteSettings } from '@/lib/cmsServices';


export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [prefilledEventType, setPrefilledEventType] = useState('');
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    venue: '',
    message: ''
  });

  useEffect(() => {
    async function loadData() {
      const settings = await getSiteSettings();
      if (settings) setSiteSettings(settings);
    }
    loadData();

    const params = new URLSearchParams(window.location.search);
    const eventType = params.get('event');
    if (eventType) {
      setPrefilledEventType(eventType);
      setFormData(prev => ({ ...prev, eventType }));
    }
  }, []);


  const handleSubmit = async () => {
    setIsSubmitting(true);
    setFormMessage(null);

    const result = await submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      eventDate: formData.date,
      venue: formData.venue,
      message: formData.message,
    });

    if (result.success) {
      await sendBookingNotification({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventType: formData.eventType,
        eventDate: formData.date,
        venue: formData.venue,
        message: formData.message,
      });
      
      setFormMessage({ 
        type: 'success', 
        text: '✅ Thank you! We received your inquiry and will contact you within 24 hours.' 
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        date: '',
        venue: '',
        message: ''
      });
    } else {
      setFormMessage({ 
        type: 'error', 
        text: '❌ Oops! Something went wrong. Please try again or call us directly.' 
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: `url('/oscar-sax.jpg')`,
            backgroundPosition: 'center center',
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center py-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
            GET IN TOUCH
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Let's create unforgettable moments together. Book Oscar Mulele for your next event.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-[#0a0a0a] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 text-center hover:border-[#FFB800] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2 text-lg">Phone</h3>
              <p className="text-[#B3B3B3] mb-3">Call or WhatsApp us</p>
              {siteSettings?.contactPhone ? (
                <a href={`tel:${siteSettings.contactPhone.replace(/\s+/g, '')}`} className="block text-[#FFB800] hover:text-[#FFD700] transition font-semibold">
                  {siteSettings.contactPhone}
                </a>
              ) : (
                <>
                  <a href="tel:+256707397560" className="block text-[#FFB800] hover:text-[#FFD700] transition font-semibold">
                    +256 707 397 560
                  </a>
                  <a href="tel:+256792885211" className="block text-[#FFB800] hover:text-[#FFD700] transition font-semibold mt-1">
                    +256 792 885 211
                  </a>
                </>
              )}

            </div>

            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 text-center hover:border-[#FFB800] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2 text-lg">Email</h3>
              <p className="text-[#B3B3B3] mb-3">Send us an email</p>
              <a href={`mailto:${siteSettings?.contactEmail || 'oscarmulele1@gmail.com'}`} className="text-[#FFB800] hover:text-[#FFD700] transition font-semibold break-all">
                {siteSettings?.contactEmail || 'oscarmulele1@gmail.com'}
              </a>

            </div>

            <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 text-center hover:border-[#FFB800] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2 text-lg">Location</h3>
              <p className="text-[#B3B3B3] mb-3">Based in Kampala</p>
              <p className="text-[#FFB800] font-semibold">Uganda</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#0a0a0a] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              BOOK AN EVENT
            </h2>
            <p className="text-lg text-[#B3B3B3]">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-8 md:p-12">
            <div className="space-y-6">
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
                  <label className="block text-white font-semibold mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="+256 707 397 560"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Event Type *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none transition"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="wedding">Wedding</option>
                    <option value="introduction">Introduction Ceremony</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday</option>
                    <option value="band">Live Band Performance</option>
                    <option value="private">Private Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Event Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-[#FFB800] focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Venue/Location</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({...formData, venue: e.target.value})}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition"
                    placeholder="Kampala"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={6}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-[#B3B3B3] focus:border-[#FFB800] focus:outline-none transition resize-none"
                  placeholder="Tell us more about your event..."
                  required
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#FFB800] text-black py-4 rounded-lg font-bold text-lg hover:bg-[#FFD700] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="bg-[#0a0a0a] py-12 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#FFB800] hover:text-[#FFD700] transition font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}