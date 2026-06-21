"use client";
import { useState, useEffect } from 'react';
import { fetchWithCache } from '../lib/fetchWithCache';

export function useTotalDownloads() {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    fetchWithCache('https://api.github.com/repos/Darkx-dev/ShonenX/releases')
      .then((data: any[]) => {
        if (Array.isArray(data)) {
          const total = data.reduce((acc, release) => acc + (release.assets || []).reduce((sum: number, asset: any) => sum + (asset.download_count || 0), 0), 0);
          setDownloads(total);
        }
      })
      .catch(err => {
        console.error("Failed to fetch downloads", err);
      });
  }, []);

  return downloads;
}
