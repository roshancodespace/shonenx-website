"use client";
import React from 'react';
import { ShieldAlert, Info, FileWarning } from 'lucide-react';
import { motion } from 'motion/react';

export function Disclaimer() {
  return (
    <section id="disclaimer" className="py-24 border-b border-shonen-border bg-[#050505] relative -mt-px">
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full bg-black border border-shonen-border p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-shonen-border">
            <ShieldAlert className="text-shonen-red w-8 h-8" strokeWidth={1.5} />
            <div>
              <h2 className="font-display font-bold text-2xl uppercase tracking-tighter">Legal & DMCA Disclaimer</h2>
              <p className="font-mono text-xs uppercase text-neutral-500 tracking-widest mt-1">Read this before complaining</p>
            </div>
          </div>

          <div className="space-y-8 font-sans text-neutral-400 leading-relaxed text-sm">
            <div className="flex gap-4">
              <Info className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-mono uppercase text-xs block mb-2">01. Service Nature</strong>
                <p>
                  Look, ShonenX does <strong>not</strong> host, upload, or own any of the media you see in the app. It's literally just a frontend client. It's a glorified web browser that makes stuff look pretty. We don't have servers full of anime.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <DatabaseIcon className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-mono uppercase text-xs block mb-2">02. APIs & Metadata</strong>
                <p>
                  The covers, synopses, and schedules you see? That's all pulled directly from public APIs like <strong>AniList</strong> and <strong>MyAnimeList</strong>. ShonenX just displays what they send back. Don't sue us for showing a picture of Goku.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FileWarning className="w-5 h-5 text-shonen-red shrink-0 mt-0.5" />
              <div>
                <strong className="text-shonen-red font-mono uppercase text-xs block mb-2">03. User Extensions & Content</strong>
                <p>
                  Any "extensions" or third-party sources you decide to install are entirely on you. ShonenX doesn't distribute copyrighted material or endorse piracy. If you put in a weird URL and watch something you shouldn't, that's your problem, not ours. Make sure you follow your local laws, we are not your lawyers.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-shonen-border font-mono text-[10px] uppercase text-neutral-600 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="max-w-2xl text-center md:text-left">If you're a copyright holder looking to DMCA someone, you're barking up the wrong tree. Go find the extension developers or whoever is actually hosting the video files.</p>
            <div className="px-3 py-1 bg-white/5 border border-white/10 shrink-0">
              APACHE LICENSE 2.0
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
