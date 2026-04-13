"use client";
import { useState } from "react";
import { useToast } from "./Toast";

interface NavbarProps { cartCount: number }

export default function Navbar({ cartCount }: NavbarProps) {
  const [cartFlash, setCartFlash] = useState(false);
  const { show } = useToast();

  const handleCart = () => {
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 500);
    show("🛒 Buka keranjang belanja");
  };

  return (
    <nav className="flex items-center justify-between px-10 py-4 border-b sticky top-0 z-40"
      style={{ background: "var(--paper)", borderColor: "var(--border)" }}>
      {/* Logo */}
      <div className="font-display text-2xl font-semibold tracking-tight">
        Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 text-sm font-medium list-none" style={{ color: "var(--muted)" }}>
        {["Eksplorasi", "Koleksi", "Tentang Kami", "Blog"].map((l) => (
          <li key={l} className="cursor-pointer hover:text-[var(--ink)] transition-colors">{l}</li>
        ))}
      </ul>

      {/* Right */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Cari produk..."
          className="hidden md:block border rounded-2xl px-4 py-1.5 text-sm outline-none w-48 transition-colors"
          style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent2)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <button
          onClick={handleCart}
          className="flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-medium transition-colors"
          style={{ background: cartFlash ? "var(--accent2)" : "var(--ink)", color: "var(--paper)" }}>
          🛒 Keranjang
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {cartCount}
          </span>
        </button>
      </div>
    </nav>
  );
}
