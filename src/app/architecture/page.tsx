"use client";

import { useEffect, useState } from "react";
import { Layers, Globe, Zap, Database, Brain, Shield, ArrowRight, ChevronDown } from "lucide-react";

const PM_PIPELINE = [
  {
    icon: Globe,
    color: "#3b82f6",
    step: "01",
    layer: "Signal Collection",
    title: "User session opens on weather.com",
    pmNote: "360M Monthly Active Users sessions/month. IP-based location provides a zero-friction fallback, but we will prompt for precise HTML5 coordinates during moderate storms to ensure accurate severe-weather WMS routing later. Uses anonymous, privacy-compliant first-party cookies for session stickiness, requiring zero PII.",
    engNote: "Vercel Edge Function intercepts request at nearest PoP. Extracts lat/lon, calls Open-Meteo API for real-time conditions. P99 latency < 50ms.",
    question: "PM question to eng: Is dwell trajectory trackable without cross-session state? If yes, WMS gains its second input signal.",
  },
  {
    icon: Zap,
    color: "#8b5cf6",
    step: "02",
    layer: "WMS Computation",
    title: "Weather Moment Score calculated at the edge",
    pmNote: "WMS = (Severity Index × 0.55) + (Dwell Trajectory × 0.25) + (Geo Exposure Rate × 0.20). Computed fresh per session. Uses anonymous cookies to map A/B testing without PII, privacy-safe by design.",
    engNote: "Severity classification is deterministic (WMO code lookup table). Dwell trajectory uses In-session JS refresh counter. Geo exposure rate from pre-cached regional severity maps.",
    question: "PM question: At what WMS update frequency do we re-route the experiment cohort? Real-time or per-session threshold?",
  },
  {
    icon: Brain,
    color: "#f59e0b",
    step: "03",
    layer: "Lever Routing",
    title: "WMS routes session to one growth lever",
    pmNote: "WMS < 35 → EXP-A (ad format). WMS 35–64 → EXP-B (push opt-in). WMS ≥ 65 → EXP-C (contextual paywall). Mutual exclusion prevents inter-lever interference.",
    engNote: "Routing logic runs in edge function. A simple if/else on the WMS float. Variant assignment is sticky for session duration via a signed cookie. A/B split is 50/50 Bernoulli.",
    question: "Eng constraint: sticky assignment via cookie is lost in incognito. Does this bias our sample? Decision: accept this as a known limitation and document it in the experiment spec.",
  },
  {
    icon: Database,
    color: "#10b981",
    step: "04",
    layer: "AI Copy Generation (EXP-C)",
    title: "LLM generates contextual paywall copy",
    pmNote: "Claude Haiku (via OpenRouter) receives severity + exact conditions + location → returns JSON with headline, subheadline, CTA. Rule-based fallback engine ensures 100% availability even if LLM call fails.",
    engNote: "LLM call is async, non-blocking. Rule-based engine runs synchronously as a default and as fallback. P99 LLM response: ~280ms. Total page impact: < 50ms thanks to parallel fetch architecture.",
    question: "PM question: Is AI-generated copy necessary at scale, or does a well-designed rule-based engine capture 90% of the lift? Test answer: run a 3-way test (control vs. Rule-based vs. LLM) in EXP-D.",
  },
  {
    icon: Shield,
    color: "#ef4444",
    step: "05",
    layer: "Measurement & Guard Rails",
    title: "Results tracked, guard rails enforced",
    pmNote: "Primary: Free trial Conversion Rate. Secondary: 30-day retention of weather-triggered cohort vs. organic. Guard rail: paywall dismissal rate. Kill switch: if dismissal rate increases >5pp, auto-route all sessions back to control.",
    engNote: "Events logged: WMS score, lever assigned, variant shown, conversion action, dismissal action. Analytics: Amplitude event schema. Kill switch: edge function flag in Vercel KV, sub-second propagation.",
    question: "PM question before launch: Do we have a data pipeline that tracks 30-day subscription retention by experiment cohort? If not, can we build a cohort tag before experiment starts?",
  },
];

const TECH_STACK = [
  { name: "Next.js 15", desc: "App Router · Edge Runtime", color: "#ffffff", detail: "Server Components for weather data; Client Components for interactive UI" },
  { name: "Open-Meteo", desc: "Real-time weather data", color: "#38bdf8", detail: "Free, global weather API. Production upgrade: TWC Enterprise Weather Data APIs" },
  { name: "Claude Haiku (OpenRouter)", desc: "AI copy generation", color: "#f59e0b", detail: "<300ms median response. Rule-based fallback at 100% coverage" },
  { name: "Vercel Edge", desc: "WMS computation layer", color: "#a855f7", detail: "300+ global PoPs. WMS computed in <5ms, no cold starts" },
  { name: "Recharts", desc: "Experiment dashboard", color: "#22c55e", detail: "Conversion Rate trend charts, segment breakdown visualizations" },
  { name: "Tailwind CSS v4", desc: "Design system", color: "#3b82f6", detail: "Dark mode, severity-reactive color tokens" },
];

