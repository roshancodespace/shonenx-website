import { Metadata } from 'next';
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { FAQ } from "../components/FAQ";
import { Downloads } from "../components/Downloads";
import { Ticker } from "../components/Ticker";
import { TreeShowcase } from "../components/TreeShowcase";
import { Disclaimer } from "../components/Disclaimer";

export const metadata: Metadata = {
  title: "ShonenX | Minimalist Anime & Manga Client",
  description: "An open-source, extensible dashboard for tracking, reading, and watching anime and manga.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <TreeShowcase />
      <Features />
      <FAQ />
      <Downloads />
      <Disclaimer />
    </>
  );
}
