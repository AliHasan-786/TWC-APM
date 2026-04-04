"use client";

import { useState, useEffect } from "react";
import { FlaskConical, TrendingUp, BarChart3, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// All data is clearly synthetic — calibrated against industry benchmarks
const SEGMENT_ROWS = [
  { segment: "Extreme Weather", emoji: "🌀", control: "2.1%", variant: "9.4%", lift: "+348%", color: "#dc2626", note: "Biggest delta — peak fear, peak intent" },
  { segment: "Severe Weather", emoji: "⛈️", control: "2.1%", variant: "6.8%", lift: "+224%", color: "#ef4444", note: "Storm warnings, high urgency" },
  { segment: "Moderate Weather", emoji: "🌧️", control: "2.1%", variant: "3.9%", lift: "+86%", color: "#f59e0b", note: "Rain events — timing precision sells" },
  { segment: "Mild / Clear", emoji: "🌤️", control: "2.1%", variant: "2.5%", lift: "+19%", color: "#38bdf8", note: "Minimal lift — control & variant similar" },
];

// 14-day time series showing increasing divergence as experiment matures
const TIME_DATA = [
  { day: "D1", Control: 2.0, StormGate: 3.8 },
  { day: "D2", Control: 2.2, StormGate: 4.0 },
  { day: "D3", Control: 2.0, StormGate: 4.1 },
  { day: "D4", Control: 2.1, StormGate: 3.9 },
  { day: "D5", Control: 2.3, StormGate: 4.2 },
  { day: "D6", Control: 2.0, StormGate: 4.4 },
  { day: "D7", Control: 2.1, StormGate: 4.1 },
  { day: "D8", Control: 1.9, StormGate: 4.3 },
  { day: "D9", Control: 2.2, StormGate: 4.5 },
  { day: "D10", Control: 2.1, StormGate: 4.2 },
  { day: "D11", Control: 2.0, StormGate: 4.4 },
  { day: "D12", Control: 2.2, StormGate: 4.6 },
  { day: "D13", Control: 2.1, StormGate: 4.3 },
  { day: "D14", Control: 2.1, StormGate: 4.0 },
];

export default function ExperimentPage() {
  const [animateIn, setAnimateIn] = useState(false);
  const [visibleDays, setVisibleDays] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
    const interval = setInterval(() => setVisibleDays((d) => Math.min(d + 1, 14)), 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020b18] to-[#040f1f] py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Synthetic data disclaimer — top, prominent */}
        <div className="flex items-start gap-2.5 mb-8 p-3.5 rounded-xl bg-amber-500/8 border border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-300/80 leading-relaxed">
            <strong className="text-amber-300">Simulated experiment data.</strong> CVR figures are modeled from industry benchmarks (Reforge, Amplitude 2024) and behavioral economics research on urgency-driven conversion. This dashboard shows what a real StormGate A/B test result would look like — not fabricated success rates.
          </div>
        </div>

        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-blue-400" />
            </div>
            <span className="text-sm text-blue-400 font-semibold uppercase tracking-wider">Experiment</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            EXP-041: Does contextual paywall copy outperform a generic one?
          </h1>
          <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
            <strong className="text-slate-300">Hypothesis:</strong> Naming the user&apos;s exact weather conditions in the paywall headline — instead of a generic "Unlock Premium" message — increases free trial conversion rate, especially during severe weather events.
          </p>
        </div>

        {/* Three key numbers */}
        <div className={`grid grid-cols-3 gap-4 mb-8 transition-all duration-700 delay-100 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <BigStat
            label="Control CVR"
            value="2.1%"
            sub="Generic paywall, all conditions"
            color="#64748b"
            icon={BarChart3}
          />
          <BigStat
            label="StormGate CVR"
            value="4.0%"
            sub="Contextual copy, weighted avg"
            color="#3b82f6"
            icon={TrendingUp}
          />
          <BigStat
            label="Result"
            value="+90%"
            sub="p < 0.001 — statistically significant"
            color="#22c55e"
            icon={CheckCircle2}
          />
        </div>

        {/* The key insight callout */}
        <div className={`glass rounded-2xl p-5 mb-8 border border-blue-500/15 transition-all duration-700 delay-150 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex gap-3">
            <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white mb-1">The key insight</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                The average lift (+90%) masks the more interesting story: StormGate&apos;s biggest conversion gains happen exactly when user willingness-to-pay is highest — during extreme weather (+348%). During clear weather, the lift is only +19%. This means the engine is working as designed: <strong className="text-slate-300">more copy precision where it matters, minimal disruption where it doesn&apos;t.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* CVR over time chart */}
        <div className={`glass rounded-2xl p-6 mb-6 transition-all duration-700 delay-200 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Conversion Rate Over 14 Days</h3>
          <p className="text-xs text-slate-600 mb-4">Gap between variants is consistent — not driven by a single spike event</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TIME_DATA.slice(0, Math.max(1, visibleDays))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 6]} unit="%" />
              <Tooltip
                contentStyle={{ background: "#071628", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f1f5f9", fontSize: 12 }}
                formatter={(val) => [`${val ?? ""}%`]}
              />
              <Line type="monotone" dataKey="Control" stroke="#475569" strokeWidth={2} dot={false} strokeDasharray="5 5" name="A: Control" />
              <Line type="monotone" dataKey="StormGate" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="B: StormGate AI" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <div className="w-5 h-0.5 bg-slate-500" style={{ borderTop: "2px dashed #475569" }} />
              A: Generic (Control)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className="w-5 h-0.5 bg-blue-500" />
              B: StormGate AI
            </div>
          </div>
        </div>

        {/* Segment breakdown — the most important table */}
        <div className={`glass rounded-2xl p-6 mb-6 transition-all duration-700 delay-300 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">CVR By Weather Segment</h3>
          <p className="text-xs text-slate-600 mb-5">Lift scales with severity — no guardrail violations on mild/clear segments</p>
          <div className="space-y-4">
            {SEGMENT_ROWS.map((row) => {
              const liftNum = parseInt(row.lift.replace("+", "").replace("%", ""));
              return (
                <div key={row.segment}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{row.emoji}</span>
                      <span className="text-sm text-slate-200 font-medium">{row.segment}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{row.control} → {row.variant}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ color: row.color, background: `${row.color}15`, border: `1px solid ${row.color}30` }}>
                        {row.lift}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: animateIn ? `${Math.min(liftNum / 4, 100)}%` : "0%",
                        background: `linear-gradient(90deg, ${row.color}80, ${row.color})`,
                        transitionDelay: `${SEGMENT_ROWS.indexOf(row) * 100 + 400}ms`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-600 mt-1">{row.note}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PM recommendation */}
        <div className={`glass rounded-2xl p-5 border border-green-500/15 transition-all duration-700 delay-400 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">PM Recommendation: Ship Variant B with severity gating</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Roll out StormGate to severe/extreme segments first (weeks 1–4), then expand to moderate after 30-day retention data confirms that weather-triggered subscribers don&apos;t churn faster than organic ones. Kill switch ready if dismissal rate increases.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["No harm to clear-weather UX", "Severity-gated rollout", "Statistically significant result", "Guard rails in place"].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-300 border border-green-500/20">
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function BigStat({ label, value, sub, color, icon: Icon }: { label: string; value: string; sub: string; color: string; icon: React.ElementType }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
        <span className="text-slate-500 text-xs">{label}</span>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-xs mt-1 text-slate-500">{sub}</div>
    </div>
  );
}
