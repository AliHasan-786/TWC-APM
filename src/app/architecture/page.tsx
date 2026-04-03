"use client";

import { useEffect, useState } from "react";
import {
  Layers,
  Server,
  Brain,
  Database,
  Globe,
  ArrowRight,
  Code2,
  Zap,
  Lock,
  ChevronDown,
} from "lucide-react";

const PIPELINE_STEPS = [
  {
    icon: Globe,
    color: "#38bdf8",
    title: "User Visits weather.com",
    desc: "360M monthly active users. IP geolocation detected at the CDN edge.",
    code: null,
  },
  {
    icon: Zap,
    color: "#a855f7",
    title: "Vercel Edge Function",
    desc: "Runs in <5ms globally. No cold starts. Parses location, assigns A/B variant, fetches weather.",
    code: `// Edge middleware — runs at Vercel's 300+ PoPs
export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { lat, lon } = parseLocation(req);
  const weather = await fetchOpenMeteo(lat, lon);
  const severity = classifySeverity(weather);
  return Response.json({ weather, severity });
}`,
  },
  {
    icon: Database,
    color: "#22c55e",
    title: "Open-Meteo API",
    desc: "Free, no-key weather API with global coverage. Returns real-time conditions, hourly + 7-day forecasts.",
    code: `// Open-Meteo — no API key required
const url = "https://api.open-meteo.com/v1/forecast?" +
  \`latitude=\${lat}&longitude=\${lon}\` +
  "&current=temperature_2m,weather_code,wind_speed_10m";`,
  },
  {
    icon: Brain,
    color: "#f59e0b",
    title: "Propensity-to-Buy Model (AI)",
    desc: "LLM acts as a real-time propensity model. Severity + conditions → urgency score → dynamic copy.",
    code: `// Claude Haiku as propensity model
const prompt = \`
  Current weather: \${severity} — \${description}
  Write subscription paywall copy calibrated to
  the user's in-the-moment willingness-to-pay.
  Return JSON: { headline, subheadline, ctaText, urgencyLevel }
\`;`,
  },
  {
    icon: Server,
    color: "#ef4444",
    title: "Context-Aware Paywall Rendered",
    desc: "Copy changes based on weather severity. Extreme storm → life-safety urgency. Clear sky → lifestyle pitch.",
    code: null,
  },
];

const COPY_EXAMPLES = [
  {
    severity: "extreme",
    color: "#dc2626",
    badge: "EXTREME",
    condition: "Category 3 Hurricane · Miami",
    headline: "⚠️ Extreme Conditions Detected in Miami, FL",
    sub: "Tropical storm with 95 km/h winds. Track every minute. Upgrade now — your safety depends on it.",
    cta: "Track Storm Now →",
    urgency: 10,
  },
  {
    severity: "severe",
    color: "#ef4444",
    badge: "SEVERE",
    condition: "Thunderstorm · Oklahoma City",
    headline: "Thunderstorm Warning — Stay Ahead of the Storm",
    sub: "Conditions deteriorating fast. Premium radar updates every 2 minutes. Know when it hits your block.",
    cta: "Upgrade — See Live Radar",
    urgency: 8,
  },
  {
    severity: "clear",
    color: "#38bdf8",
    badge: "CLEAR",
    condition: "Clear Sky · Los Angeles",
    headline: "Beautiful Weather in LA — Make the Most of It",
    sub: "72°F and clear. Premium shows your perfect 14-day window for every outdoor adventure.",
    cta: "Plan My Weekend →",
    urgency: 1,
  },
];

