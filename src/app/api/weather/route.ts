import { NextRequest, NextResponse } from "next/server";
import {
  WeatherData,
  WMO_CODES,
  classifySeverity,
  HourlyPoint,
  DailyPoint,
} from "@/lib/weather";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const locationName = searchParams.get("name") || "Your Location";

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", lat);
    url.searchParams.set("longitude", lon);
    url.searchParams.set(
      "current",
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day,visibility,uv_index"
    );
    url.searchParams.set(
      "hourly",
      "temperature_2m,weather_code,precipitation_probability"
    );
    url.searchParams.set(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max"
    );
    url.searchParams.set("temperature_unit", "fahrenheit");
    url.searchParams.set("wind_speed_unit", "kmh");
    url.searchParams.set("timezone", "auto");
    url.searchParams.set("forecast_days", "7");
    url.searchParams.set("hourly_forecast_days", "1");

    const res = await fetch(url.toString(), {
      headers: { "Accept-Encoding": "gzip" },
    });

    if (!res.ok) {
      throw new Error(`Open-Meteo responded with ${res.status}`);
    }

    const raw = await res.json();
    const current = raw.current;
    const hourly = raw.hourly;
    const daily = raw.daily;

    const weatherCode: number = current.weather_code;
    const windSpeed: number = current.wind_speed_10m;
    const severity = classifySeverity(weatherCode, windSpeed);

    // Build hourly forecast (next 12 hours)
    const hourlyForecast: HourlyPoint[] = [];
    for (let i = 0; i < Math.min(12, hourly.time.length); i++) {
      hourlyForecast.push({
        time: hourly.time[i],
        temp: Math.round(hourly.temperature_2m[i]),
        weatherCode: hourly.weather_code[i],
        precipProbability: hourly.precipitation_probability[i] ?? 0,
      });
    }

    // Build 7-day daily forecast
    const dailyForecast: DailyPoint[] = [];
    for (let i = 0; i < Math.min(7, daily.time.length); i++) {
      dailyForecast.push({
        date: daily.time[i],
        maxTemp: Math.round(daily.temperature_2m_max[i]),
        minTemp: Math.round(daily.temperature_2m_min[i]),
        weatherCode: daily.weather_code[i],
        precipProbability: daily.precipitation_probability_max[i] ?? 0,
        precipAmount: Math.round((daily.precipitation_sum[i] ?? 0) * 10) / 10,
      });
    }

    const weatherData: WeatherData = {
      location: locationName,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(windSpeed),
      windDirection: current.wind_direction_10m,
      visibility: Math.round((current.visibility ?? 10000) / 1000),
      uvIndex: Math.round(current.uv_index ?? 0),
      weatherCode,
      weatherDescription: WMO_CODES[weatherCode] ?? "Unknown",
      severity,
      isDay: current.is_day === 1,
      hourlyForecast,
      dailyForecast,
    };

    return NextResponse.json(weatherData, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Weather API error:", err);
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
