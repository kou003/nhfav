import { useState } from "react";

const getCurrentSeed = () => {
  const query = new URLSearchParams(window.location.search);
  const num = query.get("s")?.match(/\d+/)?.[0] ?? "0";
  return parseInt(num, 10) || 0;
};

export function useSeed() {
  const [seed, _] = useState(getCurrentSeed);
  return seed;
}
