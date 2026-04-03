import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StormGate — AI-Powered Contextual Weather Subscriptions",
  description:
    "A growth experimentation engine that uses real-time weather signals and AI to dynamically optimize subscription conversion. Built as a portfolio project for The Weather Company APM role.",
  openGraph: {
    title: "StormGate — Contextual Weather Subscription Engine",
    description:
      "AI-powered contextual paywalls that convert weather urgency into subscription revenue.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#020b18] text-slate-100 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
