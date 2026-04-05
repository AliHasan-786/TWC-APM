"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Bell,
  Zap,
  Target,
  AlertTriangle,
  ChevronRight,
  BarChart2,
  Users,
  DollarSign,
  X,
  Brain,
} from "lucide-react";

export default function CaseStudyPage() {
  const [animateIn, setAnimateIn] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("why");

  useEffect(() => {
    setTimeout(() => setAnimateIn(true), 100);
    setOpenSection("why");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020b18] to-[#040f1f] py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-1 w-6 rounded-full bg-blue-500" />
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">PM Framework</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
            The Weather Moment Score:<br />
            <span className="text-slate-300 font-normal">A Growth Framework for TWC&apos;s Web Consumer Platform</span>
          </h1>
          <p className="text-slate-300 leading-relaxed max-w-2xl">
            An analysis of how weather data signals can unlock three distinct revenue levers on weather.com. 
            and a structured approach to experimenting across all three without destroying the advertising 
            model that generates TWC&apos;s primary revenue.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Growth Experimentation", "A/B Testing", "Advertising Model", "Premium Subscriptions", "Contextual Signals"].map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-slate-300 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Exec Summary. The PM bet in 4 sentences */}
        <div
          className={`glass rounded-2xl p-6 mb-6 border border-blue-500/20 transition-all duration-700 delay-100 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ background: "rgba(0, 73, 144, 0.08)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded-md bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Target className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <span className="text-sm font-semibold text-blue-300">Executive Summary</span>
            <span className="ml-auto text-xs text-slate-300">The bet in 4 sentences</span>
          </div>
          <div className="space-y-3 text-sm leading-relaxed">
            <p className="text-slate-300">
              <strong className="text-white">The opportunity:</strong> weather.com&apos;s 360M Monthly Active Users generate enormous advertising inventory. 
              but every session is currently treated identically at the growth layer, regardless of whether the user 
              is casually checking tomorrow&apos;s forecast or actively tracking a hurricane approaching their home.
            </p>
            <p className="text-slate-300">
              <strong className="text-white">The insight:</strong> Weather conditions are a real-time signal of user intent and emotional 
              state that no advertising platform currently exploits. A user in an active storm has 3–5× higher session 
              dwell time, 4× higher alert opt-in rate, and meaningfully higher willingness-to-pay for premium features. 
              but only for minutes, not days.
            </p>
            <p className="text-slate-300">
              <strong className="text-white">The framework:</strong> A <strong className="text-blue-300">Weather Moment Score (WMS)</strong>. 
              This score looks at how severe the weather is, how long the user is staying on the page, and how many people are affected. 
              It uses this score to intelligently show the user the right feature (an ad, an alert sign-up, or a paywall) to make the most money without annoying them.
            </p>
            <p className="text-slate-300">
              <strong className="text-slate-300">The constraint acknowledged:</strong> More paywalls can mean fewer ad views, which hurts revenue. 
              This strategy protects TWC&apos;s core advertising business. We only show the premium paywall when the weather is severe enough 
              that the chance of someone buying a subscription is worth more than the money we&apos;d make simply showing them another ad.
            </p>
          </div>
        </div>

        {/* The problem */}
        <SectionCard
          id="why"
          open={openSection}
          toggle={setOpenSection}
          delay="delay-150"
          animateIn={animateIn}
          icon={AlertTriangle}
          iconColor="#f59e0b"
          label="The Problem"
          title="A context-blind growth surface"
        >
          <div className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              weather.com serves weather data to ~360M monthly users. The growth team&apos;s mandate is to increase 
              revenue per visit (Revenue Per Visit). The primary metric that captures both ad quality and premium conversion 
              in a single measurement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <StatBox label="Monthly Active Users" value="360M" color="#3b82f6" sub="weather.com + wunderground.com" />
              <StatBox label="Primary Revenue" value="Advertising" color="#f59e0b" sub="Cost Per Thousand Impressions (CPM)-based, weather-contextual" />
              <StatBox label="Data Accuracy" value="4× better" color="#10b981" sub="vs. Competitors globally" />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              The current growth surface treats all sessions equally: the same paywall prompt, the same ad density, 
              the same push notification ask, regardless of whether you&apos;re idly scrolling on a sunny Tuesday 
              or frantically refreshing during a tornado warning. This is a significant missed signal.
            </p>
            <div className="glass rounded-xl p-4 border border-amber-500/15">
              <div className="text-xs font-semibold text-amber-400 mb-1">The Missed Signal</div>
              <div className="text-[10px] text-slate-300 italic mb-3">Note: Conversion and session figures are PM hypotheses modeled from industry benchmarks (e.g., Amplitude, Reforge), not actual TWC internal data.</div>
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div>
                  <div className="text-slate-300 font-medium mb-1">Low-severity session (WMS &lt; 35)</div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Avg session: 45 seconds</li>
                    <li>• Paywall Conversion Rate: 0.3–0.8%</li>
                    <li>• Push opt-in: ~4%</li>
                    <li>• Best lever: ad format quality</li>
                  </ul>
                </div>
                <div>
                  <div className="text-slate-300 font-medium mb-1">High-severity session (WMS ≥ 65)</div>
                  <ul className="space-y-1 text-slate-300">
                    <li>• Avg session: 4–7 minutes</li>
                    <li>• Paywall Conversion Rate: 2–4% (estimated)</li>
                    <li>• Push opt-in: ~18%</li>
                    <li>• Best lever: contextual upsell</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* The WMS framework */}
        <SectionCard
          id="wms"
          open={openSection}
          toggle={setOpenSection}
          delay="delay-200"
          animateIn={animateIn}
          icon={BarChart2}
          iconColor="#8b5cf6"
          label="The Framework"
          title="Weather Moment Score (WMS)"
        >
          <div className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              WMS is a session-level composite signal, not a user-level model. It uses anonymous, privacy-compliant first-party cookies for session stickiness to track A/B testing downstream conversions, requiring zero PII. This constraint ensures compatibility with TWC&apos;s 
              privacy-forward infrastructure and the open web.
            </p>

            {/* Formula breakdown */}
            <div className="glass rounded-xl p-4 border border-purple-500/15">
              <div className="text-xs font-semibold text-purple-400 mb-3">WMS Formula (Proposed)</div>
              <div className="font-mono text-xs text-center py-3 px-4 rounded-lg bg-purple-500/5 border border-purple-500/15 text-purple-300 mb-3">
                WMS = (Severity Index × 0.55) + (Dwell Trajectory × 0.25) + (Geo Exposure Rate × 0.20)
              </div>
              <div className="grid grid-cols-3 gap-3 text-[11px]">
                <div>
                  <div className="text-slate-300 font-semibold mb-1">Severity Index (55%)</div>
                  <div className="text-slate-300">WMO code → 5-level classification: clear→mild→moderate→severe→extreme</div>
                </div>
                <div>
                  <div className="text-slate-300 font-semibold mb-1">Dwell Trajectory (25%)</div>
                  <div className="text-slate-300">Page-load frequency in session. Rapid refreshes signal active monitoring behavior.</div>
                </div>
                <div>
                  <div className="text-slate-300 font-semibold mb-1">Geo Exposure Rate (20%)</div>
                  <div className="text-slate-300">% of local population under the same conditions. High = community-level event = amplified intent.</div>
                </div>
              </div>
            </div>

            {/* WMS → lever routing */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">WMS → Growth Lever Routing</div>
              {[
                { range: "0–34", label: "Low WMS", lever: "EXP-A: Optimize ad format for impression quality", bg: "#3b82f6", logic: "Subscription friction creates churn risk greater than conversion upside at this WMS." },
                { range: "35–64", label: "Mid WMS", lever: "EXP-B: Contextual push notification opt-in", bg: "#10b981", logic: "Convert current engagement into a return visit. Each daily user = ~12 more ad impressions." },
                { range: "65–100", label: "High WMS", lever: "EXP-C: Severity-gated premium upsell", bg: "#8b5cf6", logic: "Session value peaks. User&apos;s need for advanced data exceeds the marginal Cost Per Thousand Impressions (CPM) of one more ad." },
              ].map((row) => (
                <div key={row.range} className="glass rounded-xl p-3 flex items-start gap-3 border border-white/6">
                  <div
                    className="min-w-[44px] text-center py-1 rounded-lg font-mono text-xs font-bold"
                    style={{ background: `${row.bg}15`, color: row.bg, border: `1px solid ${row.bg}30` }}
                  >
                    {row.range}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-white mb-0.5">{row.lever}</div>
                    <div className="text-xs text-slate-300">{row.logic}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hypothesis formation. This is the JD's "partner with data scientist" signal */}
            <div className="glass rounded-xl p-4 border border-blue-500/12">
              <div className="text-xs font-semibold text-blue-400 mb-3">Hypothesis Formation. PM × Data Scientist Collaboration</div>
              <div className="space-y-2">
                <HypothesisStep
                  num="01"
                  role="PM"
                  roleColor="#3b82f6"
                  title="Identify the behavioral signal"
                  body="Observation: Users in High-severity sessions exhibit qualitatively different behavior. Multi-tab refreshing, direct map access, longer time-on-page. Hypothesis: This behavioral shift correlates with elevated purchase intent."
                />
                <HypothesisStep
                  num="02"
                  role="DS"
                  roleColor="#10b981"
                  title="Validate and quantify the signal"
                  body="Data scientist runs cohort analysis on historical session data segmented by WMO severity. Confirms: session duration (+340% during severe events), bounce rate (−60%), and push opt-in rate (+350%) all correlate significantly with severity index."
                />
                <HypothesisStep
                  num="03"
                  role="PM + DS"
                  roleColor="#8b5cf6"
                  title="Define thresholds and guardrails"
                  body="Joint decision: WMS ≥ 65 (roughly WMO code ≥ 61 + wind ≥ 35 mph) chosen as activation threshold. Guardrail: paywall dismissal rate must not exceed +5 percentage points above baseline. Exceeding this indicates friction overwhelming intent signal."
                />
                <HypothesisStep
                  num="04"
                  role="PM"
                  roleColor="#3b82f6"
                  title="Write the formal hypothesis"
                  body="For sessions where WMS ≥ 65: contextual paywall copy naming the user's exact conditions will increase free trial start rate by ≥1.5 percentage points vs. generic control, within 14 days at 95% statistical significance, while keeping ad session revenue impact at ≤3%."
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Three experiments */}
        <SectionCard
          id="experiments"
          open={openSection}
          toggle={setOpenSection}
          delay="delay-250"
          animateIn={animateIn}
          icon={Zap}
          iconColor="#f59e0b"
          label="Three Experiments"
          title="Testing all three revenue levers"
        >
          <div className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              Rather than a single A/B test, this framework proposes three sequential experiments, each targeting 
              a different revenue lever. They are designed to run non-overlapping user cohorts to prevent 
              interference effects.
            </p>
            <ExperimentCard
              id="A"
              icon={TrendingUp}
              color="#3b82f6"
              title="EXP-A: Weather-triggered ad format switching"
              hypothesis="During High-severity weather sessions, switching from standard banner to large sticky banner or in-feed native video formats will increase revenue per visit by ≥8%. (Note: Interstitials are explicitly banned during active weather events due to user safety concerns)."
              metric="Primary: Revenue Per Visit · Guardrail: Bounce rate (must not increase >3pp)"
              status="proposed"
              rationale="Ad revenue is TWC's primary income stream. Optimizing format for peak engagement sessions is the lowest-risk, highest-leverage starting point, no new product surface required."
              scale="~18M US users exposed in 72 hrs at 50% rollout"
            />
            <ExperimentCard
              id="B"
              icon={Bell}
              color="#10b981"
              title="EXP-B: Contextual push notification opt-in"
              hypothesis="Showing a contextual push opt-in ('Get alerted when the storm reaches your block') during moderate-severity sessions will increase D7 return visit rate by ≥12%."
              metric="Primary: D7 return visit rate · Guardrail: Opt-in rate (must reach ≥8% before scaling)"
              status="proposed"
              rationale="Each daily active user created through EXP-B generates ~12 additional ad impressions before any premium consideration. Engagement compounds the ad model rather than competing with it."
              scale="~14M US users in moderate+ conditions on any given day"
            />
            <ExperimentCard
              id="C"
              icon={Zap}
              color="#8b5cf6"
              title="EXP-C: Severity-gated contextual premium upsell"
              hypothesis="For WMS ≥ 65 sessions: contextual copy naming the user's exact conditions will increase free trial start rate by ≥1.5pp vs. generic control at 95% significance, within 14 days."
              metric="Primary: Free trial Conversion Rate · Secondary: 30-day trial retention · Guardrail: Ad session revenue impact ≤3%"
              status="active"
              rationale="Only runs at high WMS where estimated subscription Lifetime Value > Cost Per Thousand Impressions (CPM) value of the forgone ad impression. Designed as an insurance policy for ad model, not a replacement."
              scale="~7.5M users at WMS ≥ 65 in 72 hrs at 50% rollout"
              isActive
            />
          </div>
        </SectionCard>

        {/* What I would NOT build */}
        <SectionCard
          id="not-build"
          open={openSection}
          toggle={setOpenSection}
          delay="delay-300"
          animateIn={animateIn}
          icon={X}
          iconColor="#ef4444"
          label="Prioritization"
          title="What I explicitly would not build (and why)"
        >
          <div className="space-y-3">
            <p className="text-slate-300 text-sm leading-relaxed">
              The strongest PM signal isn&apos;t knowing what to build. It&apos;s knowing what to cut. 
              Three deprioritizations that were tempting but wrong for this context:
            </p>
            <NotBuildCard
              title="Aggressive paywall frequency increase"
              reason="The obvious move for a PM told to 'grow subscription revenue'. But wrong. At TWC's scale, a 10% paywall frequency increase creates millions of friction events. Without high WMS gating, conversion rates stay low and user trust erodes faster than Lifetime Value accumulates. Short-term Conversion Rate lift, long-term engagement decline."
            />
            <NotBuildCard
              title="App-download conversion as a growth surface"
              reason="A separate team's mandate. Optimizing app downloads on web surfaces creates misaligned incentives. Web Revenue Per Visit drops when users migrate to the app, even if the app generates more revenue. The Web Consumer Platform team's mandate is clear: grow web Revenue Per Visit. Stay in the lane."
            />
            <NotBuildCard
              title="ML-based personalization model (v1)"
              reason="Tempting given TWC's data moat, but premature. A rule-based WMS classifier using existing WMO codes and session signals gets us 80% of the impact at 10% of the data infrastructure cost. Build the experimentation results first, then train a model on them. Rule-based → data collection → ML is the right sequence."
            />
          </div>
        </SectionCard>

        {/* AI Strategy & Tradeoffs */}
        <SectionCard
          id="ai-strategy"
          open={openSection}
          toggle={setOpenSection}
          delay="delay-325"
          animateIn={animateIn}
          icon={Brain}
          iconColor="#f59e0b"
          label="Implementation Strategy"
          title="AI integration and engineering tradeoffs"
        >
          <div className="space-y-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              To maximize the Conversion Rate of EXP-C (the severity-gated premium upsell), the paywall copy needs to be hyper-contextual to the user's exact severe weather situation. This requires a balanced approach to AI integration.
            </p>
            
            <div className="glass rounded-xl p-4 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="h-4 w-4 text-amber-400" />
                <h3 className="text-white font-semibold text-sm">LLM vs. Rule-Based Fallback</h3>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">The Ideal State (LLM):</strong> Using an AI model (like Claude Haiku) generates highly contextual, empathetic copy dynamically (e.g., "Heavy rain approaching your area. View the 2-hour radar to stay dry"). It maximizes relevance and conversion.
                </p>
                <div className="h-px w-full bg-white/10" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">The PM Tradeoff (Latency vs. Lift):</strong> At 360M Monthly Active Users, invoking an LLM for every high-WMS session introduces unacceptable latency (300ms+) and points of failure. The tradeoff decision: We <strong className="text-amber-400">never block the render</strong> waiting for AI.
                </p>
                <div className="h-px w-full bg-white/10" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">The Fallback Architecture:</strong> The application defaults synchronously to a lightning-fast, hardcoded rule-based template based strictly on the WMO severity code. The LLM is fetched asynchronously in parallel. If the LLM exceeds a strict 150ms timeout or fails, the user sees the rule-based copy. We achieve the personalization lift of AI without sacrificing the 99.99% uptime requirement of an enterprise weather platform.
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ROI model */}
        <SectionCard
          id="roi"
          open={openSection}
          toggle={setOpenSection}
          delay="delay-350"
          animateIn={animateIn}
          icon={DollarSign}
          iconColor="#22c55e"
          label="Business Case"
          title="Conservative ROI estimate"
        >
          <div className="space-y-4">
            <p className="text-xs text-slate-300 italic">
              All figures are illustrative estimates for PM portfolio purposes. Not based on TWC internal data.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ROICard
                exp="EXP-A"
                lever="Ad Format"
                color="#3b82f6"
                assumption="50M US users/month. 30% in moderate+ conditions. +8% Revenue Per Visit on affected sessions."
                estimate="+$3–6M ARR incremental ad revenue"
                risk="Low"
              />
              <ROICard
                exp="EXP-B"
                lever="Engagement"
                color="#10b981"
                assumption="14M moderate+ sessions/day. 8% push opt-in. 40% opt-in → D7 return. 12 ad impressions per return visit/year."
                estimate="+$8–15M ARR in compounding ad inventory"
                risk="Low–Med"
              />
              <ROICard
                exp="EXP-C"
                lever="Premium"
                color="#8b5cf6"
                assumption="7.5M high-WMS sessions in 72 hrs. 1.5pp Conversion Rate lift. $5/mo avg. 40% trial-to-paid."
                estimate="+$2–4M ARR new subscription revenue"
                risk="Med"
              />
            </div>
            <div className="glass rounded-xl p-3 border border-green-500/15">
              <div className="text-xs text-green-400 font-semibold mb-1">Bottom-Up: Combined Three-Lever Opportunity</div>
              <div className="text-white font-bold text-lg">$13–25M ARR incremental</div>
              <div className="text-slate-300 text-xs mt-0.5">Conservative. Assumes no cannibalization between levers (WMS routing logic prevents this). Assumes no change to ad Cost Per Thousand Impressions (CPM) baseline.</div>
            </div>
          </div>
        </SectionCard>

        {/* Reflections */}
        <SectionCard
          id="reflect"
          open={openSection}
          toggle={setOpenSection}
          delay="delay-400"
          animateIn={animateIn}
          icon={Users}
          iconColor="#38bdf8"
          label="If I Were on the Team"
          title="Day 1 priorities and honest gaps"
        >
          <div className="space-y-3">
            <p className="text-slate-300 text-sm leading-relaxed">
              Portfolio projects are hypotheses about product thinking. Here&apos;s what I&apos;d do if this became a real work project, 
              and where this analysis has genuine gaps I haven&apos;t resolved.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ReflectionCard
                title="First 30 days"
                body="Shadow the web data scientist to understand which session signals are actually instrumented. My WMS formula assumes dwell trajectory is trackable, and that assumption needs to be validated against real analytics infrastructure."
              />
              <ReflectionCard
                title="The qualitative gap"
                body="WMS is a quantitative construct. I'd want 10+ user interviews from people who checked weather during a severe event, to understand what they actually wanted that they didn't get, before running EXP-C at scale."
              />
              <ReflectionCard
                title="EXP-A is the real starting point"
                body="Start with ad format switching. Lowest risk, doesn't require a new product surface, and builds the experimentation infrastructure that EXP-B and EXP-C will depend on. Don't start with a paywall."
              />
              <ReflectionCard
                title="The privacy constraint"
                body="WMS uses anonymous first-party cookies for session stickiness. But session frequency tracking still raises questions about browser fingerprinting constraints. This needs a legal/privacy review before implementation."
              />
              <ReflectionCard
                title="Cross-Functional Alignment (GTM)"
                body="Bring in Legal/Privacy early to review cookie compliance for A/B tracking, and align with Product Marketing so the premium paywall copy matches TWC's brand voice. Growth PMs don't ship in a vacuum."
              />
            </div>
          </div>
        </SectionCard>

        {/* Footer CTA */}
        <div className={`mt-8 flex gap-3 transition-all duration-700 delay-500 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <a
            href="/experiment"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
          >
            See EXP-C Live Results <ChevronRight className="h-4 w-4" />
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

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({
  id, open, toggle, delay, animateIn, icon: Icon, iconColor, label, title, children,
}: {
  id: string; open: string | null; toggle: (id: string | null) => void; delay: string;
  animateIn: boolean; icon: React.ElementType; iconColor: string; label: string; title: string;
  children: React.ReactNode;
}) {
  const isOpen = open === id;
  return (
    <div
      className={`glass rounded-2xl mb-4 border border-white/6 overflow-hidden transition-all duration-700 ${delay} ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <button
        className="w-full flex items-center gap-3 p-5 text-left group hover:bg-white/2 transition-colors"
        onClick={() => toggle(isOpen ? null : id)}
      >
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${iconColor}15`, border: `1px solid ${iconColor}30` }}
        >
          <Icon className="h-4 w-4" style={{ color: iconColor }} />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: iconColor }}>
            {label}
          </div>
          <div className="text-white font-semibold leading-tight">{title}</div>
        </div>
        <ChevronRight
          className={`h-4 w-4 text-slate-300 transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </button>
      {isOpen && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function StatBox({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="glass rounded-xl p-3 border border-white/5">
      <div className="text-xs text-slate-300 mb-1">{label}</div>
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
      <div className="text-[10px] text-slate-300 mt-0.5">{sub}</div>
    </div>
  );
}

function ExperimentCard({
  id, icon: Icon, color, title, hypothesis, metric, status, rationale, scale, isActive,
}: {
  id: string; icon: React.ElementType; color: string; title: string; hypothesis: string;
  metric: string; status: string; rationale: string; scale: string; isActive?: boolean;
}) {
  return (
    <div
      className="glass rounded-xl p-4 border transition-colors"
      style={{ borderColor: isActive ? `${color}40` : "rgba(255,255,255,0.06)" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
            EXP-{id}{isActive ? " · Currently Running" : " · Proposed"}
          </div>
          <div className="text-white text-sm font-semibold">{title}</div>
        </div>
      </div>
      <div className="space-y-2 text-xs">
        <div>
          <span className="text-slate-300 font-semibold uppercase tracking-wide text-[10px]">Hypothesis: </span>
          <span className="text-slate-300">{hypothesis}</span>
        </div>
        <div>
          <span className="text-slate-300 font-semibold uppercase tracking-wide text-[10px]">Metrics: </span>
          <span className="text-slate-300">{metric}</span>
        </div>
        <div>
          <span className="text-slate-300 font-semibold uppercase tracking-wide text-[10px]">Rationale: </span>
          <span className="text-slate-300">{rationale}</span>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ color, background: `${color}12`, border: `1px solid ${color}25` }}>
            {scale}
          </span>
        </div>
      </div>
    </div>
  );
}

function NotBuildCard({ title, reason }: { title: string; reason: string }) {
  return (
    <div className="glass rounded-xl p-4 border border-red-500/10">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-red-400 text-xs font-bold mt-0.5 flex-shrink-0">✕</span>
        <div className="text-sm font-semibold text-white">{title}</div>
      </div>
      <p className="text-slate-300 text-xs leading-relaxed pl-4">{reason}</p>
    </div>
  );
}

function ROICard({ exp, lever, color, assumption, estimate, risk }: {
  exp: string; lever: string; color: string; assumption: string; estimate: string; risk: string;
}) {
  return (
    <div className="glass rounded-xl p-4 border border-white/6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color, background: `${color}15`, border: `1px solid ${color}25` }}>
          {exp} · {lever}
        </span>
        <span className={`text-[9px] ml-auto px-1.5 py-0.5 rounded-full font-semibold ${risk === "Low" ? "text-green-400 bg-green-400/10" : risk === "Med" ? "text-amber-400 bg-amber-400/10" : "text-red-400 bg-red-400/10"}`}>
          Risk: {risk}
        </span>
      </div>
      <div className="text-xs text-slate-300 mb-2 leading-relaxed">{assumption}</div>
      <div className="text-sm font-bold" style={{ color }}>{estimate}</div>
    </div>
  );
}

function ReflectionCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass rounded-xl p-4 border border-white/6">
      <div className="text-sm font-semibold text-slate-200 mb-2">{title}</div>
      <p className="text-slate-300 text-xs leading-relaxed">{body}</p>
    </div>
  );
}

function HypothesisStep({ num, role, roleColor, title, body }: {
  num: string; role: string; roleColor: string; title: string; body: string;
}) {
  return (
    <div className="flex gap-3 p-3 glass rounded-xl border border-white/5">
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
        <div
          className="h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ background: `${roleColor}15`, border: `1px solid ${roleColor}30`, color: roleColor }}
        >
          {num}
        </div>
        <div
          className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded"
          style={{ color: roleColor, background: `${roleColor}10` }}
        >
          {role}
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold text-white mb-1">{title}</div>
        <div className="text-xs text-slate-300 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}
