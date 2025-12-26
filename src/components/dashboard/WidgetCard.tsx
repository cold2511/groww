
"use client";

import { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY;

export default function WidgetCard({ widget, remove }: any) {
  const [price, setPrice] = useState<string | null>(null);
  const [changePct, setChangePct] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setError(null);

        const cacheKey = `quote_${widget.symbol}`;
        const cached = localStorage.getItem(cacheKey);

        
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.price && typeof parsed.changePct === "number") {
            setPrice(parsed.price);
            setChangePct(parsed.changePct);
            return;
          } else {
            localStorage.removeItem(cacheKey);
          }
        }

        const res = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${widget.symbol}&apikey=${API_KEY}`
        );
        const data = await res.json();

        if (data.Information || !data["Global Quote"]) {
          setError("API limit reached. Try again later.");
          return;
        }

        const quote = data["Global Quote"];
        const price = quote["05. price"]; 
        const rawChange = quote["10. change percent"]; 

        if (!price) {
          setError("Invalid data received.");
          return;
        }

        const numericChange = rawChange
          ? parseFloat(rawChange.replace("%", ""))
          : 0;

        const safeChange = isNaN(numericChange) ? 0 : numericChange;

        setPrice(price);
        setChangePct(safeChange);

        
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            price,
            changePct: safeChange,
            ts: Date.now(),
          })
        );

        setTimeout(() => {
          localStorage.removeItem(cacheKey);
        }, 60_000);
      } catch {
        setError("Failed to load data.");
      }
    }

    load();
  }, [widget.symbol]);

  const isPositive = changePct !== null && changePct > 0;
  const isNegative = changePct !== null && changePct < 0;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3
          className="font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          {widget.title}
        </h3>

        <button
          onClick={() => remove(widget.id)}
          style={{ color: "var(--text-negative)" }}
        >
          ✕
        </button>
      </div>

      {error && (
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {error}
        </p>
      )}

      {!error && !price && (
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Loading…
        </p>
      )}

      {price && changePct !== null && (
        <div className="mt-3">
          <p
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            ${price}
          </p>

          <p
            className="text-sm"
            style={{
              color: isPositive
                ? "var(--text-positive)"
                : isNegative
                ? "var(--text-negative)"
                : "var(--text-muted)",
            }}
          >
            {isPositive ? "▲" : isNegative ? "▼" : "•"}{" "}
            {changePct.toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}