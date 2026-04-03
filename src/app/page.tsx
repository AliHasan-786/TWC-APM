"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Sun,
  MapPin,
  Lock,
  Zap,
  ChevronRight,
} from "lucide-react";
import type { WeatherData, PaywallCopy } from "@/lib/weather";
import {
  getWeatherIcon,
  SEVERITY_CONFIG,
} from "@/lib/weather";
import PaywallModal from "@/components/PaywallModal";
import LocationSpoofPanel from "@/components/LocationSpoofPanel";

const DEMO_LOCATIONS = [
  { name: "Miami, FL", lat: 25.7617, lon: -80.1918, emoji: "🌀" },
  { name: "Los Angeles, CA", lat: 34.0522, lon: -118.2437, emoji: "☀️" },
  { name: "Oklahoma City, OK", lat: 35.4676, lon: -97.5164, emoji: "⛈️" },
  { name: "Seattle, WA", lat: 47.6062, lon: -122.3321, emoji: "🌧️" },
  { name: "New York, NY", lat: 40.7128, lon: -74.006, emoji: "🌤️" },
];

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState(DEMO_LOCATIONS[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [paywallCopy, setPaywallCopy] = useState<PaywallCopy | null>(null);
  const [loading, setLoading] = useState(true);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallVariant, setPaywallVariant] = useState<"control" | "contextual">("contextual");
  const [showPaywallHint, setShowPaywallHint] = useState(false);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&name=${encodeURIComponent(selectedLocation.name)}`
      );
      const data: WeatherData = await res.json();
      setWeather(data);

      // Fetch contextual paywall copy
      const copyRes = await fetch("/api/paywall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weather: data, variant: paywallVariant }),
      });
      const copy: PaywallCopy = await copyRes.json();
      setPaywallCopy(copy);

      // Show paywall hint after 4s for severe+ conditions
      if (data.severity === "severe" || data.severity === "extreme") {
        setTimeout(() => setShowPaywallHint(true), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedLocation, paywallVariant]);

  useEffect(() => {
    fetchWeather();
    setShowPaywallHint(false);
  }, [fetchWeather]);

  const severity = weather?.severity ?? "clear";
  const config = SEVERITY_CONFIG[severity];

  return (
    <div
      className="min-h-screen transition-all duration-700"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${config.glowColor}, transparent),
                     linear-gradient(180deg, #020b18 0%, #040f1f 100%)`,
      }}
    >
      {/* Header strip with severity indicator */}
      {weather && (severity === "severe" || severity === "extreme") && (
        <div
          className="w-full py-2 px-4 text-center text-sm font-semibold animate-extreme-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${config.bgColor}, transparent)`,
            borderBottom: `1px solid ${config.borderColor}`,
          }}
        >
          <span style={{ color: config.textColor }}>
            ⚠️ {severity === "extreme" ? "EXTREME WEATHER ALERT" : "SEVERE WEATHER WARNING"} —{" "}
            {weather.location}
          </span>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Page title */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Weather <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Context-aware subscription triggers · Real weather data via Open-Meteo
            </p>
          </div>

          {/* Variant toggle */}
          <div className="flex items-center gap-2 glass rounded-lg p-1">
            <button
              onClick={() => setPaywallVariant("control")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                paywallVariant === "control"
                  ? "bg-slate-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              A: Static Paywall
            </button>
            <button
              onClick={() => setPaywallVariant("contextual")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                paywallVariant === "contextual"
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              B: StormGate AI ✦
            </button>
          </div>
        </div>

        {/* Location panel */}
        <LocationSpoofPanel
          locations={DEMO_LOCATIONS}
          selectedLocation={selectedLocation}
          onSelect={(loc) => {
            setSelectedLocation(loc);
            setPaywallOpen(false);
            setShowPaywallHint(false);
          }}
        />

        {loading ? (
          <WeatherSkeleton />
        ) : weather ? (
          <div className="mt-6 space-y-6 animate-slide-up">
            {/* Main weather card */}
            <div
              className="glass rounded-2xl p-6 relative overflow-hidden"
              style={{ borderColor: config.borderColor }}
            >
              {/* Background glow */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 80% at 0% 0%, ${config.color}20, transparent)`,
                }}
              />

              <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left: main temp */}
                <div className="flex items-center gap-6">
                  <div className="text-7xl leading-none">
                    {getWeatherIcon(weather.weatherCode, weather.isDay)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-slate-300 text-sm">{weather.location}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${config.badgeClass}`}
                      >
                        {config.label}
                      </span>
                    </div>
                    <div className="text-6xl font-light text-white tracking-tight">
                      {weather.temperature}°
                    </div>
                    <div className="text-slate-400 text-sm mt-1">
                      {weather.weatherDescription} · Feels {weather.feelsLike}°F
                    </div>
                  </div>
                </div>

                {/* Right: stats grid */}
                <div className="grid grid-cols-2 gap-3 md:w-64">
                  <StatCard icon={Wind} label="Wind" value={`${weather.windSpeed} km/h`} />
                  <StatCard icon={Droplets} label="Humidity" value={`${weather.humidity}%`} />
                  <StatCard icon={Eye} label="Visibility" value={`${weather.visibility} km`} />
                  <StatCard icon={Sun} label="UV Index" value={`${weather.uvIndex}`} />
                </div>
              </div>
            </div>

            {/* Hourly forecast */}
            <div className="glass rounded-2xl p-5">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                Hourly Forecast
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {weather.hourlyForecast.slice(0, 8).map((h, i) => {
                  const hour = new Date(h.time).getHours();
                  const label =
                    hour === 0 ? "12am" :
                    hour < 12 ? `${hour}am` :
                    hour === 12 ? "12pm" : `${hour - 12}pm`;
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 min-w-[52px] glass rounded-xl p-2 glass-hover"
                    >
                      <span className="text-slate-400 text-xs">{label}</span>
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

            {/* 7-day forecast — Premium locked */}
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

              {/* Show first 2 days, blur the rest */}
              <div className="space-y-2">
                {weather.dailyForecast.map((d, i) => {
                  const date = new Date(d.date);
                  const dayLabel = i === 0 ? "Today" : i === 1 ? "Tomorrow" : date.toLocaleDateString("en-US", { weekday: "short" });
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between py-2 px-3 rounded-xl transition-all ${
                        i >= 2 ? "blur-sm opacity-40 select-none pointer-events-none" : "glass"
                      }`}
                    >
                      <span className="text-slate-300 text-sm w-20">{dayLabel}</span>
                      <span className="text-xl">{getWeatherIcon(d.weatherCode)}</span>
                      <div className="flex items-center gap-4">
                        {d.precipProbability > 20 && (
                          <span className="text-blue-400 text-xs">{d.precipProbability}% 💧</span>
                        )}
                        <span className="text-slate-300 text-sm w-8 text-right">{d.minTemp}°</span>
                        <div className="w-16 h-1.5 rounded-full bg-slate-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-amber-400"
                            style={{ width: `${((d.maxTemp - d.minTemp) / 40) * 100}%` }}
                          />
                        </div>
                        <span className="text-white text-sm font-medium w-8">{d.maxTemp}°</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Premium upgrade CTA overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <button
                  onClick={() => setPaywallOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all"
                >
                  <Lock className="h-3.5 w-3.5" />
                  Unlock 7-Day Premium Forecast
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Contextual urgency nudge bar */}
            {paywallCopy && showPaywallHint && (
              <div
                className="glass rounded-2xl p-4 border animate-slide-up cursor-pointer hover:scale-[1.01] transition-transform"
                style={{ borderColor: config.borderColor, background: config.bgColor }}
                onClick={() => setPaywallOpen(true)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: config.bgColor, border: `1px solid ${config.borderColor}` }}
                    >
                      <Zap className="h-5 w-5" style={{ color: config.color }} />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{paywallCopy.headline}</p>
                      <p className="text-slate-400 text-xs mt-0.5 line-clamp-1">{paywallCopy.subheadline}</p>
                    </div>
                  </div>
                  <button
                    className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: `linear-gradient(135deg, ${config.color}cc, ${config.color})` }}
                    onClick={() => setPaywallOpen(true)}
                  >
                    {paywallCopy.ctaText}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">Failed to load weather data.</div>
        )}
      </div>

      {/* Paywall modal */}
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

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-xl p-3 flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-slate-400 flex-shrink-0" />
      <div>
        <div className="text-slate-500 text-[10px] uppercase tracking-wide">{label}</div>
        <div className="text-white text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function WeatherSkeleton() {
  return (
    <div className="mt-6 space-y-6">
      <div className="glass rounded-2xl p-6 h-40 shimmer" />
      <div className="glass rounded-2xl p-5 h-24 shimmer" />
      <div className="glass rounded-2xl p-5 h-60 shimmer" />
    </div>
  );
}
