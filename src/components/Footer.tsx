"use client";
import React from 'react';
import { Github, CodeXml, Heart, ShieldAlert, GitCommit, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { DiscordIcon } from './DiscordIcon';

export function Footer() {
  return (
    <footer className="bg-shonen-dark pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-scanlines opacity-50 mix-blend-overlay pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-end border-b border-shonen-border pb-16 mb-8">
          <div>
            <h2 className="font-display font-bold text-5xl md:text-8xl tracking-tighter uppercase leading-[0.8] mb-6 drop-shadow-[0_0_15px_rgba(255,51,51,0.2)]">
              Join The <br/>
              <span className="text-shonen-red">Culture.</span>
            </h2>
            <p className="font-mono text-neutral-400 text-sm max-w-md leading-relaxed border-l-2 border-shonen-red pl-4">
              ShonenX is currently a solo developed project powered by a couple of generous supporters. Feel free to inspect the code, compile from source, open an issue, or contribute if you understand the architecture.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start md:items-end justify-end w-full flex-wrap xl:flex-nowrap">
            <Link href="/changelogs" className="w-full sm:w-auto bg-black border border-shonen-border text-white px-8 py-5 hover:border-shonen-red hover:text-shonen-red transition-all flex items-center justify-center gap-3 font-mono text-sm uppercase group whitespace-nowrap">
              <GitCommit size={18} className="group-hover:animate-pulse" />
              Changelogs
            </Link>
            <a href="https://discord.gg/uJyXZYSmH4" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-[#5865F2]/10 border border-[#5865F2]/30 text-[#5865F2] hover:bg-[#5865F2] hover:text-white px-8 py-5 transition-all flex items-center justify-center gap-3 font-mono text-sm uppercase whitespace-nowrap">
              <DiscordIcon size={18} />
              Discord
            </a>
            <a href="https://github.com/roshancodeapace/ShonenX" className="w-full sm:w-auto bg-white text-black px-8 py-5 font-bold hover:bg-shonen-red hover:text-black transition-all flex items-center justify-center gap-3 font-mono text-sm uppercase whitespace-nowrap">
              <Github size={18} />
              GitHub Repo
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-[10px] uppercase text-neutral-500 tracking-widest">
          <div className="flex items-center gap-2">
            <span>Made with <Heart size={10} className="inline text-shonen-red mx-1 animate-pulse" /> by <a href="https://github.com/roshancodeapace" className="text-white hover:text-shonen-red transition-colors inline-flex items-center gap-1">@roshancodeapace <ExternalLink size={10} /></a></span>
          </div>
          
          <div className="flex gap-4 md:gap-8 flex-wrap">
            <a href="/#disclaimer" className="hover:text-white transition-colors flex items-center gap-1"><ShieldAlert size={10} /> Legal / DMCA</a>
            <a href="https://github.com/roshancodeapace/ShonenX/blob/main/LICENSE" className="hover:text-white transition-colors">License: Apache 2.0</a>
            <Link href="/changelogs" className="hover:text-white transition-colors">Releases</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
