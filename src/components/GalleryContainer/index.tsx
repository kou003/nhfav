import type { Data } from "../../types/data";
import { GalleryItem } from "../GalleryItem";
import styles from "./styles.module.css";

type GalleryContainerProps = {
  data: Data | null;
};

export function GalleryContainer({ data }: GalleryContainerProps) {
  return (
    <div className={styles.galleryContainer}>
      {data?.items.map((item, index) => {
        const key = item.id;
        const tidx = index % data.thumbnailOrigins.length;
        return (
          <GalleryItem
            key={key}
            item={item}
            origin={data.origin}
            thumbnailOrigin={data.thumbnailOrigins[tidx]}
          />
        );
      })}
    </div>
  );
}
