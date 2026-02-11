"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

declare global {
  interface Window {
    instgrm?: any;
  }
}

// --- ADMIN SETTINGS ---
const ADMIN_PASSWORD = "s09I"; 

const INITIAL_PHASE_DATA = {
  1: { 
    type: 'instagram', 
    price: "5", 
    reels: ['DUDsUtMDv16', 'DPBN8cNCI-9', 'DQyDU1nia7p'], 
    word: "Instagram Reel", 
    desc: "Raw Footage Analysis & Culling" 
  },
  2: { 
    type: 'instagram', 
    price: "10", 
    reels: ['DT0LVbxCdAK', 'DTP-uIdAQSG', 'DRWLb5fiBPa'], 
    word: "Advance Reel", 
    desc: "Advanced VFX & Transitions" // Swapped from original Phase 3
  },
  3: { 
    type: 'youtube-shorts', 
    price: "20", 
    reels: ['DYywPTshmFI', 've8avJ-hCS8', 'uZY9xr-QAk0'], 
    word: "YT Shorts", 
    desc: "Storyboarding & Rough Cut" // Swapped from original Phase 2
  },
  4: { 
    type: 'youtube-long', 
    price: "60", 
    reels: ['HSKfSYhNwQ0', '6wYZWGdiAYQ', 'yodm5jMvxqs'], 
    word: "YT Long & Wedding", 
    desc: "Color Grading & Audio Mastering" 
  }
};

const EDITING_STYLES = ["Documentary", "High-Retention", "Cinematic", "Viral Shorts", "Commercial"];

