import { useEffect, useState } from "react";

const getCurrentSeed = () => {
  const num = window.location.hash.match(/\d+/)?.[0] ?? "0";
  return parseInt(num, 10) || 0;
};

export function useSeed() {
  const [seed, setSeed] = useState(getCurrentSeed);
  useEffect(() => {
    const handler = () => {
      setSeed(getCurrentSeed);
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return seed;
}
