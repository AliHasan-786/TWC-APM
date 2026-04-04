"use client";

import { useState, useEffect, useCallback } from "react";
import { Wind, Droplets, Eye, MapPin, Lock, ChevronRight, Clock, Navigation, AlertTriangle } from "lucide-react";
import type { WeatherData, PaywallCopy } from "@/lib/weather";
import { getWeatherIcon, SEVERITY_CONFIG } from "@/lib/weather";
import PaywallModal from "@/components/PaywallModal";

// Locations chosen for maximum demo clarity — each has a distinct premium use case
const DEMO_LOCATIONS = [
  {
    name: "Miami, FL",
    lat: 25.7617,
    lon: -80.1918,
    emoji: "🌀",
    scenario: "Hurricane Warning",
    scenarioDetail: "Hurricane-force winds approaching. Exact arrival window is a premium forecast.",
  },
  {
    name: "Oklahoma City, OK",
    lat: 35.4676,
    lon: -97.5164,
    emoji: "⛈️",
    scenario: "Tornado Watch",
    scenarioDetail: "Rotating supercell detected 40 miles SW. Track exact path to your address.",
  },
  {
    name: "Seattle, WA",
    lat: 47.6062,
    lon: -122.3321,
    emoji: "🌧️",
    scenario: "Heavy Rain Event",
    scenarioDetail: "Commute planning — know the exact minute rain starts and stops at your block.",
  },
  {
    name: "Los Angeles, CA",
    lat: 34.0522,
    lon: -118.2437,
    emoji: "☀️",
    scenario: "Weekend Planner",
    scenarioDetail: "Clear skies — plan outdoor events, hikes, and travel with 14-day precision.",
  },
  {
    name: "New York, NY",
    lat: 40.7128,
    lon: -74.006,
    emoji: "🌤️",
    scenario: "Nor'easter Watch",
    scenarioDetail: "Storm system developing. Track snowfall timing for your neighborhood.",
  },
];

