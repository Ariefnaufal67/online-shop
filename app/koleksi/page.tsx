import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import KoleksiClient from "./KoleksiClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Koleksi — NuvaShop" };

export default function KoleksiPage() {
  return (
    <ToastProvider>
      <Navbar />
      <KoleksiClient />
      <Footer />
    </ToastProvider>
  );
}
