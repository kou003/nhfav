import logo from "@assets/logo.svg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

type NavbarProps = {
  origin?: string;
};

export function Navbar({ origin }: NavbarProps) {
  const logoUrl = origin ? `${origin}/logo.svg` : logo;
  return (
    <nav className={styles.navbar}>
      <a href={origin || "#"} className={styles.logo}>
        <img alt="logo" width={46} height={30} src={logoUrl} />
      </a>
      <form
        action={`${origin || ""}/search/`}
        className={styles.search}
        method="GET"
        target="_blank"
        rel="noopener"
      >
        <input type="search" name="q" />
        <button type="submit" disabled={!origin}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </nav>
  );
}
