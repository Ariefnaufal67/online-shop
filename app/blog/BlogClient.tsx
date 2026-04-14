"use client";
import { useState } from "react";

const TAGS = ["Semua", "Style Tips", "AI & Fashion", "Sustainability", "Trend", "Behind the Brand"];

const POSTS = [
  {
    id: 1,
    title: "Cara AI Style DNA Benar-Benar Mengerti Kepribadianmu",
    excerpt: "Bagaimana algoritma kami menganalisis 47 titik data untuk membuat profil gaya yang unik — dan mengapa ini berbeda dari kuis fashion biasa.",
    author: "Tim AI NuvaShop",
    date: "10 Apr 2026",
    readTime: "5 menit",
    tag: "AI & Fashion",
    emoji: "🧠",
    bg: "linear-gradient(135deg,#ddf1ee,#b8d8cc)",
    featured: true,
  },
  {
    id: 2,
    title: "10 Cara Mix & Match Warna Earthy Tone untuk Tampilan Sehari-hari",
    excerpt: "Palet warna netral bumi ternyata bisa jadi canvas yang luar biasa fleksibel. Berikut kombinasi favorit para stylist kami.",
    author: "Clara Dewi",
    date: "8 Apr 2026",
    readTime: "4 menit",
    tag: "Style Tips",
    emoji: "🎨",
    bg: "linear-gradient(135deg,#f0e6d3,#e0d0b8)",
  },
  {
    id: 3,
    title: "Brand Lokal yang Wajib Kamu Kenal di 2026",
    excerpt: "Indonesia punya talenta desainer yang luar biasa. Kami kenalkan 8 brand lokal yang koleksinya sedang naik daun di NuvaShop.",
    author: "Erika Santoso",
    date: "5 Apr 2026",
    readTime: "6 menit",
    tag: "Behind the Brand",
    emoji: "✨",
    bg: "linear-gradient(135deg,#fdf3d6,#f0dfa0)",
  },
  {
    id: 4,
    title: "Mood Dressing: Ilmu di Balik Pakaian yang Mempengaruhi Perasaanmu",
    excerpt: "Riset psikologi menunjukkan pakaian yang kamu pilih pagi hari bisa mengubah produktivitas dan suasana hatimu. Ini penjelasannya.",
    author: "Tim Editorial",
    date: "2 Apr 2026",
    readTime: "7 menit",
    tag: "AI & Fashion",
    emoji: "🌡️",
    bg: "linear-gradient(135deg,#e8d3d3,#d8b8b8)",
  },
  {
    id: 5,
    title: "Panduan Membangun Capsule Wardrobe di Bawah Rp 1 Juta",
    excerpt: "Capsule wardrobe bukan hanya untuk yang punya anggaran besar. Dengan strategi yang tepat, kamu bisa tampil stylish setiap hari dengan modal terbatas.",
    author: "Clara Dewi",
    date: "28 Mar 2026",
    readTime: "8 menit",
    tag: "Style Tips",
    emoji: "👗",
    bg: "linear-gradient(135deg,#d3d8e8,#b8c4d8)",
  },
  {
    id: 6,
    title: "Kenapa Fast Fashion Harus Kita Tinggalkan (dan Apa Alternatifnya)",
    excerpt: "Dampak lingkungan fast fashion sudah bukan rahasia. Tapi perubahan ke fashion berkelanjutan tidak harus menyakitkan — ini panduan praktisnya.",
    author: "Tim Sustainability",
    date: "24 Mar 2026",
    readTime: "9 menit",
    tag: "Sustainability",
    emoji: "🌿",
    bg: "linear-gradient(135deg,#d3e8e0,#a8d4c4)",
  },
  {
    id: 7,
    title: "Tren Warna Musim Ini: Dari Runway ke Kehidupan Sehari-hari",
    excerpt: "Kami merangkum tren warna dari panggung fashion internasional dan menerjemahkannya ke pilihan yang bisa kamu temukan di NuvaShop hari ini.",
    author: "Tim Editorial",
    date: "20 Mar 2026",
    readTime: "5 menit",
    tag: "Trend",
    emoji: "🌈",
    bg: "linear-gradient(135deg,#f0e0f8,#dca8ec)",
  },
  {
    id: 8,
    title: "Virtual Fit Score: Teknologi di Balik Rekomendasi Ukuran AI Kami",
    excerpt: "Bagaimana Virtual Fit Score bisa memprediksi kecocokan pakaian dengan akurasi 94%? Tim engineer kami membuka rahasianya.",
    author: "Bimo Satrio",
    date: "15 Mar 2026",
    readTime: "6 menit",
    tag: "AI & Fashion",
    emoji: "⚙️",
    bg: "linear-gradient(135deg,#ddeeff,#b0ccee)",
  },
];

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  "Style Tips":      { bg: "#fde8e0", color: "#c8502a" },
  "AI & Fashion":    { bg: "#ddeeff", color: "#2a5c8f" },
  "Sustainability":  { bg: "#ddf1ee", color: "#2a7c6f" },
  "Trend":           { bg: "#f0e8ff", color: "#6b3daf" },
  "Behind the Brand":{ bg: "#fdf3d6", color: "#b8962e" },
};

