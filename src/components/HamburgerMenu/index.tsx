import { OpenInNewTabToggleMenuItem } from "@components/OpenInNewTabToggleMenuItem";
import { ThumbnailOriginSelectMenuItem } from "@components/ThumbnailOriginSelectMenuItem";
import { UpdateButton } from "@components/UpdateButton";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

type HamburgerMenuProps = {
  commitVersion: string;
  thumbnailOriginCandidates: string[];
  selectedThumbnailOrigin: string;
  onSelectThumbnailOrigin: (origin: string) => void;
  openInNewTab: boolean;
  onToggleOpenInNewTab: (checked: boolean) => void;
  repository: string;
  workflowToken: string;
};

export function HamburgerMenu({
  commitVersion,
  thumbnailOriginCandidates,
  selectedThumbnailOrigin,
  onSelectThumbnailOrigin,
  openInNewTab,
  onToggleOpenInNewTab,
  repository,
  workflowToken,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.iconButton}
        aria-label="Open menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <Link to="?s=0" className={styles.menuItem}>
            <FontAwesomeIcon icon={faArrowDownWideShort} /> Newer
          </Link>
          <Link to="?s=1" className={styles.menuItem}>
            <FontAwesomeIcon icon={faArrowUpWideShort} /> Older
          </Link>
          <OpenInNewTabToggleMenuItem
            className={`${styles.menuItem} ${styles.toggleMenuItem}`}
            checked={openInNewTab}
            onToggle={onToggleOpenInNewTab}
          />
          <ThumbnailOriginSelectMenuItem
            className={styles.menuItem}
            candidates={thumbnailOriginCandidates}
            selected={selectedThumbnailOrigin}
            onSelect={onSelectThumbnailOrigin}
          />
          <UpdateButton
            className={`${styles.menuItem} ${styles.updateButton}`}
            repository={repository}
            workflowToken={workflowToken}
          />
          <hr className={styles.divider} />
          <div className={styles.commit} title={`commit: ${commitVersion}`}>
            build {commitVersion}
          </div>
        </div>
      )}
    </div>
  );
}
