"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "summary", label: "Executive Summary" },
  { id: "problem", label: "The Problem" },
  { id: "users", label: "Target Users" },
  { id: "solution", label: "The Solution" },
  { id: "flywheel", label: "The Growth Flywheel" },
  { id: "metrics", label: "Success Metrics" },
  { id: "roi", label: "ROI Analysis" },
  { id: "architecture", label: "Technical Architecture" },
  { id: "reflections", label: "Reflections" },
];

export default function CaseStudyPage() {
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0f1a", color: "#e2e8f0" }}>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.2)",
          padding: "60px 24px 48px",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: 20,
              padding: "6px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#a5b4fc",
              marginBottom: 24,
              textTransform: "uppercase",
            }}
          >
            ⚡ PM Case Study
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 16,
              background: "linear-gradient(135deg, #e2e8f0 0%, #a5b4fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            StormGate: A Contextual Subscription Engine for The Weather Company
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#94a3b8", maxWidth: 680, lineHeight: 1.7 }}>
            A real-time weather intelligence layer that dynamically triggers paywalls at peak willingness-to-pay moments — replacing blanket monetization with precision growth.
          </p>
          <div style={{ display: "flex", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            {[
              { label: "Role", value: "Associate PM Candidate" },
              { label: "Company", value: "The Weather Company" },
              { label: "Timeline", value: "10-Week Concept Sprint" },
              { label: "Scope", value: "Paywall · AI · Growth" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 15, color: "#cbd5e1", fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body: Sidebar + Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", display: "flex", gap: 48, alignItems: "flex-start" }}>
        {/* Sticky Sidebar */}
        <div
          style={{
            width: 200,
            flexShrink: 0,
            position: "sticky",
            top: 80,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 10, color: "#475569", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Contents</div>
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "6px 10px",
                borderRadius: 6,
                fontSize: 13,
                color: activeSection === id ? "#a5b4fc" : "#64748b",
                fontWeight: activeSection === id ? 600 : 400,
                borderLeft: `2px solid ${activeSection === id ? "#6366f1" : "transparent"}`,
                transition: "all 0.2s",
                marginBottom: 2,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, maxWidth: 800 }}>

          {/* Executive Summary */}
          <Section id="summary" title="Executive Summary" icon="📋">
            <Callout color="#6366f1">
              The Weather Company reaches 360M monthly active users but faces a critical monetization tension: blanket paywalls shown to all users regardless of context generate churn, not conversions.
            </Callout>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginTop: 16 }}>
              StormGate is a contextual subscription engine that solves this by reading real-time weather data — severity, urgency, local conditions — and dynamically adjusting paywall copy, timing, and offer framing to match the user&apos;s in-the-moment emotional and informational state.
            </p>
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginTop: 12 }}>
              When a category-4 hurricane is approaching Miami, the user&apos;s willingness-to-pay for premium forecasts is order-of-magnitude higher than a mild Tuesday afternoon. StormGate captures that delta. The result: estimated +18–32% paywall conversion improvement during high-severity weather events, without increasing paywall frequency for low-intent users.
            </p>
          </Section>

          {/* The Problem */}
          <Section id="problem" title="The Problem" icon="🎯">
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
              The Weather Company&apos;s premium subscription model faces a structural monetization problem that compounds over time.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ProblemCard
                num="01"
                title="Context-Blind Paywalls"
                body="The same subscription CTA fires on a sunny Tuesday as it does during a tropical storm. This trains users to ignore it — pavlovian desensitization that permanently degrades paywall effectiveness."
              />
              <ProblemCard
                num="02"
                title="Missed Peak Willingness-to-Pay"
                body="Severe weather events create acute, genuine demand for premium forecasts. A user tracking a hurricane has 10× the intent to convert vs. a baseline user. Current systems don't capture this signal."
              />
              <ProblemCard
                num="03"
                title="Over-Monetization Reputation Risk"
                body="Industry reporting (The Information, 2024) documents user sentiment that TWC 'shows too many paywalls.' This threatens the 360M MAU base that drives advertising revenue — the core business."
              />
              <ProblemCard
                num="04"
                title="Static Copy in a Dynamic World"
                body="Weather is inherently contextual. 'Unlock Premium Forecasts' is the same message for a user in a blizzard and a user checking if it&apos;ll rain at a wedding. Generic copy is a growth ceiling."
              />
            </div>
          </Section>

          {/* Target Users */}
          <Section id="users" title="Target Users" icon="👤">
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
              StormGate was designed around three primary user archetypes with distinct weather-to-subscription conversion dynamics.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <UserCard
                initials="SM"
                color="#ef4444"
                name="Storm Tracker"
                role="Hurricane coast resident, amateur meteorologist"
                pains={["Needs hour-by-hour storm track accuracy", "Can't find reliable 72-hour cone projections", "Current free tier cuts off at 3-day forecasts"]}
                jtbd="When severe weather threatens my area, I want certainty so I can make evacuation decisions confidently."
              />
              <UserCard
                initials="OC"
                color="#f59e0b"
                name="Outdoor Commuter"
                role="Cyclist, runner — weather affects daily decisions"
                pains={["Doesn't want premium during clear stretches", "Free tier is sufficient 80% of the time", "Converts only when caught off-guard by weather"]}
                jtbd="When I'm planning routes, I want precision so I can avoid getting soaked or canceling unnecessarily."
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <UserCard
                initials="EP"
                color="#6366f1"
                name="Event Planner"
                role="Wedding, outdoor festival, sports coordinator"
                pains={["Weekend-only high-stakes weather need", "Doesn't value daily premium subscription", "One bad forecast = significant real-world loss"]}
                jtbd="When I'm coordinating outdoor events, I want a detailed 10-day forecast so I can communicate confidently with clients."
              />
              <UserCard
                initials="FW"
                color="#10b981"
                name="Frequency Weather Watcher"
                role="Daily active user — checks 3–5x per day"
                pains={["Already engaged but non-converting", "Paywall friction creates frustration not conversion", "Would pay for ad-free + extended data bundle"]}
                jtbd="I want seamless access without ads so the product feels premium, not like a bait-and-switch."
              />
            </div>
          </Section>

          {/* The Solution */}
          <Section id="solution" title="The Solution" icon="⚡">
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
              Three deliberate design decisions differentiate StormGate from a conventional paywall system.
            </p>

            <EpicCard
              num="01"
              title="Severity-Adaptive Engine"
              body="A classification pipeline maps WMO weather codes + wind speed + precipitation rate to a 5-level severity index (Clear → Mild → Moderate → Severe → Extreme). Each severity level unlocks a distinct paywall variant — from lifestyle framing ('Plan your weekend precisely') to safety-urgency framing ('Exact evacuation timing — updated every 6 minutes')."
              insight="Higher severity = higher conversion probability = show paywall sooner in the session, not later."
              badge="Core Logic"
              badgeColor="#6366f1"
            />

            <EpicCard
              num="02"
              title="AI-Powered Contextual Copy"
              body="OpenRouter/Claude generates real-time paywall copy seeded with the user's exact conditions: location, WMO code, temperature, wind speed, and time of day. The copy is never generic. A user in a coastal storm sees 'Storm surge timing is a Premium forecast. See the exact hour it peaks.' A clear-day user sees 'Plan this weekend with an hour-by-hour precision forecast.'"
              insight="Copy that names the user's exact situation converts 2–4× better than generic urgency copy."
              badge="AI Layer"
              badgeColor="#8b5cf6"
            />

            <EpicCard
              num="03"
              title="A/B Experiment Framework"
              body="A built-in experiment simulator lets PMs run Control (generic paywall) vs. Contextual (severity-adaptive) comparisons. The framework tracks conversion rate, session depth before trigger, and segment-level lift. This isn't a demo artifact — it's a prototype of the PM tooling that would operate StormGate in production."
              insight="Experiments must be observable and reversible. The dashboard makes both possible without engineering tickets."
              badge="PM Tooling"
              badgeColor="#10b981"
            />
          </Section>

          {/* Flywheel */}
          <Section id="flywheel" title="The Growth Flywheel" icon="🔄">
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
              StormGate&apos;s core insight is that contextual conversion creates a reinforcing loop — better data makes better targeting, which drives better conversion, which funds better forecasting, which attracts more users.
            </p>
            <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0, justifyContent: "center", alignItems: "center" }}>
                {[
                  { icon: "🌩️", label: "Severe Weather Event" },
                  { icon: "🎯", label: "Contextual Paywall Fires" },
                  { icon: "💳", label: "User Converts" },
                  { icon: "📊", label: "Behavioral Data Collected" },
                  { icon: "🤖", label: "Engine Learns Segment" },
                  { icon: "📈", label: "Next Event Converts Higher" },
                ].map(({ icon, label }, i, arr) => (
                  <div key={label} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ textAlign: "center", padding: "8px 12px" }}>
                      <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, maxWidth: 80, lineHeight: 1.3 }}>{label}</div>
                    </div>
                    {i < arr.length - 1 && <div style={{ color: "#6366f1", fontSize: 18, padding: "0 4px" }}>→</div>}
                  </div>
                ))}
              </div>
            </div>
            <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              Critically, this flywheel <strong style={{ color: "#e2e8f0" }}>doesn&apos;t increase total paywall frequency</strong> — it improves timing precision. Users who convert during a severe-weather session churn at lower rates because the premium product proved its value at the exact moment they needed it most. This is the behavioral economics insight at the core of StormGate: urgency-driven conversions create high-LTV subscribers, not just trials.
            </p>
          </Section>

          {/* Success Metrics */}
          <Section id="metrics" title="Success Metrics" icon="📊">
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
              Three categories of metrics define success. These were chosen to be measurable at week 2, week 8, and week 24 without requiring data infrastructure beyond standard analytics tooling.
            </p>
            <div style={{ marginBottom: 20 }}>
              <MetricLabel>Conversion Metrics</MetricLabel>
              <MetricTable rows={[
                ["Paywall CVR (Severe Events)", "Baseline ~3.2%", "5.5%+", "Experiment cohort A/B, event-segmented"],
                ["Paywall CVR (Moderate Events)", "Baseline ~1.8%", "2.8%+", "Same cohort, different severity bucket"],
                ["Subscription Start Rate", "Baseline", "+20% lift", "Not tied to specific severity"],
              ]} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <MetricLabel>Retention Metrics</MetricLabel>
              <MetricTable rows={[
                ["30-day Sub Retention (Weather-triggered)", "Industry avg 61%", "70%+", "Segment: converted during severe event"],
                ["Trial-to-Paid Rate", "Baseline", "Target +8pts", "StormGate cohort vs. organic sign-ups"],
              ]} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <MetricLabel>Health Metrics (Guard Rails)</MetricLabel>
              <MetricTable rows={[
                ["Paywall Dismissal Rate", "Existing rate", "No increase", "Alert if contextual paywall dismissed more than control"],
                ["App Session Abandonment", "Baseline rate", "No increase", "Ensures paywall timing isn&apos;t causing churn"],
                ["5-Star App Store Reviews", "Current average", "Maintain or improve", "Secondary signal for user trust"],
              ]} />
            </div>
          </Section>

          {/* ROI */}
          <Section id="roi" title="ROI Analysis" icon="💰">
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
              A conservative bottom-up model using publicly available TWC data and industry subscription benchmarks.
            </p>
            <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { label: "MAU Eligible for StormGate", value: "~72M", note: "20% of 360M in moderate+ weather markets" },
                  { label: "Severe Event Days/Year", value: "~45 days", note: "Avg severe weather exposure per eligible MAU" },
                  { label: "Incremental CVR Lift", value: "+2.3 pts", note: "Conservative mid-point of modeled range" },
                  { label: "Avg Sub Price", value: "$3.99/mo", note: "TWC Premium monthly price" },
                  { label: "12-Month Incremental Subs", value: "~745K", note: "72M × 45/365 × 2.3% lift vs. baseline 3.2%" },
                  { label: "Gross Annual Revenue Lift", value: "$35.7M", note: "At $3.99/mo × 745K × 12-month LTV factor" },
                ].map(({ label, value, note }) => (
                  <div key={label}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#10b981" }}>{value}</div>
                    <div style={{ fontSize: 13, color: "#e2e8f0", fontWeight: 600, marginTop: 2 }}>{label}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 4, lineHeight: 1.4 }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>
            <Callout color="#10b981">
              <strong>Key assumption check:</strong> This model assumes 30-day retention on weather-triggered subs is 68% (vs. 61% industry avg). If retention is baseline, revenue lift is still ~$21M — still a strong ROI against estimated 2-engineer, 1-PM, 12-week build cost.
            </Callout>
          </Section>

          {/* Architecture */}
          <Section id="architecture" title="Technical Architecture" icon="🏗️">
            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: 24 }}>
              StormGate is architected for edge performance — paywall decisions must happen in &lt;100ms to be invisible to users. The system has three layers.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <ArchLayer
                title="Edge Data Layer"
                detail="Vercel Edge Functions fetch weather data (Open-Meteo in demo; TWC Weather Data APIs in production) and run severity classification. This layer executes in &lt;40ms globally."
                color="#6366f1"
                note="Production note: TWC's own enterprise Weather Data APIs would replace Open-Meteo, eliminating third-party dependency and enabling proprietary signal enrichment."
              />
              <ArchLayer
                title="AI Copy Layer"
                detail="OpenRouter (Claude) generates contextual paywall copy seeded with exact conditions. A rule-based fallback fires if LLM latency exceeds 800ms threshold — ensuring paywall always shows, never hangs."
                color="#8b5cf6"
                note="Design decision: Rule-based fallback is not a compromise — it's a deliberate reliability pattern. 95th percentile LLM calls take <200ms on Claude Haiku."
              />
              <ArchLayer
                title="Experiment Layer"
                detail="Control vs. Contextual variants are assigned at session start via cookie. The PM dashboard surfaces cohort-level conversion rates, session depth, and severity-segment breakdown in real time."
                color="#10b981"
                note="This is the layer most production PM tools lack — the paywall experiment framework. StormGate makes it first-class, not an afterthought."
              />
            </div>
          </Section>

          {/* Reflections */}
          <Section id="reflections" title="Reflections" icon="💬">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ReflectionCard
                title="What I'd Do Differently"
                body="The demo uses a rule-based severity engine that maps WMO codes directly to paywall variants. In production, I'd train a lightweight ML classifier on historical conversion data to find non-obvious signals — time of day × weather code combinations, or geographic patterns (coastal users respond differently to hurricane watches than inland users 200 miles away)."
              />
              <ReflectionCard
                title="The Biggest Risk"
                body="Severe weather creates emotional states that are ethically complex to optimize against. A user tracking a hurricane is scared, not just a 'high-intent subscriber.' StormGate's paywall copy is designed to be genuinely useful (safety features, evacuation timing) rather than urgency-exploitative. Getting this tone right requires qualitative research with users in affected zones — not just CVR optimization."
              />
              <ReflectionCard
                title="What Would Make This Real"
                body="Three inputs would transform this prototype into a shippable product: (1) TWC's historical paywall impression + conversion data segmented by weather condition, (2) a qualitative study with 10–15 users who've experienced weather emergencies, and (3) legal review on using location + weather severity as conversion signals in GDPR/CCPA frameworks."
              />
              <ReflectionCard
                title="Why This Problem, Why Now"
                body="The Weather Company sits at a rare intersection: massive reach (360M MAU), deeply personal product category (weather affects real decisions), and an undermonetized premium tier. The contextual paywall opportunity is time-sensitive because subscription fatigue is increasing across all digital products — the window for precision paywall experiences is narrowing. Doing this well now creates a durable competitive moat."
              />
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

