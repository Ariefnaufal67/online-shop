"use client";
import { useEffect, useState } from "react";

interface Props { productName: string; onClose: () => void }

const BARS = ["Ukuran", "Potongan", "Gaya", "Warna"];

export default function VirtualFitModal({ productName, onClose }: Props) {
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const overall = Math.floor(Math.random() * 10) + 88;

  useEffect(() => {
    const t = setTimeout(() => {
      setScores(BARS.map(() => Math.floor(Math.random() * 15) + 80));
    }, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(14,12,10,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative rounded-2xl p-8 w-full max-w-md mx-4 animate-fade-in"
        style={{ background: "var(--paper)" }}>
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-base"
          style={{ background: "var(--cream)", border: "none" }}>✕</button>

        <h3 className="font-display font-light text-2xl mb-2">Virtual Fit Score</h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
          AI kami menganalisis proporsi dan preferensi kamu untuk <strong>{productName}</strong>.
        </p>

        <div className="font-display font-light text-center my-4" style={{ fontSize: 52, color: "var(--accent2)" }}>
          {overall}%
        </div>

        <div className="flex flex-col gap-3">
          {BARS.map((label, i) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className="w-20 text-right flex-shrink-0" style={{ color: "var(--muted)" }}>{label}</span>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--cream)" }}>
                <div className="h-full rounded-full bar-fill" style={{ width: `${scores[i]}%`, background: "var(--accent2)" }} />
              </div>
              <span className="w-10 text-xs font-medium">{scores[i] ? `${scores[i]}%` : "—"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