const TECH_STACK = [
  { name: "Next.js 15", desc: "App Router · Edge Runtime", color: "#ffffff" },
  { name: "Open-Meteo", desc: "Free weather API · No key needed", color: "#38bdf8" },
  { name: "Claude Haiku", desc: "AI copy generation · <300ms", color: "#f59e0b" },
  { name: "Vercel Edge", desc: "300+ global PoPs · <5ms", color: "#a855f7" },
  { name: "Recharts", desc: "Experiment dashboard charts", color: "#22c55e" },
  { name: "Tailwind CSS v4", desc: "Design system · Dark mode", color: "#3b82f6" },
];

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-white/5">
      <div className="flex items-center gap-2 px-3 py-2 bg-[#071628] border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <Code2 className="h-3.5 w-3.5 text-slate-500 ml-1" />
        <span className="text-slate-500 text-xs font-mono">edge-function.ts</span>
      </div>
      <pre className="bg-[#040f1f] p-4 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ArchitecturePage() {
  const [animateIn, setAnimateIn] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020b18] to-[#040f1f] py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-10 transition-all duration-700 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Layers className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-sm text-purple-400 font-semibold uppercase tracking-wider">
              Technical Architecture
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">How StormGate Works</h1>
          <p className="text-slate-400 max-w-2xl">
            An AI-powered, edge-computed growth experimentation engine. Real weather data →
            severity classification → LLM propensity model → contextual paywall, all within one
            edge function invocation.
          </p>
        </div>

        {/* Architecture pipeline */}
        <div
          className={`mb-10 transition-all duration-700 delay-100 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="space-y-2">
            {PIPELINE_STEPS.map((step, i) => {
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
                    {/* Step number */}
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                      style={{
                        background: `${step.color}15`,
                        border: `1px solid ${step.color}30`,
                        color: step.color,
                      }}
                    >
                      {i + 1}
                    </div>

                    {/* Icon */}
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${step.color}10` }}
                    >
                      <Icon className="h-4.5 w-4.5" style={{ color: step.color }} />
                    </div>

                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{step.title}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{step.desc}</div>
                    </div>

                    {i < PIPELINE_STEPS.length - 1 && (
                      <ArrowRight
                        className="h-4 w-4 text-slate-600 flex-shrink-0 hidden md:block"
                      />
                    )}

                    {step.code && (
                      <ChevronDown
                        className={`h-4 w-4 text-slate-500 flex-shrink-0 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {isExpanded && step.code && (
                    <div className="px-5 pb-5">
                      <CodeBlock code={step.code} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Copy examples */}
        <div
          className={`mb-10 transition-all duration-700 delay-200 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Copy Examples — Same Product, Different Context
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COPY_EXAMPLES.map((ex) => (
              <div
                key={ex.severity}
                className="glass rounded-2xl p-4 border flex flex-col gap-3"
                style={{ borderColor: `${ex.color}30` }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                    style={{ color: ex.color, borderColor: `${ex.color}40`, background: `${ex.color}12` }}
                  >
                    {ex.badge}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 text-[10px]">Urgency</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: i < Math.ceil(ex.urgency / 2) ? ex.color : "#1e293b" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-[10px] mb-1">{ex.condition}</div>
                  <div className="text-white text-xs font-semibold leading-snug">{ex.headline}</div>
                  <div className="text-slate-400 text-xs mt-1.5 leading-relaxed">{ex.sub}</div>
                </div>
                <button
                  className="mt-auto py-1.5 px-3 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${ex.color}cc, ${ex.color})` }}
                >
                  {ex.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PM insight box */}
        <div
          className={`glass rounded-2xl p-6 mb-10 border border-blue-500/15 transition-all duration-700 delay-300 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-start gap-4">
            <Lock className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-2">The PM Thesis</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                The Weather Company&apos;s 360M MAU represent enormous untapped conversion potential.
                The problem isn&apos;t the paywall — it&apos;s the timing and relevance of the ask.
                A static paywall at a random moment creates friction. A contextual paywall during a
                severe weather event creates genuine value alignment: the user&apos;s need is highest
                right when we offer the solution.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                <strong className="text-slate-200">StormGate&apos;s edge:</strong> By edge-computing the
                weather context and running an LLM as a propensity model, we can instrument every
                paywall impression with a severity score — enabling segment-level A/B testing,
                retention modeling, and eventually a reinforcement learning loop that optimizes copy
                in real time.
              </p>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div
          className={`transition-all duration-700 delay-400 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Tech Stack
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TECH_STACK.map(({ name, desc, color }) => (
              <div key={name} className="glass glass-hover rounded-xl p-3.5 flex items-center gap-3">
                <div
                  className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                  style={{ background: color }}
                />
                <div>
                  <div className="text-white text-sm font-medium">{name}</div>
                  <div className="text-slate-500 text-xs">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
