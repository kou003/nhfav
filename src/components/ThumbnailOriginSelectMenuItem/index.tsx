import styles from "./styles.module.css";

type ThumbnailOriginSelectMenuItemProps = {
  candidates: string[];
  selected: string;
  onSelect: (origin: string) => void;
  className?: string;
};

function getOriginLabel(origin: string) {
  try {
    const parsed = new URL(origin);
    return `${parsed.host}${parsed.pathname === "/" ? "" : parsed.pathname}`;
  } catch {
    return origin;
  }
}

export function ThumbnailOriginSelectMenuItem({
  candidates,
  selected,
  onSelect,
  className,
}: ThumbnailOriginSelectMenuItemProps) {
  return (
    <div className={`${className ?? ""} ${styles.container}`}>
      <label className={styles.label} htmlFor="thumbnail-origin-select">
        thumbnail origin
      </label>
      <select
        id="thumbnail-origin-select"
        className={styles.select}
        value={selected}
        onChange={(event) => onSelect(event.target.value)}
      >
        {candidates.map((origin) => (
          <option key={origin} value={origin}>
            {getOriginLabel(origin)}
          </option>
        ))}
      </select>
    </div>
  );
}
