"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, FlaskConical, Layers, BookOpen } from "lucide-react";

const navLinks = [
  { href: "/", label: "The Problem", icon: BarChart2 },
  { href: "/case-study", label: "The Framework", icon: BookOpen },
  { href: "/experiment", label: "The Experiment", icon: FlaskConical },
  { href: "/architecture", label: "The System", icon: Layers },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020b18]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#004990] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-blue-900/40">
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#004990] to-[#3b82f6] opacity-0 group-hover:opacity-40 blur-md transition-opacity" />
            </div>
            <div>
              <span className="text-white font-semibold text-[15px] tracking-tight">
                Storm<span className="gradient-text">Gate</span>
              </span>
              <div className="text-[10px] text-slate-500 -mt-0.5">TWC Web Consumer Platform · APM Portfolio</div>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/25"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:block">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* APM badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-900/40 bg-[#004990]/20">
            <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs text-blue-300 font-medium">APM Portfolio · Ali Hasan</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
