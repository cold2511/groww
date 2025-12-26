const cache = new Map<string, { data: any; expiry: number }>();

export function getCache(key: string) {
  const item = cache.get(key);
  if (!item || Date.now() > item.expiry) return null;
  return item.data;
}

export function setCache(key: string, data: any, ttl: number) {
  cache.set(key, { data, expiry: Date.now() + ttl });
}