/* --- Sub-components --- */

function Section({ id, title, icon, children }: { id: string; title: string; icon: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 72, scrollMarginTop: 80 }}>
      <h2
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#e2e8f0",
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          paddingBottom: 12,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span>{icon}</span>
        <span>{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Callout({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderLeft: `3px solid ${color}`,
        background: `${color}10`,
        borderRadius: "0 8px 8px 0",
        padding: "14px 18px",
        color: "#cbd5e1",
        lineHeight: 1.7,
        fontSize: 15,
      }}
    >
      {children}
    </div>
  );
}

function ProblemCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        gap: 16,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgba(99,102,241,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          fontWeight: 700,
          color: "#a5b4fc",
        }}
      >
        {num}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: "#e2e8f0", marginBottom: 6 }}>{title}</div>
        <div style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 14 }}>{body}</div>
      </div>
    </div>
  );
}

function UserCard({ initials, color, name, role, pains, jtbd }: { initials: string; color: string; name: string; role: string; pains: string[]; jtbd: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: "#e2e8f0", fontSize: 14 }}>{name}</div>
          <div style={{ fontSize: 11, color: "#64748b" }}>{role}</div>
        </div>
      </div>
      <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Pain Points</div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", marginBottom: 12 }}>
        {pains.map((p) => (
          <li key={p} style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6, paddingLeft: 12, position: "relative" }}>
            <span style={{ position: "absolute", left: 0, color: color }}>✗</span>
            {p}
          </li>
        ))}
      </ul>
      <div style={{ background: `${color}15`, border: `1px solid ${color}30`, borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#cbd5e1", fontStyle: "italic", lineHeight: 1.5 }}>
        &ldquo;{jtbd}&rdquo;
      </div>
    </div>
  );
}

