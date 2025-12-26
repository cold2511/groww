
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type WidgetType = "card" | "chart";

export type Widget = {
  id: string;
  title: string;
  symbol: string;
  type: WidgetType;
};

type DashboardState = {
  widgets: Widget[];
  addWidget: (w: Widget) => void;
  removeWidget: (id: string) => void;
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: [],
      addWidget: (widget) =>
        set((state) => ({ widgets: [...state.widgets, widget] })),
      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),
    }),
    { name: "finboard-dashboard" }
  )
);


