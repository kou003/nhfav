import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSeed } from "@hooks/useSeed";
import styles from "./styles.module.css";

export function RandomButton() {
  const currentSeed = useSeed();
  const seed = currentSeed ^ getRandom();
  const href = `#${seed}`;
  return (
    <a className={styles.randomButton} href={href} rel="noopener">
      <FontAwesomeIcon icon={faShuffle} />
    </a>
  );
}

function getRandom() {
  return Math.random() * Number.MAX_SAFE_INTEGER;
}
