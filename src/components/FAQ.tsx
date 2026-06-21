"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare } from 'lucide-react';

const faqs = [
  {
    question: "What exactly is ShonenX?",
    answer: "ShonenX is a minimalist, open-source client designed for tracking, reading, and watching anime and manga. It acts solely as a unified dashboard synced with tracking platforms like AniList and MyAnimeList. It ships with no content or sources out of the box."
  },
  {
    question: "How does the Extension Runtime Bridge work?",
    answer: "ShonenX leverages the AnymeX Extension Runtime Bridge to support third-party extensions (like those from Aniyomi or Mangayomi). The app itself is just an empty shell. Users must manually install extensions to parse external data. We do not host, serve, or distribute any copyrighted material."
  },
  {
    question: "Can I use or fork the open-source code?",
    answer: "Yes. The project is open-source under the Apache 2.0 License. You are free to inspect, fork, and compile the code yourself. We encourage contributions and transparency, as long as you adhere to the repository's licensing terms."
  },
  {
    question: "Is there telemetry or tracking?",
    answer: "Zero. ShonenX is built for privacy and performance. We do not track your usage, collect personal data, or serve ads. Your synced data stays between your device and the tracking platforms you connect to."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-shonen-dark border-b border-shonen-border relative overflow-hidden">
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
      
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-mono text-shonen-red text-sm tracking-widest uppercase mb-4 flex items-center justify-center gap-2">
            <MessageSquare size={14} />
            [ FREQUENTLY_ASKED ]
          </h2>
          <h3 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter shadow-black drop-shadow-lg">
            System <span className="text-neutral-600">Query.</span>
          </h3>
        </motion.div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#050505] border border-white/5 hover:border-shonen-red/50 transition-colors"
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <h4 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight pr-8">
                  {faq.question}
                </h4>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="shrink-0 text-shonen-red"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 border-t border-white/5 mt-2 font-mono text-neutral-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
