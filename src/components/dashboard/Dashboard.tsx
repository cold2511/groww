
"use client";

import { useDashboardStore } from "@/store/dashboardStore";
import WidgetCard from "./WidgetCard";
import ChartCard from "./ChartCard";

export default function Dashboard() {
  const { widgets, removeWidget } = useDashboardStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {widgets.map((widget) => (
        <div
          key={widget.id}
          className="rounded-xl p-4"
style={{
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-main)",
}}

        >
          {widget.type === "chart" ? (
            <ChartCard widget={widget} remove={removeWidget} />
          ) : (
            <WidgetCard widget={widget} remove={removeWidget} />
          )}
        </div>
      ))}
    </div>
  );
}