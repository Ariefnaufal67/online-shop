"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/components/Toast";

export default function RegisterPage() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [agree, setAgree]       = useState(false);
  const [error, setError]       = useState("");
  const { register, isLoading } = useAuth();
  const { show }                = useToast();
  const router                  = useRouter();

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Lemah", "Sedang", "Kuat"];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#22c55e"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Password tidak cocok."); return; }
    if (password.length < 6)  { setError("Password minimal 6 karakter."); return; }
    if (!agree) { setError("Kamu harus menyetujui syarat & ketentuan."); return; }
    const ok = await register(name, email, password);
    if (ok) {
      show("🎉 Akun berhasil dibuat! Selamat belanja!");
      router.push("/profil");
    } else {
      setError("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--paper)" }}>
      {/* Left */}
      <div className="hidden lg:flex flex-col justify-between w-96 p-12 flex-shrink-0"
        style={{ background: "var(--cream)", borderRight: "1px solid var(--border)" }}>
        <Link href="/" className="font-display text-2xl font-semibold" style={{ color: "var(--ink)", textDecoration: "none" }}>
          Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
        </Link>
        <div>
          <p className="font-display font-light mb-4" style={{ fontSize: 32, lineHeight: 1.1 }}>
            Bergabung dengan<br /><em style={{ color: "var(--accent2)" }}>100.000+</em> fashionista.
          </p>
          <div className="flex flex-col gap-3">
            {["✨ Rekomendasi AI personal", "🎁 Diskon member 5% setiap order", "📦 Notifikasi pengiriman real-time", "❤️ Simpan wishlist favoritmu"].map(p => (
              <div key={p} className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: "var(--muted)" }}>© 2026 NuvaShop</p>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden font-display text-xl font-semibold block mb-8" style={{ color: "var(--ink)", textDecoration: "none" }}>
            Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
          </Link>

          <h1 className="font-display font-light mb-2" style={{ fontSize: 30 }}>Daftar Gratis</h1>
          <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>
            Sudah punya akun?{" "}
            <Link href="/login" style={{ color: "var(--accent2)", textDecoration: "none", fontWeight: 500 }}>Masuk di sini</Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label: "Nama Lengkap", val: name, set: setName, type: "text", ph: "Nama kamu" },
              { label: "Email",        val: email, set: setEmail, type: "email", ph: "email@kamu.com" },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>{f.label}</label>
                <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)} required placeholder={f.ph}
                  className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
                  style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
                  onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
                  onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min. 6 karakter"
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
                style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
                onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
                onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-1 flex-1 rounded-full transition-colors"
                        style={{ background: strength >= i ? strengthColor[strength] : "var(--border)" }} />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: strengthColor[strength] }}>{strengthLabel[strength]}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Konfirmasi Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required placeholder="Ulangi password"
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none"
                style={{ borderColor: confirm && confirm !== password ? "#ef4444" : "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
                onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
                onBlur={e  => (e.target.style.borderColor = confirm && confirm !== password ? "#ef4444" : "var(--border)")} />
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
                className="mt-0.5" style={{ accentColor: "var(--accent)", flexShrink: 0 }} />
              <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                Saya menyetujui{" "}
                <span style={{ color: "var(--accent2)", cursor: "pointer" }}>Syarat & Ketentuan</span>{" "}
                dan{" "}
                <span style={{ color: "var(--accent2)", cursor: "pointer" }}>Kebijakan Privasi</span>{" "}
                NuvaShop.
              </span>
            </label>

            {error && (
              <div className="rounded-xl px-4 py-3 text-xs" style={{ background: "#fde8e0", color: "var(--accent)" }}>{error}</div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full rounded-xl py-3 text-sm font-medium text-white mt-1 transition-opacity"
              style={{ background: "var(--accent2)", border: "none", cursor: isLoading ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? "Membuat akun..." : "Buat Akun Gratis"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
