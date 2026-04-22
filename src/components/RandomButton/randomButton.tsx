import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

export function RandomButton() {
  return (
    <button
      type="button"
      className={styles.randomButton}
      onClick={() => {
        window.location.hash = Math.floor(Math.random() * 10000000).toString();
      }}
    >
      <FontAwesomeIcon icon={faShuffle} />
    </button>
  );
}
