"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MoodShopping from "@/components/MoodShopping";
import LiveSection from "@/components/LiveSection";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToMood = () =>
    document.getElementById("mood-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <Navbar />
      <main>
        <Hero onShopClick={scrollToMood} />
        <Features />
        <MoodShopping />
        <LiveSection />
      </main>
      <Footer />
    </>
  );
}
