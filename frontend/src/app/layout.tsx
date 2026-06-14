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

export const metadata = {
  title: "Market Krizörü v1.0",
  description: "Geliştirici: Sude Erol",
  manifest: "/manifest.json", // Tarayıcıya bunun indirilebilir bir mobil uygulama olduğunu söyleyen sihirli satır!
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
