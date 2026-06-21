"use client";
import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Github, Terminal, Layers, Heart, Download, Menu, X, Info } from 'lucide-react';
import Link from 'next/link';
import { ShonenXIcon } from './ShonenXIcon';
import { DiscordIcon } from './DiscordIcon';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import { openAnnouncements } from '../lib/events';

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const config = useRemoteConfig();
  const hasAnnouncements = Boolean(config?.announcements?.website?.filter(a => a.enabled).length);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsMobileMenuOpen(false);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 }
        }}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl"
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <ShonenXIcon className="w-full h-full" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
                SHONEN<span className="text-shonen-red">X</span>
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-neutral-400">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/formats">
                <motion.div whileHover={{ y: -2, color: '#fff' }} className="flex items-center gap-2 transition-colors cursor-pointer"><Layers size={14} /> Formats</motion.div>
              </Link>
              <motion.a whileHover={{ y: -2, color: '#fff' }} href="/#features" className="flex items-center gap-2 transition-colors cursor-pointer"><Layers size={14} /> Features</motion.a>
              <motion.a whileHover={{ y: -2, color: '#fff' }} href="/#disclaimer" className="flex items-center gap-2 transition-colors cursor-pointer"><Terminal size={14} /> Legal</motion.a>
              <Link href="/changelogs">
                <motion.div whileHover={{ y: -2, color: '#fff' }} className="flex items-center gap-2 transition-colors cursor-pointer"><Terminal size={14} /> Changelogs</motion.div>
              </Link>
              <motion.a whileHover={{ y: -2, color: '#fff' }} href="https://discord.gg/uJyXZYSmH4" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors cursor-pointer"><DiscordIcon size={14} /> Discord</motion.a>
              <motion.a whileHover={{ y: -2, color: '#fff' }} href="https://github.com/roshancodeapace/ShonenX" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors cursor-pointer"><Github size={14} /> Source</motion.a>
              <motion.a whileHover={{ y: -2, color: '#ff3333' }} href="https://github.com/roshancodeapace/ShonenX" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors cursor-pointer group"><Heart size={14} className="group-hover:animate-pulse" /> Sponsor</motion.a>
            </div>
            
            <div className="h-4 w-px bg-white/10 hidden md:block"></div>
            
            <div className="flex items-center gap-3 text-white">
              {hasAnnouncements && (
                <button 
                  onClick={openAnnouncements}
                  className="relative flex items-center justify-center p-2 text-white hover:text-shonen-red transition-colors hidden md:flex"
                  title="View Announcements"
                >
                  <Info size={20} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-shonen-red rounded-full animate-pulse border border-black shadow-[0_0_8px_rgba(255,51,51,1)]"></span>
                </button>
              )}
              
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: '#ffffff' }}
                whileTap={{ scale: 0.95 }}
                href="/#download" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 bg-shonen-red text-black px-4 py-2 font-bold transition-colors shadow-[0_0_15px_rgba(255,51,51,0.4)] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]"
              >
                <Download size={16} />
                <span className="hidden sm:inline">DOWNLOAD</span>
              </motion.a>

              <button 
                className="md:hidden flex items-center justify-center p-2 text-white hover:text-shonen-red transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              {hasAnnouncements && (
                <button 
                  onClick={() => { openAnnouncements(); setIsMobileMenuOpen(false); }}
                  className="md:hidden relative flex items-center justify-center p-2 text-white hover:text-shonen-red transition-colors"
                >
                  <Info size={24} />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-shonen-red rounded-full animate-pulse border-2 border-black shadow-[0_0_8px_rgba(255,51,51,1)]"></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col font-mono text-sm uppercase tracking-wider overflow-y-auto"
          >
            <div className="flex flex-col gap-2 text-neutral-300 pb-12">
              <Link 
                href="/formats" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-white/10 hover:text-white hover:border-shonen-red transition-colors"
              >
                <Layers size={16} className="text-shonen-red" /> Formats
              </Link>
              <a 
                href="/#features" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-white/10 hover:text-white hover:border-shonen-red transition-colors"
              >
                <Layers size={16} className="text-shonen-red" /> Features
              </a>
              <a 
                href="/#disclaimer" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-white/10 hover:text-white hover:border-shonen-red transition-colors"
              >
                <Terminal size={16} className="text-shonen-red" /> Legal
              </a>
              <Link 
                href="/changelogs" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-white/10 hover:text-white hover:border-shonen-red transition-colors"
              >
                <Terminal size={16} className="text-shonen-red" /> Changelogs
              </Link>
              <a 
                href="https://discord.gg/uJyXZYSmH4" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-white/10 hover:text-white hover:border-shonen-red transition-colors"
              >
                <DiscordIcon size={16} className="text-shonen-red" /> Discord
              </a>
              <a 
                href="https://github.com/roshancodeapace/ShonenX" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-white/10 hover:text-white hover:border-shonen-red transition-colors"
              >
                <Github size={16} className="text-shonen-red" /> Source Code
              </a>
              <a 
                href="https://github.com/roshancodeapace/ShonenX" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-white/10 hover:text-white hover:border-shonen-red transition-colors"
              >
                <Heart size={16} className="text-shonen-red animate-pulse" /> Sponsor Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
