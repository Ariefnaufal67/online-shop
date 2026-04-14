import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogClient from "./BlogClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog — NuvaShop" };

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <BlogClient />
      <Footer />
    </>
  );
}
