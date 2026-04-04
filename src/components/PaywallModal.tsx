"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, Lock } from "lucide-react";
import type { WeatherData, PaywallCopy } from "@/lib/weather";
import { SEVERITY_CONFIG, getWeatherIcon } from "@/lib/weather";

interface Props {
  weather: WeatherData;
  copy: PaywallCopy;
  variant: "control" | "contextual";
  onClose: () => void;
}

export default function PaywallModal({ weather, copy, variant, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
  const config = SEVERITY_CONFIG[weather.severity];
  const isSevere = weather.severity === "severe" || weather.severity === "extreme";

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const handleUpgrade = () => {
    setUpgraded(true);
    setTimeout(handleClose, 2000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "rgba(2, 11, 24, 0.85)", backdropFilter: "blur(8px)" }}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl overflow-hidden transition-all duration-300 ${visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {variant === "control" ? (
          <ControlVariant onClose={handleClose} onUpgrade={handleUpgrade} upgraded={upgraded} />
        ) : (
          <StormGateVariant
            weather={weather}
            copy={copy}
            config={config}
            isSevere={isSevere}
            onClose={handleClose}
            onUpgrade={handleUpgrade}
            upgraded={upgraded}
            visible={visible}
          />
        )}
      </div>
    </div>
  );
}

/* ── Variant A: Generic static paywall ────────────────────────────── */
function ControlVariant({ onClose, onUpgrade, upgraded }: { onClose: () => void; onUpgrade: () => void; upgraded: boolean }) {
  return (
    <div style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)" }} className="rounded-2xl">
      <div className="p-6">
        {/* Label */}
        <div className="flex items-center justify-between mb-5">
          <div className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-600/40 text-slate-400 border border-slate-500/30">
            A: Generic Paywall (Control)
          </div>
          <button onClick={onClose} className="text-slate-600 hover:text-slate-400 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Generic icon */}
        <div className="text-center mb-5">
          <div className="h-14 w-14 rounded-full bg-slate-700 flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Unlock Premium Weather</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Get access to advanced radar, detailed forecasts, and severe weather alerts. No ads.
          </p>
        </div>

        {/* Generic features */}
        <div className="space-y-2 mb-5">
          {["7-day extended forecast", "2-minute radar updates", "Severe weather alerts", "Ad-free experience"].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
              <CheckCircle className="h-4 w-4 text-slate-500 flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>

        {/* Generic CTA */}
        {upgraded ? (
          <div className="text-center py-3">
            <CheckCircle className="h-7 w-7 text-green-400 mx-auto mb-2" />
            <p className="text-green-300 font-semibold text-sm">Subscribed! (Demo)</p>
          </div>
        ) : (
          <>
            <button
              onClick={onUpgrade}
              className="w-full py-3 rounded-xl font-bold text-white text-sm bg-slate-600 hover:bg-slate-500 transition-colors"
            >
              Start Free Trial
            </button>
            <div className="text-center text-slate-600 text-xs mt-2">7-day trial · $4.99/mo after · Cancel anytime</div>
          </>
        )}

        <div className="mt-4 pt-4 border-t border-white/5 text-center text-slate-600 text-[11px]">
          Same message shown to every user regardless of weather conditions
        </div>
      </div>
    </div>
  );
}

/* ── Variant B: StormGate AI contextual modal ─────────────────────── */
function StormGateVariant({
  weather, copy, config, isSevere, onClose, onUpgrade, upgraded, visible,
}: {
  weather: WeatherData;
  copy: PaywallCopy;
  config: typeof SEVERITY_CONFIG[keyof typeof SEVERITY_CONFIG];
  isSevere: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  upgraded: boolean;
  visible: boolean;
}) {
  const urgencyPct = `${(copy.urgencyLevel / 10) * 100}%`;

  return (
    <div
      style={{
        background: "linear-gradient(145deg, #071628, #040f1f)",
        border: `1px solid ${config.borderColor}`,
        boxShadow: `0 0 60px ${config.glowColor}, 0 25px 50px rgba(0,0,0,0.5)`,
      }}
      className="rounded-2xl overflow-hidden"
    >
      {/* Severity bar at top */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${config.color}40, ${config.color}, ${config.color}40)` }}
      />

      <div className="p-6">
        {/* Label + close */}
        <div className="flex items-center justify-between mb-4">
          <div className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            B: StormGate AI ✦
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Live weather context strip — this is what makes it different */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-5"
          style={{ background: config.bgColor, border: `1px solid ${config.borderColor}` }}
        >
          <span className="text-3xl">{getWeatherIcon(weather.weatherCode, weather.isDay)}</span>
          <div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wide font-semibold">
              Live conditions · {weather.location}
            </div>
            <div className="text-sm font-bold mt-0.5" style={{ color: config.textColor }}>
              {weather.weatherDescription} · {weather.temperature}°F · Winds {weather.windSpeed} km/h
            </div>
          </div>
          {isSevere && (
            <div className="ml-auto flex-shrink-0">
              <div className="h-3 w-3 rounded-full animate-ping" style={{ background: config.color }} />
            </div>
          )}
        </div>

        {/* AI-generated headline — speaks to exact situation */}
        <div className="mb-5 text-center">
          <h2
            className="text-xl font-bold leading-snug mb-2"
            style={{ color: isSevere ? config.textColor : "#f1f5f9" }}
          >
            {copy.headline}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">{copy.subheadline}</p>
        </div>

        {/* Timing urgency bar — severity matters here */}
        <div className="mb-5">
          <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
            <span>Weather urgency signal</span>
            <span style={{ color: config.color }}>
              {copy.urgencyLevel >= 8 ? "🔴 Critical" : copy.urgencyLevel >= 5 ? "🟡 Elevated" : "🟢 Routine"}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: visible ? urgencyPct : "0%",
                background: `linear-gradient(90deg, ${config.color}80, ${config.color})`,
              }}
            />
          </div>
          <div className="text-[10px] text-slate-600 mt-1">
            StormGate calibrated copy urgency to {weather.severity} conditions
          </div>
        </div>

        {/* What they unlock — specific to the situation, not generic */}
        <div
          className="space-y-2 mb-5 p-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="text-[10px] text-slate-600 uppercase tracking-wide font-semibold mb-2">Unlocked with Premium</div>
          <div className="text-xs text-slate-300">{copy.featureHighlight}</div>
        </div>

        {/* CTA */}
        {upgraded ? (
          <div className="text-center py-3">
            <CheckCircle className="h-7 w-7 text-green-400 mx-auto mb-2" />
            <p className="text-green-300 font-semibold text-sm">Subscribed! (Demo)</p>
            <p className="text-slate-500 text-xs mt-1">Conversion event recorded in Experiment Dashboard</p>
          </div>
        ) : (
          <>
            <button
              onClick={onUpgrade}
              className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all hover:scale-[1.02] hover:shadow-lg active:scale-100"
              style={{
                background: `linear-gradient(135deg, ${config.color}dd, ${config.color})`,
                boxShadow: `0 4px 24px ${config.glowColor}`,
              }}
            >
              {copy.ctaText}
            </button>
            <div className="flex items-center justify-center gap-4 mt-2.5">
              <span className="text-slate-600 text-xs">✓ 7-day free trial</span>
              <span className="text-slate-600 text-xs">✓ Cancel anytime</span>
              <span className="text-slate-600 text-xs">✓ $4.99/mo after</span>
            </div>
          </>
        )}

        <div className="mt-4 pt-4 border-t border-white/5 text-center text-slate-600 text-[11px]">
          Copy generated from live {weather.severity} conditions at {weather.location}
        </div>
      </div>
    </div>
  );
}
