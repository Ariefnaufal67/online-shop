"use client";
import { useState } from "react";
import { useToast } from "@/components/Toast";

const SEASONS = [
  { id: "new", label: "New Arrivals", icon: "✨", desc: "Koleksi paling baru, hadir setiap minggu" },
  { id: "best", label: "Best Sellers", icon: "🔥", desc: "Produk terfavorit komunitas NuvaShop" },
  { id: "summer", label: "Summer Edit", icon: "☀️", desc: "Ringan, cerah, dan nyaman di hari panas" },
  { id: "office", label: "Office Ready", icon: "💼", desc: "Tampil profesional setiap hari kerja" },
  { id: "casual", label: "Weekend Vibes", icon: "😌", desc: "Santai stylish untuk akhir pekan" },
  { id: "limited", label: "Limited Edition", icon: "💎", desc: "Edisi terbatas, stok sangat terbatas!" },
];

const COLLECTIONS: Record<string, { name: string; brand: string; price: string; emoji: string; isNew?: boolean; limited?: boolean }[]> = {
  new: [
    { name: "Linen Co-ord Set Krem", brand: "Linen & Co", price: "Rp 420.000", emoji: "👗", isNew: true },
    { name: "Bucket Hat Woven", brand: "Street N", price: "Rp 135.000", emoji: "🎩", isNew: true },
    { name: "Slip Dress Satin", brand: "Nuva Studio", price: "Rp 355.000", emoji: "👗", isNew: true },
    { name: "Knit Polo Shirt", brand: "Soft Studio", price: "Rp 265.000", emoji: "👕", isNew: true },
    { name: "Micro Bag Kulit", brand: "Arkive", price: "Rp 289.000", emoji: "👝", isNew: true },
    { name: "Mule Slide Anyaman", brand: "Kaki Bebas", price: "Rp 175.000", emoji: "🩴", isNew: true },
  ],
  best: [
    { name: "Oversized Hoodie", brand: "Soft Studio", price: "Rp 245.000", emoji: "👕" },
    { name: "Midi Dress Floral", brand: "Bunga Studio", price: "Rp 329.000", emoji: "👗" },
    { name: "Power Blazer Hitam", brand: "Studio N", price: "Rp 389.000", emoji: "🧥" },
    { name: "Tote Bag Premium", brand: "Arkive", price: "Rp 199.000", emoji: "👜" },
    { name: "Oxford Shoes", brand: "Formal Step", price: "Rp 365.000", emoji: "👞" },
    { name: "Cardigan Pastel", brand: "Lembut & Co", price: "Rp 215.000", emoji: "🧶" },
  ],
  summer: [
    { name: "Flowy Sundress", brand: "Bunga Studio", price: "Rp 285.000", emoji: "👒" },
    { name: "Linen Shorts", brand: "Linen & Co", price: "Rp 175.000", emoji: "🩳" },
    { name: "Strappy Sandal", brand: "Kaki Bebas", price: "Rp 195.000", emoji: "🩴" },
    { name: "Straw Tote", brand: "Rattan Chic", price: "Rp 155.000", emoji: "🧺" },
    { name: "Crochet Top", brand: "Nuva Studio", price: "Rp 225.000", emoji: "👙" },
    { name: "UV Sunhat", brand: "Petualang", price: "Rp 119.000", emoji: "🎩" },
  ],
  office: [
    { name: "Blazer Structured", brand: "Office Edit", price: "Rp 420.000", emoji: "🧥" },
    { name: "Trousers Wide Leg", brand: "Office Edit", price: "Rp 289.000", emoji: "👖" },
    { name: "Kemeja Silk Cream", brand: "Linen & Co", price: "Rp 279.000", emoji: "👔" },
    { name: "Oxford Shoes", brand: "Formal Step", price: "Rp 365.000", emoji: "👞" },
    { name: "Totebag Kulit", brand: "Arkive", price: "Rp 339.000", emoji: "💼" },
    { name: "Midi Pencil Skirt", brand: "Office Edit", price: "Rp 245.000", emoji: "👗" },
  ],
  casual: [
    { name: "Oversized Hoodie", brand: "Soft Studio", price: "Rp 245.000", emoji: "👕" },
    { name: "Jogger Pants Cozy", brand: "Nuva Comfy", price: "Rp 185.000", emoji: "👖" },
    { name: "Topi Canvas", brand: "Daily Wear", price: "Rp 99.000", emoji: "🧢" },
    { name: "Sandal Rajut", brand: "Kaki Bebas", price: "Rp 129.000", emoji: "🩴" },
    { name: "Mini Crossbody", brand: "Arkive", price: "Rp 165.000", emoji: "👜" },
    { name: "Kaos Graphic Print", brand: "Street N", price: "Rp 145.000", emoji: "👕" },
  ],
  limited: [
    { name: "Printed Co-ord Set", brand: "Nuva Studio", price: "Rp 599.000", emoji: "🎨", limited: true },
    { name: "Hand-dyed Jacket", brand: "Arkive", price: "Rp 789.000", emoji: "🧥", limited: true },
    { name: "Artisan Leather Bag", brand: "Arkive", price: "Rp 850.000", emoji: "👜", limited: true },
    { name: "Embroidered Dress", brand: "Bunga Studio", price: "Rp 680.000", emoji: "👗", limited: true },
    { name: "Crystal Earring Set", brand: "Perhiasan N", price: "Rp 245.000", emoji: "💎", limited: true },
    { name: "Woven Platform Mule", brand: "Kaki Bebas", price: "Rp 420.000", emoji: "👠", limited: true },
  ],
};

