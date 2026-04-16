"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

const TABS = ["Profil", "Riwayat Order", "Wishlist", "Pengaturan"];

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState("Profil");
  const { user, orders, logout }  = useAuth();
  const { show }                  = useToast();
  const router                    = useRouter();

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
          <span style={{ fontSize: 56 }}>🔐</span>
          <p className="font-display font-light" style={{ fontSize: 26 }}>Kamu belum masuk</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Silakan masuk untuk melihat profil dan riwayat order kamu.</p>
          <div className="flex gap-3 mt-2">
            <Link href="/login" className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white no-underline"
              style={{ background: "var(--accent)" }}>Masuk</Link>
            <Link href="/register" className="rounded-2xl px-6 py-2.5 text-sm font-medium border no-underline"
              style={{ borderColor: "var(--border)", color: "var(--ink)" }}>Daftar</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleLogout = () => {
    logout();
    show("👋 Sampai jumpa!");
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-10 py-10" style={{ minHeight: "80vh" }}>
        <div className="max-w-5xl mx-auto">

          {/* Profile header */}
          <div className="flex items-center gap-5 mb-8 p-6 rounded-2xl border"
            style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--card-bg)", fontSize: 36, border: "2px solid var(--border)" }}>
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display font-light" style={{ fontSize: 26 }}>{user.name}</h1>
              <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>{user.email}</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Member sejak {user.joinDate}</p>
            </div>
            <button onClick={handleLogout}
              className="rounded-xl px-4 py-2 text-xs border transition-colors hidden sm:block"
              style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--muted)" }}>
              Keluar
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Order", val: user.totalOrders },
              { label: "Total Belanja", val: fmt(user.totalSpent) },
              { label: "Poin Reward", val: Math.floor(user.totalSpent / 10000) + " pts" },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border p-4 text-center"
                style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <p className="font-display font-light mb-1" style={{ fontSize: 22, color: "var(--accent)" }}>{s.val}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b mb-8 overflow-x-auto" style={{ borderColor: "var(--border)" }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className="px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  borderBottom: `2px solid ${activeTab === t ? "var(--accent)" : "transparent"}`,
                  color: activeTab === t ? "var(--ink)" : "var(--muted)",
                  background: "none",
                  cursor: "pointer", fontFamily: "inherit",
                }}>
                {t}
              </button>
            ))}
          </div>

          {/* Tab: Profil */}
          {activeTab === "Profil" && (
            <div className="grid sm:grid-cols-2 gap-4 max-w-lg">
              {[
                { label: "Nama Lengkap", val: user.name },
                { label: "Email",        val: user.email },
                { label: "No. Handphone",val: "+62 812-3456-7890" },
                { label: "Tanggal Lahir",val: "15 Agustus 1999" },
                { label: "Jenis Kelamin",val: "Perempuan" },
                { label: "Kota",         val: "Jakarta Selatan" },
              ].map(f => (
                <div key={f.label}>
                  <p className="text-xs font-medium mb-1" style={{ color: "var(--muted)" }}>{f.label}</p>
                  <p className="text-sm font-medium">{f.val}</p>
                </div>
              ))}
              <div className="col-span-2 mt-4">
                <button onClick={() => show("✏️ Fitur edit profil akan segera hadir!")}
                  className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white"
                  style={{ background: "var(--accent2)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Edit Profil
                </button>
              </div>
            </div>
          )}

          {/* Tab: Riwayat Order */}
          {activeTab === "Riwayat Order" && (
            <div className="flex flex-col gap-4">
              {orders.length === 0 && (
                <div className="text-center py-16">
                  <span style={{ fontSize: 48 }}>📦</span>
                  <p className="font-display font-light mt-4" style={{ fontSize: 22 }}>Belum ada order</p>
                  <p className="text-sm mt-2 mb-6" style={{ color: "var(--muted)" }}>Yuk belanja sekarang!</p>
                  <Link href="/" className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white no-underline"
                    style={{ background: "var(--accent)" }}>Mulai Belanja</Link>
                </div>
              )}
              {orders.map(order => {
                const st = STATUS_STYLE[order.status];
                return (
                  <div key={order.id} className="rounded-2xl border p-5"
                    style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div>
                        <p className="text-sm font-medium">{order.id}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{order.date}</p>
                      </div>
                      <span className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{ background: st.bg, color: st.color }}>
                        {st.icon} {st.label}
                      </span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {order.items.map(item => (
                        <div key={item.name} className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                          style={{ background: "var(--cream)" }}>
                          {item.emoji}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs mb-1" style={{ color: "var(--muted)" }}>
                      {order.items.map(i => `${i.name} (x${i.qty})`).join(", ")}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t flex-wrap gap-2"
                      style={{ borderColor: "var(--border)" }}>
                      <div>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>Total</p>
                        <p className="text-sm font-medium">{fmt(order.total)}</p>
                      </div>
                      <div className="flex gap-2">
                        {order.tracking && (
                          <Link href={`/tracking?no=${order.tracking}&order=${order.id}`}
                            className="rounded-xl px-3 py-1.5 text-xs font-medium no-underline"
                            style={{ background: "var(--accent2)", color: "#fff" }}>
                            📦 Lacak
                          </Link>
                        )}
                        <button onClick={() => show("⭐ Fitur ulasan terbuka di halaman produk!")}
                          className="rounded-xl px-3 py-1.5 text-xs font-medium border"
                          style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>
                          ⭐ Beri Ulasan
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab: Wishlist */}
          {activeTab === "Wishlist" && (
            <div className="text-center py-16">
              <span style={{ fontSize: 48 }}>❤️</span>
              <p className="font-display font-light mt-4" style={{ fontSize: 22 }}>Wishlist kamu</p>
              <p className="text-sm mt-2 mb-6" style={{ color: "var(--muted)" }}>Tambahkan produk favorit dengan klik ikon ❤️ di produk manapun.</p>
              <Link href="/eksplorasi" className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white no-underline"
                style={{ background: "var(--accent)" }}>Jelajahi Produk</Link>
            </div>
          )}

          {/* Tab: Pengaturan */}
          {activeTab === "Pengaturan" && (
            <div className="max-w-md flex flex-col gap-5">
              {[
                { label: "Notifikasi Email", desc: "Update order & promo terbaru", on: true },
                { label: "Notifikasi WhatsApp", desc: "Konfirmasi pembayaran & pengiriman", on: true },
                { label: "Rekomendasi AI", desc: "Terima saran produk personal mingguan", on: true },
                { label: "Mode Gelap", desc: "Tampilan gelap untuk kenyamanan mata", on: false },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between py-4 border-b"
                  style={{ borderColor: "var(--border)" }}>
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.desc}</p>
                  </div>
                  <button onClick={() => show(`⚙️ Pengaturan ${s.label} diperbarui`)}
                    className="w-11 h-6 rounded-full transition-colors relative flex-shrink-0"
                    style={{ background: s.on ? "var(--accent2)" : "var(--border)", border: "none", cursor: "pointer" }}>
                    <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all"
                      style={{ left: s.on ? "calc(100% - 22px)" : 2 }} />
                  </button>
                </div>
              ))}
              <button onClick={handleLogout}
                className="mt-4 rounded-2xl px-6 py-3 text-sm font-medium border w-fit"
                style={{ borderColor: "#ef4444", color: "#ef4444", background: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Keluar dari Akun
              </button>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
