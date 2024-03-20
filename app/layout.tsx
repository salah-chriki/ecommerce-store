import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const font = Oxanium({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RPShop",
    template: "%s - RPShop",
  },
  description: "Cheapest RP anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
