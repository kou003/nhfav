import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type HamburgerMenuProps = {
  commitVersion: string;
  thumbnailOriginCandidates: string[];
  selectedThumbnailOrigin: string;
  onSelectThumbnailOrigin: (origin: string) => void;
};

function getOriginLabel(origin: string) {
  try {
    const parsed = new URL(origin);
    return `${parsed.host}${parsed.pathname === "/" ? "" : parsed.pathname}`;
  } catch {
    return origin;
  }
}

export function HamburgerMenu({
  commitVersion,
  thumbnailOriginCandidates,
  selectedThumbnailOrigin,
  onSelectThumbnailOrigin,
}: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
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
          <button
            type="button"
            className={styles.menuItem}
            onClick={() => setIsConfigOpen((prev) => !prev)}
          >
            config
          </button>
          {isConfigOpen && (
            <div className={styles.configPanel}>
              <label
                className={styles.optionLabel}
                htmlFor="thumbnail-origin-select"
              >
                thumbnail origin
              </label>
              <select
                id="thumbnail-origin-select"
                className={styles.select}
                value={selectedThumbnailOrigin}
                onChange={(event) =>
                  onSelectThumbnailOrigin(event.target.value)
                }
              >
                {thumbnailOriginCandidates.map((origin) => (
                  <option key={origin} value={origin}>
                    {getOriginLabel(origin)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button type="button" className={styles.menuItem}>
            menu1
          </button>
          <button type="button" className={styles.menuItem}>
            menu2
          </button>
          <hr className={styles.divider} />
          <div className={styles.commit} title={`commit: ${commitVersion}`}>
            build {commitVersion}
          </div>
        </div>
      )}
    </div>
  );
}
