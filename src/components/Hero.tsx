"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ScreenshotPlaceholder } from './ScreenshotPlaceholder';
import { GitBranch, Download, Users, Code, Monitor, RefreshCw } from 'lucide-react';
import { usePlatformDetect } from '../hooks/usePlatformDetect';
import { ShonenXIcon } from './ShonenXIcon';
import { useTotalDownloads } from '../hooks/useTotalDownloads';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const { platform } = usePlatformDetect();
  const osLabel = platform !== 'unknown' ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Web';
  const displayLabel = `ShonenX Dashboard // ${osLabel} Build`;

  const totalDownloads = useTotalDownloads();
  const formatDownloads = (count: number) => {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
  };

  return (
    <section ref={containerRef} className="relative pt-8 pb-16 md:pt-12 md:pb-24 border-b border-shonen-border bg-scanlines overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col items-center text-center max-w-4xl z-10"
        >
          {totalDownloads && totalDownloads > 0 && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-8 font-mono"
            >
              <div className="inline-flex items-center gap-2 border border-shonen-red/30 bg-shonen-red/10 px-4 py-2 text-xs text-shonen-red uppercase tracking-wider backdrop-blur-sm">
                <Download size={14} />
                <span>Over <span className="text-white font-bold">{formatDownloads(totalDownloads)}</span> Global Downloads</span>
              </div>
            </motion.div>
          )}

          <div className="w-16 h-28 mb-8">
            <ShonenXIcon className="w-full h-full drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-400 mb-8">
            <div className="flex items-center gap-2 text-shonen-red">
              <div className="w-2 h-2 bg-shonen-red animate-pulse"></div>
              <span>Open Source</span>
            </div>
            <span className="hidden sm:block text-shonen-border">//</span>
            <span>Solo Developed</span>
          </div>
          
          <h1 className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-[1.1] tracking-tighter uppercase mb-8">
            <span className="text-white">Read. </span>
            <span className="text-neutral-500">Watch. </span>
            <span className="text-white relative inline-block">
              Track.
              <span className="absolute left-0 bottom-[10%] w-full h-[8px] sm:h-[12px] bg-shonen-red -z-10"></span>
            </span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-neutral-400 leading-relaxed mb-12 max-w-2xl px-4">
            Started as a fun personal project. Now an open-source anime and manga companion. 
            No ads, no trackers, pure data sovereignty. Syncs cleanly with MAL and AniList.
          </p>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 font-mono text-sm uppercase mb-16 w-full sm:w-auto px-4">
            <a href="#download" className="bg-white text-black px-8 py-4 font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3 w-full sm:w-auto">
              <Download size={18} />
              Get The App
            </a>
            <a href="https://github.com/roshancodeapace/ShonenX" target="_blank" rel="noreferrer" className="border border-shonen-border bg-shonen-surface text-white px-8 py-4 hover:border-neutral-500 transition-colors flex items-center justify-center gap-3 w-full sm:w-auto">
              <GitBranch size={18} />
              View Source
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.2 }}
          style={{ y: heroImageY }}
          className="w-full max-w-6xl relative z-20 mt-8"
        >
          {/* Centered large hero screenshot */}
          <div className="w-full relative shadow-[0_0_80px_rgba(0,0,0,0.8)] mb-20 md:mb-32">
            <ScreenshotPlaceholder 
              label={displayLabel} 
              aspectRatio="auto"
              imgSrc="https://res.cloudinary.com/dscoexe9l/image/upload/v1781979110/Screenshot_20260620_211126_bsnvdk.jpg"
              className="w-full border-2 border-neutral-800 transition-transform duration-700 ease-out" 
            />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
