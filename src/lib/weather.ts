// Weather data types and severity classification
// Open-Meteo API integration

export type WeatherSeverity = "clear" | "mild" | "moderate" | "severe" | "extreme";

export interface WeatherData {
  location: string;
  lat: number;
  lon: number;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  visibility: number;
  uvIndex: number;
  weatherCode: number;
  weatherDescription: string;
  severity: WeatherSeverity;
  isDay: boolean;
  hourlyForecast: HourlyPoint[];
  dailyForecast: DailyPoint[];
}

export interface HourlyPoint {
  time: string;
  temp: number;
  weatherCode: number;
  precipProbability: number;
}

export interface DailyPoint {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherCode: number;
  precipProbability: number;
  precipAmount: number;
}

export interface PaywallCopy {
  headline: string;
  subheadline: string;
  ctaText: string;
  urgencyLevel: number; // 0-10
  featureHighlight: string;
  socialProof: string;
}

// WMO Weather Interpretation Codes → human-readable
export const WMO_CODES: Record<number, string> = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Icy Fog",
  51: "Light Drizzle",
  53: "Moderate Drizzle",
  55: "Dense Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  71: "Slight Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  77: "Snow Grains",
  80: "Slight Showers",
  81: "Moderate Showers",
  82: "Violent Showers",
  85: "Slight Snow Showers",
  86: "Heavy Snow Showers",
  95: "Thunderstorm",
  96: "Thunderstorm w/ Hail",
  99: "Thunderstorm w/ Heavy Hail",
};

// Map weather codes to severity
export function classifySeverity(code: number, windSpeed: number): WeatherSeverity {
  if (code === 99 || code === 96 || windSpeed > 80) return "extreme";
  if (code === 95 || code === 82 || code === 86 || code === 75 || windSpeed > 60) return "severe";
  if ([65, 73, 80, 81, 85].includes(code) || windSpeed > 40) return "moderate";
  if ([51, 53, 55, 61, 63, 71, 77].includes(code) || windSpeed > 25) return "mild";
  return "clear";
}

// Generate contextual, AI-style paywall copy based on weather severity (rule-based engine)
export function generatePaywallCopy(weather: WeatherData, variant: "control" | "contextual"): PaywallCopy {
  if (variant === "control") {
    return {
      headline: "Unlock Premium Weather Features",
      subheadline: "Get advanced radar, detailed forecasts, and severe weather alerts.",
      ctaText: "Start Free Trial",
      urgencyLevel: 2,
      featureHighlight: "Pro Radar · 14-Day Forecast · Air Quality Index",
      socialProof: "Join 4M+ premium subscribers",
    };
  }

  // Contextual copy engine — maps severity to urgency
  const copies: Record<WeatherSeverity, PaywallCopy> = {
    extreme: {
      headline: `⚠️ Extreme Conditions Detected in ${weather.location}`,
      subheadline: `${weather.weatherDescription} with ${Math.round(weather.windSpeed)} km/h winds. Track every minute of this storm. Upgrade now — your safety depends on it.`,
      ctaText: "Track Storm Now →",
      urgencyLevel: 10,
      featureHighlight: "Live Storm Radar · Minute-by-Minute Alerts · Emergency Notifications",
      socialProof: "Trusted by emergency managers across 190 countries",
    },
    severe: {
      headline: `${weather.weatherDescription} Warning — Stay Ahead of the Storm`,
      subheadline: `Conditions in ${weather.location} are deteriorating fast. Premium radar updates every 2 minutes — know exactly when it hits your block.`,
      ctaText: "Upgrade — See Live Radar",
      urgencyLevel: 8,
      featureHighlight: "2-Min Radar Updates · Hyper-Local Alerts · Lightning Tracker",
      socialProof: "Over 1M users tracked this storm type last month",
    },
    moderate: {
      headline: `Rain Moving Through ${weather.location} — Plan Your Day Smarter`,
      subheadline: "See exactly when the rain starts and stops at your location. Down to the hour, not just the day.",
      ctaText: "See Hourly Rain Timeline",
      urgencyLevel: 5,
      featureHighlight: "Hour-by-Hour Precision · UV & Pollen Index · Commute Forecasts",
      socialProof: "87% of premium users say they changed plans to avoid rain",
    },
    mild: {
      headline: `Unsettled Weather Ahead for ${weather.location}`,
      subheadline: "The next 5 days look variable. Premium gives you certainty — know when to plan outdoor events.",
      ctaText: "Plan with Confidence",
      urgencyLevel: 3,
      featureHighlight: "10-Day High-Res Forecast · Outdoor Activity Scores · Weekend Planner",
      socialProof: "Used by 230K+ event planners and outdoor enthusiasts",
    },
    clear: {
      headline: `Beautiful Weather in ${weather.location} — Make the Most of It`,
      subheadline: `${Math.round(weather.temperature)}°F and ${weather.weatherDescription.toLowerCase()}. Premium shows your perfect 14-day window for every outdoor adventure.`,
      ctaText: "Plan My Weekend →",
      urgencyLevel: 1,
      featureHighlight: "14-Day Forecast · UV & Beach Index · Sunset Times",
      socialProof: "4.8★ rated by 2.1M users on the App Store",
    },
  };

  return copies[weather.severity];
}

// Severity metadata for UI theming
export const SEVERITY_CONFIG: Record<
  WeatherSeverity,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    glowColor: string;
    textColor: string;
    badgeClass: string;
  }
> = {
  clear: {
    label: "Clear",
    color: "#38bdf8",
    bgColor: "rgba(56, 189, 248, 0.08)",
    borderColor: "rgba(56, 189, 248, 0.2)",
    glowColor: "rgba(56, 189, 248, 0.15)",
    textColor: "#38bdf8",
    badgeClass: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  mild: {
    label: "Mild",
    color: "#22c55e",
    bgColor: "rgba(34, 197, 94, 0.08)",
    borderColor: "rgba(34, 197, 94, 0.2)",
    glowColor: "rgba(34, 197, 94, 0.15)",
    textColor: "#22c55e",
    badgeClass: "bg-green-500/10 text-green-400 border-green-500/20",
  },
  moderate: {
    label: "Moderate",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.08)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    glowColor: "rgba(245, 158, 11, 0.2)",
    textColor: "#f59e0b",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  severe: {
    label: "Severe",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.08)",
    borderColor: "rgba(239, 68, 68, 0.25)",
    glowColor: "rgba(239, 68, 68, 0.2)",
    textColor: "#ef4444",
    badgeClass: "bg-red-500/10 text-red-400 border-red-500/25",
  },
  extreme: {
    label: "EXTREME",
    color: "#dc2626",
    bgColor: "rgba(220, 38, 38, 0.12)",
    borderColor: "rgba(220, 38, 38, 0.4)",
    glowColor: "rgba(220, 38, 38, 0.3)",
    textColor: "#fca5a5",
    badgeClass: "bg-red-600/15 text-red-300 border-red-500/40",
  },
};

// Weather icon by code
export function getWeatherIcon(code: number, isDay: boolean = true): string {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if (code <= 2) return isDay ? "🌤️" : "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 55) return "🌦️";
  if (code <= 65) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 86) return "🌨️";
  if (code === 95) return "⛈️";
  if (code >= 96) return "🌩️";
  return "🌡️";
}
