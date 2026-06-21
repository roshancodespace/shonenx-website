"use client";
const CACHE_PREFIX = 'shonenx_cache_';
const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

export async function fetchWithCache(url: string, options?: RequestInit) {
  const cacheKey = `${CACHE_PREFIX}${url}`;
  
  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      const { data, timestamp } = JSON.parse(cachedItem);
      const isExpired = Date.now() - timestamp > CACHE_DURATION;
      
      if (!isExpired) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Cache parsing error:', error);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
  } catch (error) {
    console.warn('Cache saving error:', error);
  }

  return data;
}
