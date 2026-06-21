"use client";
import React, { useState, useEffect } from 'react';
import { useRemoteConfig } from '../hooks/useRemoteConfig';
import { AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { OPEN_ANNOUNCEMENTS, CLOSE_ANNOUNCEMENTS } from '../lib/events';

export function Announcements() {
  const config = useRemoteConfig();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener(OPEN_ANNOUNCEMENTS, handleOpen);
    window.addEventListener(CLOSE_ANNOUNCEMENTS, handleClose);

    return () => {
      window.removeEventListener(OPEN_ANNOUNCEMENTS, handleOpen);
      window.removeEventListener(CLOSE_ANNOUNCEMENTS, handleClose);
    };
  }, []);

  if (!config) return null;

  const websiteAnnouncements = config.announcements?.website?.filter(a => a.enabled) || [];

  if (websiteAnnouncements.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-4 md:right-8 z-50 flex flex-col gap-4 max-w-[calc(100vw-2rem)] md:max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {isOpen && websiteAnnouncements.map((announcement, idx) => (
          <motion.div
            key={announcement.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ delay: idx * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto border flex gap-4 p-5 shadow-2xl backdrop-blur-xl relative ${
              announcement.type === 'warning' 
                ? 'bg-shonen-red/10 border-shonen-red/50 text-white' 
                : 'bg-blue-900/40 border-blue-500/50 text-white'
            }`}
          >
            <div className="absolute inset-0 bg-black/60 -z-10 backdrop-blur-md"></div>
            <div className="shrink-0 mt-0.5 pointer-events-none">
              {announcement.type === 'warning' ? <AlertTriangle size={20} className="text-shonen-red" /> : <Info size={20} className="text-blue-400" />}
            </div>
            <div className="flex flex-col gap-1 pr-6 flex-1">
              <h4 className="font-display font-bold text-lg uppercase tracking-wider">{announcement.title}</h4>
              <p className="font-mono text-xs text-neutral-300 leading-relaxed">
                {announcement.message}
              </p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors pointer-events-auto"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
