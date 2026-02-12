"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import { client } from '../lib/sanity'; 

declare global {
  interface Window { instgrm?: any; }
}

const ADMIN_PASSWORD = "s09I"; 
const EDITING_STYLES = ["Documentary", "High-Retention", "Cinematic", "Viral Shorts", "Commercial"];

export default function HeroSection() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activePhase, setActivePhase] = useState<1 | 2 | 3 | 4>(1);
  const [styleIndex, setStyleIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [phaseData, setPhaseData] = useState<any>(null);

  useEffect(() => {
    setHasMounted(true);
    async function fetchData() {
      const data = await client.fetch(`*[_type == "phase"] | order(phaseId asc)`);
      if (data && data.length > 0) {
        const formattedData: any = {};
        data.forEach((item: any) => { formattedData[item.phaseId] = item; });
        setPhaseData(formattedData);
      }
    }
    fetchData();

    const interval = setInterval(() => {
      setStyleIndex((prev) => (prev + 1) % EDITING_STYLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // SAFE INSTAGRAM PROCESSING
  useEffect(() => {
    if (window.instgrm && (activePhase === 1 || activePhase === 2)) {
      try {
        window.instgrm.Embeds.process();
      } catch (err) {
        console.error("Instagram process error:", err);
      }
    }
  }, [activePhase, phaseData]);

  const handleAdminToggle = () => {
    if (isAdmin) setIsAdmin(false);
    else {
      const pass = prompt("Enter Admin Password:");
      if (pass === ADMIN_PASSWORD) setIsAdmin(true);
      else alert("Wrong password!");
    }
  };

  const updateData = async (phaseId: number, field: string, value: any) => {
    const updatedPhase = { ...phaseData[phaseId], [field]: value };
    setPhaseData({ ...phaseData, [phaseId]: updatedPhase });
    try {
      await client.patch(phaseData[phaseId]._id).set({ [field]: value }).commit();
    } catch (err) {
      console.error("Cloud Update Error:", err);
    }
  };

  const handleWhatsAppBooking = () => {
    const currentPhase = phaseData[activePhase];
    const isInsta = activePhase === 1 || activePhase === 2;
    const videoLink = isInsta 
      ? `https://www.instagram.com/reel/${currentPhase.reels[0]}/` 
      : `https://www.youtube.com/watch?v=${currentPhase.reels[0]}`;
    const message = `I want to edit this type of video: ${videoLink}, price: $${currentPhase.price}`;
    window.open(`https://wa.me/919547544915?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!phaseData) return (
    <div className="min-h-screen bg-[#050208] flex items-center justify-center">
      <div className="animate-pulse text-purple-500 font-bold tracking-widest uppercase italic">Connecting...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050208] text-white overflow-hidden relative font-sans">
      {/* BG DECO */}
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
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 md:w-16 md:h-16">
              <Image src="/Picsart_26-02-04_22-29-28-967.png" alt="Logo" fill className="rounded-lg object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">
                SOnai<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-light not-italic">Aep</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold ml-1">Creative Studio</span>
            </div>
          </div>
          <button onClick={handleAdminToggle} className={`text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${isAdmin ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-white/5 border-white/10 text-gray-500'}`}>
            {isAdmin ? "Exit Admin 🔓" : "Admin 🔒"}
          </button>
        </nav>

        <main className="pt-16 pb-20 text-center px-6">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8">
            Unleash Your <br />
            <span className="relative inline-block">
              <span className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-orange-500 blur-2xl opacity-20 animate-pulse"></span>
              <span className="relative bg-gradient-to-r from-pink-500 via-red-400 to-orange-400 bg-clip-text text-transparent italic px-2">Viral</span>
            </span> Potential
          </motion.h1>

          <div className="mt-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* SIDEBAR */}
            <div className="bg-[#120b1a]/60 backdrop-blur-md border border-white/5 p-8 rounded-[32px] md:col-span-1">
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Editing Phases</h3>
              <div className="space-y-4 mb-8">
                {[1, 2, 3, 4].map((num) => (
                  <button key={num} onClick={() => setActivePhase(num as any)} className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all ${activePhase === num ? 'bg-purple-500/10 border-purple-500/50' : 'border-transparent hover:bg-white/5'}`}>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${activePhase === num ? 'bg-purple-500 text-white' : 'text-purple-400'}`}>{num}</div>
                    <div className="text-left">
                      <p className={`text-sm font-bold uppercase ${activePhase === num ? 'text-white' : 'text-gray-400'}`}>{phaseData[num].word}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Price</p>
                  {isAdmin ? (
                    <input className="bg-purple-900/40 text-2xl w-20 rounded border border-purple-500 px-2 outline-none" value={phaseData[activePhase].price} onChange={(e) => updateData(activePhase, 'price', e.target.value)} />
                  ) : (
                    <div className="text-4xl font-black">${phaseData[activePhase].price}</div>
                  )}
                </div>
                <button onClick={handleWhatsAppBooking} className="bg-green-500 px-6 py-4 rounded-2xl font-bold text-sm">Book Now</button>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="bg-[#120b1a]/60 backdrop-blur-md border border-white/5 p-8 rounded-[32px] md:col-span-2">
              <h3 className="text-2xl font-bold italic mb-8">
                {activePhase === 1 || activePhase === 2 ? 'Instagram Reels' : 
                 activePhase === 3 ? 'YouTube Shorts' : 'YouTube Long-form'}
              </h3>
              
              <div className={`grid gap-6 ${activePhase === 4 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
                {phaseData[activePhase].reels.map((id: string, index: number) => (
                  /* THE FIX: UNIQUE KEY PER PHASE PREVENTS INSTAGRAM SCRIPT CRASH */
                  <div key={`video-box-${activePhase}-${index}`} className="flex flex-col gap-2">
                    <div className={`w-full rounded-2xl overflow-hidden bg-black border border-white/5 ${activePhase === 4 ? 'aspect-video' : 'min-h-[450px]'}`}>
                      {(activePhase === 1 || activePhase === 2) ? (
                        <blockquote 
                          key={`insta-${id}`} 
                          className="instagram-media" 
                          data-instgrm-permalink={`https://www.instagram.com/reel/${id}/`} 
                          data-instgrm-version="14"
                        ></blockquote>
                      ) : (
                        <iframe 
                          key={`yt-${id}`}
                          width="100%" 
                          height="100%" 
                          src={`https://www.youtube.com/embed/${id}`} 
                          frameBorder="0" 
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                    {isAdmin && (
                      <input className="bg-white/10 text-[10px] p-2 rounded border border-white/20 outline-none" value={id} onChange={(e) => {
                        const newReels = [...phaseData[activePhase].reels];
                        newReels[index] = e.target.value;
                        updateData(activePhase, 'reels', newReels);
                      }} />
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