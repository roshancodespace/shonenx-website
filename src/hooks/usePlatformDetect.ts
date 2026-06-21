"use client";
import { useState, useEffect } from 'react';

export type Platform = 'android' | 'ios' | 'windows' | 'mac' | 'linux' | 'unknown';

export function usePlatformDetect() {
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('android')) {
      setPlatform('android');
      setIsMobile(true);
    } else if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) {
      setPlatform('ios');
      setIsMobile(true);
    } else if (ua.includes('win')) {
      setPlatform('windows');
      setIsMobile(false);
    } else if (ua.includes('mac')) {
      setPlatform('mac');
      setIsMobile(false);
    } else if (ua.includes('linux')) {
      setPlatform('linux');
      setIsMobile(false);
    } else {
      setPlatform('unknown');
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  return { platform, isMobile };
}
