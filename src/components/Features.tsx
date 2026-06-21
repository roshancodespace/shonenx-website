"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { Database, Zap, BookOpen, DownloadCloud, ArrowRight } from 'lucide-react';
import { usePlatformDetect } from '../hooks/usePlatformDetect';
import Link from 'next/link';

export function Features() {
  const { platform } = usePlatformDetect();
  const osSuffix = platform !== 'unknown' ? ` // ${platform.toUpperCase()}` : '';

  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="font-mono text-shonen-red text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-shonen-red animate-pulse"></span>
              [ WHY_IT_EXISTS ]
            </h2>
            <h3 className="font-display font-bold text-5xl sm:text-7xl uppercase tracking-tighter leading-[0.9]">
              Built by a fan <br/>
              <span className="text-neutral-600">For the culture.</span>
            </h3>
          </div>
          <div className="font-mono text-xs text-neutral-400 uppercase max-w-xs border-l border-shonen-red/50 pl-4">
            Started out as a personal fun project. Now an open source solo-developed alternative to cluttered anime sites.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="md:col-span-2 bg-[#050505] border border-white/5 hover:border-white/10 transition-colors p-8 md:p-12 relative group overflow-hidden flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity text-shonen-red pointer-events-none">
              <Database size={120} strokeWidth={0.5} />
            </div>
            
            <div className="flex-1 relative z-10">
              <div className="font-mono text-shonen-red text-[10px] uppercase tracking-widest mb-4">Module_01 // Omni-Sync</div>
              <h4 className="font-display text-4xl font-bold uppercase tracking-tight mb-4 leading-none">You own<br/>your data.</h4>
              <p className="font-sans text-neutral-400 leading-relaxed max-w-sm mb-6">
                Log into MyAnimeList or AniList. We keep your progress perfectly synced across all the platforms you care about. No lock-in.
              </p>
              <div className="flex gap-2 flex-wrap font-mono text-[10px] uppercase mt-auto">
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-sm">AniList GraphQL</span>
                <span className="bg-white/5 border border-white/10 px-3 py-1.5 backdrop-blur-sm">MAL API</span>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10 pt-8 md:pt-0 -mb-20 md:-mb-24 text-center md:text-right">
              <ScreenshotPlaceholder 
                label={`Sync Dashboard${osSuffix}`} 
                aspectRatio="mobile" 
                imgSrc="https://res.cloudinary.com/dscoexe9l/image/upload/v1781978996/1000232654_py5khk.jpg"
                className="w-full max-w-[280px] inline-block mx-auto md:mr-0 md:ml-auto transform group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700 ease-out shadow-2xl" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="md:col-span-1 md:row-span-2 bg-[#050505] border border-white/5 hover:border-white/10 transition-colors p-8 md:p-12 relative group overflow-hidden flex flex-col"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-40 transition-opacity text-white pointer-events-none">
              <BookOpen size={120} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10 mb-8">
              <div className="font-mono text-neutral-500 text-[10px] uppercase tracking-widest mb-4 group-hover:text-shonen-red transition-colors">Module_02 // Reader_Player</div>
              <h4 className="font-display text-4xl font-bold uppercase tracking-tight mb-4 leading-none">Zero<br/>Latency.</h4>
              <p className="font-sans text-neutral-400 leading-relaxed text-sm">
                Customizable reader and player built to get out of your way. Fast fetching, AMOLED dark mode, and flow direction control. Just read and watch.
              </p>
            </div>

            <Link href="/formats" className="inline-flex items-center gap-2 font-mono text-xs uppercase text-white hover:text-shonen-red transition-colors relative z-10 mt-auto w-fit">
              Discover Formats <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            className="md:col-span-1 bg-[#050505] border border-white/5 hover:border-white/10 transition-colors p-8 md:p-12 relative group overflow-hidden flex flex-col justify-between min-h-[320px]"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity text-neutral-500 pointer-events-none">
              <DownloadCloud size={80} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10 mb-8">
              <div className="font-mono text-neutral-500 text-[10px] uppercase tracking-widest mb-4 group-hover:text-shonen-red transition-colors">Module_03 // Offline</div>
              <h4 className="font-display text-4xl font-bold uppercase tracking-tight mb-4 leading-none">Offline<br/>First.</h4>
              <p className="font-sans text-neutral-400 text-sm leading-relaxed">
                Download entire volumes or seasons straight to your device. Taking a flight? You're covered.
              </p>
            </div>
            
            <a href="#download" className="inline-flex items-center gap-2 font-mono text-xs uppercase text-white hover:text-shonen-red transition-colors relative z-10 mt-auto w-fit">
              Explore Downloads <ArrowRight size={14} />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="md:col-span-1 bg-shonen-red text-black p-8 md:p-12 relative group overflow-hidden flex flex-col justify-between min-h-[320px]"
          >
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
               <Zap size={80} strokeWidth={0.5} />
             </div>
             
             <div className="relative z-10 mb-8">
               <div className="font-mono text-black/60 text-[10px] uppercase tracking-widest mb-4 font-bold">Module_04 // Performance</div>
               <h4 className="font-display text-4xl font-bold uppercase tracking-tight mb-4 leading-none">Native<br/>& Fast.</h4>
               <p className="font-sans text-black/80 text-sm leading-relaxed font-medium">
                 No bloat. No trackers. ShonenX is designed to be lightweight and purely focused on the content. High performance on all devices.
               </p>
             </div>
             
             <div className="mt-auto font-mono text-xs font-bold uppercase flex items-center justify-between border-t border-black/20 pt-6 relative z-10">
               <span>Open Source</span>
               <span>v2.4.1</span>
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
            className="md:col-span-3 bg-shonen-dark border border-shonen-border p-8 md:p-12 relative group overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mt-6"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
               <Database size={200} strokeWidth={0.5} />
             </div>
             
             <div className="relative z-10 max-w-2xl">
               <div className="font-mono text-shonen-red text-[10px] uppercase tracking-widest mb-4">Module_05 // External Extensions</div>
               <h4 className="font-display text-4xl font-bold uppercase tracking-tight mb-4 leading-none">Limitless<br/>Sources.</h4>
               <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-6">
                 ShonenX utilizes the <strong>AnymeX Extension Runtime Bridge</strong>, making full Aniyomi and Mangayomi extension support possible. The application strictly ships as a bare-bones client with zero pre-compiled sources. Any external extensions are built, installed, and managed strictly by users at their own discretion.
               </p>
               <div className="flex gap-2 flex-wrap font-mono text-[10px] uppercase">
                 <span className="bg-shonen-surface border border-shonen-border px-3 py-1.5 backdrop-blur-sm text-neutral-300">Aniyomi Core</span>
                 <span className="bg-shonen-surface border border-shonen-border px-3 py-1.5 backdrop-blur-sm text-neutral-300">Mangayomi Core</span>
               </div>
             </div>
             
             <div className="relative z-10 shrink-0">
                <a href="#disclaimer" className="font-mono text-xs uppercase px-8 py-4 bg-white text-black hover:bg-shonen-red hover:text-white transition-colors font-bold inline-block">
                  Read Disclaimer
                </a>
             </div>
          </motion.div>
        
        </div>
      </div>
    </section>
  );
}
