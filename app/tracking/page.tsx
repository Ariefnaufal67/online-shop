"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_TRACKS: Record<string, {
  courier: string; status: string; estimatedDelivery: string;
  origin: string; destination: string;
  timeline: { time: string; date: string; desc: string; location: string; done: boolean }[];
}> = {
  "JNE123456789": {
    courier: "JNE", status: "delivered", estimatedDelivery: "14 Apr 2026",
    origin: "Jakarta Pusat", destination: "Jakarta Selatan",
    timeline: [
      { time:"14:22", date:"14 Apr", desc:"Paket telah diterima",         location:"Jakarta Selatan",  done: true  },
      { time:"10:05", date:"14 Apr", desc:"Paket dibawa kurir untuk diantar", location:"Hub JNE Pancoran", done: true  },
      { time:"06:30", date:"14 Apr", desc:"Paket tiba di kantor cabang",   location:"Hub JNE Pancoran", done: true  },
      { time:"23:15", date:"13 Apr", desc:"Paket dalam perjalanan antar kota", location:"Hub JNE Jakarta Pusat", done: true },
      { time:"18:40", date:"13 Apr", desc:"Paket diterima di gudang JNE",  location:"Jakarta Pusat",    done: true  },
      { time:"15:00", date:"13 Apr", desc:"Paket diambil kurir dari seller",location:"Jakarta Pusat",    done: true  },
      { time:"12:30", date:"12 Apr", desc:"Pesanan dikonfirmasi seller",    location:"Jakarta Pusat",    done: true  },
    ],
  },
  "SICEPAT987654": {
    courier: "SiCepat", status: "shipped", estimatedDelivery: "17 Apr 2026",
    origin: "Bandung", destination: "Jakarta Selatan",
    timeline: [
      { time:"09:20", date:"16 Apr", desc:"Paket dibawa kurir untuk diantar", location:"Hub SiCepat Depok", done: true  },
      { time:"05:45", date:"16 Apr", desc:"Paket tiba di kantor cabang",   location:"Hub SiCepat Depok", done: true  },
      { time:"22:30", date:"15 Apr", desc:"Paket dalam perjalanan",        location:"Bandung → Jakarta",  done: true  },
      { time:"16:00", date:"15 Apr", desc:"Paket diterima di gudang",      location:"Bandung",            done: true  },
      { time:"13:45", date:"15 Apr", desc:"Paket diambil kurir",           location:"Bandung",            done: true  },
      { time:"","date":"", desc:"Paket diterima penerima",             location:"Jakarta Selatan",    done: false },
    ],
  },
};

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  delivered: { label: "Paket Diterima", color: "#2a7c6f", bg: "#ddf1ee", icon: "✅" },
  shipped:   { label: "Dalam Perjalanan", color: "#2a5c8f", bg: "#ddeeff", icon: "🚚" },
  processing:{ label: "Diproses Seller", color: "#b8962e", bg: "#fdf3d6", icon: "⚙️" },
};

