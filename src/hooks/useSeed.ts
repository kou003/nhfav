import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function parseSeed(seedValue: string | null): number {
  const num = seedValue?.match(/\d+/)?.[0] ?? "0";
  return parseInt(num, 10) || 0;
}

export function useSeed() {
  const [searchParams] = useSearchParams();
  const seedValue = searchParams.get("s");
  const seed = useMemo(() => parseSeed(seedValue), [seedValue]);
  return seed;
}
