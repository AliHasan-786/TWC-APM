"use client";

import { Code, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-16 py-8 px-4">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-slate-500 font-medium">
            StormGate · Built by{" "}
            <span className="text-slate-400">Ali Hasan</span>
          </span>
          <span className="hidden sm:block text-slate-700">·</span>
          <span>
            APM Portfolio Project · Targeting{" "}
            <span className="text-blue-500/80">TWC Web Consumer Platform</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/AliHasan-786/TWC-APM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <Code className="h-3.5 w-3.5" />
            Source on GitHub
          </a>
          <span className="text-slate-800">·</span>
          <span className="text-slate-700">
            Data: Open-Meteo API · AI: OpenRouter/Claude · Stack: Next.js 15 + Vercel Edge
          </span>
        </div>
      </div>
    </footer>
  );
}
