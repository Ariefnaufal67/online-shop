"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/components/Toast";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const { login, isLoading }    = useAuth();
  const { show }                = useToast();
  const router                  = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = await login(email, password);
    if (ok) {
      show("✓ Selamat datang kembali! 👋");
      router.push("/profil");
    } else {
      setError("Email atau password salah. Coba: ayu@email.com / 123456");
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--paper)" }}>
      {/* Left decorative */}
      <div className="hidden lg:flex flex-col justify-between w-96 p-12 flex-shrink-0"
        style={{ background: "var(--cream)", borderRight: "1px solid var(--border)" }}>
        <Link href="/" className="font-display text-2xl font-semibold" style={{ color: "var(--ink)", textDecoration: "none" }}>
          Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
        </Link>
        <div>
          <p className="font-display font-light mb-4" style={{ fontSize: 34, lineHeight: 1.1 }}>
            Fashion yang<br /><em style={{ color: "var(--accent2)" }}>mengerti</em> kamu.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            Masuk untuk mendapatkan rekomendasi personal, melihat riwayat order, dan menikmati pengalaman belanja yang lebih personal.
          </p>
        </div>
        <p className="text-xs" style={{ color: "var(--muted)" }}>© 2026 NuvaShop</p>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden font-display text-xl font-semibold block mb-10" style={{ color: "var(--ink)", textDecoration: "none" }}>
            Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
          </Link>

          <h1 className="font-display font-light mb-2" style={{ fontSize: 30 }}>Masuk</h1>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            Belum punya akun?{" "}
            <Link href="/register" style={{ color: "var(--accent2)", textDecoration: "none", fontWeight: 500 }}>Daftar gratis</Link>
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="email@kamu.com"
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
                onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
                onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••"
                className="w-full border rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
                onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
                onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
            </div>

            {error && (
              <div className="rounded-xl px-4 py-3 text-xs" style={{ background: "#fde8e0", color: "var(--accent)" }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="w-full rounded-xl py-3 text-sm font-medium text-white mt-2 transition-opacity"
              style={{ background: "var(--accent)", border: "none", cursor: isLoading ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? "Memverifikasi..." : "Masuk"}
            </button>

            {/* Demo hint */}
            <div className="rounded-xl px-4 py-3 text-xs text-center" style={{ background: "var(--cream)", color: "var(--muted)" }}>
              Demo: <strong>ayu@email.com</strong> / <strong>123456</strong>
            </div>
          </form>

          <div className="relative flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--muted)" }}>atau</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="flex flex-col gap-3">
            {[{ icon: "🌐", label: "Masuk dengan Google" }, { icon: "📘", label: "Masuk dengan Facebook" }].map(btn => (
              <button key={btn.label} onClick={() => show("🚧 Fitur ini akan segera hadir!")}
                className="w-full flex items-center justify-center gap-2 border rounded-xl py-3 text-sm transition-colors"
                style={{ borderColor: "var(--border)", background: "var(--card-bg)", color: "var(--ink)", cursor: "pointer", fontFamily: "inherit" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--muted)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
