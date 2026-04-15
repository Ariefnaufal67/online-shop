"use client";
import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { useToast } from "@/components/Toast";

const SEASONS = [
  { id: "new",     label: "New Arrivals",   icon: "✨", desc: "Koleksi paling baru, hadir setiap minggu" },
  { id: "best",    label: "Best Sellers",   icon: "🔥", desc: "Produk terfavorit komunitas NuvaShop" },
  { id: "summer",  label: "Summer Edit",    icon: "☀️", desc: "Ringan, cerah, dan nyaman di hari panas" },
  { id: "office",  label: "Office Ready",   icon: "💼", desc: "Tampil profesional setiap hari kerja" },
  { id: "casual",  label: "Weekend Vibes",  icon: "😌", desc: "Santai stylish untuk akhir pekan" },
  { id: "limited", label: "Limited Edition",icon: "💎", desc: "Edisi terbatas, stok sangat terbatas!" },
];

type Product = { name: string; brand: string; price: string; emoji: string; isNew?: boolean; limited?: boolean };

const COLLECTIONS: Record<string, Product[]> = {
  new: [
    { name: "Linen Co-ord Set Krem", brand: "Linen & Co",   price: "Rp 420.000", emoji: "👗", isNew: true },
    { name: "Bucket Hat Woven",      brand: "Street N",     price: "Rp 135.000", emoji: "🎩", isNew: true },
    { name: "Slip Dress Satin",      brand: "Nuva Studio",  price: "Rp 355.000", emoji: "👗", isNew: true },
    { name: "Knit Polo Shirt",       brand: "Soft Studio",  price: "Rp 265.000", emoji: "👕", isNew: true },
    { name: "Micro Bag Kulit",       brand: "Arkive",       price: "Rp 289.000", emoji: "👝", isNew: true },
    { name: "Mule Slide Anyaman",    brand: "Kaki Bebas",   price: "Rp 175.000", emoji: "🩴", isNew: true },
  ],
  best: [
    { name: "Oversized Hoodie",   brand: "Soft Studio",  price: "Rp 245.000", emoji: "👕" },
    { name: "Midi Dress Floral",  brand: "Bunga Studio", price: "Rp 329.000", emoji: "👗" },
    { name: "Power Blazer Hitam", brand: "Studio N",     price: "Rp 389.000", emoji: "🧥" },
    { name: "Tote Bag Premium",   brand: "Arkive",       price: "Rp 199.000", emoji: "👜" },
    { name: "Oxford Shoes",       brand: "Formal Step",  price: "Rp 365.000", emoji: "👞" },
    { name: "Cardigan Pastel",    brand: "Lembut & Co",  price: "Rp 215.000", emoji: "🧶" },
  ],
  summer: [
    { name: "Flowy Sundress",  brand: "Bunga Studio", price: "Rp 285.000", emoji: "👒" },
    { name: "Linen Shorts",    brand: "Linen & Co",   price: "Rp 175.000", emoji: "🩳" },
    { name: "Strappy Sandal",  brand: "Kaki Bebas",   price: "Rp 195.000", emoji: "🩴" },
    { name: "Straw Tote",      brand: "Rattan Chic",  price: "Rp 155.000", emoji: "🧺" },
    { name: "Crochet Top",     brand: "Nuva Studio",  price: "Rp 225.000", emoji: "👙" },
    { name: "UV Sunhat",       brand: "Petualang",    price: "Rp 119.000", emoji: "🎩" },
  ],
  office: [
    { name: "Blazer Structured",  brand: "Office Edit",  price: "Rp 420.000", emoji: "🧥" },
    { name: "Trousers Wide Leg",  brand: "Office Edit",  price: "Rp 289.000", emoji: "👖" },
    { name: "Kemeja Silk Cream",  brand: "Linen & Co",   price: "Rp 279.000", emoji: "👔" },
    { name: "Oxford Shoes",       brand: "Formal Step",  price: "Rp 365.000", emoji: "👞" },
    { name: "Totebag Kulit",      brand: "Arkive",       price: "Rp 339.000", emoji: "💼" },
    { name: "Midi Pencil Skirt",  brand: "Office Edit",  price: "Rp 245.000", emoji: "👗" },
  ],
  casual: [
    { name: "Oversized Hoodie",  brand: "Soft Studio",  price: "Rp 245.000", emoji: "👕" },
    { name: "Jogger Pants Cozy", brand: "Nuva Comfy",   price: "Rp 185.000", emoji: "👖" },
    { name: "Topi Canvas",       brand: "Daily Wear",   price: "Rp 99.000",  emoji: "🧢" },
    { name: "Sandal Rajut",      brand: "Kaki Bebas",   price: "Rp 129.000", emoji: "🩴" },
    { name: "Mini Crossbody",    brand: "Arkive",       price: "Rp 165.000", emoji: "👜" },
    { name: "Kaos Graphic Print",brand: "Street N",     price: "Rp 145.000", emoji: "👕" },
  ],
  limited: [
    { name: "Printed Co-ord Set",   brand: "Nuva Studio",  price: "Rp 599.000", emoji: "🎨", limited: true },
    { name: "Hand-dyed Jacket",     brand: "Arkive",       price: "Rp 789.000", emoji: "🧥", limited: true },
    { name: "Artisan Leather Bag",  brand: "Arkive",       price: "Rp 850.000", emoji: "👜", limited: true },
    { name: "Embroidered Dress",    brand: "Bunga Studio", price: "Rp 680.000", emoji: "👗", limited: true },
    { name: "Crystal Earring Set",  brand: "Perhiasan N",  price: "Rp 245.000", emoji: "💎", limited: true },
    { name: "Woven Platform Mule",  brand: "Kaki Bebas",   price: "Rp 420.000", emoji: "👠", limited: true },
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

function ProductTile({ p, bg, featured }: { p: Product; bg: string; featured?: boolean }) {
  const { addItem, openCart } = useCart();
  const { show } = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ name: p.name, brand: p.brand, price: p.price, emoji: p.emoji });
    show(`🛒 ${p.name} ditambahkan ke keranjang!`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    openCart();
  };

  return (
    <div className="rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1 group"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}
      onClick={handleAdd}>

      {/* Image area */}
      <div className={`flex items-center justify-center relative ${featured ? "h-64" : "h-36"}`}
        style={{ background: bg }}>
        <span style={{ fontSize: featured ? 80 : 44 }}>{p.emoji}</span>

        {/* Badge */}
        {(p.isNew || p.limited) && (
          <span className="absolute top-2 left-2 text-[9px] font-bold px-2 py-0.5 rounded-md text-white"
            style={{ background: p.limited ? "#8b3daf" : "var(--accent2)" }}>
            {p.limited ? "LIMITED" : "BARU"}
          </span>
        )}

        {/* Add to cart overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(14,12,10,0.18)" }}>
          <span className="rounded-2xl px-4 py-2 text-xs font-medium text-white"
            style={{ background: added ? "var(--accent2)" : "var(--accent)" }}>
            {added ? "✓ Ditambahkan!" : "+ Keranjang"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className={`font-medium truncate ${featured ? "text-sm" : "text-xs"}`}>{p.name}</p>
        <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{p.brand}</p>
        <div className="flex items-center justify-between mt-2">
          <p className={`font-medium ${featured ? "text-sm" : "text-sm"}`}>{p.price}</p>
          <button
            onClick={handleAdd}
            className="rounded-xl px-3 py-1 text-xs font-medium text-white transition-colors"
            style={{ background: added ? "var(--accent2)" : "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            {added ? "✓" : "+ Keranjang"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KoleksiClient() {
  const [active, setActive] = useState("new");
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
              className="flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                borderBottom: `2px solid ${active === s.id ? "var(--accent)" : "transparent"}`,
                color: active === s.id ? "var(--ink)" : "var(--muted)",
                background: "none",
                cursor: "pointer", fontFamily: "inherit",
              }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display font-light mb-1" style={{ fontSize: 28 }}>{season.icon} {season.label}</h2>
            <p className="text-sm" style={{ color: "var(--muted)" }}>{season.desc}</p>
          </div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{products.length} item — klik produk untuk tambah ke keranjang</p>
        </div>

        {/* Featured + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Featured big */}
          <div className="lg:col-span-1">
            <ProductTile p={products[0]} bg={BG_LIST[0]} featured />
          </div>
          {/* Rest */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.slice(1).map((p, i) => (
              <ProductTile key={p.name} p={p} bg={BG_LIST[(i + 1) % 6]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
