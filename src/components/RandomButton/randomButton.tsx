import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

export function RandomButton() {
  const seed = getRandom().toString();
  const href = `#${seed}`;
  return (
    <a className={styles.randomButton} href={href} rel="noopener">
      <FontAwesomeIcon icon={faShuffle} />
    </a>
  );
}

function getRandom() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0];
}
