"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";
import { useReviews } from "@/components/ReviewContext";
import { useToast } from "@/components/Toast";

const BG_MAP: Record<string, string> = {
  bg1: "linear-gradient(135deg,#f0e6d3,#e0d0b8)",
  bg2: "linear-gradient(135deg,#d3e8e0,#b8d8cc)",
  bg3: "linear-gradient(135deg,#e8d3d3,#d8b8b8)",
  bg4: "linear-gradient(135deg,#d3d8e8,#b8c4d8)",
};

const ALL_PRODUCTS: Record<string, {
  name: string; brand: string; price: number; emoji: string; bg: string;
  score: number; desc: string; sizes: string[]; colors: string[]; details: string[];
}> = {
  "power-blazer-hitam": {
    name: "Power Blazer Hitam", brand: "Studio N", price: 389000, emoji: "🧥", bg: "bg1", score: 97,
    desc: "Blazer formal dengan potongan slim-fit yang sempurna untuk tampilan profesional. Dibuat dari bahan campuran wol premium yang tidak mudah kusut dan nyaman dipakai seharian.",
    sizes: ["XS","S","M","L","XL"], colors: ["Hitam","Navy","Abu-abu"],
    details: ["Material: 60% Wol, 40% Polyester", "Perawatan: Dry Clean Only", "Buatan Indonesia", "Tersedia dalam 3 warna"],
  },
  "oversized-hoodie": {
    name: "Oversized Hoodie", brand: "Soft Studio", price: 245000, emoji: "👕", bg: "bg2", score: 98,
    desc: "Hoodie oversize dengan bahan fleece tebal yang lembut di kulit. Potongan oversized yang trendy namun tetap nyaman untuk berbagai aktivitas.",
    sizes: ["S","M","L","XL","XXL"], colors: ["Cream","Sage Green","Dusty Pink","Charcoal"],
    details: ["Material: 80% Cotton, 20% Polyester", "Perawatan: Cuci mesin dingin", "Buatan Indonesia", "Tersedia dalam 4 warna"],
  },
  "midi-dress-floral": {
    name: "Midi Dress Floral", brand: "Bunga Studio", price: 329000, emoji: "👗", bg: "bg3", score: 99,
    desc: "Dress midi dengan motif bunga yang elegan. Bahan chiffon ringan yang jatuh sempurna di tubuh, cocok untuk berbagai kesempatan dari casual hingga semi-formal.",
    sizes: ["XS","S","M","L"], colors: ["Blue Floral","Pink Floral","White Floral"],
    details: ["Material: 100% Chiffon", "Perawatan: Cuci tangan", "Buatan Indonesia", "Ada furing dalam"],
  },
  "heels-statement": {
    name: "Heels Statement", brand: "Nuva Footwear", price: 259000, emoji: "👠", bg: "bg3", score: 94,
    desc: "Heels pointed-toe dengan tinggi 7cm yang memberikan kesan elegan dan percaya diri. Sol karet anti-slip untuk kenyamanan berjalan.",
    sizes: ["36","37","38","39","40"], colors: ["Hitam","Nude","Wine Red"],
    details: ["Material Upper: PU Leather", "Tinggi Hak: 7cm", "Sol: Karet Anti-slip", "Tersedia dalam 3 warna"],
  },
  "cardigan-pastel": {
    name: "Cardigan Pastel", brand: "Lembut & Co", price: 215000, emoji: "🧶", bg: "bg2", score: 95,
    desc: "Cardigan rajut dengan benang premium yang halus dan tidak gatal. Potongan relaxed-fit yang bisa dipadupadankan dengan berbagai outfit.",
    sizes: ["S","M","L","XL"], colors: ["Lavender","Mint","Baby Pink","Butter Yellow"],
    details: ["Material: 100% Acrylic Premium", "Perawatan: Cuci tangan air dingin", "Buatan Indonesia", "Tersedia dalam 4 warna pastel"],
  },
};

