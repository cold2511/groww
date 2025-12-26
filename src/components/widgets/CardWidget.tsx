export default function CardWidget({ value }: any) {
  if (!value) return <p>No data</p>;
  return <p className="text-xl">{String(value)}</p>;
}
