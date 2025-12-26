
"use client";

import { useEffect, useState } from "react";
import DailyChart from "@/components/widgets/DailyChart";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

export default function ChartCard({ widget, remove }: any) {
  const [series, setSeries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);

        const cacheKey = `chart_${widget.symbol}`;
        const cached = localStorage.getItem(cacheKey);

        //  Using cached chart data if available
        if (cached) {
          const parsed = JSON.parse(cached);
          setSeries(parsed);
          return;
        }

        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${widget.symbol}&apikey=${API_KEY}`
        );
        const data = await res.json();

        //  Handling rat limit or invalid response
        if (data.Information || !data["Time Series (Daily)"]) {
          setError("API limit reached. Chart will appear later.");
          return;
        }

        const daily = data["Time Series (Daily)"];

        const parsed = Object.entries(daily)
          .slice(0, 30)
          .map(([date, val]: any) => ({
            date,
            close: Number(val["4. close"]),
          }))
          .reverse();

        setSeries(parsed);

        //  Cachin for 60 seconds
        localStorage.setItem(cacheKey, JSON.stringify(parsed));
        setTimeout(() => {
          localStorage.removeItem(cacheKey);
        }, 60_000);
      } catch {
        setError("Failed to load chart data");
      }
    }

    load();
  }, [widget.symbol]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{widget.title} (30D)</h3>
        <button onClick={() => remove(widget.id)} className="text-red-400">
          ✕
        </button>
      </div>

      {/* Error / Rate limit */}
      {error && (
        <p className="text-yellow-400 text-sm">
          {error}
        </p>
      )}

      {/* Loading */}
      {!error && series.length === 0 && (
        <p className="text-gray-400 text-sm">Loading chart…</p>
      )}

      {/* Chart */}
      {series.length > 0 && <DailyChart data={series} />}
    </div>
  );
}
