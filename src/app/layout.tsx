import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Announcements } from "../components/Announcements";
import "../index.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "ShonenX | Minimalist Anime & Manga Client",
  description: "An open-source, extensible dashboard for tracking, reading, and watching anime and manga across multiple platforms securely and privately.",
  keywords: "shonenx, anime, manga, tracking, AniList, MyAnimeList, open-source, reader, video player",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen bg-shonen-dark text-white font-sans selection:bg-shonen-red selection:text-black antialiased flex flex-col`}>
        <Header />
        <main className="flex-1 pt-24 md:pt-28">
          <Announcements />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
