"use client";

import { useEffect, useState } from "react";
import { X, Lock, Star, Shield, Zap, CheckCircle } from "lucide-react";
import type { WeatherData, PaywallCopy } from "@/lib/weather";
import { SEVERITY_CONFIG, getWeatherIcon } from "@/lib/weather";

interface Props {
  weather: WeatherData;
  copy: PaywallCopy;
  variant: "control" | "contextual";
  onClose: () => void;
}

const PREMIUM_FEATURES = [
  { icon: Zap, label: "2-Min Radar Updates", desc: "Track storms block by block" },
  { icon: Shield, label: "Severe Weather Alerts", desc: "Push notifications before it hits" },
  { icon: Star, label: "14-Day Precision Forecast", desc: "Plan with confidence" },
  { icon: CheckCircle, label: "Air Quality & Pollen Index", desc: "Better living, every day" },
];

export default function PaywallModal({ weather, copy, variant, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [upgradeClicked, setUpgradeClicked] = useState(false);
  const config = SEVERITY_CONFIG[weather.severity];

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
    setUpgradeClicked(true);
    setTimeout(handleClose, 1800);
  };

  // Urgency bar fill width
  const urgencyPct = `${(copy.urgencyLevel / 10) * 100}%`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ background: "rgba(2, 11, 24, 0.85)", backdropFilter: "blur(8px)" }}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-lg rounded-2xl overflow-hidden transition-all duration-300 ${
          visible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg, #071628, #040f1f)",
          border: `1px solid ${config.borderColor}`,
          boxShadow: `0 0 60px ${config.glowColor}, 0 25px 50px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Top severity gradient bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${config.color}40, ${config.color}, ${config.color}40)`,
          }}
        />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-6">
          {/* Variant badge */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className={`px-2 py-1 rounded-md text-xs font-bold ${
                variant === "contextual"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-slate-600/40 text-slate-300 border border-slate-500/30"
              }`}
            >
              {variant === "contextual" ? "B: StormGate AI Variant" : "A: Control (Static)"}
            </div>
            {variant === "contextual" && (
              <div className="text-slate-500 text-xs">
                Urgency Score:{" "}
                <span style={{ color: config.color }}>{copy.urgencyLevel}/10</span>
              </div>
            )}
          </div>

          {/* Weather context strip (only contextual variant) */}
          {variant === "contextual" && (
            <div
              className="flex items-center gap-3 p-3 rounded-xl mb-5"
              style={{ background: config.bgColor, border: `1px solid ${config.borderColor}` }}
            >
              <span className="text-3xl">
                {getWeatherIcon(weather.weatherCode, weather.isDay)}
              </span>
              <div>
                <div className="text-xs text-slate-400">Current Conditions · {weather.location}</div>
                <div className="text-sm font-semibold" style={{ color: config.textColor }}>
                  {weather.weatherDescription} · {weather.temperature}°F · Wind {weather.windSpeed} km/h
                </div>
              </div>
            </div>
          )}

          {/* AI-generated headline */}
          <div className="mb-5 text-center">
            <h2
              className="text-xl font-bold leading-snug mb-2"
              style={{
                color:
                  weather.severity === "extreme" || weather.severity === "severe"
                    ? config.textColor
                    : "#f1f5f9",
              }}
            >
              {copy.headline}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">{copy.subheadline}</p>
          </div>

          {/* Urgency meter (contextual only) */}
          {variant === "contextual" && (
            <div className="mb-5">
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Propensity-to-Buy Score</span>
                <span style={{ color: config.color }}>
                  {copy.urgencyLevel >= 8 ? "🔴 High" : copy.urgencyLevel >= 5 ? "🟡 Medium" : "🟢 Low"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: visible ? urgencyPct : "0%",
                    background: `linear-gradient(90deg, ${config.color}80, ${config.color})`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Feature bullets */}
          <div className="space-y-2 mb-5">
            {PREMIUM_FEATURES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${config.color}15`, border: `1px solid ${config.color}25` }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: config.color }} />
                </div>
                <div>
                  <span className="text-white text-sm font-medium">{label}</span>
                  <span className="text-slate-500 text-xs"> — {desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Feature highlight */}
          <div className="flex items-center gap-2 mb-5 py-2 px-3 rounded-lg bg-white/3 border border-white/5">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">Includes:</span>
            <span className="text-xs text-slate-300">{copy.featureHighlight}</span>
          </div>

          {/* CTA */}
          {upgradeClicked ? (
            <div className="text-center py-4">
              <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-green-300 font-semibold">You&apos;re going Premium! 🎉</p>
              <p className="text-slate-400 text-sm mt-1">
                (Demo only — shows conversion recorded in experiment dashboard)
              </p>
            </div>
          ) : (
            <>
              <button
                onClick={handleUpgrade}
                className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-all hover:scale-[1.02] hover:shadow-lg active:scale-100"
                style={{
                  background: `linear-gradient(135deg, ${config.color}dd, ${config.color})`,
                  boxShadow: `0 4px 24px ${config.glowColor}`,
                }}
              >
                {copy.ctaText}
              </button>
              <div className="flex items-center justify-center gap-4 mt-3">
                <span className="text-slate-500 text-xs">✓ 7-day free trial</span>
                <span className="text-slate-500 text-xs">✓ Cancel anytime</span>
                <span className="text-slate-500 text-xs">✓ $4.99/mo after</span>
              </div>
              <p className="text-center text-slate-600 text-xs mt-2">{copy.socialProof}</p>
            </>
          )}
        </div>

        {/* Lock icon watermark */}
        <div className="absolute top-4 left-4">
          <Lock className="h-4 w-4 text-slate-600" />
        </div>
      </div>
    </div>
  );
}
