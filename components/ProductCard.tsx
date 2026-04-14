"use client";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "./CartContext";
import { useToast } from "./Toast";

const BG_MAP = {
  bg1: "linear-gradient(135deg,#f0e6d3,#e0d0b8)",
  bg2: "linear-gradient(135deg,#d3e8e0,#b8d8cc)",
  bg3: "linear-gradient(135deg,#e8d3d3,#d8b8b8)",
  bg4: "linear-gradient(135deg,#d3d8e8,#b8c4d8)",
};

interface Props {
  product: Product;
  onTryOn: (name: string) => void;
}

export default function ProductCard({ product, onTryOn }: Props) {
  const [wishlist, setWishlist] = useState(false);
  const { addItem, openCart } = useCart();
  const { show } = useToast();

  const handleAdd = () => {
    addItem({ name: product.name, brand: product.brand, price: product.price, emoji: product.emoji });
    show(`🛒 ${product.name} ditambahkan ke keranjang!`);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(!wishlist);
    if (!wishlist) show(`❤️ ${product.name} ditambahkan ke wishlist`);
    else show(`💔 Dihapus dari wishlist`);
  };

  return (
    <div onClick={handleAdd}
      className="rounded-2xl overflow-hidden cursor-pointer border transition-all duration-250 hover:-translate-y-1"
      style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>

      {/* Image */}
      <div className="relative h-48 flex items-center justify-center" style={{ background: BG_MAP[product.bg] }}>
        <span style={{ fontSize: 52 }}>{product.emoji}</span>
        <div className="absolute top-3 right-3 rounded-lg px-2 py-0.5 text-[10px] font-semibold text-white"
          style={{ background: "var(--accent2)" }}>{product.score}</div>
        <button onClick={e => { e.stopPropagation(); onTryOn(product.name); }}
          className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-lg px-3 py-1 text-[11px] font-medium border-none cursor-pointer"
          style={{ background: "rgba(255,255,255,0.92)", color: "var(--ink)" }}>
          👗 Coba Virtual
        </button>
      </div>

      {/* Info */}
      <div className="px-4 pt-3 pb-4">
        <p className="text-sm font-medium mb-1">{product.name}</p>
        <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>{product.brand}</p>
        <p className="text-[10px] mb-3" style={{ color: "var(--accent)" }}>🔥 {product.proof}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{product.price}</span>
          <button onClick={handleWishlist}
            className="rounded-lg px-2 py-1 text-base border transition-colors"
            style={{ background: wishlist ? "#fde8e0" : "none", borderColor: wishlist ? "var(--accent)" : "var(--border)", cursor: "pointer" }}>
            {wishlist ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}
