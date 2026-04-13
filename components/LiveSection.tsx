"use client";
import { useEffect, useState } from "react";
import { LIVE_EVENTS, AI_REPLIES, LiveEvent } from "@/data/products";
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

function getAIReply(q: string): string {
  const lower = q.toLowerCase();
  for (const r of AI_REPLIES) {
    if (r.keys.some((k) => lower.includes(k))) return r.reply;
  }
  return "Pertanyaan bagus! Berdasarkan profil gaya kamu, coba eksplorasi koleksi berdasarkan mood hari ini. Ada pertanyaan lebih spesifik? ✨";
}

export default function LiveSection() {
  const [events, setEvents] = useState<LiveEvent[]>(LIVE_EVENTS.slice(0, 6));
  const [idx, setIdx] = useState(6);
  const [aiText, setAiText] = useState("Halo! Saya siap bantu kamu menemukan outfit sempurna. Tanya apapun tentang gaya, ukuran, atau rekomendasi produk!");
  const [input, setInput] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      const next = LIVE_EVENTS[idx % LIVE_EVENTS.length];
      setEvents((prev) => [next, ...prev.slice(0, 7)]);
      setIdx((i) => i + 1);
    }, 4000);
    return () => clearInterval(t);
  }, [idx]);

  const ask = (q: string) => {
    if (!q.trim()) return;
    const reply = getAIReply(q);
    setAiText("");
    setTimeout(() => setAiText(reply), 180);
    setInput("");
  };

  return (
    <section className="px-10 py-14">
      <h2 className="font-display font-light mb-1" style={{ fontSize: 32 }}>Sedang terjadi di NuvaShop</h2>
      <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
        <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 animate-pulse-dot" style={{ background: "#ef4444" }} />
        Live activity dari komunitas kamu
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Feed */}
        <div className="rounded-2xl border p-5 overflow-y-auto" style={{ maxHeight: 360, background: "var(--card-bg)", borderColor: "var(--border)" }}>
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

        {/* AI Chat */}
        <div className="rounded-2xl border p-5 flex flex-col gap-4" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2 text-sm font-medium">🤖 Tanya Style AI</div>

          <div className="text-sm leading-7 border-l-2 pl-3 min-h-[80px] animate-fade-in"
            style={{ color: "var(--muted)", borderColor: "var(--accent)" }}>
            {aiText}
          </div>

          <div className="flex flex-col gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button key={s.text} onClick={() => ask(s.text)}
                className="rounded-lg px-3 py-1.5 text-xs text-left border-none cursor-pointer transition-colors"
                style={{ background: "var(--cream)", color: "var(--muted)" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.background = "#e8e2d8"; (e.target as HTMLElement).style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.background = "var(--cream)"; (e.target as HTMLElement).style.color = "var(--muted)"; }}>
                {s.icon} {s.text}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && ask(input)}
              placeholder="Ketik pertanyaan kamu..."
              className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "var(--border)", background: "var(--paper)", color: "var(--ink)" }} />
            <button onClick={() => ask(input)}
              className="rounded-xl px-4 py-2 text-sm text-white border-none cursor-pointer"
              style={{ background: "var(--accent2)" }}>
              Kirim
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
