"use client";
import { useState } from "react";
import { useToast } from "./Toast";

const FOOTER_LINKS = [
  { title: "Toko", links: ["Koleksi Baru", "Terlaris", "Sale", "Brand"] },
  { title: "Bantuan", links: ["Pengiriman", "Pengembalian", "Ukuran & Panduan", "FAQ"] },
  { title: "Perusahaan", links: ["Tentang Kami", "Karir", "Blog", "Kontak"] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { show } = useToast();

  const handleSubscribe = () => {
    if (!email) return;
    show("✓ Berhasil! Kamu akan menerima rekomendasi mingguan 🎉");
    setEmail("");
  };

  return (
    <>
      {/* Newsletter Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-12 border-t"
        style={{ background: "var(--ink)", color: "var(--paper)", borderColor: "var(--border)" }}>
        <h2 className="font-display font-light" style={{ fontSize: 30, maxWidth: 360 }}>
          Dapat <em style={{ color: "#c8a87a" }}>rekomendasi personal</em> tiap minggu
        </h2>
        <div className="flex gap-2.5">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email kamu..."
            className="rounded-2xl px-5 py-2.5 text-sm outline-none w-56"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "var(--paper)" }} />
          <button onClick={handleSubscribe}
            className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white border-none cursor-pointer"
            style={{ background: "var(--accent)" }}>
            Daftar Gratis
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <footer className="grid grid-cols-2 md:grid-cols-4 gap-10 px-10 py-10 border-t"
        style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
        <div>
          <div className="font-display text-xl font-semibold mb-3">
            Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "var(--muted)", maxWidth: 220 }}>
            Belanja fashion lebih cerdas, lebih personal. Didukung teknologi AI.
          </p>
        </div>
        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>{col.title}</h4>
            <ul className="flex flex-col gap-2.5 list-none">
              {col.links.map((link) => (
                <li key={link} className="text-xs cursor-pointer hover:text-[var(--ink)] transition-colors" style={{ color: "var(--muted)" }}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </footer>

      <div className="flex justify-between items-center px-10 py-4 border-t text-xs" style={{ background: "var(--cream)", borderColor: "var(--border)", color: "var(--muted)" }}>
        <span>© 2026 NuvaShop · Semua hak dilindungi</span>
        <span>Privasi · Syarat & Ketentuan · Cookie</span>
      </div>
    </>
  );
}
