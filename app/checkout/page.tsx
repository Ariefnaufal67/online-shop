"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/components/Toast";
import Navbar from "@/components/Navbar";

const STEPS = ["Alamat", "Pengiriman", "Pembayaran", "Konfirmasi"];

const COURIERS = [
  { id: "jne-reg",  name: "JNE Reguler",   estimate: "3-5 hari",  price: 0,       logo: "📦" },
  { id: "jne-yes",  name: "JNE YES",        estimate: "1-2 hari",  price: 15000,   logo: "⚡" },
  { id: "scp-reg",  name: "SiCepat Reguler",estimate: "2-4 hari",  price: 0,       logo: "🚚" },
  { id: "gos-inst", name: "GoSend Instan",  estimate: "Hari ini",  price: 25000,   logo: "🛵" },
];

const PAYMENT_METHODS = [
  { id: "bca",    name: "Transfer BCA",        icon: "🏦", detail: "1234 5678 9012" },
  { id: "bni",    name: "Transfer BNI",        icon: "🏛️", detail: "9876 5432 1098" },
  { id: "gopay",  name: "GoPay",               icon: "💚", detail: "Scan QR atau link" },
  { id: "ovo",    name: "OVO",                 icon: "💜", detail: "Scan QR atau link" },
  { id: "cc",     name: "Kartu Kredit/Debit",  icon: "💳", detail: "Visa, Mastercard, JCB" },
  { id: "cod",    name: "Bayar di Tempat (COD)",icon: "💵",detail: "Maks. Rp 500.000" },
];

const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");

