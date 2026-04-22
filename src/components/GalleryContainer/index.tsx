import { GalleryItem } from "@components/GalleryItem";
import type { Data, DataItem } from "@models/data";
import styles from "./styles.module.css";

type GalleryContainerProps = {
  data: Data | null;
  items: DataItem[] | null;
};

export function GalleryContainer({ data, items }: GalleryContainerProps) {
  return (
    <div className={styles.galleryContainer}>
      {data &&
        items?.map((item, index) => {
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
