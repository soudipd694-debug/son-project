"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';

declare global {
  interface Window {
    instgrm?: any;
  }
}

const PHASE_DATA = {
  1: { type: 'instagram', price: "299", reels: ['DUDsUtMDv16', 'DPBN8cNCI-9', 'DQyDU1nia7p'], word: "One", desc: "Raw Footage Analysis & Culling" },
  2: { type: 'instagram', price: "499", reels: ['DT0LVbxCdAK', 'DTP-uIdAQSG', 'DRWLb5fiBPa'], word: "Two", desc: "Storyboarding & Rough Cut" },
  3: { type: 'youtube-shorts', price: "799", reels: ['DYywPTshmFI', '70Q1sE2IyE4', 'Va7alUrpidY'], word: "Three", desc: "Advanced VFX & Transitions" },
  4: { type: 'youtube-long', price: "1200", reels: ['HSKfSYhNwQ0', '6wYZWGdiAYQ', 'yodm5jMvxqs'], word: "Four", desc: "Color Grading & Audio Mastering" }
};

export default function HeroSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (window.instgrm && PHASE_DATA[activePhase].type === 'instagram') {
      window.instgrm.Embeds.process();
    }
  }, [activePhase]);

  // WHATSAPP REDIRECTION LOGIC
  const handleWhatsAppBooking = () => {
    const phoneNumber = "918170083849"; // REPLACE WITH YOUR PHONE NUMBER
    const currentPhase = PHASE_DATA[activePhase];
    const firstVideoId = currentPhase.reels[0];
    
    // Determine platform link
    const videoLink = currentPhase.type === 'instagram' 
      ? `https://www.instagram.com/reel/${firstVideoId}/` 
      : `https://www.youtube.com/watch?v=${firstVideoId}`;

    const message = `I want to edit this type of video: ${videoLink}, price: $${currentPhase.price}`;
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050208] text-white overflow-hidden relative font-sans">
      
      {/* BACKGROUND & LAYER 2 PHOTO */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-20 right-[-5%] w-[400px] h-[600px] opacity-30 blur-[2px]">
          <Image src="/1000139267.png" alt="Profile" fill className="object-contain" priority />
        </div>
      </div>

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-10 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Image src="/lo.png" alt="Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-2xl font-extrabold tracking-tighter">SOnaiAep</span>
          </div>
        </nav>

        <main className="pt-16 pb-20 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
              Video <span className="bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 bg-clip-text text-transparent italic">Editing</span>
              <br />Made Simple
            </h1>
            <div className="flex flex-col sm:flex-row items-center p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl max-w-lg mx-auto mb-16">
              <input type="email" placeholder="Enter your email" className="bg-transparent w-full px-5 py-3 outline-none" />
              <button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 px-8 py-3 rounded-xl font-bold text-sm">Get early access</button>
            </div>
          </motion.div>

          <div className="mt-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            {/* PHASE DIV WITH PRICE AND BOOK NOW */}
            <div className="bg-[#120b1a]/60 backdrop-blur-md border border-white/5 p-8 rounded-[32px] md:col-span-1 flex flex-col min-h-[600px]">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Editing Phases</h3>
              <div className="space-y-4 mb-8 flex-grow">
                {(Object.keys(PHASE_DATA) as unknown as (1|2|3|4)[]).map((num) => (
                  <button key={num} onClick={() => setActivePhase(num)} className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all border ${activePhase === num ? 'bg-purple-500/10 border-purple-500/50' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${activePhase === num ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-400 border-purple-500/40'}`}>{num}</div>
                    <div className="text-left">
                      <p className={`text-sm font-bold uppercase tracking-wider ${activePhase === num ? 'text-white' : 'text-gray-400'}`}>Phase {PHASE_DATA[num].word}</p>
                      <p className="text-[10px] text-gray-500">{PHASE_DATA[num].desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* PRICE AND BOOK NOW SECTION */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Price</p>
                  <div className="text-4xl font-black text-white">${PHASE_DATA[activePhase].price}</div>
                </div>
                <button 
                  onClick={handleWhatsAppBooking}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-green-500/20 active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* DYNAMIC MEDIA SECTION */}
            <div className="bg-[#120b1a]/60 backdrop-blur-md border border-white/5 p-8 rounded-[32px] md:col-span-2">
              <h3 className="text-2xl font-bold mb-8 italic">
                {PHASE_DATA[activePhase].type === 'instagram' ? 'Trending Reels' : 
                 PHASE_DATA[activePhase].type === 'youtube-shorts' ? 'YouTube Shorts' : 'YouTube Long-form'} 
              </h3>
              
              <div className={`grid gap-6 ${PHASE_DATA[activePhase].type === 'youtube-long' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                {hasMounted && PHASE_DATA[activePhase].reels.map((id) => (
                  <div key={`${activePhase}-${id}`} className={`w-full rounded-2xl overflow-hidden bg-black border border-white/5 ${PHASE_DATA[activePhase].type === 'youtube-long' ? 'aspect-video' : 'min-h-[450px]'}`}>
                    {PHASE_DATA[activePhase].type === 'instagram' ? (
                      <blockquote className="instagram-media" data-instgrm-permalink={`https://www.instagram.com/reel/${id}/`} data-instgrm-version="14" style={{ width: '100%' }}></blockquote>
                    ) : (
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allowFullScreen></iframe>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Script src="https://www.instagram.com/embed.js" strategy="afterInteractive" />
    </div>
  );
}