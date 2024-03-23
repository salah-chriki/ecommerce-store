import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import ToastProvider from "@/providers/toast-provider";

const font = Oxanium({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RPSHOP",
    template: "%s - RPSHOP",
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
        <ToastProvider />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
