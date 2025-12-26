
"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboardStore";
import { v4 as uuid } from "uuid";

export default function WidgetForm() {
  const addWidget = useDashboardStore((s) => s.addWidget);

  const [title, setTitle] = useState("");
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState<"card" | "chart">("card");

  function handleAdd() {
    if (!title || !symbol) return;

    addWidget({
      id: uuid(),
      title,
      symbol: symbol.toUpperCase(),
      type,
    });

    setTitle("");
    setSymbol("");
  }

  return (
    <div className="bg-gray-800 p-4 rounded space-y-3">
      <h2 className="text-white font-semibold">Add Widget</h2>

      <input
        className="w-full p-2 bg-gray-700 rounded text-white"
        placeholder="Widget title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full p-2 bg-gray-700 rounded text-white"
        placeholder="Stock symbol (e.g. IBM)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <select
        className="w-full p-2 bg-gray-700 rounded text-white"
        value={type}
        onChange={(e) => setType(e.target.value as any)}
      >
        <option value="card">Price Card</option>
        <option value="chart">Daily Line Chart</option>
      </select>

      <button
        onClick={handleAdd}
        className="bg-emerald-600 px-4 py-2 rounded text-white"
      >
        Add Widget
      </button>
    </div>
  );
}
