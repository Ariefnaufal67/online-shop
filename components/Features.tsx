"use client";
import { useState } from "react";

const FEATURES = [
  { icon: "🧠", bg: "#fde8e0", title: "AI Style DNA", desc: "Analisis kepribadianmu dalam 60 detik, lalu dapatkan profil gaya unik yang tidak dimiliki siapapun." },
  { icon: "🌡️", bg: "#ddf1ee", title: "Mood Shopping", desc: "Pilih suasana hatimu hari ini — produk tampil sesuai emosi dan energi yang sedang kamu rasakan." },
  { icon: "👗", bg: "#fdf3d6", title: "Virtual Fit Score", desc: "Sistem AI memprediksi seberapa cocok pakaian ini di tubuhmu, tanpa perlu mencoba dulu." },
  { icon: "💬", bg: "#ddeeff", title: "Style Chatbot 24/7", desc: "Konsultan fashion AI siap menjawab pertanyaan style kapanpun — dari mix & match hingga tips perawatan." },
];

export default function Features() {
  const [active, setActive] = useState(0);

  return (
    <section className="px-10 py-20">
      <div className="text-center mb-12">
        <h2 className="font-display font-light mb-3" style={{ fontSize: 38 }}>Fitur yang belum ada di tempat lain</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Kami merancang ulang cara orang berbelanja fashion online</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f, i) => (
          <div key={f.title} onClick={() => setActive(i)} className="relative rounded-2xl p-7 cursor-pointer transition-all duration-250 border"
            style={{
              background: active === i ? "#fff8f5" : "var(--card-bg)",
              borderColor: active === i ? "var(--accent)" : "var(--border)",
              transform: active === i ? "translateY(-4px)" : undefined,
            }}>
            <span className="absolute top-4 right-4 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded"
              style={{ background: "var(--accent)" }}>BARU</span>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ background: f.bg }}>
              {f.icon}
            </div>
            <h3 className="font-medium text-sm mb-2">{f.title}</h3>
            <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
