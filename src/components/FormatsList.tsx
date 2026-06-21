"use client";
import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Tv, Database, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function FormatsList() {
  const formats = [
    {
      title: "Manga",
      icon: <BookOpen size={40} className="text-shonen-red" />,
      description: "Read standard right-to-left manga pages cleanly. Supports custom flow directions and multiple source extensions for metadata parsing.",
      tags: ["Chapters", "Volumes", "Right-to-Left", "High-res"]
    },
    {
      title: "Anime",
      icon: <Tv size={40} className="text-shonen-red" />,
      description: "Watch your favorite episodes without stutter. Native zero-latency players handle streams retrieved directly off extensions.",
      tags: ["1080p", "Subbed / Dubbed", "Zero Latency", "AMOLED Player"]
    },
    {
      title: "Manhwa / Webtoons",
      icon: <Database size={40} className="text-shonen-red" />,
      description: "Continuous vertical scrolling support meant specifically for reading Manhwa and Webtoons with native optimizations.",
      tags: ["Long Strip", "Vertical Scroll", "Web Optimized"]
    }
  ];

  return (
    <section className="pt-8 pb-24 border-b border-shonen-border bg-scanlines min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase text-neutral-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={14} /> Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-shonen-red text-[10px] uppercase tracking-widest mb-4">Supported_Media // 1.0</div>
          <h2 className="font-display font-bold text-5xl sm:text-7xl uppercase tracking-tighter leading-[0.9]">
            Supported <br/>
            <span className="text-neutral-500">Formats.</span>
          </h2>
          <p className="font-sans text-neutral-400 mt-6 max-w-2xl leading-relaxed">
            ShonenX is designed as a universal aggregator, pulling together the distinct media forms you consume every day under a single uncompromised roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-shonen-border border border-shonen-border">
          {formats.map((fmt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-shonen-dark p-8 md:p-12 group hover:bg-shonen-surface transition-colors duration-300 flex flex-col h-full"
            >
               <div className="mb-8 transform group-hover:-translate-y-2 transition-transform">
                 {fmt.icon}
               </div>
               
               <h3 className="font-display text-3xl font-bold uppercase tracking-tight mb-4">{fmt.title}</h3>
               <p className="font-sans text-neutral-400 text-sm leading-relaxed mb-10 flex-grow">
                 {fmt.description}
               </p>
               
               <div className="flex flex-wrap gap-2 mt-auto">
                 {fmt.tags.map((tag, i) => (
                   <span key={i} className="font-mono text-[10px] uppercase border border-shonen-border px-2 py-1 text-neutral-500">
                     {tag}
                   </span>
                 ))}
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
