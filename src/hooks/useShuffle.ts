import type { Data, DataItem } from "@models/data";
import { useEffect, useMemo, useState } from "react";

const getCurrentSeed = () => {
  const num = window.location.hash.match(/\d+/)?.[0] ?? "0";
  return parseInt(num, 10) || 0;
};

function hashInt(key: number, seed: number = 0): number {
  let h = seed ^ key;
  // MurmurHash3 のファイナライザ（ミキシング関数）を利用
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;

  // 符号なし32ビット整数として返す
  return h >>> 0;
}

export function useShuffleItems(data: Data | null) {
  const [seed, setSeed] = useState(getCurrentSeed);
  useEffect(() => {
    const handler = () => {
      setSeed(getCurrentSeed);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const shuffleItems = useMemo<DataItem[] | null>(() => {
    if (data === null) return null;
    if (seed === 0) return data.items;
    return data.items.toSorted(
      (a, b) => hashInt(a.id, seed) - hashInt(b.id, seed),
    );
  }, [seed, data]);

  return shuffleItems;
}
