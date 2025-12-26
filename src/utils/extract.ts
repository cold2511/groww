export function extractField(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
