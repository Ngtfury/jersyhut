import type { Metadata } from "next";
import { Josefin_Sans, Inter } from "next/font/google";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jersey Hut | Home",
  description: "Get high-quality, affordable kits with fast shipping and secure checkout. Perfect for every fan!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${inter.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-black text-white font-sans">{children}</body>
    </html>
  );
}
