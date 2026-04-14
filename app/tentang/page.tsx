import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tentang Kami — NuvaShop" };

const TEAM = [
  { name: "Aisha Rahma", role: "Co-founder & CEO", emoji: "👩‍💼", bg: "#fde8e0" },
  { name: "Bimo Satrio", role: "Co-founder & CTO", emoji: "👨‍💻", bg: "#ddf1ee" },
  { name: "Clara Dewi", role: "Head of Design", emoji: "👩‍🎨", bg: "#fdf3d6" },
  { name: "Dimas Arief", role: "Lead AI Engineer", emoji: "🤖", bg: "#ddeeff" },
  { name: "Erika Santoso", role: "Head of Curation", emoji: "✨", bg: "#f0e8ff" },
  { name: "Fariz Nugroho", role: "Head of Operations", emoji: "⚙️", bg: "#e8f5e9" },
];

const VALUES = [
  { icon: "🧠", title: "Teknologi yang Manusiawi", desc: "AI kami dirancang untuk memahami, bukan menggantikan, intuisi manusia dalam berbelanja." },
  { icon: "🌿", title: "Berkelanjutan", desc: "Kami bermitra hanya dengan brand yang berkomitmen pada praktik produksi yang etis dan ramah lingkungan." },
  { icon: "❤️", title: "Inklusif", desc: "Fashion untuk semua ukuran, warna kulit, dan identitas. Kami percaya semua orang berhak tampil percaya diri." },
  { icon: "✨", title: "Personal", desc: "Tidak ada dua orang yang sama. Pengalaman belanja di NuvaShop selalu terasa seperti dibuat khusus untukmu." },
];

const MILESTONES = [
  { year: "2022", event: "NuvaShop didirikan di Jakarta dengan 50 produk pertama" },
  { year: "2023", event: "Meluncurkan fitur AI Style DNA — revolusi rekomendasi fashion" },
  { year: "2024", event: "Mencapai 100.000 pengguna aktif dan 500+ brand partner" },
  { year: "2025", event: "Meluncurkan Virtual Fit Score dan Mood Shopping" },
  { year: "2026", event: "Ekspansi ke 5 kota besar Indonesia, 12.000+ produk aktif" },
];

export default function TentangPage() {
  return (
    <ToastProvider>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>

        {/* Hero */}
        <div className="px-10 py-20 border-b" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>✦ Cerita Kami</p>
          <h1 className="font-display font-light mb-6" style={{ fontSize: 52, maxWidth: 640 }}>
            Kami percaya belanja fashion<br />
            bisa jadi <em style={{ color: "var(--accent2)" }}>lebih personal.</em>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", maxWidth: 540 }}>
            NuvaShop lahir dari frustrasi sederhana: kenapa belanja online terasa begitu generik?
            Kami membangun platform yang benar-benar mengerti kamu — bukan hanya algoritmamu.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b" style={{ borderColor: "var(--border)" }}>
          {[
            { val: "12K+", label: "Produk Terkurasi" },
            { val: "100K+", label: "Pengguna Aktif" },
            { val: "500+", label: "Brand Partner" },
            { val: "98%", label: "Tingkat Kepuasan" },
          ].map(s => (
            <div key={s.label} className="px-10 py-10 border-r last:border-r-0 text-center" style={{ borderColor: "var(--border)" }}>
              <div className="font-display font-light mb-1" style={{ fontSize: 40, color: "var(--accent)" }}>{s.val}</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="px-10 py-16 border-r" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Misi</p>
            <h2 className="font-display font-light mb-5" style={{ fontSize: 34 }}>Mendemokratisasi fashion personal</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Dulu, stylist personal hanya bisa dinikmati oleh segelintir orang. Kami hadir untuk mengubah itu —
              dengan teknologi AI yang membuat setiap orang bisa mendapatkan rekomendasi fashion berkualitas tinggi,
              disesuaikan dengan kepribadian, ukuran, anggaran, dan suasana hatimu.
            </p>
          </div>
          <div className="px-10 py-16">
            <p className="text-xs font-medium tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Visi</p>
            <h2 className="font-display font-light mb-5" style={{ fontSize: 34 }}>Masa depan belanja yang manusiawi</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Kami membangun ekosistem di mana AI dan manusia bekerja bersama — AI menganalisis data,
              manusia membawa empati dan kreativitas. Hasilnya: pengalaman belanja yang terasa personal,
              menyenangkan, dan benar-benar relevan.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="px-10 py-16 border-b" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Nilai Kami</p>
          <h2 className="font-display font-light mb-10" style={{ fontSize: 34 }}>Yang kami percayai</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="rounded-2xl p-6 border" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-medium text-sm mb-2">{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="px-10 py-16 border-b" style={{ background: "var(--cream)", borderColor: "var(--border)" }}>
          <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Perjalanan</p>
          <h2 className="font-display font-light mb-10" style={{ fontSize: 34 }}>Dari garasi ke 100K pengguna</h2>
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
            <div className="flex flex-col gap-8">
              {MILESTONES.map(m => (
                <div key={m.year} className="flex items-start gap-8 pl-0">
                  <div className="w-16 text-right flex-shrink-0">
                    <span className="font-display font-semibold text-sm" style={{ color: "var(--accent)" }}>{m.year}</span>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 -translate-x-1.5"
                      style={{ background: "var(--paper)", borderColor: "var(--accent)" }} />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="px-10 py-16 border-b" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Tim</p>
          <h2 className="font-display font-light mb-10" style={{ fontSize: 34 }}>Orang-orang di balik NuvaShop</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {TEAM.map(t => (
              <div key={t.name} className="text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                  style={{ background: t.bg }}>{t.emoji}</div>
                <p className="text-xs font-medium">{t.name}</p>
                <p className="text-[10px] mt-0.5" style={{ color: "var(--muted)" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="px-10 py-16 text-center" style={{ background: "var(--cream)" }}>
          <h2 className="font-display font-light mb-4" style={{ fontSize: 32 }}>
            Bergabunglah dengan komunitas kami
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            100.000+ pengguna sudah menemukan gaya terbaik mereka. Giliran kamu.
          </p>
          <a href="/" className="inline-block rounded-3xl px-10 py-3 text-sm font-medium text-white no-underline"
            style={{ background: "var(--accent)" }}>
            Mulai Belanja Sekarang
          </a>
        </div>

      </main>
      <Footer />
    </ToastProvider>
  );
}
