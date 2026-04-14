"use client";
import { useState, useEffect, useRef } from "react";
import { useCart } from "./CartContext";
import { useToast } from "./Toast";

// Flatten semua produk untuk search
const ALL = [
  { name: "Power Blazer Hitam", brand: "Studio N", price: "Rp 389.000", emoji: "🧥", cat: "Outerwear" },
  { name: "Heels Statement", brand: "Nuva Footwear", price: "Rp 259.000", emoji: "👠", cat: "Sepatu" },
  { name: "Tote Bag Premium", brand: "Arkive", price: "Rp 199.000", emoji: "👜", cat: "Aksesori" },
  { name: "Kemeja Silk Cream", brand: "Linen & Co", price: "Rp 279.000", emoji: "👔", cat: "Atasan" },
  { name: "Oversized Hoodie", brand: "Soft Studio", price: "Rp 245.000", emoji: "👕", cat: "Atasan" },
  { name: "Jogger Pants Cozy", brand: "Nuva Comfy", price: "Rp 185.000", emoji: "👖", cat: "Bawahan" },
  { name: "Sandal Rajut", brand: "Kaki Bebas", price: "Rp 129.000", emoji: "🩴", cat: "Sepatu" },
  { name: "Topi Canvas", brand: "Daily Wear", price: "Rp 99.000", emoji: "🧢", cat: "Aksesori" },
  { name: "Hiking Vest", brand: "Rimba Co", price: "Rp 345.000", emoji: "🦺", cat: "Outerwear" },
  { name: "Sepatu Trail", brand: "Langkah Alam", price: "Rp 485.000", emoji: "👟", cat: "Sepatu" },
  { name: "Midi Dress Floral", brand: "Bunga Studio", price: "Rp 329.000", emoji: "👗", cat: "Dress" },
  { name: "Cardigan Pastel", brand: "Lembut & Co", price: "Rp 215.000", emoji: "🧶", cat: "Atasan" },
  { name: "Flat Mules Nude", brand: "Nuva Footwear", price: "Rp 219.000", emoji: "🩰", cat: "Sepatu" },
  { name: "Blazer Structured", brand: "Office Edit", price: "Rp 420.000", emoji: "🧥", cat: "Outerwear" },
  { name: "Trousers Wide Leg", brand: "Office Edit", price: "Rp 289.000", emoji: "👖", cat: "Bawahan" },
  { name: "Oxford Shoes", brand: "Formal Step", price: "Rp 365.000", emoji: "👞", cat: "Sepatu" },
  { name: "Printed Co-ord Set", brand: "Nuva Studio", price: "Rp 359.000", emoji: "🎨", cat: "Dress" },
  { name: "Platform Sneakers", brand: "Kaki Bebas", price: "Rp 299.000", emoji: "👟", cat: "Sepatu" },
  { name: "Statement Earrings", brand: "Perhiasan N", price: "Rp 89.000", emoji: "💎", cat: "Aksesori" },
  { name: "Totebag Kulit", brand: "Arkive", price: "Rp 339.000", emoji: "💼", cat: "Aksesori" },
  { name: "Celana Cargo", brand: "Rimba Co", price: "Rp 299.000", emoji: "👖", cat: "Bawahan" },
  { name: "Tas Wicker Mini", brand: "Rattan Chic", price: "Rp 175.000", emoji: "🧺", cat: "Aksesori" },
];

const SUGGESTIONS = ["blazer", "dress", "hoodie", "sepatu", "tas", "celana", "aksesori"];

interface Props { isOpen: boolean; onClose: () => void }

export default function SearchModal({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addItem, openCart } = useCart();
  const { show } = useToast();

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 100);
    else setQuery("");
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); isOpen ? onClose() : null; }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const results = query.length >= 1
    ? ALL.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.cat.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleAdd = (p: typeof ALL[0]) => {
    addItem({ name: p.name, brand: p.brand, price: p.price, emoji: p.emoji });
    show(`🛒 ${p.name} ditambahkan ke keranjang!`);
    onClose();
    openCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
      style={{ background: "rgba(14,12,10,0.5)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>

      <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
        style={{ background: "var(--paper)", border: "1px solid var(--border)" }}>

        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          <span style={{ fontSize: 18, color: "var(--muted)" }}>🔍</span>
          <input ref={inputRef} type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Cari produk, brand, kategori..."
            className="flex-1 outline-none text-sm bg-transparent"
            style={{ color: "var(--ink)", fontFamily: "inherit" }} />
          {query && (
            <button onClick={() => setQuery("")}
              style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}>
              ✕
            </button>
          )}
          <kbd className="hidden sm:block text-xs px-2 py-0.5 rounded border"
            style={{ background: "var(--cream)", borderColor: "var(--border)", color: "var(--muted)" }}>
            ESC
          </kbd>
        </div>

        {/* Results / Suggestions */}
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          {query === "" && (
            <div className="px-5 py-4">
              <p className="text-xs font-medium mb-3 tracking-wide uppercase" style={{ color: "var(--muted)" }}>
                Pencarian Populer
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => setQuery(s)}
                    className="rounded-full px-3 py-1.5 text-xs border transition-colors"
                    style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)", cursor: "pointer", fontFamily: "inherit" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query !== "" && results.length === 0 && (
            <div className="px-5 py-10 text-center">
              <span style={{ fontSize: 36 }}>🔍</span>
              <p className="font-display font-light mt-3 mb-1" style={{ fontSize: 18 }}>Tidak ditemukan</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>Coba kata kunci lain</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              <p className="text-xs px-5 py-2 font-medium tracking-wide uppercase" style={{ color: "var(--muted)" }}>
                {results.length} Produk Ditemukan
              </p>
              {results.map(p => (
                <div key={p.name}
                  className="flex items-center gap-4 px-5 py-3 cursor-pointer transition-colors group"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--cream)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--cream)", fontSize: 24 }}>
                    {p.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{p.brand} · {p.cat}</p>
                  </div>

                  <div className="text-right flex-shrink-0 flex flex-col items-end gap-1.5">
                    <p className="text-sm font-medium">{p.price}</p>
                    <button onClick={() => handleAdd(p)}
                      className="rounded-xl px-3 py-1 text-xs font-medium text-white transition-colors"
                      style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                      + Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-5 py-3 border-t flex items-center gap-4 text-xs" style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--cream)" }}>
          <span>↵ untuk tambah ke keranjang</span>
          <span>ESC untuk tutup</span>
        </div>
      </div>
    </div>
  );
}
