"use client";

import { useState, useEffect } from "react";
import {
  FlaskConical,
  TrendingUp,
  Users,
  Target,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

// Simulated experiment data
const CONTROL_CVR = 2.1;
const VARIANT_CVR_BY_SEVERITY: Record<string, number> = {
  extreme: 9.4,
  severe: 6.8,
  moderate: 3.9,
  mild: 2.7,
  clear: 2.4,
};

const SEGMENT_DATA = [
  { segment: "Extreme Weather", control: 2.1, variant: 9.4, lift: "+348%" },
  { segment: "Severe Weather", control: 2.1, variant: 6.8, lift: "+224%" },
  { segment: "Moderate Weather", control: 2.1, variant: 3.9, lift: "+86%" },
  { segment: "Mild Weather", control: 2.1, variant: 2.7, lift: "+29%" },
  { segment: "Clear Weather", control: 2.1, variant: 2.4, lift: "+14%" },
];

const TIME_SERIES_DATA = Array.from({ length: 14 }, (_, i) => {
  const day = i + 1;
  const controlBase = CONTROL_CVR + (Math.random() - 0.5) * 0.3;
  const variantBase = 4.1 + Math.min(i * 0.12, 1.2) + (Math.random() - 0.5) * 0.4;
  return {
    day: `Day ${day}`,
    "Control (Static)": Math.round(controlBase * 10) / 10,
    "StormGate AI": Math.round(variantBase * 10) / 10,
  };
});

const FUNNEL_DATA = {
  control: [
    { stage: "Page View", count: 100000, pct: 100 },
    { stage: "Paywall Shown", count: 14000, pct: 14 },
    { stage: "CTA Clicked", count: 2940, pct: 2.94 },
    { stage: "Trial Started", count: 2100, pct: 2.1 },
  ],
  variant: [
    { stage: "Page View", count: 100000, pct: 100 },
    { stage: "Paywall Triggered", count: 18200, pct: 18.2 },
    { stage: "CTA Clicked", count: 5096, pct: 5.1 },
    { stage: "Trial Started", count: 4015, pct: 4.0 },
  ],
};

const SEVERITY_COLORS: Record<string, string> = {
  "Extreme Weather": "#dc2626",
  "Severe Weather": "#ef4444",
  "Moderate Weather": "#f59e0b",
  "Mild Weather": "#22c55e",
  "Clear Weather": "#38bdf8",
};

function StatCard({
  label,
  value,
  sub,
  color,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
  icon: React.ElementType;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <span className="text-slate-400 text-sm">{label}</span>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-sm mt-1" style={{ color }}>
        {sub}
      </div>
    </div>
  );
}

export default function ExperimentPage() {
  const [animateIn, setAnimateIn] = useState(false);
  const [showSignificance, setShowSignificance] = useState(false);
  const [runningDays, setRunningDays] = useState(0);

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
    setTimeout(() => setShowSignificance(true), 1200);

    const interval = setInterval(() => {
      setRunningDays((d) => Math.min(d + 1, 14));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const visibleTimeSeries = TIME_SERIES_DATA.slice(0, Math.max(1, runningDays));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020b18] to-[#040f1f] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div
          className={`mb-10 transition-all duration-700 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-blue-400" />
            </div>
            <span className="text-sm text-blue-400 font-semibold uppercase tracking-wider">
              Experiment Dashboard
            </span>
            <div className="flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-300 font-medium">Live · Day {runningDays} of 14</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            EXP-041: Contextual Paywall vs. Static Baseline
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Testing whether AI-powered, weather-triggered paywall copy outperforms a static subscription prompt
            across The Weather Channel's web consumer platform.
          </p>
        </div>

        {/* Experiment ticket */}
        <div
          className={`glass rounded-2xl p-6 mb-8 border border-blue-500/15 transition-all duration-700 delay-100 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Experiment Spec
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-slate-500 uppercase tracking-wide">Hypothesis</div>
              <p className="text-slate-200 text-sm leading-relaxed">
                Matching paywall copy urgency to current weather severity will increase free trial CVR by
                at least 40% in severe/extreme weather segments, with no negative impact on clear-weather
                users.
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Primary Metric</div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-slate-200 text-sm">Free Trial Start Rate (CVR)</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                  Secondary Metrics
                </div>
                <ul className="text-slate-400 text-xs space-y-0.5">
                  <li>• 30-day subscriber retention</li>
                  <li>• Average time-to-paywall</li>
                  <li>• Paywall dismiss rate</li>
                  <li>• Revenue per user (RPU)</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Target Sample</div>
                <div className="text-slate-200 text-sm">500K users (50/50 split)</div>
                <div className="text-slate-400 text-xs">~95% statistical power at α=0.05</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Guardrails</div>
                <ul className="text-slate-400 text-xs space-y-0.5">
                  <li>• No change to free content access</li>
                  <li>• Max 1 paywall per session</li>
                  <li>• Sev ≥ 8 weather = trigger immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Top-line results */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 transition-all duration-700 delay-200 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <StatCard
            label="Control CVR"
            value="2.1%"
            sub="Baseline (Static)"
            color="#64748b"
            icon={BarChart3}
          />
          <StatCard
            label="Variant CVR"
            value="4.0%"
            sub="StormGate AI ✦"
            color="#3b82f6"
            icon={TrendingUp}
          />
          <StatCard
            label="Overall Lift"
            value="+90.5%"
            sub="p < 0.001 ✓ Significant"
            color="#22c55e"
            icon={CheckCircle2}
          />
          <StatCard
            label="Incremental Revenue"
            value="+$2.3M"
            sub="Projected annual ARR"
            color="#a855f7"
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* CVR over time */}
          <div
            className={`glass rounded-2xl p-6 transition-all duration-700 delay-300 ${
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              CVR Over Time (%)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={visibleTimeSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 6]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#071628",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                />
                <Line
                  type="monotone"
                  dataKey="Control (Static)"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                />
                <Line
                  type="monotone"
                  dataKey="StormGate AI"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* CVR by weather segment */}
          <div
            className={`glass rounded-2xl p-6 transition-all duration-700 delay-400 ${
              animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              CVR by Weather Segment (%)
            </h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SEGMENT_DATA} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="segment"
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#071628",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                  }}
                />
                <Bar dataKey="control" name="Control" fill="#334155" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="variant"
                  name="StormGate AI"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment breakdown table */}
        <div
          className={`glass rounded-2xl p-6 mb-8 transition-all duration-700 delay-500 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Segment Analysis — Where StormGate Wins
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-2 text-slate-500 font-medium text-xs uppercase tracking-wide">
                    Weather Segment
                  </th>
                  <th className="text-right py-2 text-slate-500 font-medium text-xs uppercase tracking-wide">
                    Control CVR
                  </th>
                  <th className="text-right py-2 text-slate-500 font-medium text-xs uppercase tracking-wide">
                    Variant CVR
                  </th>
                  <th className="text-right py-2 text-slate-500 font-medium text-xs uppercase tracking-wide">
                    Relative Lift
                  </th>
                  <th className="text-right py-2 text-slate-500 font-medium text-xs uppercase tracking-wide">
                    Significance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/3">
                {SEGMENT_DATA.map((row) => {
                  const color = SEVERITY_COLORS[row.segment] ?? "#64748b";
                  return (
                    <tr key={row.segment} className="hover:bg-white/3 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                            style={{ background: color }}
                          />
                          <span className="text-slate-200">{row.segment}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-400">{row.control}%</td>
                      <td className="py-3 text-right text-white font-medium">{row.variant}%</td>
                      <td className="py-3 text-right">
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-bold"
                          style={{
                            color,
                            background: `${color}15`,
                            border: `1px solid ${color}30`,
                          }}
                        >
                          {row.lift}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {showSignificance && (
                          <span className="text-green-400 text-xs flex items-center justify-end gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            p &lt; 0.001
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Funnel comparison */}
        <div
          className={`glass rounded-2xl p-6 mb-8 transition-all duration-700 delay-600 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Conversion Funnel Comparison (per 100K users)
          </h3>
          <div className="grid grid-cols-2 gap-8">
            {(["control", "variant"] as const).map((v) => {
              const data = FUNNEL_DATA[v];
              const isVariant = v === "variant";
              return (
                <div key={v}>
                  <div className="text-xs font-semibold mb-4" style={{ color: isVariant ? "#3b82f6" : "#64748b" }}>
                    {isVariant ? "B: StormGate AI" : "A: Control (Static)"}
                  </div>
                  <div className="space-y-3">
                    {data.map((stage, i) => (
                      <div key={stage.stage}>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>{stage.stage}</span>
                          <span className={isVariant && i > 0 ? "text-blue-400 font-medium" : ""}>
                            {stage.pct}%
                          </span>
                        </div>
                        <div className="h-6 rounded-lg bg-slate-800 overflow-hidden">
                          <div
                            className="h-full rounded-lg transition-all duration-1000 flex items-center justify-end pr-2"
                            style={{
                              width: animateIn ? `${stage.pct}%` : "0%",
                              background: isVariant
                                ? `linear-gradient(90deg, #1d4ed8, #3b82f6)`
                                : "#334155",
                              minWidth: stage.pct > 5 ? "auto" : "40px",
                            }}
                          >
                            <span className="text-[10px] font-bold text-white/80">
                              {stage.count.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PM recommendation */}
        <div
          className={`glass rounded-2xl p-6 border border-green-500/15 transition-all duration-700 delay-700 ${
            animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                PM Recommendation: Ship Variant B
                <ChevronRight className="h-4 w-4 text-green-400" />
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                StormGate AI delivers statistically significant CVR lifts across all weather segments
                — with the largest gains (+348%) exactly where user willingness-to-pay is highest:
                extreme weather moments. Recommend full rollout with phased activation: severe/extreme
                segments first, then moderate/mild after 30-day retention data confirms paywall quality
                isn&apos;t degraded.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["No harm to free users", "Severity-gated activation", "High statistical confidence", "+$2.3M projected ARR"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-300 border border-green-500/20"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Caveat note */}
        <div className="mt-6 flex items-start gap-2 text-slate-500 text-xs">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>
            Simulated experiment data for portfolio demonstration. CVR figures and revenue projections are
            illustrative, calibrated against published industry benchmarks for consumer subscription products
            (Amplitude, Reforge, 2024).
          </span>
        </div>
      </div>
    </div>
  );
}
