import { useSeed } from "@hooks/useSeed";
import type { Data, DataItem } from "@models/data";
import { useMemo } from "react";

function hashInt(key: number, seed: number = 0): number {
  let h = seed ^ key;
  // Use MurmurHash3 finalizer (mixing function)
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;

  // return as unsigned 32-bit integer
  return h >>> 0;
}

export function useShuffleItems(data: Data | null) {
  const seed = useSeed();

  const shuffleItems = useMemo<DataItem[] | null>(() => {
    if (data === null) return null;
    if (seed === 0) return data.items;
    return data.items.toSorted(
      (a, b) => hashInt(a.id, seed) - hashInt(b.id, seed),
    );
  }, [seed, data]);

  return shuffleItems;
}