export default function ArchitecturePage() {
  const [animateIn, setAnimateIn] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020b18] to-[#040f1f] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Layers className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-sm text-purple-400 font-semibold uppercase tracking-wider">
              The System
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">How StormGate Works</h1>
          <p className="text-slate-300 max-w-2xl leading-relaxed">
            A PM-level view of the five-layer pipeline. From user session to growth lever activation. 
            Each layer shows both the <span className="text-blue-300">product rationale</span> and the{" "}
            <span className="text-green-300">engineering implementation</span>, and the PM question I&apos;d ask 
            before shipping each to production at TWC scale.
          </p>
        </div>

        {/* PM × Eng reads */}
        <div className="glass rounded-2xl p-4 mb-8 border border-white/6">
          <div className="flex items-center gap-6 text-xs flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-blue-500/30 border border-blue-500/40" />
              <span className="text-slate-300">Product rationale</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-green-500/15 border border-green-500/25" />
              <span className="text-slate-300">Engineering implementation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-amber-500/15 border border-amber-500/25" />
              <span className="text-slate-300">PM question before shipping</span>
            </div>
          </div>
        </div>

        {/* Pipeline steps */}
        <div className={`mb-10 transition-all duration-700 delay-100 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="space-y-2">
            {PM_PIPELINE.map((step, i) => {
              const Icon = step.icon;
              const isExpanded = expandedStep === i;
              return (
                <div
                  key={i}
                  className={`glass rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isExpanded ? "border-white/10" : "border-white/5"
                  }`}
                >
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/2 transition-colors"
                    onClick={() => setExpandedStep(isExpanded ? null : i)}
                  >
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}
                    >
                      {step.step}
                    </div>
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${step.color}10` }}
                    >
                      <Icon className="h-4.5 w-4.5" style={{ color: step.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: step.color }}>
                        {step.layer}
                      </div>
                      <div className="text-white font-semibold text-sm">{step.title}</div>
                    </div>
                    {i < PM_PIPELINE.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-slate-300 flex-shrink-0 hidden md:block" />
                    )}
                    <ChevronDown
                      className={`h-4 w-4 text-slate-300 flex-shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-5 pb-5 space-y-3">
                      <div className="rounded-xl p-3 bg-blue-500/5 border border-blue-500/15">
                        <div className="text-[10px] font-bold uppercase tracking-wide text-blue-400 mb-1.5">Product rationale</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{step.pmNote}</p>
                      </div>
                      <div className="rounded-xl p-3 bg-green-500/5 border border-green-500/12">
                        <div className="text-[10px] font-bold uppercase tracking-wide text-green-400 mb-1.5">Engineering implementation (this demo)</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{step.engNote}</p>
                      </div>
                      <div className="rounded-xl p-3 bg-amber-500/5 border border-amber-500/12">
                        <div className="text-[10px] font-bold uppercase tracking-wide text-amber-400 mb-1.5">PM question before shipping at TWC scale</div>
                        <p className="text-slate-300 text-sm leading-relaxed">{step.question}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Production upgrade note */}
        <div className={`glass rounded-2xl p-6 mb-8 border border-blue-900/30 transition-all duration-700 delay-200 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ background: "rgba(0, 73, 144, 0.07)" }}
        >
          <div className="flex items-start gap-3">
            <Database className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-2">Production upgrade path: Open-Meteo → TWC Enterprise APIs</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                This demo uses Open-Meteo. A free, public weather API. In production on weather.com, this layer 
                would be replaced with TWC&apos;s own enterprise weather data services, which provide:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { label: "4× accuracy improvement", detail: "TWC's proprietary forecast models vs. Global open APIs" },
                  { label: "Proprietary signal enrichment", detail: "Historical severity patterns by exact address, not just city" },
                  { label: "Sub-minute update intervals", detail: "Open-Meteo updates hourly; TWC's radar data updates every 2 min" },
                  { label: "Enterprise SLA", detail: "99.99% uptime vs. Best-effort open API. Required at 360M Monthly Active Users" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2 glass rounded-lg p-2.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-white">{item.label}</div>
                      <div className="text-xs text-slate-300">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className={`transition-all duration-700 delay-300 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">Tech Stack. This Demo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TECH_STACK.map(({ name, desc, color, detail }) => (
              <div key={name} className="glass glass-hover rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                  <div className="text-white font-medium text-sm">{name}</div>
                </div>
                <div className="text-slate-300 text-xs mb-1">{desc}</div>
                <div className="text-slate-300 text-xs leading-relaxed">{detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
