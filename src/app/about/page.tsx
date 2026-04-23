'use client';

import React from 'react';

import { useEffect, useState } from 'react';
import { getSiteSettings, SiteSettings } from '@/lib/cmsServices';

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const sets = await getSiteSettings();
      if (sets) setSettings(sets);
    }
    loadSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Main Content Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
        {/* Background Image - Blurred */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('${settings?.aboutImage || '/oscar-sax.jpg'}')`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

       {/* Centered Contact Card */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl">
            {/* Left Side - Dark with Photo */}
            <div className="w-full lg:w-1/2 bg-[#2a2a2a] relative overflow-hidden flex items-center justify-center p-12 lg:p-16">
              {/* Background texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#3a3a3a] opacity-90"></div>
  
              
              <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Large Circular Photo */}
                <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-[#FFB800] shadow-2xl">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${settings?.aboutImage || '/oscar-sax.jpg'}')` }}
                  ></div>
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
                  About Oscar Mulele
                </h2>
                
                <div className="space-y-6 mb-10">
                  {settings?.bio ? (
                    <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {settings.bio}
                    </div>
                  ) : (
                    <>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Oscar Mulele is a professional saxophonist based in Kampala, Uganda, with over a decade of experience captivating audiences with his soulful melodies and passionate performances.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        His journey with music began at an early age, and through years of dedication and practice, he has mastered the art of bringing emotion and life to every note he plays.
                      </p>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        From intimate wedding ceremonies to grand corporate events, Oscar's versatility and professionalism have made him one of the most sought-after saxophonists in East Africa.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}