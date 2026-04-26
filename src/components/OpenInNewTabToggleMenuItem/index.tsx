import styles from "./styles.module.css";

type OpenInNewTabToggleMenuItemProps = {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  className?: string;
};

export function OpenInNewTabToggleMenuItem({
  checked,
  onToggle,
  className,
}: OpenInNewTabToggleMenuItemProps) {
  return (
    <label className={`${className ?? ""} ${styles.container}`}>
      <span>Open links in new tab</span>
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={(event) => onToggle(event.target.checked)}
      />
    </label>
  );
}
