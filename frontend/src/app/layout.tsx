import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { injectDesignSystemRootStyle } from "@/lib/designSystem";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Market Krizörü",
  description: "Gamified fintech market simülatörü — MVP arayüzü (mock veri).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={injectDesignSystemRootStyle()}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
