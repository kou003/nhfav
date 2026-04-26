import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSeed } from "@hooks/useSeed";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function RandomButton() {
  const currentSeed = useSeed();
  // biome-ignore lint/correctness/useExhaustiveDependencies: change next seed when currentSeed changes
  const seed = useMemo(getRandom, [currentSeed]);
  const href = `?s=${seed}`;
  return (
    <Link className={styles.randomButton} to={href}>
      <FontAwesomeIcon icon={faShuffle} />
    </Link>
  );
}

function getRandom() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
