import type { DataItem } from "@models/data";
import styles from "./styles.module.css";

type GalleryItemProps = {
  item: DataItem;
  origin: string;
  thumbnailOrigin: string;
};

export function GalleryItem({
  item,
  origin,
  thumbnailOrigin,
}: GalleryItemProps) {
  return (
    <div className={styles.gallery}>
      <a href={`${origin}/g/${item.id}/`}>
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