export default function HeroSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 4>(1);
  const [styleIndex, setStyleIndex] = useState(0);
  
  // Admin States
  const [isAdmin, setIsAdmin] = useState(false);
  const [phaseData, setPhaseData] = useState(INITIAL_PHASE_DATA);

  useEffect(() => {
    setHasMounted(true);
    // Load saved data from browser if exists
   const saved = localStorage.getItem('sonai_admin_live_v1');
    if (saved) setPhaseData(JSON.parse(saved));

    const interval = setInterval(() => {
      setStyleIndex((prev) => (prev + 1) % EDITING_STYLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.instgrm && phaseData[activePhase].type === 'instagram') {
      window.instgrm.Embeds.process();
    }
  }, [activePhase, phaseData]);

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
    } else {
      const pass = prompt("Enter Admin Password:");
      if (pass === ADMIN_PASSWORD) setIsAdmin(true);
      else alert("Wrong password!");
    }
  };

  const updateData = (phase: number, field: string, value: any) => {
    const newData = { 
      ...phaseData, 
      [phase]: { ...phaseData[phase as keyof typeof phaseData], [field]: value } 
    };
    setPhaseData(newData as any);
    localStorage.setItem('sonai_admin_live_v1', JSON.stringify(newData));
  };

  const handleWhatsAppBooking = () => {
    const phoneNumber = "919547544915";
    const currentPhase = phaseData[activePhase];
    const firstVideoId = currentPhase.reels[0];
    const videoLink = currentPhase.type === 'instagram' 
      ? `https://www.instagram.com/reel/${firstVideoId}/` 
      : `https://www.youtube.com/watch?v=${firstVideoId}`;

    const message = `I want to edit this type of video: ${videoLink}, price: $${currentPhase.price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050208] text-white overflow-hidden relative font-sans">
      
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
        <nav className="flex items-center justify-between px-6 md:px-10 py-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110">
              <Image src="/Picsart_26-02-04_22-29-28-967.png" alt="Logo" fill className="rounded-lg object-contain shadow-lg shadow-purple-500/20" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
                SOnai<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-light not-italic">Aep</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold ml-1">Creative Studio</span>
            </div>
          </div>

          <button 
            onClick={handleAdminToggle}
            className={`text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                isAdmin ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'
            }`}
          >
            {isAdmin ? "Exit Admin 🔓" : "Admin 🔒"}
          </button>
        </nav>

        <main className="pt-16 pb-20 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            
            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Unleash Your <br />
              <span className="relative inline-block">
                <span className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-orange-500 blur-2xl opacity-20 animate-pulse"></span>
                <span className="relative bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 bg-clip-text text-transparent italic px-2">
                  Viral
                </span>
              </span>
              {" "}Potential
              <br />
              <span className="text-3xl md:text-6xl font-light tracking-wide text-white/90">
                With Pro Video Editing
              </span>
            </h1>

            <div className="flex flex-col items-center justify-center gap-6 mb-16">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-md shadow-xl">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium tracking-wide text-gray-300">
                  Currently Available for <span className="text-white font-bold inline-block min-w-[120px] text-left ml-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={styleIndex}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {EDITING_STYLES[styleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
              </div>
            </div>
          </motion.div>

          <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-[#120b1a]/60 backdrop-blur-md border border-white/5 p-8 rounded-[32px] md:col-span-1 flex flex-col min-h-[600px]">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Editing Phases</h3>
              <div className="space-y-4 mb-8 flex-grow">
                {(Object.keys(phaseData) as unknown as (1|2|3|4)[]).map((num) => (
                  <button key={num} onClick={() => setActivePhase(num)} className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all border ${activePhase === num ? 'bg-purple-500/10 border-purple-500/50' : 'bg-transparent border-transparent hover:bg-white/5'}`}>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${activePhase === num ? 'bg-purple-500 text-white' : 'bg-purple-500/20 text-purple-400 border-purple-500/40'}`}>{num}</div>
                    <div className="text-left">
                      <p className={`text-sm font-bold uppercase tracking-wider ${activePhase === num ? 'text-white' : 'text-gray-400'}`}>
                        {phaseData[num].word}
                      </p>
                      <p className="text-[10px] text-gray-500">{phaseData[num].desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Price</p>
                  {isAdmin ? (
                    <input 
                      type="text" 
                      className="bg-purple-900/40 text-2xl w-20 rounded border border-purple-500 px-2 outline-none"
                      value={phaseData[activePhase].price}
                      onChange={(e) => updateData(activePhase, 'price', e.target.value)}
                    />
                  ) : (
                    <div className="text-4xl font-black text-white">${phaseData[activePhase].price}</div>
                  )}
                </div>
                <button 
                  onClick={handleWhatsAppBooking}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-green-500/20 active:scale-95"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="bg-[#120b1a]/60 backdrop-blur-md border border-white/5 p-8 rounded-[32px] md:col-span-2">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold italic">
                  {phaseData[activePhase].type === 'instagram' ? 'Trending Reels' : 
                   phaseData[activePhase].type === 'youtube-shorts' ? 'YouTube Shorts' : 'YouTube Long-form'} 
                </h3>
                {isAdmin && <span className="text-[10px] text-red-400 font-bold animate-pulse">ADMIN EDITING MODE</span>}
              </div>
              
              <div className={`grid gap-6 ${phaseData[activePhase].type === 'youtube-long' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                {hasMounted && phaseData[activePhase].reels.map((id, index) => (
                  <div key={`${activePhase}-${id}-${index}`} className="flex flex-col gap-2">
                    <div className={`w-full rounded-2xl overflow-hidden bg-black border border-white/5 ${phaseData[activePhase].type === 'youtube-long' ? 'aspect-video' : 'min-h-[450px]'}`}>
                      {phaseData[activePhase].type === 'instagram' ? (
                        <blockquote className="instagram-media" data-instgrm-permalink={`https://www.instagram.com/reel/${id}/`} data-instgrm-version="14" style={{ width: '100%' }}></blockquote>
                      ) : (
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allowFullScreen></iframe>
                      )}
                    </div>
                    {isAdmin && (
                      <input 
                        className="bg-white/10 text-[10px] p-2 rounded border border-white/20 outline-none focus:border-purple-500"
                        placeholder="Paste Video ID here"
                        value={id}
                        onChange={(e) => {
                          const newReels = [...phaseData[activePhase].reels];
                          newReels[index] = e.target.value;
                          updateData(activePhase, 'reels', newReels);
                        }}
                      />
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