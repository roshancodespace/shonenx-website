"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GitCommit, Tag, CornerDownRight, Loader2, ArrowLeft } from 'lucide-react';
import { fetchWithCache } from '../lib/fetchWithCache';
import Link from 'next/link';

interface ReleaseAsset {
  name: string;
  download_count: number;
  size: number;
}

interface Release {
  id: number;
  name: string;
  tag_name: string;
  prerelease: boolean;
  published_at: string;
  body: string;
  assets: ReleaseAsset[];
}

export function Changelogs() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithCache('https://api.github.com/repos/Darkx-dev/ShonenX/releases')
      .then(data => {
        if (Array.isArray(data)) {
          setReleases(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-shonen-dark pt-8 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-shonen-red hover:text-white font-mono text-sm uppercase tracking-wider mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="font-display font-bold text-5xl md:text-7xl uppercase tracking-tighter">
            Change<span className="text-neutral-500">logs</span>
          </h1>
          <p className="font-mono text-neutral-400 mt-6 max-w-2xl border-l border-shonen-border pl-4">
            Track the evolution of ShonenX. Stay up to date with the latest features, improvements, and bug fixes across all platforms.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="w-8 h-8 text-shonen-red animate-spin" />
          </div>
        ) : releases.length === 0 ? (
          <div className="text-center py-32 font-mono text-neutral-500">
            No releases found.
          </div>
        ) : (
          <div className="space-y-12">
            {releases.map((release, index) => (
              <motion.div 
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-12 border-l border-shonen-border"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[1.5px] rounded-full bg-shonen-dark border-2 border-shonen-red"></div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="font-display font-bold text-2xl md:text-4xl text-white">
                      {release.name || release.tag_name}
                    </h2>
                    {release.prerelease && (
                      <span className="bg-shonen-red/10 text-shonen-red border border-shonen-red/30 px-2 py-0.5 text-xs font-bold font-mono uppercase tracking-wider backdrop-blur-sm">
                        Pre-release
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-neutral-500">
                    <span className="flex items-center gap-1"><Tag size={12} /> {release.tag_name}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{new Date(release.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                <div className="prose prose-invert prose-shonen max-w-none font-mono text-sm text-neutral-300 leading-relaxed space-y-4">
                  {release.body ? (
                    release.body.split('\n').map((line, i) => {
                      if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                        return (
                          <div key={i} className="flex gap-3 mt-2">
                            <CornerDownRight size={14} className="text-shonen-red shrink-0 mt-1" />
                            <span>{line.replace(/^[-*]\s/, '')}</span>
                          </div>
                        );
                      } else if (line.trim().startsWith('##')) {
                        return <h3 key={i} className="text-white font-bold mt-6 mb-2">{line.replace(/^##\s/, '')}</h3>;
                      } else if (line.trim()) {
                        return <p key={i}>{line}</p>;
                      }
                      return null;
                    })
                  ) : (
                    <p className="italic text-neutral-500">No release notes provided.</p>
                  )}
                </div>

                {release.assets && release.assets.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {release.assets.map(asset => (
                      <div key={asset.name} className="flex items-center gap-2 bg-black border border-shonen-border px-3 py-1.5 text-xs font-mono text-neutral-400">
                        <GitCommit size={12} className="text-shonen-red" />
                        <span>{asset.name}</span>
                        <span className="text-neutral-600">({(asset.size / (1024 * 1024)).toFixed(1)}MB)</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
