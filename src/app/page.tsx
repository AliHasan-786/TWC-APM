"use client";

import { useState, useEffect, useCallback } from "react";
import { Wind, Droplets, Eye, MapPin, Clock, TrendingUp, Bell, Zap, ArrowRight, AlertTriangle } from "lucide-react";
import type { WeatherData } from "@/lib/weather";
import { getWeatherIcon, SEVERITY_CONFIG } from "@/lib/weather";

// Locations chosen to show the full spectrum of Weather Moment Scores
const DEMO_LOCATIONS = [
  {
    name: "Miami, FL",
    lat: 25.7617,
    lon: -80.1918,
    emoji: "🌀",
    scenario: "Hurricane Season",
    scenarioDetail: "Hurricanes dramatically increase how much time people spend on the site, making it the best time to safely offer a premium upgrade.",
  },
  {
    name: "Oklahoma City, OK",
    lat: 35.4676,
    lon: -97.5164,
    emoji: "⛈️",
    scenario: "Tornado Alley (Simulated Analog)",
    scenarioDetail: "Severe storms make people check the radar much more often and stay on the page longer. (Note: The score is based on live data. If it is sunny in OKC right now, the score will look low.)",
  },
  {
    name: "New York, NY",
    lat: 40.7128,
    lon: -74.006,
    emoji: "🌤️",
    scenario: "Nor'easter Watch",
    scenarioDetail: "When a major storm approaches, commuters suddenly pay close attention to the forecast instead of just quickly checking the temperature.",
  },
  {
    name: "Seattle, WA",
    lat: 47.6062,
    lon: -122.3321,
    emoji: "🌧️",
    scenario: "Pacific Rain",
    scenarioDetail: "Consistent rainy days. Pushing people to sign up for daily alerts works much better here than asking them to pay for a premium subscription.",
  },
  {
    name: "Los Angeles, CA",
    lat: 34.0522,
    lon: -118.2437,
    emoji: "☀️",
    scenario: "Clear Conditions",
    scenarioDetail: "Clear, quiet weather. People aren't likely to buy a subscription right now, so it's better to just show them standard ads without interrupting their experience.",
  },
];

// The three growth levers. TWC's actual revenue model
const GROWTH_LEVERS = [
  {
    id: "advertising",
    icon: TrendingUp,
    color: "#3b82f6",
    label: "EXP-A · Advertising",
    title: "Weather-triggered ad format switching",
    desc: "Hypothesis: When severe weather hits, people stay on the page longer. Showing a larger ad during this time makes more money without having to bombard them with more total ads.",
    metric: "Revenue per visit",
    minSeverity: 0, // always relevant
    bestAt: ["severe", "extreme", "moderate"],
    insight: "Primary lever. TWC's core business",
  },
  {
    id: "engagement",
    icon: Bell,
    color: "#10b981",
    label: "EXP-B · Engagement",
    title: "Contextual push notification opt-in",
    desc: "Hypothesis: People actively tracking a storm are 4x more likely to sign up for push alerts. This simple prompt can turn a one-time visitor into a daily user.",
    metric: "Return visit rate",
    minSeverity: 1,
    bestAt: ["mild", "moderate", "severe", "extreme"],
    insight: "Engagement → ad impression inventory",
  },
  {
    id: "premium",
    icon: Zap,
    color: "#8b5cf6",
    label: "EXP-C · Premium",
    title: "Severity-gated premium upsell",
    desc: "Hypothesis: A paywall that mentions the user's specific local storm (e.g., 'Track the heavy rain') gets 2-4x more people to subscribe than a generic 'Unlock Premium' screen—but only if a severe storm is actually happening.",
    metric: "Subscription Conversion Rate",
    minSeverity: 2,
    bestAt: ["severe", "extreme"],
    insight: "Secondary lever. Complements ad model",
  },
];

const SEVERITY_ORDER = ["clear", "mild", "moderate", "severe", "extreme"];

function getSeverityIndex(s: string) {
  return SEVERITY_ORDER.indexOf(s);
}

