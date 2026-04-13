"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MoodShopping from "@/components/MoodShopping";
import LiveSection from "@/components/LiveSection";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

export default function Home() {
  const [cartCount, setCartCount] = useState(2);

  const addToCart = (_name: string) => setCartCount((c) => c + 1);

  const scrollToMood = () =>
    document.getElementById("mood-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <ToastProvider>
      <Navbar cartCount={cartCount} />
      <main>
        <Hero onShopClick={scrollToMood} />
        <Features />
        <MoodShopping onAddCart={addToCart} />
        <LiveSection />
      </main>
      <Footer />
    </ToastProvider>
  );
}