export default function CheckoutPage() {
  const [step, setStep]       = useState(0);
  const [courier, setCourier] = useState("jne-reg");
  const [payment, setPayment] = useState("bca");
  const [orderId, setOrderId] = useState("");
  const [addr, setAddr]       = useState({ name:"", phone:"", address:"", city:"", postal:"", notes:"" });

  const { items, totalPrice, clearCart } = useCart();
  const { user, addOrder }               = useAuth();
  const { show }                         = useToast();
  const router                           = useRouter();

  const selectedCourier = COURIERS.find(c => c.id === courier)!;
  const shippingFee     = selectedCourier?.price ?? 0;
  const discount        = Math.floor(totalPrice * 0.05);
  const grandTotal      = totalPrice + shippingFee - discount;

  const handlePlaceOrder = () => {
    const id = addOrder({
      status: "processing",
      items: items.map(i => ({ name: i.name, emoji: i.emoji, price: i.price, qty: i.qty })),
      total: grandTotal,
    });
    setOrderId(id);
    clearCart();
    setStep(3);
  };

  if (items.length === 0 && step < 3) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span style={{ fontSize: 56 }}>🛒</span>
          <p className="font-display font-light" style={{ fontSize: 24 }}>Keranjang kosong</p>
          <Link href="/" className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white no-underline"
            style={{ background: "var(--accent)" }}>Mulai Belanja</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-10 py-10" style={{ minHeight: "80vh" }}>
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display font-light mb-8" style={{ fontSize: 34 }}>Checkout</h1>

          {/* Step indicator */}
          {step < 3 && (
            <div className="flex items-center gap-0 mb-10">
              {STEPS.slice(0,3).map((s, i) => (
                <div key={s} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                      style={{
                        background: step === i ? "var(--accent)" : step > i ? "var(--accent2)" : "var(--cream)",
                        color: step >= i ? "#fff" : "var(--muted)",
                      }}>
                      {step > i ? "✓" : i + 1}
                    </div>
                    <span className="text-sm hidden sm:block" style={{ color: step === i ? "var(--ink)" : "var(--muted)", fontWeight: step === i ? 500 : 400 }}>{s}</span>
                  </div>
                  {i < 2 && <div className="w-12 h-px mx-3" style={{ background: "var(--border)" }} />}
                </div>
              ))}
            </div>
          )}

          {/* STEP 0: Alamat */}
          {step === 0 && (
            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
              <div>
                <h2 className="font-medium mb-5 text-base">Alamat Pengiriman</h2>
                {!user && (
                  <div className="rounded-xl p-4 mb-5 text-sm border" style={{ background: "#fdf3d6", borderColor: "#f0dfa0" }}>
                    💡 <Link href="/login" style={{ color: "var(--accent2)", textDecoration:"none", fontWeight:500 }}>Masuk</Link> untuk mengisi alamat otomatis dari profil kamu.
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label:"Nama Penerima",    key:"name",    span:1, ph:"Nama lengkap" },
                    { label:"No. Handphone",    key:"phone",   span:1, ph:"08xx-xxxx-xxxx" },
                    { label:"Alamat Lengkap",   key:"address", span:2, ph:"Jl. Contoh No. 12, RT/RW 01/02" },
                    { label:"Kota / Kabupaten", key:"city",    span:1, ph:"Jakarta Selatan" },
                    { label:"Kode Pos",         key:"postal",  span:1, ph:"12345" },
                    { label:"Catatan (opsional)",key:"notes",  span:2, ph:"Mis. Titip ke satpam" },
                  ].map(f => (
                    <div key={f.key} className={f.span === 2 ? "col-span-2" : ""}>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--muted)" }}>{f.label}</label>
                      <input type="text" placeholder={f.ph}
                        value={addr[f.key as keyof typeof addr]}
                        onChange={e => setAddr(a => ({ ...a, [f.key]: e.target.value }))}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }}
                        onFocus={e => (e.target.style.borderColor = "var(--accent2)")}
                        onBlur={e  => (e.target.style.borderColor = "var(--border)")} />
                    </div>
                  ))}
                </div>
                <button onClick={() => { if (!addr.name || !addr.phone || !addr.address || !addr.city) { show("⚠️ Lengkapi semua field wajib"); return; } setStep(1); }}
                  className="mt-6 rounded-2xl px-8 py-3 text-sm font-medium text-white"
                  style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  Lanjut ke Pengiriman →
                </button>
              </div>
              <OrderSummary items={items} shippingFee={shippingFee} discount={discount} grandTotal={grandTotal} />
            </div>
          )}

          {/* STEP 1: Pengiriman */}
          {step === 1 && (
            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
              <div>
                <h2 className="font-medium mb-5 text-base">Pilih Pengiriman</h2>
                <div className="flex flex-col gap-3">
                  {COURIERS.map(c => (
                    <div key={c.id} onClick={() => setCourier(c.id)}
                      className="flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all"
                      style={{ borderColor: courier === c.id ? "var(--accent)" : "var(--border)", background: courier === c.id ? "#fff8f5" : "var(--card-bg)" }}>
                      <span style={{ fontSize: 24 }}>{c.logo}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{c.name}</p>
                        <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Estimasi: {c.estimate}</p>
                      </div>
                      <p className="text-sm font-medium" style={{ color: c.price === 0 ? "var(--accent2)" : "var(--ink)" }}>
                        {c.price === 0 ? "GRATIS" : fmt(c.price)}
                      </p>
                      <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: courier === c.id ? "var(--accent)" : "var(--border)" }}>
                        {courier === c.id && <div className="w-2 h-2 rounded-full" style={{ background: "var(--accent)" }} />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="rounded-2xl px-6 py-3 text-sm border"
                    style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>
                    ← Kembali
                  </button>
                  <button onClick={() => setStep(2)} className="rounded-2xl px-8 py-3 text-sm font-medium text-white"
                    style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                    Lanjut ke Pembayaran →
                  </button>
                </div>
              </div>
              <OrderSummary items={items} shippingFee={shippingFee} discount={discount} grandTotal={grandTotal} />
            </div>
          )}

          {/* STEP 2: Pembayaran */}
          {step === 2 && (
            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
              <div>
                <h2 className="font-medium mb-5 text-base">Pilih Pembayaran</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PAYMENT_METHODS.map(m => (
                    <div key={m.id} onClick={() => setPayment(m.id)}
                      className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-all"
                      style={{ borderColor: payment === m.id ? "var(--accent)" : "var(--border)", background: payment === m.id ? "#fff8f5" : "var(--card-bg)" }}>
                      <span style={{ fontSize: 22 }}>{m.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{m.name}</p>
                        <p className="text-[10px] truncate" style={{ color: "var(--muted)" }}>{m.detail}</p>
                      </div>
                      <div className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                        style={{ borderColor: payment === m.id ? "var(--accent)" : "var(--border)" }}>
                        {payment === m.id && <div className="w-2 h-2 rounded-full m-auto mt-0.5" style={{ background: "var(--accent)" }} />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="rounded-2xl px-6 py-3 text-sm border"
                    style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}>
                    ← Kembali
                  </button>
                  <button onClick={handlePlaceOrder}
                    className="rounded-2xl px-8 py-3 text-sm font-medium text-white"
                    style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                    Buat Pesanan — {fmt(grandTotal)}
                  </button>
                </div>
              </div>
              <OrderSummary items={items} shippingFee={shippingFee} discount={discount} grandTotal={grandTotal} />
            </div>
          )}

          {/* STEP 3: Sukses */}
          {step === 3 && (
            <div className="max-w-lg mx-auto text-center py-10">
              <div style={{ fontSize: 72 }} className="mb-6">🎉</div>
              <h2 className="font-display font-light mb-3" style={{ fontSize: 32 }}>Pesanan Berhasil!</h2>
              <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>ID Pesanan kamu:</p>
              <p className="font-display font-semibold mb-6" style={{ fontSize: 22, color: "var(--accent2)" }}>{orderId}</p>
              <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                Kami akan segera memproses pesananmu. Kamu bisa memantau status pengiriman di halaman profil.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link href="/tracking" className="rounded-2xl px-6 py-3 text-sm font-medium no-underline"
                  style={{ background: "var(--accent2)", color: "#fff" }}>
                  📦 Lacak Pesanan
                </Link>
                <Link href="/profil" className="rounded-2xl px-6 py-3 text-sm font-medium no-underline border"
                  style={{ borderColor: "var(--border)", color: "var(--ink)" }}>
                  👤 Lihat Profil
                </Link>
                <Link href="/" className="rounded-2xl px-6 py-3 text-sm font-medium no-underline border"
                  style={{ borderColor: "var(--border)", color: "var(--ink)" }}>
                  🛍️ Belanja Lagi
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function OrderSummary({ items, shippingFee, discount, grandTotal }: { items: any[]; shippingFee: number; discount: number; grandTotal: number }) {
  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");
  return (
    <div className="rounded-2xl border p-5 self-start sticky top-20" style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
      <p className="font-medium text-sm mb-4">Ringkasan Pesanan</p>
      <div className="flex flex-col gap-3 mb-4">
        {items.map(item => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: "var(--cream)" }}>{item.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.name}</p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>x{item.qty}</p>
            </div>
            <p className="text-xs font-medium flex-shrink-0">{item.price}</p>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 flex flex-col gap-2" style={{ borderColor: "var(--border)" }}>
        {[
          { label: "Subtotal", val: fmt(items.reduce((s,i) => s + parseInt(i.price.replace(/\D/g,"")) * i.qty, 0)) },
          { label: "Ongkir", val: shippingFee === 0 ? "GRATIS" : fmt(shippingFee), green: shippingFee === 0 },
          { label: "Diskon member 5%", val: `− ${fmt(discount)}`, green: true },
        ].map(r => (
          <div key={r.label} className="flex justify-between text-xs" style={{ color: "var(--muted)" }}>
            <span>{r.label}</span>
            <span style={r.green ? { color: "var(--accent2)", fontWeight: 500 } : {}}>{r.val}</span>
          </div>
        ))}
        <div className="flex justify-between font-medium pt-2 border-t" style={{ borderColor: "var(--border)", fontSize: 14 }}>
          <span>Total</span>
          <span>{fmt(grandTotal)}</span>
        </div>
      </div>
    </div>
  );
}
