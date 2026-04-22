import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

type LoadingProps = {
  loading: boolean;
};

export function Loading({ loading }: LoadingProps) {
  return (
    loading && (
      <div className={styles.loading}>
        <p>
          <FontAwesomeIcon icon={faSpinner} className={styles.spinner} />
        </p>
        <p>Loading...</p>
      </div>
    )
  );
}
