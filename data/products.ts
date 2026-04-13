export type Mood =
  | "Percaya Diri"
  | "Santai & Nyaman"
  | "Petualangan"
  | "Romantis"
  | "Profesional"
  | "Kreatif & Berani";

export interface Product {
  name: string;
  brand: string;
  price: string;
  emoji: string;
  bg: "bg1" | "bg2" | "bg3" | "bg4";
  score: string;
  proof: string;
}

export interface LiveEvent {
  av: "av1" | "av2" | "av3" | "av4";
  init: string;
  name: string;
  action: string;
  item: string;
  time: string;
}

export const MOODS: { label: Mood; icon: string }[] = [
  { label: "Percaya Diri", icon: "✨" },
  { label: "Santai & Nyaman", icon: "😌" },
  { label: "Petualangan", icon: "🌿" },
  { label: "Romantis", icon: "🌸" },
  { label: "Profesional", icon: "💼" },
  { label: "Kreatif & Berani", icon: "🎨" },
];

export const PRODUCTS: Record<Mood, Product[]> = {
  "Percaya Diri": [
    { name: "Power Blazer Hitam", brand: "Studio N", price: "Rp 389.000", emoji: "🧥", bg: "bg1", score: "97% match", proof: "12 orang beli hari ini" },
    { name: "Heels Statement", brand: "Nuva Footwear", price: "Rp 259.000", emoji: "👠", bg: "bg3", score: "94% match", proof: "5 tersisa!" },
    { name: "Tote Bag Premium", brand: "Arkive", price: "Rp 199.000", emoji: "👜", bg: "bg4", score: "91% match", proof: "★★★★★ 128 ulasan" },
    { name: "Kemeja Silk Cream", brand: "Linen & Co", price: "Rp 279.000", emoji: "👔", bg: "bg2", score: "89% match", proof: "Terlaris minggu ini" },
  ],
  "Santai & Nyaman": [
    { name: "Oversized Hoodie", brand: "Soft Studio", price: "Rp 245.000", emoji: "👕", bg: "bg2", score: "98% match", proof: "Favorit 340 pelanggan" },
    { name: "Jogger Pants Cozy", brand: "Nuva Comfy", price: "Rp 185.000", emoji: "👖", bg: "bg4", score: "95% match", proof: "8 orang beli hari ini" },
    { name: "Sandal Rajut", brand: "Kaki Bebas", price: "Rp 129.000", emoji: "🩴", bg: "bg1", score: "92% match", proof: "★★★★★ 89 ulasan" },
    { name: "Topi Canvas", brand: "Daily Wear", price: "Rp 99.000", emoji: "🧢", bg: "bg3", score: "88% match", proof: "Baru restok!" },
  ],
  "Petualangan": [
    { name: "Hiking Vest", brand: "Rimba Co", price: "Rp 345.000", emoji: "🦺", bg: "bg2", score: "96% match", proof: "Trail-tested 200+" },
    { name: "Sepatu Trail", brand: "Langkah Alam", price: "Rp 485.000", emoji: "👟", bg: "bg1", score: "94% match", proof: "6 terjual hari ini" },
    { name: "Topi Wide Brim", brand: "Petualang", price: "Rp 149.000", emoji: "🎩", bg: "bg3", score: "90% match", proof: "★★★★★ 54 ulasan" },
    { name: "Celana Cargo", brand: "Rimba Co", price: "Rp 299.000", emoji: "👖", bg: "bg4", score: "87% match", proof: "Pilihan petualang" },
  ],
  "Romantis": [
    { name: "Midi Dress Floral", brand: "Bunga Studio", price: "Rp 329.000", emoji: "👗", bg: "bg3", score: "99% match", proof: "Terlaris di kategori ini" },
    { name: "Cardigan Pastel", brand: "Lembut & Co", price: "Rp 215.000", emoji: "🧶", bg: "bg2", score: "95% match", proof: "18 beli minggu ini" },
    { name: "Tas Wicker Mini", brand: "Rattan Chic", price: "Rp 175.000", emoji: "🧺", bg: "bg1", score: "91% match", proof: "★★★★★ 67 ulasan" },
    { name: "Flat Mules Nude", brand: "Nuva Footwear", price: "Rp 219.000", emoji: "🩰", bg: "bg4", score: "89% match", proof: "Hanya 4 tersisa" },
  ],
  "Profesional": [
    { name: "Blazer Structured", brand: "Office Edit", price: "Rp 420.000", emoji: "🧥", bg: "bg4", score: "97% match", proof: "Pilihan eksekutif" },
    { name: "Trousers Wide Leg", brand: "Office Edit", price: "Rp 289.000", emoji: "👖", bg: "bg1", score: "93% match", proof: "12 terjual hari ini" },
    { name: "Oxford Shoes", brand: "Formal Step", price: "Rp 365.000", emoji: "👞", bg: "bg3", score: "90% match", proof: "★★★★★ 95 ulasan" },
    { name: "Totebag Kulit", brand: "Arkive", price: "Rp 339.000", emoji: "💼", bg: "bg2", score: "88% match", proof: "Restok terbatas" },
  ],
  "Kreatif & Berani": [
    { name: "Printed Co-ord Set", brand: "Nuva Studio", price: "Rp 359.000", emoji: "🎨", bg: "bg3", score: "96% match", proof: "Viral 2 hari lalu!" },
    { name: "Platform Sneakers", brand: "Kaki Bebas", price: "Rp 299.000", emoji: "👟", bg: "bg2", score: "93% match", proof: "9 beli hari ini" },
    { name: "Statement Earrings", brand: "Perhiasan N", price: "Rp 89.000", emoji: "💎", bg: "bg1", score: "91% match", proof: "★★★★★ 43 ulasan" },
    { name: "Bucket Hat Grafis", brand: "Street N", price: "Rp 119.000", emoji: "🎩", bg: "bg4", score: "87% match", proof: "Edisi terbatas!" },
  ],
};