const BG_LIST = [
  "linear-gradient(135deg,#f0e6d3,#e0d0b8)",
  "linear-gradient(135deg,#d3e8e0,#b8d8cc)",
  "linear-gradient(135deg,#e8d3d3,#d8b8b8)",
  "linear-gradient(135deg,#d3d8e8,#b8c4d8)",
  "linear-gradient(135deg,#e8e6d3,#d8d4b8)",
  "linear-gradient(135deg,#e0d3e8,#c8b8d8)",
];

export default function KoleksiClient() {
  const [active, setActive] = useState("new");
  const { show } = useToast();
  const products = COLLECTIONS[active] || [];
  const season = SEASONS.find(s => s.id === active)!;

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Header */}
      <div className="px-10 py-14 border-b" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>✦ Koleksi Pilihan</p>
        <h1 className="font-display font-light mb-3" style={{ fontSize: 46 }}>Koleksi NuvaShop</h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Dikurasi dengan cermat oleh tim stylist dan AI kami.</p>
      </div>

      {/* Season Tabs */}
      <div className="border-b overflow-x-auto" style={{ borderColor: "var(--border)" }}>
        <div className="flex px-10 min-w-max">
          {SEASONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className="flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap"
              style={{
                borderBottomColor: active === s.id ? "var(--accent)" : "transparent",
                color: active === s.id ? "var(--ink)" : "var(--muted)",
                background: "none", border: "none",
                borderBottom: `2px solid ${active === s.id ? "var(--accent)" : "transparent"}`,
                cursor: "pointer", fontFamily: "inherit",
              }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-10">
        {/* Collection intro */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-light mb-1" style={{ fontSize: 28 }}>{season.icon} {season.label}</h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{season.desc}</p>
          </div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{products.length} item</p>
        </div>

        {/* Featured large card + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Big featured */}
          <div className="lg:col-span-1 rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1"
            style={{ background: BG_LIST[0], borderColor: "var(--border)", minHeight: 360 }}
            onClick={() => show(`🛒 ${products[0]?.name} ditambahkan!`)}>
            <div className="h-64 flex items-center justify-center" style={{ background: BG_LIST[0] }}>
              <span style={{ fontSize: 80 }}>{products[0]?.emoji}</span>
            </div>
            <div className="p-5" style={{ background: "var(--card-bg)" }}>
              {(products[0]?.isNew || products[0]?.limited) && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white mr-2"
                  style={{ background: products[0]?.limited ? "#8b3daf" : "var(--accent2)" }}>
                  {products[0]?.limited ? "LIMITED" : "BARU"}
                </span>
              )}
              <p className="font-medium text-sm mt-2">{products[0]?.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{products[0]?.brand}</p>
              <p className="font-medium text-sm mt-2">{products[0]?.price}</p>
            </div>
          </div>

          {/* Remaining grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.slice(1).map((p, i) => (
              <div key={p.name} className="rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1"
                style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
                onClick={() => show(`🛒 ${p.name} ditambahkan!`)}>
                <div className="h-36 flex items-center justify-center" style={{ background: BG_LIST[(i + 1) % 6] }}>
                  <span style={{ fontSize: 44 }}>{p.emoji}</span>
                </div>
                <div className="px-3 py-3">
                  {(p.isNew || p.limited) && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                      style={{ background: p.limited ? "#8b3daf" : "var(--accent2)" }}>
                      {p.limited ? "LIMITED" : "BARU"}
                    </span>
                  )}
                  <p className="text-xs font-medium mt-1 truncate">{p.name}</p>
                  <p className="text-[10px]" style={{ color: "var(--muted)" }}>{p.brand}</p>
                  <p className="text-sm font-medium mt-1">{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-8 border-t" style={{ borderColor: "var(--border)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>Tampilkan semua produk dari koleksi ini</p>
          <button className="rounded-2xl px-8 py-3 text-sm font-medium text-white"
            style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => show("🔄 Memuat lebih banyak produk...")}>
            Lihat Semua {season.label}
          </button>
        </div>
      </div>
    </div>
  );
}
