import { ToastProvider } from "@/components/Toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EksplorasiClient from "./EksplorasiClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Eksplorasi — NuvaShop" };

export default function EksplorasiPage() {
  return (
    <ToastProvider>
      <Navbar />
      <EksplorasiClient />
      <Footer />
    </ToastProvider>
  );
}
