"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/components/Toast";

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string; icon: string }> = {
  processing: { bg: "#fdf3d6", color: "#b8962e", label: "Diproses",   icon: "⚙️" },
  shipped:    { bg: "#ddeeff", color: "#2a5c8f", label: "Dikirim",    icon: "🚚" },
  delivered:  { bg: "#ddf1ee", color: "#2a7c6f", label: "Diterima",   icon: "✅" },
  cancelled:  { bg: "#fde8e0", color: "#c8502a", label: "Dibatalkan", icon: "❌" },
};

const STATUS_TABS = ["Semua", "Diproses", "Dikirim", "Diterima", "Dibatalkan"];
const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");

export default function PesananPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [search, setSearch]       = useState("");
  const { user, orders }          = useAuth();
  const { show }                  = useToast();

  // ─── Belum login: tampilkan halaman suruh login ───
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 text-center"
          style={{ minHeight: "70vh" }}>

          {/* Ilustrasi */}
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
            style={{ background: "var(--cream)", fontSize: 44 }}>
            🔐
          </div>

          <h1 className="font-display font-light mb-3" style={{ fontSize: 32 }}>
            Masuk untuk melihat pesanan
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)", maxWidth: 360 }}>
            Riwayat pesananmu tersimpan di akunmu. Silakan masuk atau buat akun baru untuk melanjutkan.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            <Link href="/login"
              className="rounded-2xl px-8 py-3 text-sm font-medium text-white no-underline"
              style={{ background: "var(--accent)" }}>
              Masuk Sekarang
            </Link>
            <Link href="/register"
              className="rounded-2xl px-8 py-3 text-sm font-medium border no-underline"
              style={{ borderColor: "var(--border)", color: "var(--ink)", background: "var(--card-bg)" }}>
              Daftar Gratis
            </Link>
          </div>

          {/* Manfaat login */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14" style={{ maxWidth: 560 }}>
            {[
              { icon: "📦", title: "Lacak Pesanan", desc: "Pantau status & pengiriman real-time" },
              { icon: "⭐", title: "Beri Ulasan",   desc: "Tulis review untuk produk yang kamu beli" },
              { icon: "🔄", title: "Beli Lagi",     desc: "Ulangi pesanan favorit dengan mudah" },
            ].map(f => (
              <div key={f.title} className="rounded-2xl border p-4 text-center"
                style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-sm font-medium mb-1">{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ─── Sudah login: tampilkan riwayat pesanan ───
  const filtered = orders.filter(o => {
    const st = STATUS_STYLE[o.status];
    const matchTab    = activeTab === "Semua" || st.label === activeTab;
    const matchSearch = search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some(i => i.name.toLowerCase().includes(search.toLowerCase()));
    return matchTab && matchSearch;
  });

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-10 py-10" style={{ minHeight: "80vh" }}>
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: "var(--accent)" }}>✦ Pesanan Saya</p>
            <h1 className="font-display font-light" style={{ fontSize: 38 }}>Riwayat Pesanan</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              Halo, {user.name.split(" ")[0]}! Kamu punya {orders.length} pesanan.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base">🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari berdasarkan ID pesanan atau nama produk..."
              className="w-full border rounded-2xl pl-11 pr-4 py-3 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
              onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
              onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
          </div>

          {/* Status tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {STATUS_TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="rounded-full px-4 py-1.5 text-xs font-medium border transition-all"
                style={{
                  background: activeTab === tab ? "var(--ink)" : "var(--card-bg)",
                  color: activeTab === tab ? "var(--paper)" : "var(--ink)",
                  borderColor: activeTab === tab ? "var(--ink)" : "var(--border)",
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                {tab}
                {tab !== "Semua" && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]"
                    style={{
                      background: activeTab === tab ? "rgba(255,255,255,0.2)" : "var(--cream)",
                      color: activeTab === tab ? "#fff" : "var(--muted)",
                    }}>
                    {orders.filter(o => STATUS_STYLE[o.status].label === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16 rounded-2xl border"
              style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
              <span style={{ fontSize: 48 }}>📦</span>
              <p className="font-display font-light mt-4 mb-2" style={{ fontSize: 22 }}>
                {search ? `Tidak ada hasil untuk "${search}"` : "Belum ada pesanan di sini"}
              </p>
              <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
                {search ? "Coba kata kunci lain" : "Yuk mulai belanja!"}
              </p>
              <Link href="/" className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white no-underline"
                style={{ background: "var(--accent)" }}>
                Mulai Belanja
              </Link>
            </div>
          )}

          {/* Orders */}
          <div className="flex flex-col gap-4">
            {filtered.map(order => {
              const st = STATUS_STYLE[order.status];
              return (
                <div key={order.id} className="rounded-2xl border overflow-hidden"
                  style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>

                  {/* Order header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b flex-wrap gap-2"
                    style={{ borderColor: "var(--border)", background: "var(--cream)" }}>
                    <div className="flex items-center gap-3">
                      <span style={{ fontSize: 22 }}>{st.icon}</span>
                      <div>
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Dipesan {order.date}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="px-5 py-4">
                    <div className="flex flex-col gap-3 mb-4">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                            style={{ background: "var(--cream)" }}>
                            {item.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                              {item.price} × {item.qty}
                            </p>
                          </div>
                          <p className="text-sm font-medium flex-shrink-0">
                            {fmt(parseInt(item.price.replace(/\D/g, "")) * item.qty)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {order.status === "shipped" && (
                      <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-4 text-xs"
                        style={{ background: "#ddeeff", color: "#2a5c8f" }}>
                        🚚 Estimasi tiba: <strong className="ml-1">{order.estimatedDelivery}</strong>
                      </div>
                    )}
                    {order.status === "processing" && (
                      <div className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-4 text-xs"
                        style={{ background: "#fdf3d6", color: "#b8962e" }}>
                        ⚙️ Pesananmu sedang diproses oleh seller
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t flex-wrap gap-3"
                      style={{ borderColor: "var(--border)" }}>
                      <div>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>Total Pembayaran</p>
                        <p className="text-base font-semibold mt-0.5">{fmt(order.total)}</p>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {order.tracking && (
                          <Link href={`/tracking?no=${order.tracking}&order=${order.id}`}
                            className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium no-underline"
                            style={{ background: "var(--accent2)", color: "#fff" }}>
                            📦 Lacak Paket
                          </Link>
                        )}
                        {order.status === "delivered" && (
                          <button onClick={() => show("⭐ Buka halaman detail produk untuk memberi ulasan!")}
                            className="rounded-xl px-4 py-2 text-xs font-medium border"
                            style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>
                            ⭐ Beri Ulasan
                          </button>
                        )}
                        {order.status === "delivered" && (
                          <button onClick={() => show("🔄 Produk ditambahkan ke keranjang!")}
                            className="rounded-xl px-4 py-2 text-xs font-medium border"
                            style={{ borderColor: "var(--accent)", background: "#fff8f5", cursor: "pointer", fontFamily: "inherit", color: "var(--accent)" }}>
                            🔄 Beli Lagi
                          </button>
                        )}
                        {order.status === "processing" && (
                          <button onClick={() => show("❌ Fitur batalkan sedang dalam pengembangan")}
                            className="rounded-xl px-4 py-2 text-xs font-medium border"
                            style={{ borderColor: "#ef4444", background: "none", cursor: "pointer", fontFamily: "inherit", color: "#ef4444" }}>
                            Batalkan
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
