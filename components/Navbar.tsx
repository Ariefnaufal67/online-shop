"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import SearchModal from "./SearchModal";

const NAV_LINKS = [
  { label: "Eksplorasi",   href: "/eksplorasi" },
  { label: "Koleksi",      href: "/koleksi" },
  { label: "Pesanan",      href: "/pesanan" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Blog",         href: "/blog" },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [cartFlash, setCartFlash]   = useState(false);
  const pathname  = usePathname();
  const { totalItems, openCart } = useCart();
  const { user }  = useAuth();

  const handleCart = () => {
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 400);
    openCart();
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b sticky top-0 z-40"
        style={{ background: "var(--paper)", borderColor: "var(--border)" }}>

        <Link href="/" className="font-display text-2xl font-semibold tracking-tight"
          style={{ color: "var(--ink)", textDecoration: "none" }}>
          Nu<span style={{ color: "var(--accent)", fontStyle: "italic" }}>va</span>
        </Link>

        <ul className="hidden md:flex gap-8 text-sm font-medium list-none">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <li key={label}>
                <Link href={href} style={{ color: active ? "var(--ink)" : "var(--muted)", textDecoration: "none", borderBottom: `1.5px solid ${active ? "var(--accent)" : "transparent"}`, paddingBottom: 2 }}
                  className="transition-colors hover:text-[var(--ink)]">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* Search */}
          <button onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 border rounded-2xl px-4 py-1.5 text-sm transition-colors"
            style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--muted)", cursor: "pointer", fontFamily: "inherit" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent2)")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}>
            🔍 <span>Cari produk...</span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded border ml-4"
              style={{ background: "var(--paper)", borderColor: "var(--border)" }}>⌘K</kbd>
          </button>
          <button onClick={() => setSearchOpen(true)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            style={{ background: "var(--cream)", border: "none", cursor: "pointer", fontSize: 16 }}>🔍</button>

          {/* User / Login */}
          {user ? (
            <Link href="/profil"
              className="hidden sm:flex items-center gap-1.5 border rounded-2xl px-3 py-1.5 text-sm no-underline transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--ink)", background: "var(--cream)" }}>
              <span style={{ fontSize: 16 }}>{user.avatar}</span>
              <span className="hidden md:inline text-xs font-medium">{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link href="/login"
              className="hidden sm:block border rounded-2xl px-4 py-1.5 text-sm font-medium no-underline"
              style={{ borderColor: "var(--border)", color: "var(--ink)", background: "var(--cream)", textDecoration: "none" }}>
              Masuk
            </Link>
          )}

          {/* Cart */}
          <button onClick={handleCart}
            className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all"
            style={{ background: cartFlash ? "var(--accent2)" : "var(--ink)", color: "var(--paper)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
            🛒 <span className="hidden sm:inline">Keranjang</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
                style={{ background: "var(--accent)", color: "#fff" }}>{totalItems}</span>
            )}
          </button>

          {/* Hamburger */}
          <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "var(--cream)", border: "none", cursor: "pointer", color: "var(--ink)", fontSize: 16 }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-[61px] left-0 right-0 border-b z-30 md:hidden"
          style={{ background: "var(--paper)", borderColor: "var(--border)" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)}
              className="block px-6 py-3.5 text-sm border-b"
              style={{ color: pathname === href ? "var(--accent)" : "var(--ink)", textDecoration: "none", borderColor: "var(--border)" }}>
              {label}
            </Link>
          ))}
          {user ? (
            <Link href="/profil" onClick={() => setMenuOpen(false)}
              className="block px-6 py-3.5 text-sm border-b" style={{ color: "var(--ink)", textDecoration: "none", borderColor: "var(--border)" }}>
              👤 Profil ({user.name.split(" ")[0]})
            </Link>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}
              className="block px-6 py-3.5 text-sm" style={{ color: "var(--accent2)", textDecoration: "none" }}>
              🔐 Masuk / Daftar
            </Link>
          )}
        </div>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
