import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EksplorasiClient from "./EksplorasiClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Eksplorasi — NuvaShop" };

export default function EksplorasiPage() {
  return (
    <>
      <Navbar />
      <EksplorasiClient />
      <Footer />
    </>
  );
}
