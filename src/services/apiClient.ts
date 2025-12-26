import axios from "axios";
import { getCache, setCache } from "@/utils/cache";

export async function fetchApi(url: string, ttl: number) {
  const cached = getCache(url);
  if (cached) return cached;

  const res = await axios.get(url);
  setCache(url, res.data, ttl);
  return res.data;
}
