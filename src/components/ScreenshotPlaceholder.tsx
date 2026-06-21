"use client";
import React, { useState } from 'react';
import { usePlatformDetect } from '../hooks/usePlatformDetect';

interface ScreenshotPlaceholderProps {
  label: string;
  className?: string;
  aspectRatio?: 'video' | 'portrait' | 'square' | 'ultrawide' | 'mobile' | 'auto';
  imgSrc?: string;
}

export function ScreenshotPlaceholder({ label, className = '', aspectRatio = 'auto', imgSrc }: ScreenshotPlaceholderProps) {
  const { isMobile } = usePlatformDetect();
  const [imageError, setImageError] = useState(false);
  const effectiveRatio = aspectRatio === 'auto' ? (isMobile ? 'mobile' : 'video') : aspectRatio;

  const aspectClasses: Record<string, string> = {
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    ultrawide: 'aspect-[21/9]',
    mobile: 'aspect-[9/19]'
  };

  if (imgSrc && !imageError) {
    return (
      <div className={`relative bg-black border border-shonen-border overflow-hidden group flex items-center justify-center ${className}`}>
        <img 
          src={imgSrc} 
          alt={label} 
          onError={() => setImageError(true)}
          className="w-full h-full object-contain p-1"
          referrerPolicy="no-referrer"
        />
        {/* Subtle scanline animation overlay even on images */}
        <div className="absolute inset-0 bg-scanlines opacity-20 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 block bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] opacity-0 group-hover:opacity-100 group-hover:animate-scanline mix-blend-overlay pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className={`relative bg-shonen-surface border border-shonen-border overflow-hidden group ${aspectClasses[effectiveRatio]} ${className}`}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-scanlines opacity-50 mix-blend-overlay"></div>
      
      {/* Viewport markers */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neutral-500 m-2 opacity-50"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neutral-500 m-2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neutral-500 m-2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neutral-500 m-2 opacity-50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <div className="border border-shonen-border bg-shonen-dark/80 px-4 py-2 font-mono text-xs text-neutral-400 capitalize tracking-widest backdrop-blur-sm group-hover:border-white group-hover:text-white transition-colors duration-500">
          [ SCREENSHOT_REQ // {label.replace(/\s+/g, '_').toUpperCase()} ]
        </div>
        <div className="mt-4 max-w-sm">
          <p className="font-mono text-[10px] text-neutral-600 leading-relaxed uppercase">
            AWAITING HIGH-RES ASSETS. UI WIREFRAME ALLOCATED FOR PREVIEW.
          </p>
        </div>
      </div>
      
      {/* Scanline animation overlay */}
      <div className="absolute inset-0 block bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10%] opacity-0 group-hover:opacity-100 group-hover:animate-scanline mix-blend-overlay pointer-events-none"></div>
    </div>
  );
}
