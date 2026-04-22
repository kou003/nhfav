import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

export function RandomButton() {
  const seed = Math.floor(Math.random() * 10000000).toString();
  const href = `#${seed}`;
  return (
    <a className={styles.randomButton} href={href} rel="noopener">
      <FontAwesomeIcon icon={faShuffle} />
    </a>
  );
}
