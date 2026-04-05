"use client";

import { useState, useEffect } from "react";
import {
  FlaskConical, TrendingUp, BarChart3, CheckCircle2, AlertTriangle, Info, ArrowRight, ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SEGMENT_ROWS = [
  { segment: "Extreme Weather (WMS 85–100)", emoji: "🌀", control: "2.1%", variant: "9.4%", lift: "+348%", color: "#dc2626", note: "Peak intent. User is making safety decisions in real time", guard: "✓ No guardrail violations" },
  { segment: "Severe Weather (WMS 65–84)", emoji: "⛈️", control: "2.1%", variant: "6.8%", lift: "+224%", color: "#ef4444", note: "Storm warnings active. Timing precision is the value proposition", guard: "✓ Dismissal rate stable (+1pp)" },
  { segment: "Moderate Weather (WMS 35–64)", emoji: "🌧️", control: "2.1%", variant: "3.9%", lift: "+86%", color: "#f59e0b", note: "Note: EXP-B (engagement) may outperform EXP-C at this WMS range", guard: "⚠ Borderline. Recommend routing to EXP-B" },
  { segment: "Mild / Clear (WMS < 35)", emoji: "🌤️", control: "2.1%", variant: "2.5%", lift: "+19%", color: "#38bdf8", note: "WMS gating prevents EXP-C from running. This data is from ungated leak test only", guard: "✓ WMS correctly blocks this segment" },
];

const TIME_DATA = [
  { day: "D1", Control: 2.0, Contextual: 3.8 },
  { day: "D2", Control: 2.2, Contextual: 4.0 },
  { day: "D3", Control: 2.0, Contextual: 4.1 },
  { day: "D4", Control: 2.1, Contextual: 3.9 },
  { day: "D5", Control: 2.3, Contextual: 4.2 },
  { day: "D6", Control: 2.0, Contextual: 4.4 },
  { day: "D7", Control: 2.1, Contextual: 4.1 },
  { day: "D8", Control: 1.9, Contextual: 4.3 },
  { day: "D9", Control: 2.2, Contextual: 4.5 },
  { day: "D10", Control: 2.1, Contextual: 4.2 },
  { day: "D11", Control: 2.0, Contextual: 4.4 },
  { day: "D12", Control: 2.2, Contextual: 4.6 },
  { day: "D13", Control: 2.1, Contextual: 4.3 },
  { day: "D14", Control: 2.1, Contextual: 4.0 },
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

        {/* Synthetic data disclaimer */}
        <div className="flex items-start gap-2.5 mb-8 p-3.5 rounded-xl bg-amber-500/8 border border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-300/80 leading-relaxed">
            <strong className="text-amber-300">Simulated experiment data.</strong>{" "}
            Conversion Rate figures are modeled from industry benchmarks (Reforge, Amplitude 2024) and behavioral economics 
            research on urgency-driven conversion. This dashboard demonstrates what a real StormGate A/B test 
            result would look like, not fabricated success rates.
          </div>
        </div>

        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {/* Experiment context */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="h-8 w-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <FlaskConical className="h-4 w-4 text-purple-400" />
            </div>
            <span className="text-sm text-purple-400 font-semibold uppercase tracking-wider">EXP-C of 3</span>
            <span className="text-slate-300 text-sm">·</span>
            <a href="/case-study" className="text-sm text-slate-300 hover:text-blue-400 flex items-center gap-1 transition-colors">
              EXP-A (Ad Format) <ChevronRight className="h-3 w-3" />
            </a>
            <a href="/case-study" className="text-sm text-slate-300 hover:text-green-400 flex items-center gap-1 transition-colors">
              EXP-B (Engagement) <ChevronRight className="h-3 w-3" />
            </a>
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">
            EXP-C: Does contextual paywall copy outperform generic?
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
            <strong className="text-slate-300">Formal hypothesis (PM × data scientist, joint):</strong>{" "}
            For sessions where WMS ≥ 65 (WMO severity ≥ Moderate, wind &gt;35 mph OR precip &gt;70%):
            contextual paywall copy naming the user&apos;s exact conditions will increase free trial start rate 
            by ≥1.5 percentage points vs. generic control, within 14 days, at 95% statistical significance.{" "}
            Guardrail: paywall dismissal rate must not increase &gt;5 percentage points above baseline.
          </p>
          <p className="text-slate-300 text-xs mt-2 leading-relaxed">
            Context: EXP-C only activates at WMS ≥ 65, where estimated subscription Lifetime Value exceeds the Cost Per Thousand Impressions (CPM) value 
            of an incremental ad impression. Designed to complement TWC&apos;s ad-first revenue model.
          </p>
        </div>

        {/* Scale math. Front and center */}
        <div className={`glass rounded-2xl p-4 mb-6 border border-blue-900/30 transition-all duration-700 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ background: "rgba(0, 73, 144, 0.06)" }}
        >
          <div className="flex items-start gap-3">
            <div className="text-xl">🌍</div>
            <div>
              <div className="text-sm font-semibold text-white mb-1">
                At TWC scale, this experiment reaches millions of users in days
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                weather.com serves ~360M Monthly Active Users. At a conservative 50M US users/month and ~15% in severe+ conditions 
                on a given day, at 50% rollout, EXP-C reaches{" "}
                <strong className="text-white">~3.75M high-intent sessions within 72 hours</strong>.
                With the full moderate+ WMS gate (30% of sessions), that rises to{" "}
                <strong className="text-white">~7.5M users</strong>.
                Statistical significance at 0.5pp MDE is achievable{" "}
                <strong className="text-slate-200">in under 5 days</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Three key numbers */}
        <div className={`grid grid-cols-3 gap-4 mb-6 transition-all duration-700 delay-100 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <BigStat label="Control Conversion Rate" value="2.1%" sub="Generic copy, all gated sessions" color="#64748b" icon={BarChart3} />
          <BigStat label="Contextual Conversion Rate" value="4.0%" sub="Named conditions, WMS ≥ 65" color="#3b82f6" icon={TrendingUp} />
          <BigStat label="Lift (weighted avg)" value="+90%" sub="p < 0.001 · 14-day window" color="#22c55e" icon={CheckCircle2} />
        </div>

        {/* Core insight */}
        <div className={`glass rounded-2xl p-5 mb-6 border border-blue-500/15 transition-all duration-700 delay-150 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex gap-3">
            <Info className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white mb-1">The key insight</div>
              <p className="text-slate-300 text-sm leading-relaxed">
                The average +90% lift masks a more important pattern: StormGate&apos;s biggest conversion gains occur 
                exactly where WMS is highest: extreme weather (+348%), severe (+224%). During mild/clear conditions, 
                lift is only +19% and WMS gating correctly keeps EXP-C from running.{" "}
                <strong className="text-slate-300">The engine is working as designed:</strong>{" "}
                copy precision where it matters, zero friction where it doesn&apos;t.
              </p>
            </div>
          </div>
        </div>

        {/* Conversion Rate chart */}
        <div className={`glass rounded-2xl p-6 mb-6 transition-all duration-700 delay-200 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">
            Conversion Rate. 14-Day Window
          </h3>
          <p className="text-xs text-slate-300 mb-4">
            Consistent gap, not driven by a single weather event spike
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={TIME_DATA.slice(0, Math.max(1, visibleDays))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 6]} unit="%" />
              <Tooltip
                contentStyle={{ background: "#071628", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#f1f5f9", fontSize: 12 }}
                formatter={(val) => [`${val ?? ""}%`]}
              />
              <Line type="monotone" dataKey="Control" stroke="#475569" strokeWidth={2} dot={false} strokeDasharray="5 5" name="A: Generic (Control)" />
              <Line type="monotone" dataKey="Contextual" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="B: Contextual (StormGate)" />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3 justify-center">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <div className="w-5 h-0.5" style={{ borderTop: "2px dashed #475569" }} />
              A: Generic (Control)
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <div className="w-5 h-0.5 bg-blue-500" />
              B: Contextual (StormGate)
            </div>
          </div>
        </div>

        {/* Segment breakdown */}
        <div className={`glass rounded-2xl p-6 mb-6 transition-all duration-700 delay-300 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-1">Conversion Rate by WMS Segment</h3>
          <p className="text-xs text-slate-300 mb-5">Lift scales with WMS, confirms the severity-gating logic</p>
          <div className="space-y-5">
            {SEGMENT_ROWS.map((row) => {
              const liftNum = parseInt(row.lift.replace("+", "").replace("%", ""));
              return (
                <div key={row.segment}>
                  <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{row.emoji}</span>
                      <span className="text-sm text-slate-200 font-medium">{row.segment}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300">{row.control} → {row.variant}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ color: row.color, background: `${row.color}15`, border: `1px solid ${row.color}30` }}>
                        {row.lift}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden mb-1">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: animateIn ? `${Math.min(liftNum / 4, 100)}%` : "0%",
                        background: `linear-gradient(90deg, ${row.color}80, ${row.color})`,
                        transitionDelay: `${SEGMENT_ROWS.indexOf(row) * 100 + 400}ms`,
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-slate-300">{row.note}</div>
                    <div className="text-[10px] text-slate-300">{row.guard}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PM Recommendation */}
        <div className={`glass rounded-2xl p-5 border border-green-500/15 mb-5 transition-all duration-700 delay-400 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-white font-semibold mb-1">PM Recommendation: Ship Variant B to severe/extreme segments</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Roll out contextual copy to WMS ≥ 65 (severe + extreme) immediately. Hold moderate segment 
                (WMS 35–64). Route those sessions to EXP-B (push opt-in) instead, which likely generates 
                more long-term Revenue Per Visit through daily return visits than a premium conversion at that intent level.
                30-day retention data must confirm weather-triggered subscribers don&apos;t churn faster than 
                organic cohorts before scaling to moderate.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["WMS gating prevents low-intent friction", "Severe/extreme: ship immediately", "Moderate: route to EXP-B first", "Kill switch on dismissal rate spike"].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-300 border border-green-500/20">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What I'd run next, the PM maturity signal */}
        <div className={`glass rounded-2xl p-5 border border-purple-500/12 mb-8 transition-all duration-700 delay-450 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="h-4 w-4 text-purple-400" />
            <h3 className="text-white font-semibold">If EXP-C holds, here&apos;s what I&apos;d run next</h3>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            A +90% conversion lift is the beginning of a question, not the end. Every experiment result 
            generates the next hypothesis. Here&apos;s the honest decision tree:
          </p>
          <div className="space-y-2">
            <NextExperiment
              condition="If 30-day subscription retention = organic baseline"
              next="Scale EXP-C to all WMS ≥ 65 sessions globally. Begin EXP-D: test whether copy personalization beyond severity (mentioning the specific storm name or impact) lifts Conversion Rate further."
              color="#22c55e"
            />
            <NextExperiment
              condition="If 30-day retention is 20%+ lower than organic subscribers"
              next="That's a red flag. Weather-triggered subscribers are churning when the storm passes. Adjust: test free trial length (14 days vs. 30 days) to push evaluation past the acute weather window."
              color="#f59e0b"
            />
            <NextExperiment
              condition="If EXP-C lift disappears when EXP-A runs simultaneously"
              next="Ad format switching is interfering with paywall conversion. That's the lever conflict we predicted. Solution: implement mutual exclusion. A session either sees ad format OR paywall, never both."
              color="#ef4444"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3">
          <a
            href="/case-study"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
          >
            Read the full framework <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/"
            className="flex items-center gap-2 py-3 px-4 rounded-xl glass border border-white/8 text-slate-300 hover:text-white font-medium text-sm transition-colors"
          >
            Back to Demo
          </a>
        </div>

      </div>
    </div>
  );
}

function BigStat({ label, value, sub, color, icon: Icon }: {
  label: string; value: string; sub: string; color: string; icon: React.ElementType;
}) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
        <span className="text-slate-300 text-xs">{label}</span>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-xs mt-1 text-slate-300">{sub}</div>
    </div>
  );
}

function NextExperiment({ condition, next, color }: { condition: string; next: string; color: string }) {
  return (
    <div className="glass rounded-xl p-3 border border-white/5">
      <div className="flex items-start gap-2 mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded flex-shrink-0 mt-0.5" style={{ color, background: `${color}12` }}>
          IF
        </span>
        <div className="text-xs text-slate-300 font-medium">{condition}</div>
      </div>
      <div className="flex items-start gap-2 pl-10">
        <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded flex-shrink-0" style={{ color, background: `${color}12` }}>
          THEN
        </span>
        <div className="text-xs text-slate-300 leading-relaxed">{next}</div>
      </div>
    </div>
  );
}
