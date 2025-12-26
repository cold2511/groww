export type WidgetType = "card" | "chart";

export interface Widget {
  id: string;
  title: string;
  type: WidgetType;
  apiUrl: string;
  fieldPath: string;
  refreshInterval: number;
}
