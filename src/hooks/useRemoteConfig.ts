"use client";
import { useState, useEffect } from 'react';
import { fetchWithCache } from '../lib/fetchWithCache';

export interface WebsiteAnnouncement {
  id: number;
  enabled: boolean;
  title: string;
  message: string;
  type: string;
}

export interface RemoteConfig {
  downloadsEnabled: boolean;
  announcements?: {
    website?: WebsiteAnnouncement[];
  };
}

export function useRemoteConfig() {
  const [config, setConfig] = useState<RemoteConfig | null>(null);

  useEffect(() => {
    fetchWithCache('https://raw.githubusercontent.com/roshancodespace/shonenx-config/refs/heads/main/remote_config.json')
      .then((data: any) => {
        if (data) {
          setConfig(data);
        }
      })
      .catch((err: any) => {
        console.error("Failed to fetch remote config", err);
      });
  }, []);

  return config;
}
