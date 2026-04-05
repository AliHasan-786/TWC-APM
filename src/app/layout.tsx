import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StormGate. TWC Web Consumer Platform | PM Portfolio",
  description:
    "A PM growth framework for The Weather Company's Web Consumer Platform. Demonstrates how a Weather Moment Score can unlock three revenue levers. Advertising, engagement, and premium. By reading real-time weather signals.",
  openGraph: {
    title: "StormGate. TWC Growth Framework | Ali Hasan APM",
    description:
      "PM portfolio project: How do you grow revenue per visit on weather.com for 360M free users without destroying the ad model? A working experiment design system built for TWC's Web Consumer Platform team.",
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