function TrackingContent() {
  const params  = useSearchParams();
  const noParam = params.get("no") || "";
  const [noInput, setNoInput] = useState(noParam);
  const [result, setResult]   = useState<typeof MOCK_TRACKS[string] | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (noParam) { handleSearch(noParam); }
  }, [noParam]);

  const handleSearch = async (no?: string) => {
    const query = no || noInput;
    if (!query.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const found = MOCK_TRACKS[query.trim()];
    setResult(found || null);
    setSearched(true);
    setLoading(false);
  };

  const st = result ? STATUS_MAP[result.status] : null;
  const doneCount = result ? result.timeline.filter(t => t.done).length : 0;
  const totalCount = result ? result.timeline.length : 0;
  const progress = result ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="px-6 md:px-10 py-10" style={{ minHeight: "80vh" }}>
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>✦ Tracking Pengiriman</p>
        <h1 className="font-display font-light mb-8" style={{ fontSize: 38 }}>Lacak Paket</h1>

        {/* Search box */}
        <div className="flex gap-3 mb-8">
          <input type="text" value={noInput} onChange={e => setNoInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
            placeholder="Masukkan nomor resi (coba: JNE123456789)"
            className="flex-1 border rounded-xl px-4 py-3 text-sm outline-none"
            style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
            onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
            onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
          <button onClick={() => handleSearch()}
            className="rounded-xl px-6 py-3 text-sm font-medium text-white flex-shrink-0"
            style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            {loading ? "..." : "Lacak"}
          </button>
        </div>

        {/* Demo hint */}
        <div className="rounded-xl p-3 mb-6 text-xs" style={{ background: "var(--cream)", color: "var(--muted)" }}>
          💡 Demo: coba nomor resi <strong>JNE123456789</strong> (terkirim) atau <strong>SICEPAT987654</strong> (dalam perjalanan)
        </div>

        {/* Result */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4"
              style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
            <p className="text-sm" style={{ color: "var(--muted)" }}>Melacak paket kamu...</p>
          </div>
        )}

        {!loading && searched && !result && (
          <div className="text-center py-12 rounded-2xl border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
            <span style={{ fontSize: 48 }}>🔍</span>
            <p className="font-display font-light mt-4 mb-2" style={{ fontSize: 22 }}>Resi tidak ditemukan</p>
            <p className="text-sm" style={{ color: "var(--muted)" }}>Periksa kembali nomor resi kamu.</p>
          </div>
        )}

        {!loading && result && st && (
          <div className="flex flex-col gap-5">
            {/* Status card */}
            <div className="rounded-2xl border p-6" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                <div>
                  <p className="text-xs font-medium mb-1" style={{ color: "var(--muted)" }}>Nomor Resi</p>
                  <p className="font-medium text-sm">{noInput}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Kurir: {result.courier}</p>
                </div>
                <span className="text-sm font-medium px-4 py-1.5 rounded-full"
                  style={{ background: st.bg, color: st.color }}>
                  {st.icon} {st.label}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5" style={{ color: "var(--muted)" }}>
                  <span>{result.origin}</span>
                  <span>{result.destination}</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--cream)" }}>
                  <div className="h-full rounded-full bar-fill" style={{ width: `${progress}%`, background: st.color }} />
                </div>
                <p className="text-xs mt-1.5 text-right" style={{ color: "var(--muted)" }}>
                  Estimasi tiba: <strong>{result.estimatedDelivery}</strong>
                </p>
              </div>

              {/* 3 quick stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Asal",      val: result.origin },
                  { label: "Tujuan",    val: result.destination },
                  { label: "Est. Tiba", val: result.estimatedDelivery },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: "var(--cream)" }}>
                    <p className="text-[10px] mb-0.5" style={{ color: "var(--muted)" }}>{s.label}</p>
                    <p className="text-xs font-medium">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border p-6" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <p className="font-medium text-sm mb-5">Riwayat Perjalanan Paket</p>
              <div className="relative">
                <div className="absolute left-[22px] top-3 bottom-3 w-0.5" style={{ background: "var(--border)" }} />
                <div className="flex flex-col gap-5">
                  {result.timeline.map((t, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                        style={{ background: t.done ? (i === 0 ? st.bg : "var(--cream)") : "var(--cream)", border: `2px solid ${t.done ? st.color : "var(--border)"}` }}>
                        {t.done ? (i === 0 ? st.icon : "✓") : "○"}
                      </div>
                      <div className="flex-1 pt-1.5">
                        <p className="text-sm font-medium" style={{ color: t.done ? "var(--ink)" : "var(--muted)" }}>{t.desc}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{t.location}</p>
                        {t.time && <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{t.date} · {t.time}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/profil" className="text-sm no-underline" style={{ color: "var(--accent2)" }}>
            ← Kembali ke Profil & Riwayat Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="px-10 py-20 text-center text-sm" style={{ color: "var(--muted)" }}>Memuat...</div>}>
        <TrackingContent />
      </Suspense>
      <Footer />
    </>
  );
}
