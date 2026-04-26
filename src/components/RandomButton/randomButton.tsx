import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSeed } from "@hooks/useSeed";
import styles from "./styles.module.css";

export function RandomButton() {
  useSeed();
  const seed = getRandom();
  const href = `?s=${seed}`;
  return (
    <a className={styles.randomButton} href={href} rel="noopener">
      <FontAwesomeIcon icon={faShuffle} />
    </a>
  );
}

function getRandom() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}
