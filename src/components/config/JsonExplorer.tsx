export default function JsonExplorer({ data, onSelect, path = "" }: any) {
  if (typeof data !== "object") return null;

  return (
    <ul className="ml-3">
      {Object.entries(data).map(([key, value]) => {
        const newPath = path ? `${path}.${key}` : key;
        return (
          <li key={newPath}>
            <button
              className="text-blue-400"
              onClick={() => onSelect(newPath)}
            >
              {newPath}
            </button>
            {typeof value === "object" && (
              <JsonExplorer data={value} onSelect={onSelect} path={newPath} />
            )}
          </li>
        );
      })}
    </ul>
  );
}