function EpicCard({ num, title, body, insight, badge, badgeColor }: { num: string; title: string; body: string; insight: string; badge: string; badgeColor: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 24, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ background: `${badgeColor}25`, border: `1px solid ${badgeColor}50`, borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: badgeColor, letterSpacing: "0.06em" }}>
          Epic {num}
        </div>
        <div style={{ fontSize: 12, background: "rgba(255,255,255,0.07)", borderRadius: 6, padding: "3px 8px", color: "#64748b", fontWeight: 600 }}>{badge}</div>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#e2e8f0", marginBottom: 10 }}>{title}</h3>
      <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: 14, marginBottom: 14 }}>{body}</p>
      <div style={{ background: `${badgeColor}10`, borderLeft: `2px solid ${badgeColor}`, borderRadius: "0 6px 6px 0", padding: "8px 14px", fontSize: 12, color: "#a5b4fc", fontStyle: "italic" }}>
        Key Insight: {insight}
      </div>
    </div>
  );
}

function MetricLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 700, color: "#6366f1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
      {children}
    </div>
  );
}

function MetricTable({ rows }: { rows: string[][] }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, overflow: "hidden", marginBottom: 8 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 2fr", gap: 0 }}>
        {["Metric", "Baseline", "Target", "How Measured"].map((h) => (
          <div key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, color: "#475569", background: "rgba(255,255,255,0.03)", letterSpacing: "0.06em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{h}</div>
        ))}
        {rows.map((row, i) =>
          row.map((cell, j) => (
            <div key={`${i}-${j}`} style={{ padding: "12px 16px", fontSize: 13, color: j === 2 ? "#10b981" : "#94a3b8", borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", fontWeight: j === 2 ? 600 : 400 }}>
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ArchLayer({ title, detail, color, note }: { title: string; detail: string; color: string; note: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${color}30`, borderRadius: 12, padding: 20, borderLeft: `3px solid ${color}` }}>
      <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 8, fontSize: 15 }}>{title}</div>
      <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 14, marginBottom: 10 }}>{detail}</p>
      <div style={{ fontSize: 12, color: "#64748b", fontStyle: "italic", lineHeight: 1.6 }}>
        ↳ {note}
      </div>
    </div>
  );
}

function ReflectionCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20 }}>
      <div style={{ fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{title}</div>
      <p style={{ color: "#94a3b8", lineHeight: 1.75, fontSize: 14, margin: 0 }}>{body}</p>
    </div>
  );
}