export const LIVE_EVENTS: LiveEvent[] = [
  { av: "av1", init: "AY", name: "Ayu Y.", action: "baru saja membeli", item: "Power Blazer Hitam", time: "2 dtk" },
  { av: "av2", init: "RH", name: "Rizki H.", action: "menambahkan ke wishlist", item: "Midi Dress Floral", time: "18 dtk" },
  { av: "av3", init: "DN", name: "Dina N.", action: "memberikan ★★★★★ untuk", item: "Oversized Hoodie", time: "45 dtk" },
  { av: "av4", init: "BW", name: "Bagas W.", action: "melihat", item: "Hiking Vest", time: "1 mnt" },
  { av: "av1", init: "SA", name: "Siti A.", action: "membeli", item: "Heels Statement", time: "2 mnt" },
  { av: "av2", init: "FP", name: "Fajar P.", action: "bertanya AI tentang", item: "ukuran Blazer", time: "3 mnt" },
  { av: "av3", init: "MR", name: "Maya R.", action: "share koleksi", item: "Kreatif & Berani", time: "5 mnt" },
  { av: "av4", init: "TK", name: "Tika K.", action: "baru saja membeli", item: "Cardigan Pastel", time: "7 mnt" },
  { av: "av1", init: "IA", name: "Irfan A.", action: "mencoba Virtual Fit untuk", item: "Trousers Wide Leg", time: "9 mnt" },
  { av: "av2", init: "NW", name: "Nadia W.", action: "membeli", item: "Printed Co-ord Set", time: "12 mnt" },
];

export const AI_REPLIES: { keys: string[]; reply: string }[] = [
  { keys: ["formal", "meeting", "kantor", "kerja"], reply: "Untuk tampilan formal, saya rekomendasikan Blazer Structured + Trousers Wide Leg dari koleksi Profesional. Padukan dengan Oxford Shoes untuk kesan elegan! 💼" },
  { keys: ["kasual", "santai", "sehari", "rumah"], reply: "Outfit kasual terbaik? Coba Oversized Hoodie + Jogger Pants dari mood Santai & Nyaman. Tambahkan Sandal Rajut untuk tampilan relaxed tapi stylish! 😌" },
  { keys: ["mix", "match", "padukan", "warna"], reply: "Tips mix & match: gunakan prinsip 60-30-10 — 60% warna netral, 30% warna pilihan, 10% aksen. Koleksi NuvaShop dirancang agar mudah dipadukan! 🎨" },
  { keys: ["ukuran", "size", "fit", "besar", "kecil"], reply: "Gunakan fitur Virtual Fit Score kami! Klik tombol 'Coba Virtual' di produk manapun — AI akan memberikan skor kecocokan personal! 👗" },
  { keys: ["romantis", "date", "kencan", "makan"], reply: "Untuk tampilan romantis, Midi Dress Floral + Flat Mules Nude adalah kombinasi sempurna! Tambahkan Tas Wicker Mini untuk sentuhan feminin 🌸" },
  { keys: ["murah", "promo", "diskon", "sale"], reply: "Ada beberapa pilihan menarik di bawah Rp 150.000: Topi Canvas (Rp 99.000), Statement Earrings (Rp 89.000), dan Sandal Rajut (Rp 129.000)! ✨" },
];