// Premium features — framed around precision, not just "more forecasts"
const PREMIUM_VALUE = [
  {
    icon: "📍",
    title: "Minute-precise storm arrival",
    desc: "Know the exact minute severe weather reaches your address — not just your city.",
    available: false,
  },
  {
    icon: "🌀",
    title: "Storm path to your coordinates",
    desc: "Animated track showing whether a tornado or hurricane is moving toward or away from you.",
    available: false,
  },
  {
    icon: "⚡",
    title: "Lightning strike radius alerts",
    desc: "Real-time lightning detection within 10 miles of your location. Auto-alert when approaching.",
    available: false,
  },
  {
    icon: "🌤️",
    title: "Hour-by-hour precision",
    desc: "Not just today's forecast — the exact hour rain starts and stops at your block.",
    available: true,
  },
];

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState(DEMO_LOCATIONS[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [paywallCopy, setPaywallCopy] = useState<PaywallCopy | null>(null);
  const [loading, setLoading] = useState(true);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallVariant, setPaywallVariant] = useState<"control" | "contextual">("contextual");

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&name=${encodeURIComponent(selectedLocation.name)}`
      );
      const data: WeatherData = await res.json();
      setWeather(data);

      const copyRes = await fetch("/api/paywall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weather: data, variant: paywallVariant }),
      });
      const copy: PaywallCopy = await copyRes.json();
      setPaywallCopy(copy);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedLocation, paywallVariant]);

  useEffect(() => {
    fetchWeather();
    setPaywallOpen(false);
  }, [fetchWeather]);

  const severity = weather?.severity ?? "clear";
  const config = SEVERITY_CONFIG[severity];
  const isSevere = severity === "severe" || severity === "extreme";

  return (
    <div
      className="min-h-screen transition-all duration-700"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${config.glowColor}, transparent),
                     linear-gradient(180deg, #020b18 0%, #040f1f 100%)`,
      }}
    >
      {/* Severe weather banner */}
      {weather && isSevere && (
        <div
          className="w-full py-2.5 px-4 text-center text-sm font-semibold animate-extreme-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${config.bgColor}, transparent)`,
            borderBottom: `1px solid ${config.borderColor}`,
          }}
        >
          <span style={{ color: config.textColor }}>
            ⚠️ {severity === "extreme" ? "EXTREME WEATHER ALERT" : "SEVERE WEATHER WARNING"} — {weather.location} —{" "}
            <button onClick={() => setPaywallOpen(true)} className="underline underline-offset-2 hover:opacity-80">
              Track exact timing →
            </button>
          </span>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            StormGate <span className="gradient-text">Demo</span>
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            See how the paywall changes based on weather severity — and why that matters.
          </p>
        </div>

        {/* Location selector */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
            📍 Switch cities to see how the paywall adapts to each weather scenario
          </div>
          <div className="flex flex-wrap gap-2">
            {DEMO_LOCATIONS.map((loc) => (
              <button
                key={loc.name}
                onClick={() => setSelectedLocation(loc)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                  selectedLocation.name === loc.name
                    ? "text-white border-blue-500/50 bg-blue-500/15"
                    : "text-slate-400 border-white/8 bg-white/3 hover:text-white hover:border-white/15"
                }`}
              >
                <span>{loc.emoji}</span>
                <span>{loc.name}</span>
              </button>
            ))}
          </div>
          {/* Scenario context */}
          <div
            className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
            style={{ background: config.bgColor, border: `1px solid ${config.borderColor}` }}
          >
            <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: config.textColor }} />
            <span style={{ color: config.textColor }} className="font-medium">
              {selectedLocation.scenario}
            </span>
            <span className="text-slate-400">— {selectedLocation.scenarioDetail}</span>
          </div>
        </div>

        {/* A/B switcher — clearly labeled as demo control */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium">You&apos;re seeing paywall variant:</span>
          <div className="flex items-center gap-1 glass rounded-lg p-1">
            <button
              onClick={() => setPaywallVariant("control")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                paywallVariant === "control"
                  ? "bg-slate-600 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              A: Generic (Control)
            </button>
            <button
              onClick={() => setPaywallVariant("contextual")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                paywallVariant === "contextual"
                  ? "bg-blue-600 text-white"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              B: StormGate AI ✦
            </button>
          </div>
          <span className="text-[11px] text-slate-600">
            {paywallVariant === "control"
              ? "Generic paywall — same for every user, every condition"
              : "Reads live weather, generates copy for this exact moment"}
          </span>
        </div>

        {loading ? (
          <WeatherSkeleton />
        ) : weather ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-slide-up">
            {/* Left: main weather card */}
            <div className="lg:col-span-2 space-y-4">
              {/* Main conditions */}
              <div
                className="glass rounded-2xl p-6 relative overflow-hidden"
                style={{ borderColor: config.borderColor }}
              >
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 70% 90% at 0% 0%, ${config.color}25, transparent)`,
                  }}
                />
                <div className="relative flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-5">
                    <div className="text-6xl leading-none">{getWeatherIcon(weather.weatherCode, weather.isDay)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        <span className="text-slate-300 text-sm">{weather.location}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${config.badgeClass}`}>
                          {config.label}
                        </span>
                      </div>
                      <div className="text-5xl font-light text-white tracking-tight">{weather.temperature}°</div>
                      <div className="text-slate-400 text-sm mt-1">
                        {weather.weatherDescription} · Feels {weather.feelsLike}°F
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 self-end">
                    <MiniStat icon={Wind} label="Wind" value={`${weather.windSpeed} km/h`} />
                    <MiniStat icon={Droplets} label="Humidity" value={`${weather.humidity}%`} />
                    <MiniStat icon={Eye} label="Visibility" value={`${weather.visibility} km`} />
                    <MiniStat icon={Clock} label="Updated" value="Live" highlight />
                  </div>
                </div>
              </div>

              {/* Hourly forecast — free */}
              <div className="glass rounded-2xl p-5">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                  Hourly Forecast — Next 8 Hours
                </h2>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {weather.hourlyForecast.slice(0, 8).map((h, i) => {
                    const hour = new Date(h.time).getHours();
                    const label =
                      hour === 0 ? "12am" : hour < 12 ? `${hour}am` : hour === 12 ? "12pm" : `${hour - 12}pm`;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1.5 min-w-[50px] glass rounded-xl p-2">
                        <span className="text-slate-400 text-[11px]">{label}</span>
                        <span className="text-lg">{getWeatherIcon(h.weatherCode)}</span>
                        <span className="text-white text-sm font-medium">{h.temp}°</span>
                        {h.precipProbability > 20 && (
                          <span className="text-blue-400 text-[10px]">{h.precipProbability}%</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Extended / locked section */}
              <div className="glass rounded-2xl p-5 relative">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    7-Day Forecast
                  </h2>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/20">
                    <Lock className="h-3 w-3 text-purple-400" />
                    <span className="text-purple-300 text-xs font-medium">Premium</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {weather.dailyForecast.map((d, i) => {
                    const date = new Date(d.date);
                    const dayLabel = i === 0 ? "Today" : i === 1 ? "Tomorrow" : date.toLocaleDateString("en-US", { weekday: "short" });
                    return (
                      <div
                        key={i}
                        className={`flex items-center justify-between py-2 px-3 rounded-xl ${
                          i >= 2 ? "blur-sm opacity-30 select-none pointer-events-none" : "glass"
                        }`}
                      >
                        <span className="text-slate-300 text-sm w-20">{dayLabel}</span>
                        <span className="text-xl">{getWeatherIcon(d.weatherCode)}</span>
                        <span className="text-slate-300 text-sm">{d.minTemp}° – {d.maxTemp}°</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Premium value prop + paywall trigger */}
            <div className="space-y-4">
              {/* Why pay? — the value framing */}
              <div className="glass rounded-2xl p-5">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  What Premium unlocks
                </div>
                <div className="space-y-3">
                  {PREMIUM_VALUE.map(({ icon, title, desc, available }) => (
                    <div key={title} className="flex gap-3">
                      <div className="text-lg flex-shrink-0 mt-0.5">{icon}</div>
                      <div>
                        <div className={`text-sm font-medium flex items-center gap-1.5 ${available ? "text-slate-400" : "text-white"}`}>
                          {!available && <Lock className="h-3 w-3 text-purple-400" />}
                          {title}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main CTA — the demo centerpiece */}
              <div
                className="rounded-2xl p-5 relative overflow-hidden cursor-pointer hover:scale-[1.01] transition-transform"
                style={{
                  background: `linear-gradient(145deg, ${config.color}18, ${config.color}08)`,
                  border: `1px solid ${config.borderColor}`,
                  boxShadow: `0 0 40px ${config.glowColor}`,
                }}
                onClick={() => setPaywallOpen(true)}
              >
                {isSevere && (
                  <div
                    className="absolute top-3 right-3 h-2 w-2 rounded-full animate-ping"
                    style={{ background: config.color }}
                  />
                )}
                <div className="text-2xl mb-2">{selectedLocation.emoji}</div>
                <div className="text-sm font-bold mb-1" style={{ color: config.textColor }}>
                  {selectedLocation.scenario}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {selectedLocation.scenarioDetail}
                </p>
                <button
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${config.color}cc, ${config.color})`,
                    boxShadow: `0 4px 20px ${config.glowColor}`,
                  }}
                >
                  <Lock className="h-4 w-4" />
                  {isSevere ? "Track exact timing →" : "See precision forecast →"}
                  <ChevronRight className="h-4 w-4" />
                </button>
                <div className="text-center text-slate-600 text-[11px] mt-2">
                  Click to see Variant {paywallVariant === "control" ? "A (Generic)" : "B (StormGate AI)"}
                </div>
              </div>

              {/* Navigation score */}
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Navigation className="h-3.5 w-3.5 text-slate-500" />
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wide">
                    Storm Proximity
                  </span>
                </div>
                {isSevere ? (
                  <div>
                    <div className="text-2xl font-bold mb-1" style={{ color: config.textColor }}>
                      High Risk
                    </div>
                    <div className="text-xs text-slate-400">StormGate triggers paywall immediately for severe+ conditions — highest willingness-to-pay window</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-xl font-bold text-slate-300 mb-1">Low Risk</div>
                    <div className="text-xs text-slate-500">
                      Mild conditions → lifestyle framing. StormGate adjusts copy tone to match.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">Failed to load weather data.</div>
        )}
      </div>

      {paywallOpen && weather && paywallCopy && (
        <PaywallModal
          weather={weather}
          copy={paywallCopy}
          variant={paywallVariant}
          onClose={() => setPaywallOpen(false)}
        />
      )}
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, highlight }: { icon: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
      <div>
        <div className="text-[10px] text-slate-600 uppercase tracking-wide">{label}</div>
        <div className={`text-sm font-medium ${highlight ? "text-green-400" : "text-white"}`}>{value}</div>
      </div>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="lg:col-span-2 space-y-4">
        <div className="glass rounded-2xl p-6 h-36 shimmer" />
        <div className="glass rounded-2xl p-5 h-24 shimmer" />
        <div className="glass rounded-2xl p-5 h-48 shimmer" />
      </div>
      <div className="space-y-4">
        <div className="glass rounded-2xl p-5 h-52 shimmer" />
        <div className="glass rounded-2xl p-5 h-36 shimmer" />
      </div>
    </div>
  );
}
