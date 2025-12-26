import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function ChartWidget({ value }: any) {
  if (!Array.isArray(value)) return <p>No chart data</p>;
  return (
    <LineChart width={300} height={200} data={value}>
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Line dataKey="y" />
    </LineChart>
  );
}
