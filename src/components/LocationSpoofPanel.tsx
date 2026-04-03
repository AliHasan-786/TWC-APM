"use client";

import { MapPin } from "lucide-react";
import { SEVERITY_CONFIG, WeatherSeverity } from "@/lib/weather";

interface Location {
  name: string;
  lat: number;
  lon: number;
  emoji: string;
}

interface Props {
  locations: Location[];
  selectedLocation: Location;
  onSelect: (loc: Location) => void;
}

// Mock weather severity for demo locations (for color coding in selector)
const LOCATION_PREVIEW: Record<string, { severity: WeatherSeverity; temp: string; desc: string }> = {
  "Miami, FL": { severity: "extreme", temp: "84°", desc: "Tropical Storm" },
  "Los Angeles, CA": { severity: "clear", temp: "72°", desc: "Clear Sky" },
  "Oklahoma City, OK": { severity: "severe", temp: "61°", desc: "Thunderstorm" },
  "Seattle, WA": { severity: "moderate", temp: "52°", desc: "Heavy Rain" },
  "New York, NY": { severity: "mild", temp: "58°", desc: "Partly Cloudy" },
};

export default function LocationSpoofPanel({ locations, selectedLocation, onSelect }: Props) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-3.5 w-3.5 text-slate-500" />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Demo Locations — Switch to Test Contextual Response
        </span>
        <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          ⚡ Edge Function Responds in ~50ms
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {locations.map((loc) => {
          const active = loc.name === selectedLocation.name;
          const preview = LOCATION_PREVIEW[loc.name];
          const sev = preview?.severity ?? "clear";
          const cfg = SEVERITY_CONFIG[sev];

          return (
            <button
              key={loc.name}
              onClick={() => onSelect(loc)}
              className={`flex-shrink-0 flex flex-col gap-1.5 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                active
                  ? "scale-[1.02]"
                  : "glass glass-hover opacity-70 hover:opacity-100"
              }`}
              style={
                active
                  ? {
                      background: cfg.bgColor,
                      borderColor: cfg.borderColor,
                      boxShadow: `0 0 20px ${cfg.glowColor}`,
                    }
                  : {}
              }
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{loc.emoji}</span>
                <div>
                  <div className="text-white text-xs font-semibold leading-tight">
                    {loc.name.split(",")[0]}
                  </div>
                  <div className="text-slate-400 text-[10px]">{loc.name.split(", ")[1]}</div>
                </div>
              </div>
              {preview && (
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-bold">{preview.temp}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${cfg.badgeClass}`}
                  >
                    {cfg.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
