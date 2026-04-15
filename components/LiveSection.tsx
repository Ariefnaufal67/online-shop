"use client";
import { useEffect, useState } from "react";
import { LIVE_EVENTS, AI_REPLIES, LiveEvent } from "@/data/products";
import { useCart } from "./CartContext";
import { useToast } from "./Toast";

const AV_STYLE: Record<string, { bg: string; color: string }> = {
  av1: { bg: "#fde8e0", color: "#c8502a" },
  av2: { bg: "#ddf1ee", color: "#2a7c6f" },
  av3: { bg: "#fdf3d6", color: "#b8962e" },
  av4: { bg: "#ddeeff", color: "#2a5c8f" },
};

const SUGGESTIONS = [
  { icon: "💼", text: "outfit untuk meeting formal" },
  { icon: "😌", text: "rekomendasi kasual sehari-hari" },
  { icon: "🎨", text: "cara mix and match warna" },
];

// Quick-add product suggestions that appear after AI reply
const QUICK_PRODUCTS: Record<string, { name: string; brand: string; price: string; emoji: string }[]> = {
  formal: [
    { name: "Blazer Structured", brand: "Office Edit", price: "Rp 420.000", emoji: "🧥" },
    { name: "Oxford Shoes",      brand: "Formal Step", price: "Rp 365.000", emoji: "👞" },
  ],
  kasual: [
    { name: "Oversized Hoodie",  brand: "Soft Studio", price: "Rp 245.000", emoji: "👕" },
    { name: "Jogger Pants Cozy", brand: "Nuva Comfy",  price: "Rp 185.000", emoji: "👖" },
  ],
  mix: [
    { name: "Cardigan Pastel",   brand: "Lembut & Co", price: "Rp 215.000", emoji: "🧶" },
    { name: "Kemeja Silk Cream", brand: "Linen & Co",  price: "Rp 279.000", emoji: "👔" },
  ],
};

function getKey(q: string) {
  if (["formal","meeting","kantor","kerja"].some(k => q.includes(k))) return "formal";
  if (["kasual","santai","sehari","rumah"].some(k => q.includes(k)))  return "kasual";
  if (["mix","match","padukan","warna"].some(k => q.includes(k)))     return "mix";
  return null;
}

function getAIReply(q: string): string {
  const lower = q.toLowerCase();
  for (const r of AI_REPLIES) {
    if (r.keys.some(k => lower.includes(k))) return r.reply;
  }
  return "Pertanyaan bagus! Berdasarkan profil gaya kamu, coba eksplorasi koleksi berdasarkan mood hari ini. Ada pertanyaan lebih spesifik? ✨";
}

export default function LiveSection() {
  const [events, setEvents] = useState<LiveEvent[]>(LIVE_EVENTS.slice(0, 6));
  const [idx, setIdx] = useState(6);
  const [aiText, setAiText] = useState("Halo! Saya siap bantu kamu menemukan outfit sempurna. Tanya apapun tentang gaya, ukuran, atau rekomendasi produk!");
  const [quickKey, setQuickKey] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const { addItem, openCart } = useCart();
  const { show } = useToast();

  useEffect(() => {
    const t = setInterval(() => {
      setEvents(prev => {
        const next = LIVE_EVENTS[idx % LIVE_EVENTS.length];
        setIdx(i => i + 1);
        return [next, ...prev.slice(0, 7)];
      });
    }, 4000);
    return () => clearInterval(t);
  }, [idx]);

  const ask = (q: string) => {
    if (!q.trim()) return;
    const reply = getAIReply(q);
    const key = getKey(q.toLowerCase());
    setAiText("");
    setQuickKey(null);
    setTimeout(() => { setAiText(reply); setQuickKey(key); }, 180);
    setInput("");
  };

  const handleQuickAdd = (p: { name: string; brand: string; price: string; emoji: string }) => {
    addItem(p);
    show(`🛒 ${p.name} ditambahkan ke keranjang!`);
    openCart();
  };

  return (
    <section className="px-6 md:px-10 py-14">
      <h2 className="font-display font-light mb-1" style={{ fontSize: 32 }}>Sedang terjadi di NuvaShop</h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 animate-pulse-dot" style={{ background: "#ef4444" }} />
        Live activity dari komunitas kamu
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Live Feed */}
        <div className="rounded-2xl border p-5 overflow-y-auto" style={{ maxHeight: 380, background: "var(--card-bg)", borderColor: "var(--border)" }}>
          {events.map((e, i) => {
            const av = AV_STYLE[e.av];
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b last:border-b-0 animate-slide-in"
                style={{ borderColor: "var(--border)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                  style={{ background: av.bg, color: av.color }}>{e.init}</div>
                <p className="flex-1 text-xs leading-snug">
                  <strong className="font-medium">{e.name}</strong> {e.action} <strong className="font-medium">{e.item}</strong>
                </p>
                <span className="text-[10px] flex-shrink-0" style={{ color: "var(--muted)" }}>{e.time}</span>
              </div>
            );
          })}
        </div>

        {/* AI Chat Panel */}
        <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 text-sm font-medium">🤖 Tanya Style AI</div>

          {/* AI Answer */}
          <div className="text-sm leading-7 border-l-2 pl-3 min-h-[60px] animate-fade-in"
            style={{ color: "var(--muted)", borderColor: "var(--accent)" }}>
            {aiText}
          </div>

          {/* Quick add products after AI reply */}
          {quickKey && QUICK_PRODUCTS[quickKey] && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>Rekomendasi produk:</p>
              {QUICK_PRODUCTS[quickKey].map(p => (
                <div key={p.name} className="flex items-center gap-3 rounded-xl p-2.5 border"
                  style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
                  <span style={{ fontSize: 22 }}>{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{p.name}</p>
                    <p className="text-[10px]" style={{ color: "var(--muted)" }}>{p.price}</p>
                  </div>
                  <button onClick={() => handleQuickAdd(p)}
                    className="rounded-xl px-3 py-1 text-xs font-medium text-white flex-shrink-0"
                    style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                    + Keranjang
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Suggestion chips */}
          <div className="flex flex-col gap-1.5">
            {SUGGESTIONS.map(s => (
              <button key={s.text} onClick={() => ask(s.text)}
                className="rounded-lg px-3 py-1.5 text-xs text-left border-none cursor-pointer transition-colors"
                style={{ background: "var(--cream)", color: "var(--muted)", fontFamily: "inherit" }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = "#e8e2d8"; (e.target as HTMLElement).style.color = "var(--ink)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = "var(--cream)"; (e.target as HTMLElement).style.color = "var(--muted)"; }}>
                {s.icon} {s.text}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && ask(input)}
              placeholder="Ketik pertanyaan kamu..."
              className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--paper)", color: "var(--ink)" }}
              onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
              onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
            <button onClick={() => ask(input)}
              className="rounded-xl px-4 py-2 text-sm text-white border-none cursor-pointer"
              style={{ background: "var(--accent2)", fontFamily: "inherit" }}>
              Kirim
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