export default function BlogClient() {
  const [activeTag, setActiveTag] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = POSTS.filter(p => {
    const matchTag = activeTag === "Semua" || p.tag === activeTag;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  const featured = filtered.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || activeTag !== "Semua" || search);

  return (
    <div style={{ minHeight: "80vh" }}>
      {/* Header */}
      <div className="px-10 py-14 border-b" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>✦ Inspirasi & Edukasi</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display font-light mb-2" style={{ fontSize: 46 }}>NuvaShop Blog</h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Tips gaya, tren terkini, dan cerita di balik fashion.</p>
          </div>
          <input type="text" placeholder="Cari artikel..." value={search} onChange={e => setSearch(e.target.value)}
            className="border rounded-2xl px-4 py-2 text-sm outline-none w-full md:w-64"
            style={{ borderColor: "var(--border)", background: "var(--paper)", color: "var(--ink)" }}
            onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
            onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
        </div>
      </div>

      {/* Tag filter */}
      <div className="flex gap-2 flex-wrap px-10 py-5 border-b" style={{ borderColor: "var(--border)" }}>
        {TAGS.map(tag => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className="rounded-full px-4 py-1.5 text-xs border transition-all"
            style={{
              background: activeTag === tag ? "var(--ink)" : "var(--card-bg)",
              color: activeTag === tag ? "var(--paper)" : "var(--ink)",
              borderColor: activeTag === tag ? "var(--ink)" : "var(--border)",
              cursor: "pointer", fontFamily: "inherit",
            }}>
            {tag}
          </button>
        ))}
      </div>

      <div className="px-10 py-10">
        {/* Featured post */}
        {featured && activeTag === "Semua" && !search && (
          <div className="rounded-2xl overflow-hidden border mb-10 cursor-pointer transition-all hover:-translate-y-1"
            style={{ borderColor: "var(--border)" }}>
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto flex items-center justify-center" style={{ background: featured.bg }}>
                <span style={{ fontSize: 80 }}>{featured.emoji}</span>
              </div>
              <div className="p-8 flex flex-col justify-center" style={{ background: "var(--card-bg)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold px-2 py-1 rounded-md"
                    style={{ background: TAG_COLORS[featured.tag]?.bg, color: TAG_COLORS[featured.tag]?.color }}>
                    {featured.tag}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-md" style={{ background: "#fde8e0", color: "var(--accent)" }}>
                    ★ Artikel Pilihan
                  </span>
                </div>
                <h2 className="font-display font-light mb-3" style={{ fontSize: 28 }}>{featured.title}</h2>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs" style={{ color: "var(--muted)" }}>
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>⏱ {featured.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results info */}
        {search && (
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
            {filtered.length} artikel ditemukan untuk &ldquo;{search}&rdquo;
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTag === "Semua" && !search ? rest : filtered).map(post => {
            const tc = TAG_COLORS[post.tag] || { bg: "var(--cream)", color: "var(--muted)" };
            return (
              <article key={post.id}
                className="rounded-2xl overflow-hidden border cursor-pointer transition-all hover:-translate-y-1"
                style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="h-44 flex items-center justify-center" style={{ background: post.bg }}>
                  <span style={{ fontSize: 56 }}>{post.emoji}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                      style={{ background: tc.bg, color: tc.color }}>{post.tag}</span>
                    <span className="text-[10px]" style={{ color: "var(--muted)" }}>⏱ {post.readTime}</span>
                  </div>
                  <h3 className="font-medium text-sm leading-snug mb-2">{post.title}</h3>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-3" style={{ color: "var(--muted)" }}>{post.excerpt}</p>
                  <div className="flex items-center justify-between border-t pt-3" style={{ borderColor: "var(--border)" }}>
                    <div>
                      <p className="text-[11px] font-medium">{post.author}</p>
                      <p className="text-[10px]" style={{ color: "var(--muted)" }}>{post.date}</p>
                    </div>
                    <span className="text-xs font-medium" style={{ color: "var(--accent2)" }}>Baca →</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div style={{ fontSize: 48 }}>🔍</div>
            <p className="font-display font-light mt-4 mb-2" style={{ fontSize: 22 }}>Artikel tidak ditemukan</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Coba kata kunci lain atau pilih kategori berbeda.</p>
          </div>
        )}

        {/* Newsletter */}
        {filtered.length > 0 && (
          <div className="mt-16 rounded-2xl p-10 text-center border" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
            <h3 className="font-display font-light mb-2" style={{ fontSize: 26 }}>Jangan lewatkan artikel terbaru</h3>
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>Dikirim langsung ke email kamu setiap minggu.</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <input type="email" placeholder="Email kamu..."
                className="border rounded-2xl px-4 py-2 text-sm outline-none w-64"
                style={{ borderColor: "var(--border)", background: "var(--paper)", color: "var(--ink)" }} />
              <button className="rounded-2xl px-6 py-2 text-sm font-medium text-white"
                style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Langganan Gratis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