function StarRating({ rating, onRate, editable }: { rating: number; onRate?: (n: number) => void; editable?: boolean }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i}
          className={editable ? "cursor-pointer text-xl" : "text-base"}
          style={{ color: i <= (hover || rating) ? "#f59e0b" : "#d1d5db" }}
          onMouseEnter={() => editable && setHover(i)}
          onMouseLeave={() => editable && setHover(0)}
          onClick={() => editable && onRate?.(i)}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const params  = useParams();
  const slug    = params.slug as string;
  const product = ALL_PRODUCTS[slug];

  const [selectedSize, setSize]       = useState("");
  const [selectedColor, setColor]     = useState("");
  const [qty, setQty]                 = useState(1);
  const [showReviewForm, setShowForm] = useState(false);
  const [newRating, setNewRating]     = useState(5);
  const [newComment, setComment]      = useState("");
  const [activeImg, setActiveImg]     = useState(0);
  const [wishlist, setWishlist]       = useState(false);

  const { addItem, openCart } = useCart();
  const { user }              = useAuth();
  const { getReviews, addReview, getAvgRating } = useReviews();
  const { show }              = useToast();

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
          <span style={{ fontSize: 56 }}>🔍</span>
          <p className="font-display font-light" style={{ fontSize: 26 }}>Produk tidak ditemukan</p>
          <Link href="/eksplorasi" className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white no-underline"
            style={{ background: "var(--accent)" }}>Lihat Semua Produk</Link>
        </div>
        <Footer />
      </>
    );
  }

  const reviews  = getReviews(product.name);
  const avgRating = getAvgRating(product.name);
  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");

  const handleAddCart = () => {
    if (!selectedSize) { show("⚠️ Pilih ukuran terlebih dahulu"); return; }
    for (let i = 0; i < qty; i++) {
      addItem({ name: product.name, brand: product.brand, price: fmt(product.price), emoji: product.emoji });
    }
    show(`🛒 ${product.name} (${qty}x) ditambahkan ke keranjang!`);
    openCart();
  };

  const handleSubmitReview = () => {
    if (!newComment.trim()) { show("⚠️ Tulis komentar dulu"); return; }
    if (!user) { show("⚠️ Login dulu untuk memberi ulasan"); return; }
    addReview({ productName: product.name, author: user.name, avatar: user.avatar, rating: newRating, comment: newComment, verified: true });
    show("⭐ Ulasan berhasil ditambahkan!");
    setComment(""); setNewRating(5); setShowForm(false);
  };

  const ratingDist = [5,4,3,2,1].map(r => ({
    r, count: reviews.filter(x => x.rating === r).length,
    pct: reviews.length ? Math.round(reviews.filter(x => x.rating === r).length / reviews.length * 100) : 0,
  }));

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-10 py-10" style={{ minHeight: "80vh" }}>
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--muted)" }}>
            <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Beranda</Link>
            <span>/</span>
            <Link href="/eksplorasi" style={{ color: "var(--muted)", textDecoration: "none" }}>Eksplorasi</Link>
            <span>/</span>
            <span style={{ color: "var(--ink)" }}>{product.name}</span>
          </div>

          {/* Product section */}
          <div className="grid lg:grid-cols-2 gap-10 mb-16">
            {/* Images */}
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl flex items-center justify-center" style={{ height: 380, background: BG_MAP[product.bg] }}>
                <span style={{ fontSize: 120 }}>{product.emoji}</span>
              </div>
              <div className="flex gap-2">
                {[0,1,2].map(i => (
                  <div key={i} onClick={() => setActiveImg(i)}
                    className="flex-1 rounded-xl flex items-center justify-center cursor-pointer border-2 transition-colors"
                    style={{ height: 80, background: BG_MAP[product.bg], borderColor: activeImg === i ? "var(--accent)" : "transparent" }}>
                    <span style={{ fontSize: 32 }}>{product.emoji}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-xs font-medium tracking-wide uppercase mb-1" style={{ color: "var(--muted)" }}>{product.brand}</p>
                  <h1 className="font-display font-light" style={{ fontSize: 30 }}>{product.name}</h1>
                </div>
                <button onClick={() => { setWishlist(!wishlist); show(wishlist ? "💔 Dihapus dari wishlist" : `❤️ Ditambahkan ke wishlist`); }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: wishlist ? "#fde8e0" : "none", borderColor: wishlist ? "var(--accent)" : "var(--border)", cursor: "pointer" }}>
                  {wishlist ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={Math.round(avgRating)} />
                <span className="text-sm font-medium">{avgRating || "—"}</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>({reviews.length} ulasan)</span>
                <span className="text-xs px-2 py-0.5 rounded-md text-white ml-1" style={{ background: "var(--accent2)" }}>{product.score}% match</span>
              </div>

              <p className="font-display font-light mb-5" style={{ fontSize: 30, color: "var(--accent)" }}>{fmt(product.price)}</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>{product.desc}</p>

              {/* Color */}
              <div className="mb-5">
                <p className="text-xs font-medium mb-2">Warna: <span style={{ color: "var(--ink)", fontWeight: 500 }}>{selectedColor || "Pilih warna"}</span></p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setColor(c)}
                      className="rounded-full px-3 py-1.5 text-xs border transition-all"
                      style={{ borderColor: selectedColor === c ? "var(--accent)" : "var(--border)", background: selectedColor === c ? "#fff8f5" : "var(--cream)", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <p className="text-xs font-medium mb-2">Ukuran: <span style={{ color: "var(--ink)", fontWeight: 500 }}>{selectedSize || "Pilih ukuran"}</span></p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      className="w-11 h-11 rounded-xl text-sm border transition-all font-medium"
                      style={{ borderColor: selectedSize === s ? "var(--accent)" : "var(--border)", background: selectedSize === s ? "var(--accent)" : "var(--cream)", color: selectedSize === s ? "#fff" : "var(--ink)", cursor: "pointer", fontFamily: "inherit" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty + Add */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1 rounded-xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
                  <button onClick={() => setQty(q => Math.max(1, q-1))}
                    className="w-9 h-10 flex items-center justify-center text-lg"
                    style={{ background: "var(--cream)", border: "none", cursor: "pointer", color: "var(--ink)" }}>−</button>
                  <span className="w-10 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(q => q+1)}
                    className="w-9 h-10 flex items-center justify-center text-lg"
                    style={{ background: "var(--cream)", border: "none", cursor: "pointer", color: "var(--ink)" }}>+</button>
                </div>
                <button onClick={handleAddCart}
                  className="flex-1 rounded-2xl py-3 text-sm font-medium text-white"
                  style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  + Tambah ke Keranjang
                </button>
              </div>

              <Link href="/checkout"
                className="block w-full text-center rounded-2xl py-3 text-sm font-medium border no-underline"
                style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                onClick={() => { if (!selectedSize) { show("⚠️ Pilih ukuran dulu"); } else { handleAddCart(); } }}>
                Beli Sekarang
              </Link>

              {/* Product details */}
              <div className="mt-6 rounded-xl p-4 border" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
                <p className="text-xs font-medium mb-2">Detail Produk</p>
                <ul className="flex flex-col gap-1">
                  {product.details.map(d => (
                    <li key={d} className="flex items-center gap-2 text-xs" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "var(--accent2)" }}>✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div className="border-t pt-10" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <h2 className="font-display font-light" style={{ fontSize: 28 }}>Ulasan Pembeli</h2>
              <button onClick={() => user ? setShowForm(!showReviewForm) : show("⚠️ Login dulu untuk memberi ulasan")}
                className="rounded-2xl px-5 py-2.5 text-sm font-medium text-white"
                style={{ background: "var(--accent2)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                ✏️ Tulis Ulasan
              </button>
            </div>

            {/* Rating overview */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8 p-6 rounded-2xl border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <div className="flex flex-col items-center justify-center text-center">
                <p className="font-display font-light" style={{ fontSize: 56, color: "var(--accent)" }}>{avgRating || "—"}</p>
                <StarRating rating={Math.round(avgRating)} />
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{reviews.length} ulasan</p>
              </div>
              <div className="flex flex-col gap-2">
                {ratingDist.map(({ r, count, pct }) => (
                  <div key={r} className="flex items-center gap-2 text-xs">
                    <span className="w-3 text-right" style={{ color: "var(--muted)" }}>{r}</span>
                    <span style={{ color: "#f59e0b" }}>★</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--cream)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#f59e0b" }} />
                    </div>
                    <span className="w-7 text-right" style={{ color: "var(--muted)" }}>{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review form */}
            {showReviewForm && (
              <div className="rounded-2xl border p-6 mb-6 animate-fade-in" style={{ background: "var(--card-bg)", borderColor: "var(--accent2)" }}>
                <p className="font-medium text-sm mb-4">Tulis Ulasan Kamu</p>
                <div className="mb-4">
                  <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>Rating</p>
                  <StarRating rating={newRating} onRate={setNewRating} editable />
                </div>
                <div className="mb-4">
                  <p className="text-xs mb-2" style={{ color: "var(--muted)" }}>Komentar</p>
                  <textarea value={newComment} onChange={e => setComment(e.target.value)} rows={3}
                    placeholder="Bagikan pengalamanmu dengan produk ini..."
                    className="w-full border rounded-xl px-4 py-3 text-sm outline-none resize-none"
                    style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)", fontFamily: "inherit" }}
                    onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
                    onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSubmitReview}
                    className="rounded-xl px-6 py-2 text-sm font-medium text-white"
                    style={{ background: "var(--accent2)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                    Kirim Ulasan
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="rounded-xl px-6 py-2 text-sm border"
                    style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>
                    Batal
                  </button>
                </div>
              </div>
            )}

            {/* Review list */}
            {reviews.length === 0 ? (
              <div className="text-center py-10">
                <span style={{ fontSize: 40 }}>⭐</span>
                <p className="font-display font-light mt-3" style={{ fontSize: 20 }}>Belum ada ulasan</p>
                <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>Jadilah yang pertama mengulas produk ini!</p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {reviews.map(r => (
                  <div key={r.id} className="rounded-2xl border p-5" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
                        style={{ background: "var(--cream)" }}>{r.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium">{r.author}</p>
                          {r.verified && <span className="text-[9px] font-bold px-2 py-0.5 rounded-md text-white" style={{ background: "var(--accent2)" }}>VERIFIED</span>}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <StarRating rating={r.rating} />
                          <span className="text-xs" style={{ color: "var(--muted)" }}>{r.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{r.comment}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="text-xs border rounded-lg px-3 py-1"
                        style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", color: "var(--muted)", fontFamily: "inherit" }}>
                        👍 Membantu ({r.helpful})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
