"use client";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/Toast";

const CATEGORIES = ["Semua", "Atasan", "Bawahan", "Dress", "Outerwear", "Sepatu", "Aksesori"];
const FILTERS = [
  { label: "Harga", options: ["< Rp 100rb", "Rp 100–250rb", "Rp 250–500rb", "> Rp 500rb"] },
  { label: "Ukuran", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  { label: "Warna", options: ["Netral", "Pastel", "Bold", "Monokrom", "Earthy"] },
];

const ALL_PRODUCTS = [
  { name: "Power Blazer Hitam", brand: "Studio N", price: "Rp 389.000", emoji: "🧥", cat: "Outerwear", tag: "Terlaris", score: 97 },
  { name: "Midi Dress Floral", brand: "Bunga Studio", price: "Rp 329.000", emoji: "👗", cat: "Dress", tag: "Baru", score: 99 },
  { name: "Oversized Hoodie", brand: "Soft Studio", price: "Rp 245.000", emoji: "👕", cat: "Atasan", tag: "Favorit", score: 98 },
  { name: "Trousers Wide Leg", brand: "Office Edit", price: "Rp 289.000", emoji: "👖", cat: "Bawahan", tag: "Baru", score: 93 },
  { name: "Platform Sneakers", brand: "Kaki Bebas", price: "Rp 299.000", emoji: "👟", cat: "Sepatu", tag: "Viral", score: 93 },
  { name: "Statement Earrings", brand: "Perhiasan N", price: "Rp 89.000", emoji: "💎", cat: "Aksesori", tag: "Murah", score: 91 },
  { name: "Hiking Vest", brand: "Rimba Co", price: "Rp 345.000", emoji: "🦺", cat: "Outerwear", tag: "Baru", score: 96 },
  { name: "Heels Statement", brand: "Nuva Footwear", price: "Rp 259.000", emoji: "👠", cat: "Sepatu", tag: "Terlaris", score: 94 },
  { name: "Cardigan Pastel", brand: "Lembut & Co", price: "Rp 215.000", emoji: "🧶", cat: "Atasan", tag: "Baru", score: 95 },
  { name: "Kemeja Silk Cream", brand: "Linen & Co", price: "Rp 279.000", emoji: "👔", cat: "Atasan", tag: "Klasik", score: 89 },
  { name: "Celana Cargo", brand: "Rimba Co", price: "Rp 299.000", emoji: "👖", cat: "Bawahan", tag: "Baru", score: 87 },
  { name: "Tote Bag Premium", brand: "Arkive", price: "Rp 199.000", emoji: "👜", cat: "Aksesori", tag: "Favorit", score: 91 },
];

const TAG_COLORS: Record<string, string> = {
  Terlaris: "#c8502a", Baru: "#2a7c6f", Viral: "#8b3daf",
  Favorit: "#b8962e", Murah: "#2a5c8f", Klasik: "#7a7060",
};
const BG_LIST = [
  "linear-gradient(135deg,#f0e6d3,#e0d0b8)",
  "linear-gradient(135deg,#d3e8e0,#b8d8cc)",
  "linear-gradient(135deg,#e8d3d3,#d8b8b8)",
  "linear-gradient(135deg,#d3d8e8,#b8c4d8)",
];

export default function EksplorasiClient() {
  const [activeCat, setActiveCat] = useState("Semua");
  const [sort, setSort] = useState("Relevan");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const { addItem, openCart } = useCart();
  const { show } = useToast();

  const filtered = ALL_PRODUCTS.filter(p => activeCat === "Semua" || p.cat === activeCat);
  const sorted = [...filtered].sort((a, b) =>
    sort === "Skor Tertinggi" ? b.score - a.score :
    sort === "Harga Terendah" ? parseInt(a.price.replace(/\D/g,"")) - parseInt(b.price.replace(/\D/g,"")) :
    sort === "Harga Tertinggi" ? parseInt(b.price.replace(/\D/g,"")) - parseInt(a.price.replace(/\D/g,"")) : 0
  );

  const handleAdd = (p: typeof ALL_PRODUCTS[0]) => {
    addItem({ name: p.name, brand: p.brand, price: p.price, emoji: p.emoji });
    show(`🛒 ${p.name} ditambahkan ke keranjang!`);
    openCart();
  };

  const toggleWish = (name: string) => {
    const s = new Set(wishlist);
    if (s.has(name)) { s.delete(name); show("💔 Dihapus dari wishlist"); }
    else { s.add(name); show(`❤️ ${name} ditambahkan ke wishlist`); }
    setWishlist(s);
  };

  return (
    <div style={{ minHeight: "80vh" }}>
      <div className="px-10 py-14 border-b" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>✦ Jelajahi Semua</p>
        <h1 className="font-display font-light mb-3" style={{ fontSize: 46 }}>Eksplorasi Koleksi</h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", maxWidth: 480 }}>
          Temukan ribuan produk fashion terkurasi — disaring oleh AI sesuai selera dan gaya hidupmu.
        </p>
      </div>

      <div className="flex">
        <aside className="hidden lg:block w-56 flex-shrink-0 border-r px-6 py-8 sticky top-16 self-start"
          style={{ borderColor: "var(--border)", minHeight: "calc(100vh - 64px)" }}>
          <p className="text-xs font-medium tracking-widest uppercase mb-5" style={{ color: "var(--muted)" }}>Filter</p>
          {FILTERS.map(f => (
            <div key={f.label} className="mb-7">
              <p className="text-sm font-medium mb-3">{f.label}</p>
              <div className="flex flex-col gap-2">
                {f.options.map(opt => (
                  <label key={opt} className="flex items-center gap-2 text-xs cursor-pointer" style={{ color: "var(--muted)" }}>
                    <input type="checkbox" style={{ accentColor: "var(--accent)" }} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <div className="flex-1 px-6 py-8">
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setActiveCat(c)}
                className="rounded-full px-4 py-1.5 text-sm border transition-all"
                style={{
                  background: activeCat === c ? "var(--ink)" : "var(--card-bg)",
                  color: activeCat === c ? "var(--paper)" : "var(--ink)",
                  borderColor: activeCat === c ? "var(--ink)" : "var(--border)",
                  fontFamily: "inherit", cursor: "pointer",
                }}>
                {c}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs" style={{ color: "var(--muted)" }}>Urutkan:</span>
              <select value={sort} onChange={e => setSort(e.target.value)}
                className="text-xs border rounded-xl px-3 py-1.5 outline-none"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)", color: "var(--ink)", fontFamily: "inherit" }}>
                {["Relevan","Skor Tertinggi","Harga Terendah","Harga Tertinggi"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <p className="text-xs mb-5" style={{ color: "var(--muted)" }}>{sorted.length} produk ditemukan</p>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((p, i) => (
              <div key={p.name} className="rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1"
                style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
                onClick={() => handleAdd(p)}>
                <div className="relative h-40 flex items-center justify-center" style={{ background: BG_LIST[i % 4] }}>
                  <span style={{ fontSize: 44 }}>{p.emoji}</span>
                  <span className="absolute top-2 left-2 text-white text-[9px] font-bold px-2 py-0.5 rounded-md"
                    style={{ background: TAG_COLORS[p.tag] || "var(--muted)" }}>{p.tag}</span>
                  <span className="absolute top-2 right-2 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md"
                    style={{ background: "var(--accent2)" }}>{p.score}%</span>
                </div>
                <div className="px-3 py-3">
                  <p className="text-xs font-medium mb-0.5 truncate">{p.name}</p>
                  <p className="text-[10px] mb-2" style={{ color: "var(--muted)" }}>{p.brand} · {p.cat}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{p.price}</span>
                    <button onClick={e => { e.stopPropagation(); toggleWish(p.name); }}
                      className="rounded-lg px-2 py-0.5 text-sm border"
                      style={{ background: wishlist.has(p.name) ? "#fde8e0" : "none", borderColor: wishlist.has(p.name) ? "var(--accent)" : "var(--border)", cursor: "pointer" }}>
                      {wishlist.has(p.name) ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
