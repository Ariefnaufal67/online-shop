import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import { ToastProvider } from "@/components/Toast";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "NuvaShop — Belanja Generasi Baru",
  description: "Online shop dengan AI Style DNA, Mood Shopping, Virtual Fit Score & Live Social Proof",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        <ToastProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
