import { NextRequest, NextResponse } from "next/server";
import { WeatherData, generatePaywallCopy, PaywallCopy } from "@/lib/weather";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const weather: WeatherData = body.weather;
    const variant: "control" | "contextual" = body.variant ?? "contextual";

    if (!weather) {
      return NextResponse.json({ error: "weather data required" }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    let copy: PaywallCopy;

    if (apiKey && variant === "contextual") {
      const prompt = `You are a senior growth copywriter at The Weather Company.

Current weather context:
- Location: ${weather.location}
- Condition: ${weather.weatherDescription}
- Temperature: ${weather.temperature}°F
- Severity: ${weather.severity}
- Wind Speed: ${weather.windSpeed} km/h
- Humidity: ${weather.humidity}%

Write contextual subscription paywall copy calibrated to this user's in-the-moment willingness-to-pay.
Extreme/severe weather = urgent, safety-driven copy. Clear/mild weather = lifestyle, planning copy.
Be specific to the actual conditions. Keep copy concise and punchy.

Respond ONLY with valid JSON (no explanation, no markdown, just the JSON object):
{
  "headline": "...",
  "subheadline": "...",
  "ctaText": "...",
  "urgencyLevel": <integer 0-10>,
  "featureHighlight": "Feature 1 · Feature 2 · Feature 3",
  "socialProof": "..."
}`;

      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://stormgate.vercel.app",
            "X-Title": "StormGate — Weather Subscription Engine",
          },
          body: JSON.stringify({
            model: "anthropic/claude-haiku-4-5",
            max_tokens: 400,
            temperature: 0.7,
            messages: [{ role: "user", content: prompt }],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const rawText: string = data.choices?.[0]?.message?.content ?? "";
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            copy = JSON.parse(jsonMatch[0]) as PaywallCopy;
          } else {
            copy = generatePaywallCopy(weather, variant);
          }
        } else {
          copy = generatePaywallCopy(weather, variant);
        }
      } catch {
        copy = generatePaywallCopy(weather, variant);
      }
    } else {
      copy = generatePaywallCopy(weather, variant);
    }

    return NextResponse.json(copy, {
      headers: {
        "Cache-Control": "s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("Paywall API error:", err);
    return NextResponse.json({ error: "Failed to generate copy" }, { status: 500 });
  }
}
