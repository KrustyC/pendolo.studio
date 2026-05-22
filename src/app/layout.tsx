import type { Metadata } from "next";
import { Toaster } from "sonner";
import { GlassCursor } from "@/components/GlassCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pendolo Studio",
  description:
    "Branding, web design and development for businesses that value a different point of view.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlassCursor />
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
