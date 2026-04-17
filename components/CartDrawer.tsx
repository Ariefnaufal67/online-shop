"use client";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";
import { useToast } from "./Toast";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice, clearCart } = useCart();
  const { show } = useToast();
  const router   = useRouter();

  const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID").replace(/,/g, ".");
  const discount   = Math.floor(totalPrice * 0.05);
  const grandTotal = Math.floor(totalPrice * 0.95);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50" style={{ background: "rgba(14,12,10,0.45)" }}
          onClick={closeCart} />
      )}

      <div className="fixed top-0 right-0 h-full z-50 flex flex-col transition-transform duration-300"
        style={{
          width: "min(420px, 100vw)",
          background: "var(--paper)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          borderLeft: "1px solid var(--border)",
          boxShadow: isOpen ? "-8px 0 32px rgba(0,0,0,0.1)" : "none",
        }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--border)" }}>
          <div>
            <h2 className="font-display font-light" style={{ fontSize: 22 }}>Keranjang</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{totalItems} item</p>
          </div>
          <button onClick={closeCart}
            className="w-9 h-9 rounded-full flex items-center justify-center text-base"
            style={{ background: "var(--cream)", border: "none", cursor: "pointer", color: "var(--ink)" }}>
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span style={{ fontSize: 56 }}>🛒</span>
              <p className="font-display font-light" style={{ fontSize: 20 }}>Keranjang kosong</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>Tambahkan produk favoritmu!</p>
              <button onClick={closeCart}
                className="rounded-2xl px-6 py-2.5 text-sm font-medium text-white mt-2"
                style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.name} className="flex gap-4 p-4 rounded-2xl border"
                  style={{ background: "var(--card-bg)", borderColor: "var(--border)" }}>
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--cream)", fontSize: 28 }}>
                    {item.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{item.brand}</p>
                    <p className="text-sm font-medium mt-1" style={{ color: "var(--accent)" }}>{item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1 rounded-xl border overflow-hidden"
                        style={{ borderColor: "var(--border)" }}>
                        <button onClick={() => updateQty(item.name, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm"
                          style={{ background: "var(--cream)", border: "none", cursor: "pointer", color: "var(--ink)" }}>−</button>
                        <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                        <button onClick={() => updateQty(item.name, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm"
                          style={{ background: "var(--cream)", border: "none", cursor: "pointer", color: "var(--ink)" }}>+</button>
                      </div>
                      <button onClick={() => { removeItem(item.name); show(`🗑️ ${item.name} dihapus`); }}
                        className="text-xs"
                        style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                        Hapus
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs" style={{ color: "var(--muted)" }}>Subtotal</p>
                    <p className="text-sm font-medium mt-0.5">
                      {fmt(parseInt(item.price.replace(/\D/g, "")) * item.qty)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-6 py-5" style={{ borderColor: "var(--border)" }}>
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between text-sm" style={{ color: "var(--muted)" }}>
                <span>Subtotal ({totalItems} item)</span>
                <span>{fmt(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "var(--muted)" }}>
                <span>Ongkir</span>
                <span className="font-medium" style={{ color: "var(--accent2)" }}>GRATIS</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "var(--muted)" }}>
                <span>Diskon member</span>
                <span style={{ color: "var(--accent2)" }}>− {fmt(discount)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t" style={{ borderColor: "var(--border)", fontSize: 15 }}>
                <span>Total</span>
                <span>{fmt(grandTotal)}</span>
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <input type="text" placeholder="Kode promo..."
                className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none"
                style={{ borderColor: "var(--border)", background: "var(--cream)", color: "var(--ink)" }} />
              <button className="rounded-xl px-4 py-2 text-sm border font-medium"
                style={{ borderColor: "var(--border)", background: "none", cursor: "pointer", fontFamily: "inherit", color: "var(--ink)" }}
                onClick={() => show("❌ Kode promo tidak valid")}>
                Pakai
              </button>
            </div>

            {/* ← Gunakan button + router.push, bukan <a href> */}
            <button onClick={handleCheckout}
              className="w-full rounded-2xl py-3.5 text-sm font-medium text-white transition-colors"
              style={{ background: "var(--accent)", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              Checkout — {fmt(grandTotal)}
            </button>

            <p className="text-center text-xs mt-3" style={{ color: "var(--muted)" }}>
              🔒 Pembayaran aman · Gratis return 30 hari
            </p>
          </div>
        )}
      </div>
    </>
  );
}
