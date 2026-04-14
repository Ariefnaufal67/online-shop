"use client";
import { useState } from "react";
import { MOODS, PRODUCTS, Mood } from "@/data/products";
import ProductCard from "./ProductCard";
import VirtualFitModal from "./VirtualFitModal";

export default function MoodShopping() {
  const [mood, setMood] = useState<Mood>("Percaya Diri");
  const [fitProduct, setFitProduct] = useState<string | null>(null);

  return (
    <section id="mood-section" className="px-10 py-14 border-t border-b"
      style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
      <h2 className="font-display font-light mb-2" style={{ fontSize: 32 }}>Hari ini, kamu merasa...</h2>
      <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>Pilih mood kamu dan lihat koleksi yang cocok untukmu</p>

      <div className="flex flex-wrap gap-2.5 mb-9">
        {MOODS.map(({ label, icon }) => (
          <button key={label} onClick={() => setMood(label)}
            className="flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm border transition-all"
            style={{
              background: mood === label ? "var(--ink)" : "var(--card-bg)",
              color: mood === label ? "var(--paper)" : "var(--ink)",
              borderColor: mood === label ? "var(--ink)" : "var(--border)",
              fontFamily: "inherit", cursor: "pointer",
            }}>
            {icon} {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PRODUCTS[mood].map(p => (
          <ProductCard key={p.name} product={p} onTryOn={setFitProduct} />
        ))}
      </div>

      {fitProduct && <VirtualFitModal productName={fitProduct} onClose={() => setFitProduct(null)} />}
    </section>
  );
}
