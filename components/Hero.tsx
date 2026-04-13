"use client";

export default function Hero({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section className="grid md:grid-cols-2 border-b" style={{ borderColor: "var(--border)", minHeight: 500 }}>
      {/* Left */}
      <div className="flex flex-col justify-center px-14 py-20"
        style={{ background: "linear-gradient(135deg,#f5f0e8 60%,#ede8dc 100%)" }}>
        <p className="text-xs font-medium tracking-widest uppercase mb-5" style={{ color: "var(--accent)" }}>
          ✦ Belanja Generasi Baru
        </p>
        <h1 className="font-display font-light leading-none mb-6" style={{ fontSize: 58 }}>
          Fashion yang<br />
          <em style={{ color: "var(--accent2)" }}>mengerti</em><br />
          kamu.
        </h1>
        <p className="text-sm leading-7 mb-9 max-w-md" style={{ color: "var(--muted)" }}>
          AI kami belajar dari gaya hidupmu, suasana hatimu, dan selera unikmu — lalu merekomendasikan outfit yang benar-benar tepat.
        </p>
        <div className="flex gap-3">
          <button onClick={onShopClick}
            className="rounded-3xl px-8 py-3 text-sm font-medium text-white transition-colors"
            style={{ background: "var(--accent)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#a8401d")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "var(--accent)")}>
            Mulai Belanja
          </button>
          <button className="rounded-3xl px-8 py-3 text-sm border transition-colors"
            style={{ borderColor: "var(--border)", color: "var(--ink)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.borderColor = "var(--ink)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.borderColor = "var(--border)")}>
            Lihat Koleksi
          </button>
        </div>
      </div>

      {/* Right */}
      <div className="hidden md:flex items-center justify-center relative" style={{ background: "var(--cream)" }}>
        <div className="flex items-end justify-center overflow-hidden"
          style={{ width: 280, height: 380, borderRadius: "140px 140px 110px 110px", background: "linear-gradient(160deg,#d4c5a9,#b8a88a)" }}>
          <div style={{ width: 130, height: 300, borderRadius: "65px 65px 0 0", background: "linear-gradient(180deg,#8a6a4a,#6b4f38)", marginBottom: -2 }} />
        </div>

        {/* AI Badge */}
        <div className="absolute top-7 right-7 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium"
          style={{ background: "var(--ink)", color: "var(--paper)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "#4ade80" }} />
          AI Aktif
        </div>

        {/* Stats */}
        <div className="absolute bottom-7 left-7 right-7 flex gap-3">
          {[["12K+", "Produk"], ["98%", "Puas"], ["AI", "Powered"]].map(([val, label]) => (
            <div key={label} className="flex-1 rounded-xl py-2 text-center text-xs border"
              style={{ background: "rgba(255,255,255,0.85)", borderColor: "var(--border)" }}>
              <strong className="block text-base font-semibold" style={{ color: "var(--accent)" }}>{val}</strong>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
