"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export function Ticker() {
  const items = [
    "100% OPEN SOURCE", "NO ADS", "ZERO TELEMETRY", "OFFLINE FIRST", 
    "MAL SYNC", "ANILIST INTEGRATION", "HARDWARE ACCELERATED",
    "CUSTOM THEMES", "MULTI-SOURCE", "BUILT FOR FUN"
  ];
  
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <div className="border-b border-shonen-border bg-shonen-red text-black overflow-hidden relative flex items-center py-3">
      <div className="absolute left-0 w-16 md:w-32 h-full bg-gradient-to-r from-shonen-red to-transparent z-10"></div>
      <div className="absolute right-0 w-16 md:w-32 h-full bg-gradient-to-l from-shonen-red to-transparent z-10"></div>
      
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1035] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 20 
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center font-display font-bold uppercase text-lg tracking-wider px-6">
            <Terminal size={18} className="mr-6 opacity-30" />
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
