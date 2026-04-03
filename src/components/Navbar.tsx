"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, FlaskConical, Layers, BookOpen } from "lucide-react";

const navLinks = [
  { href: "/", label: "Weather Demo", icon: Cloud },
  { href: "/experiment", label: "Experiment Simulator", icon: FlaskConical },
  { href: "/architecture", label: "Architecture", icon: Layers },
  { href: "/case-study", label: "Case Study", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#020b18]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-sky-400 opacity-0 group-hover:opacity-40 blur-md transition-opacity" />
            </div>
            <div>
              <span className="text-white font-semibold text-[15px] tracking-tight">
                Storm<span className="gradient-text">Gate</span>
              </span>
              <div className="text-[10px] text-slate-500 -mt-0.5">AI Subscription Engine</div>
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

          {/* PM badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/10">
            <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs text-purple-300 font-medium">Portfolio Project</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
