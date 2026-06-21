"use client";
export const OPEN_ANNOUNCEMENTS = 'shonenx:open_announcements';
export const CLOSE_ANNOUNCEMENTS = 'shonenx:close_announcements';

export const openAnnouncements = () => window.dispatchEvent(new Event(OPEN_ANNOUNCEMENTS));
export const closeAnnouncements = () => window.dispatchEvent(new Event(CLOSE_ANNOUNCEMENTS));
