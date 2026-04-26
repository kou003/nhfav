import type { DataItem } from "@models/data";
import styles from "./styles.module.css";

type GalleryItemProps = {
  item: DataItem;
  origin: string;
  thumbnailOrigin: string;
  openInNewTab: boolean;
};

export function GalleryItem({
  item,
  origin,
  thumbnailOrigin,
  openInNewTab,
}: GalleryItemProps) {
  return (
    <div className={styles.gallery}>
      <a
        href={`${origin}/g/${item.id}/`}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener" : undefined}
      >
        <figure>
          <img
            src={`${thumbnailOrigin}/${item.thumbnail}`}
            width={item.thumbnail_width}
            height={item.thumbnail_height}
            alt={item.english_title}
            loading="lazy"
          />
          <figcaption>{item.japanese_title || item.english_title}</figcaption>
        </figure>
      </a>
    </div>
  );
}