export default function HomePage() {
  const [selectedLocation, setSelectedLocation] = useState(DEMO_LOCATIONS[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeLever, setActiveLever] = useState<string>("advertising");
  const [wmsAnimated, setWmsAnimated] = useState(false);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setWmsAnimated(false);
    try {
      const res = await fetch(
        `/api/weather?lat=${selectedLocation.lat}&lon=${selectedLocation.lon}&name=${encodeURIComponent(selectedLocation.name)}`
      );
      const data: WeatherData = await res.json();
      setWeather(data);
      setTimeout(() => setWmsAnimated(true), 300);
      // Auto-select the best lever for current conditions
      const sIdx = getSeverityIndex(data.severity);
      if (sIdx >= 3) setActiveLever("premium");
      else if (sIdx >= 1) setActiveLever("engagement");
      else setActiveLever("advertising");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedLocation]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const severity = weather?.severity ?? "clear";
  const config = SEVERITY_CONFIG[severity];
  const severityIndex = getSeverityIndex(severity);
  const wmsScore = Math.round((severityIndex / 4) * 85 + 10 + (weather ? Math.min(weather.windSpeed / 5, 15) : 0));
  const wmsNormalized = Math.min(wmsScore, 100);

  const activeLeverData = GROWTH_LEVERS.find((l) => l.id === activeLever)!;
  const isLeverRelevant = (lever: typeof GROWTH_LEVERS[0]) =>
    SEVERITY_ORDER.indexOf(severity) >= lever.minSeverity;

  return (
    <div
      className="min-h-screen transition-all duration-700"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${config.glowColor}, transparent),
                     linear-gradient(180deg, #020b18 0%, #040f1f 100%)`,
      }}
    >
      {/* Severe weather alert bar */}
      {weather && (severity === "severe" || severity === "extreme") && (
        <div
          className="w-full py-2 px-4 text-center text-xs font-semibold animate-extreme-pulse"
          style={{
            background: `linear-gradient(90deg, transparent, ${config.bgColor}, transparent)`,
            borderBottom: `1px solid ${config.borderColor}`,
          }}
        >
          <span style={{ color: config.textColor }}>
            ⚠️ {severity === "extreme" ? "EXTREME" : "SEVERE"} WEATHER. {weather.location}. Weather Moment Score: HIGH
          </span>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Page header. Leads with the business problem */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">TWC Web Consumer Platform</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
            How do you grow revenue per visit<br className="hidden lg:block" />
            <span className="gradient-text"> for 360M free users</span>?
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            weather.com&apos;s primary revenue is advertising. The tension: interventions that drive subscription conversions 
            can reduce ad impression quality. StormGate proposes a{" "}
            <strong className="text-slate-300">Weather Moment Score</strong>. A signal that routes each session 
            to the right growth lever at the right moment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left: Live weather + WMS */}
          <div className="lg:col-span-2 space-y-4">

            {/* Location selector */}
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                📍 Switch cities. Watch the Weather Moment Score change
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {DEMO_LOCATIONS.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => setSelectedLocation(loc)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all border ${
                      selectedLocation.name === loc.name
                        ? "text-white border-blue-500/50 bg-blue-500/15"
                        : "text-slate-300 border-white/8 bg-white/3 hover:text-white hover:border-white/15"
                    }`}
                  >
                    <span>{loc.emoji}</span>
                    <span>{loc.name}</span>
                  </button>
                ))}
              </div>
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                style={{ background: config.bgColor, border: `1px solid ${config.borderColor}` }}
              >
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" style={{ color: config.textColor }} />
                <span style={{ color: config.textColor }} className="font-medium">{selectedLocation.scenario}</span>
                <span className="text-slate-300 text-xs">- {selectedLocation.scenarioDetail}</span>
              </div>
            </div>

            {/* Weather card */}
            {loading ? (
              <div className="glass rounded-2xl p-6 h-40 shimmer" />
            ) : weather ? (
              <div
                className="glass rounded-2xl p-5 relative overflow-hidden animate-slide-up"
                style={{ borderColor: config.borderColor }}
              >
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 70% 90% at 0% 0%, ${config.color}30, transparent)` }}
                />
                <div className="relative flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl leading-none">{getWeatherIcon(weather.weatherCode, weather.isDay)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="h-3 w-3 text-slate-300" />
                        <span className="text-slate-300 text-sm">{weather.location}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${config.badgeClass}`}>
                          {config.label}
                        </span>
                      </div>
                      <div className="text-4xl font-light text-white tracking-tight">{weather.temperature}°</div>
                      <div className="text-slate-300 text-sm mt-0.5">
                        {weather.weatherDescription} · Feels {weather.feelsLike}°F
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 self-end">
                    <MiniStat icon={Wind} label="Wind" value={`${weather.windSpeed} km/h`} />
                    <MiniStat icon={Droplets} label="Humidity" value={`${weather.humidity}%`} />
                    <MiniStat icon={Eye} label="Visibility" value={`${weather.visibility} km`} />
                    <MiniStat icon={Clock} label="Data" value="Live" highlight />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-300">Failed to load weather data.</div>
            )}

            {/* Weather Moment Score */}
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-0.5">
                    Weather Moment Score (WMS)
                  </div>
                  <div className="text-xs text-slate-300">
                    Composite: severity index × session dwell modifier × geographic exposure rate
                  </div>
                </div>
                <div
                  className="text-3xl font-bold transition-all duration-700"
                  style={{ color: config.color }}
                >
                  {loading ? "-" : wmsNormalized}
                </div>
              </div>
              {/* Score bar */}
              <div className="h-3 rounded-full bg-slate-800/80 overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: wmsAnimated && !loading ? `${wmsNormalized}%` : "0%",
                    background: `linear-gradient(90deg, #004990, ${config.color})`,
                    boxShadow: `0 0 12px ${config.glowColor}`,
                  }}
                />
              </div>
              {/* Score spectrum labels */}
              <div className="flex justify-between text-[10px] text-slate-300 mb-4">
                <span>0 · Advertise</span>
                <span>35 · Engage</span>
                <span>65 · Upsell</span>
                <span>100 · Max</span>
              </div>
              {/* Recommended action */}
              <div
                className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background: config.bgColor, border: `1px solid ${config.borderColor}` }}
              >
                <div className="text-2xl">{loading ? "⏳" : wmsNormalized >= 65 ? "💎" : wmsNormalized >= 35 ? "🔔" : "📈"}</div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {loading ? "Loading..." : wmsNormalized >= 65 ? "Run EXP-C: Premium upsell" : wmsNormalized >= 35 ? "Run EXP-B: Push opt-in" : "Run EXP-A: Ad format switch"}
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {loading ? "" : wmsNormalized >= 65 
                      ? "High-severity session. Willingness-to-pay peaks. Contextual paywall is the right intervention." 
                      : wmsNormalized >= 35 
                      ? "Moderate engagement. Convert this session into a daily return visit via alert opt-in." 
                      : "Low WMS. Optimize ad format for impression quality. Don't interrupt with subscription friction."}
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly forecast */}
            {!loading && weather && (
              <div className="glass rounded-2xl p-4">
                <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Hourly. {weather.location}
                </h2>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {weather.hourlyForecast.slice(0, 8).map((h, i) => {
                    const hour = new Date(h.time).getHours();
                    const label = hour === 0 ? "12am" : hour < 12 ? `${hour}am` : hour === 12 ? "12pm" : `${hour - 12}pm`;
                    return (
                      <div key={i} className="flex flex-col items-center gap-1 min-w-[44px] glass rounded-xl p-2">
                        <span className="text-slate-300 text-[10px]">{label}</span>
                        <span className="text-base">{getWeatherIcon(h.weatherCode)}</span>
                        <span className="text-white text-xs font-medium">{h.temp}°</span>
                        {h.precipProbability > 20 && (
                          <span className="text-blue-400 text-[9px]">{h.precipProbability}%</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: The three growth levers */}
          <div className="space-y-3">

            {/* Levers header */}
            <div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Three Revenue Levers
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                WMS determines which lever is most relevant right now. Click any to explore the experiment.
              </div>
            </div>

            {GROWTH_LEVERS.map((lever) => {
              const Icon = lever.icon;
              const relevant = isLeverRelevant(lever);
              const isActive = activeLever === lever.id;
              return (
                <button
                  key={lever.id}
                  onClick={() => setActiveLever(lever.id)}
                  className={`w-full text-left glass rounded-2xl p-4 border transition-all duration-300 ${
                    isActive ? "border-opacity-60" : "border-white/6 opacity-70 hover:opacity-100"
                  }`}
                  style={isActive ? { borderColor: lever.color + "50", boxShadow: `0 0 20px ${lever.color}10` } : {}}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div
                      className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${lever.color}15`, border: `1px solid ${lever.color}30` }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: lever.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: lever.color }}>
                        {lever.label}
                      </div>
                    </div>
                    {relevant ? (
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ color: lever.color, background: `${lever.color}15` }}>
                        ACTIVE
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-300 font-semibold px-1.5 py-0.5 rounded-full bg-white/5">
                        LOW WMS
                      </span>
                    )}
                  </div>
                  <div className="text-white text-sm font-semibold mb-1 leading-snug">{lever.title}</div>
                  {isActive && (
                    <p className="text-slate-300 text-xs leading-relaxed mt-2 mb-2">
                      {lever.desc}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-300">Optimizes: <span className="text-slate-300">{lever.metric}</span></span>
                    {isActive && (
                      <span className="text-xs" style={{ color: lever.color + "cc" }}>{lever.insight}</span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* The core tension */}
            <div className="glass rounded-2xl p-4 border border-white/6 mt-2">
              <div className="text-xs font-semibold text-slate-300 mb-2">The Core Tension</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                EXP-A (ads) and EXP-C (premium) can conflict: showing a paywall reduces ad impressions in that session. 
                WMS gates EXP-C to only High-severity sessions where the{" "}
                <span className="text-slate-300">subscription Lifetime Value &gt; ad Cost Per Thousand Impressions (CPM)</span>.
              </p>
              <a
                href="/case-study"
                className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Read the full framework <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            {/* Quick links  */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href="/experiment"
                className="glass rounded-xl p-3 flex flex-col gap-1 hover:border-blue-500/30 border border-white/5 transition-all group"
              >
                <div className="text-lg">⚗️</div>
                <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">EXP-C Results</div>
                <div className="text-[10px] text-slate-300">A/B test dashboard</div>
              </a>
              <a
                href="/architecture"
                className="glass rounded-xl p-3 flex flex-col gap-1 hover:border-purple-500/30 border border-white/5 transition-all group"
              >
                <div className="text-lg">🏗️</div>
                <div className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">The System</div>
                <div className="text-[10px] text-slate-300">How it&apos;s built</div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, highlight }: { icon: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="glass rounded-xl px-3 py-2 flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-slate-300 flex-shrink-0" />
      <div>
        <div className="text-[10px] text-slate-300 uppercase tracking-wide">{label}</div>
        <div className={`text-sm font-medium ${highlight ? "text-green-400" : "text-white"}`}>{value}</div>
      </div>
    </div>
  );
}
