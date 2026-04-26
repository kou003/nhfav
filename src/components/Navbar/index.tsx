import logo from "@assets/logo.svg";
import { HamburgerMenu } from "@components/HamburgerMenu";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

type NavbarProps = {
  origin?: string;
  commitVersion: string;
  thumbnailOriginCandidates: string[];
  selectedThumbnailOrigin: string;
  onSelectThumbnailOrigin: (origin: string) => void;
  openInNewTab: boolean;
  onToggleOpenInNewTab: (checked: boolean) => void;
};

export function Navbar({
  origin,
  commitVersion,
  thumbnailOriginCandidates,
  selectedThumbnailOrigin,
  onSelectThumbnailOrigin,
  openInNewTab,
  onToggleOpenInNewTab,
}: NavbarProps) {
  const logoUrl = origin ? `${origin}/logo.svg` : logo;
  return (
    <nav className={styles.navbar}>
      <a
        href={origin || "#"}
        className={styles.logo}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener" : undefined}
      >
        <img alt="logo" width={46} height={30} src={logoUrl} />
      </a>
      <form
        action={`${origin || ""}/search/`}
        className={styles.search}
        method="GET"
        target={openInNewTab ? "_blank" : undefined}
      >
        <input type="search" name="q" />
        <button type="submit" disabled={!origin}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      <HamburgerMenu
        commitVersion={commitVersion}
        thumbnailOriginCandidates={thumbnailOriginCandidates}
        selectedThumbnailOrigin={selectedThumbnailOrigin}
        onSelectThumbnailOrigin={onSelectThumbnailOrigin}
        openInNewTab={openInNewTab}
        onToggleOpenInNewTab={onToggleOpenInNewTab}
      />
    </nav>
  );
}
