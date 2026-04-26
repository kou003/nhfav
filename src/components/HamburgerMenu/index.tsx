import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type HamburgerMenuProps = {
  commitVersion: string;
};

export function HamburgerMenu({ commitVersion }: HamburgerMenuProps) {
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
