import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "KYSHIBLUE — Code. Music. Culture. Life.",
    template: "%s — KYSHIBLUE",
  },
  description:
    "KYSHIBLUE is an interactive 3D music archive and personal digital universe. Don't just browse. Explore the world.",
  openGraph: {
    title: "KYSHIBLUE",
    description:
      "Interactive 3D Music Archive & Personal Digital Universe. Code. Music. Culture. Life.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="grain scanlines min-h-screen bg-void text-bone antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
