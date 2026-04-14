"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToast } from "./Toast";

interface NavbarProps { cartCount?: number }

const NAV_LINKS = [
  { label: "Eksplorasi", href: "/eksplorasi" },
  { label: "Koleksi",    href: "/koleksi" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Blog",       href: "/blog" },
];

export default function Navbar({ cartCount = 2 }: NavbarProps) {
  const [cartFlash, setCartFlash] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { show } = useToast();
  const pathname = usePathname();

  const handleCart = () => {
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 500);
    show("🛒 Keranjang belanja");
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b sticky top-0 z-40"
      style={{ background: "var(--paper)", borderColor: "var(--border)" }}>
      <Link href="/" className="font-display text-2xl font-semibold tracking-tight no-underline" style={{ color: "var(--ink)", textDecoration:"none" }}>
        Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
      </Link>

      <ul className="hidden md:flex gap-8 text-sm font-medium list-none">
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <li key={label}>
              <Link href={href} style={{ color: active ? "var(--ink)" : "var(--muted)", textDecoration: "none", borderBottom: active ? "1.5px solid var(--accent)" : "1.5px solid transparent", paddingBottom: 2 }}
                className="transition-colors hover:text-[var(--ink)]">
                {label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-3">
        <input type="text" placeholder="Cari produk..."
          className="hidden md:block border rounded-2xl px-4 py-1.5 text-sm outline-none w-44"
          style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent2)")}
          onBlur={(e)  => (e.target.style.borderColor = "var(--border)")} />
        <button onClick={handleCart}
          className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all"
          style={{ background: cartFlash ? "var(--accent2)" : "var(--ink)", color: "var(--paper)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
          🛒 <span className="hidden sm:inline">Keranjang</span>
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            style={{ background: "var(--accent)", color: "#fff" }}>{cartCount}</span>
        </button>
        <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", fontSize: 20 }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 border-b md:hidden"
          style={{ background: "var(--paper)", borderColor: "var(--border)" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              className="block px-6 py-3 text-sm border-b"
              style={{ color: pathname === href ? "var(--accent)" : "var(--ink)", textDecoration: "none", borderColor: "var(--border)" }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
