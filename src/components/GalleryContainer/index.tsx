import { GalleryItem } from "@components/GalleryItem";
import type { Data, DataItem } from "@models/data";
import styles from "./styles.module.css";

type GalleryContainerProps = {
  data: Data | null;
  items: DataItem[] | null;
  thumbnailOrigin: string;
};

export function GalleryContainer({
  data,
  items,
  thumbnailOrigin,
}: GalleryContainerProps) {
  return (
    <div className={styles.galleryContainer}>
      {data &&
        thumbnailOrigin &&
        items?.map((item) => {
          const key = item.id;
          return (
            <GalleryItem
              key={key}
              item={item}
              origin={data.origin}
              thumbnailOrigin={thumbnailOrigin}
            />
          );
        })}
    </div>
  );
}
