"use client";

import { useState } from "react";
import { X, Zap, Star, CheckCircle2, ArrowRight } from "lucide-react";
import type { WeatherData } from "@/lib/weather";

interface PaywallDemoProps {
  weather: WeatherData | null;
  wmsScore: number;
}

const PREMIUM_FEATURES = [
  "Minute-by-minute storm tracking",
  "Hyper-local radar (500m resolution)",
  "Severe weather phone alerts",
  "7-day extended forecast",
  "Air quality & pollen index",
];

function ControlVariant({ onClose }: { onClose: () => void }) {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "linear-gradient(160deg, #0f172a, #1e293b)" }}>
      <div className="absolute top-3 right-3">
        <button onClick={onClose} className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <X className="h-3 w-3 text-slate-400" />
        </button>
      </div>
      <div className="p-6">
        {/* Generic lock icon & headline */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
            <Zap className="h-7 w-7 text-blue-400" />
          </div>
        </div>
        <h3 className="text-center text-white font-bold text-lg mb-1">Unlock Premium Weather</h3>
        <p className="text-center text-slate-400 text-sm mb-5 leading-relaxed">
          Get access to advanced forecasts and real-time alerts.
        </p>
        <ul className="space-y-2 mb-5">
          {PREMIUM_FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-slate-600 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setClicked(true)}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all"
          style={{
            background: clicked ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.8)",
            border: "1px solid rgba(59,130,246,0.4)"
          }}
        >
          {clicked ? "✓ Trial Started (Simulated)" : "Start 7-Day Free Trial"}
        </button>
        <p className="text-center text-xs text-slate-600 mt-2">$2.99/month after trial · Cancel anytime</p>
      </div>
      {/* Control label */}
      <div className="px-6 pb-4">
        <div className="rounded-lg px-3 py-2 bg-slate-800/60 border border-white/5 text-center">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Control — Generic Copy</span>
          <p className="text-[10px] text-slate-600 mt-0.5">No weather context. Same copy for every session. CVR: ~2.1%</p>
        </div>
      </div>
    </div>
  );
}

function ContextualVariant({
  weather,
  wmsScore,
  onClose,
}: {
  weather: WeatherData;
  wmsScore: number;
  onClose: () => void;
}) {
  const [clicked, setClicked] = useState(false);
  const isExtreme = wmsScore >= 85;
  const isSevere = wmsScore >= 65;

  const urgencyColor = isExtreme ? "#dc2626" : isSevere ? "#f59e0b" : "#8b5cf6";
  const urgencyBg = isExtreme ? "rgba(220,38,38,0.08)" : isSevere ? "rgba(245,158,11,0.08)" : "rgba(139,92,246,0.08)";
  const urgencyBorder = isExtreme ? "rgba(220,38,38,0.25)" : isSevere ? "rgba(245,158,11,0.25)" : "rgba(139,92,246,0.25)";

  const headline = isExtreme
    ? `This storm could get worse. You need real-time data.`
    : isSevere
    ? `Severe weather in ${weather.location}. Know before it hits you.`
    : `Track this storm down to your street.`;

  const subheadline = isExtreme
    ? `Conditions in ${weather.location} are extreme right now — ${weather.windSpeed} km/h winds, ${weather.weatherDescription.toLowerCase()}. Minute-by-minute radar and emergency alerts could matter in the next few hours.`
    : isSevere
    ? `${weather.weatherDescription} with ${weather.windSpeed} km/h winds. Premium gives you hyper-local radar at 500m resolution and an alert the moment severity changes near your location.`
    : `Rain is building in ${weather.location}. Know exactly when it peaks near you — down to your block.`;

  const cta = isExtreme
    ? "Get Storm Alerts Now"
    : isSevere
    ? "Track This Storm — Free Trial"
    : "Unlock Hyper-Local Radar";

  return (
    <div className="relative rounded-2xl overflow-hidden border"
      style={{
        background: `linear-gradient(160deg, #0a0f1a, #0f1929)`,
        borderColor: urgencyBorder,
        boxShadow: `0 0 30px ${urgencyColor}10`,
      }}>
      {/* Severity pulse bar at top */}
      <div className="h-1 w-full animate-pulse" style={{ background: `linear-gradient(90deg, transparent, ${urgencyColor}, transparent)` }} />

      <div className="absolute top-3 right-3">
        <button onClick={onClose} className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <X className="h-3 w-3 text-slate-400" />
        </button>
      </div>

      <div className="p-6">
        {/* Contextual severity badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold mb-4"
          style={{ background: urgencyBg, border: `1px solid ${urgencyBorder}`, color: urgencyColor }}>
          ⚡ {weather.location} · WMS {wmsScore} · {isExtreme ? "EXTREME" : isSevere ? "SEVERE" : "ACTIVE"} CONDITIONS
        </div>

        <h3 className="text-white font-bold text-lg mb-2 leading-snug">{headline}</h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{subheadline}</p>

        {/* Contextual feature highlight */}
        <div className="rounded-xl p-3 mb-4" style={{ background: urgencyBg, border: `1px solid ${urgencyBorder}` }}>
          <div className="text-xs font-bold mb-2" style={{ color: urgencyColor }}>What you unlock right now:</div>
          <div className="space-y-1.5">
            {[
              { feat: "Minute-by-minute storm tracking", urgent: true },
              { feat: `Hyper-local radar — ${weather.location} block-level`, urgent: true },
              { feat: "Emergency alerts to your phone", urgent: isExtreme },
              { feat: "7-day extended forecast", urgent: false },
            ].map(({ feat, urgent }) => (
              <div key={feat} className="flex items-center gap-2 text-xs">
                <CheckCircle2 className="h-3 w-3 flex-shrink-0" style={{ color: urgent ? urgencyColor : "#475569" }} />
                <span className={urgent ? "text-slate-300" : "text-slate-500"}>{feat}</span>
                {urgent && <span className="ml-auto text-[9px] font-bold uppercase" style={{ color: urgencyColor }}>Now</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Star social proof */}
        <div className="flex items-center gap-1.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-current text-amber-400" />
          ))}
          <span className="text-xs text-slate-500 ml-1">"Essential during hurricane season" — 47K reviews</span>
        </div>

        <button
          onClick={() => setClicked(true)}
          className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all"
          style={{
            background: clicked ? `${urgencyColor}30` : urgencyColor,
            border: `1px solid ${urgencyColor}60`,
          }}
        >
          {clicked ? (
            "✓ Trial Started (Simulated)"
          ) : (
            <>
              {cta} <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <p className="text-center text-xs text-slate-600 mt-2">$2.99/month after trial · Cancel anytime</p>
      </div>

      {/* Variant label */}
      <div className="px-6 pb-4">
        <div className="rounded-lg px-3 py-2 border text-center" style={{ background: `${urgencyColor}08`, borderColor: `${urgencyColor}20` }}>
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: urgencyColor }}>Variant B — Contextual Copy</span>
          <p className="text-[10px] text-slate-500 mt-0.5">Copy uses live weather data + WMS. Estimated CVR: ~{wmsScore >= 85 ? "9.4" : wmsScore >= 65 ? "6.8" : "3.9"}%</p>
        </div>
      </div>
    </div>
  );
}

export default function PaywallDemo({ weather, wmsScore }: PaywallDemoProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!weather) return null;

  const isSevereEnough = wmsScore >= 35;

  return (
    <div className="glass rounded-2xl border border-white/6 overflow-hidden">
      {/* Section header */}
      <div className="px-5 py-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-0.5">EXP-C · Live Demo</div>
            <div className="text-sm font-semibold text-white">Interactive Paywall Comparison</div>
            <div className="text-xs text-slate-500 mt-0.5">
              Control (generic) vs. Contextual (WMS-driven) — side by side
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-600">Current WMS</div>
            <div className="text-xl font-bold" style={{
              color: wmsScore >= 65 ? "#8b5cf6" : wmsScore >= 35 ? "#10b981" : "#3b82f6"
            }}>{wmsScore}</div>
          </div>
        </div>
      </div>

      <div className="p-5">
        {!isSevereEnough && (
          <div className="mb-4 p-3 rounded-xl bg-blue-500/8 border border-blue-500/20 text-xs text-blue-300/80">
            ℹ️ Current WMS is {wmsScore} (low) — WMS gating prevents EXP-C from activating. 
            Switch to <strong>Miami, FL</strong> or <strong>Oklahoma City</strong> to see the premium variant trigger.
          </div>
        )}

        {!visible ? (
          <button
            onClick={() => { setVisible(true); setDismissed(false); }}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all border border-purple-500/30 hover:border-purple-500/60"
            style={{ background: "rgba(139,92,246,0.12)" }}
          >
            ⚗️ Launch Paywall Comparison →
          </button>
        ) : dismissed ? (
          <button
            onClick={() => { setVisible(true); setDismissed(false); }}
            className="w-full py-2 rounded-xl text-xs font-medium text-slate-500 border border-white/5 hover:border-white/10 transition-colors"
          >
            Reopen demo
          </button>
        ) : (
          <div className="space-y-3">
            <div className="text-xs text-slate-600 text-center mb-2">
              Same weather. Same user. Different copy. Watch the CVR difference.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ControlVariant onClose={() => setDismissed(true)} />
              <ContextualVariant weather={weather} wmsScore={wmsScore} onClose={() => setDismissed(true)} />
            </div>
            <div className="text-center">
              <button onClick={() => setDismissed(true)} className="text-xs text-slate-600 hover:text-slate-400 transition-colors">
                Close demo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
