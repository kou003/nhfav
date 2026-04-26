import { useLocalStorage } from "@hooks/useLocalStorage";
import type { Data } from "@models/data";
import { useCallback, useEffect, useMemo } from "react";
import z from "zod";

const THUMBNAIL_ORIGINS_KEY = "thumbnail-origins";

export function useThumbnailOriginConfig(data: Data | null) {
  const [storedThumbnailOrigin, setStoredThumbnailOrigin] = useLocalStorage(
    z.string(),
    THUMBNAIL_ORIGINS_KEY,
    "",
  );

  const thumbnailOriginCandidates = useMemo(
    () => data?.thumbnailOrigins ?? [],
    [data],
  );

  const selectedThumbnailOrigin = useMemo(() => {
    if (!data) {
      return "";
    }
    if (data.thumbnailOrigins.includes(storedThumbnailOrigin)) {
      return storedThumbnailOrigin;
    }
    return data.thumbnailOrigins[0];
  }, [data, storedThumbnailOrigin]);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (
      storedThumbnailOrigin &&
      data.thumbnailOrigins.includes(storedThumbnailOrigin)
    ) {
      return;
    }
    setStoredThumbnailOrigin(data.thumbnailOrigins[0]);
  }, [data, storedThumbnailOrigin, setStoredThumbnailOrigin]);

  const selectThumbnailOrigin = useCallback(
    (origin: string) => {
      if (!data?.thumbnailOrigins.includes(origin)) {
        return;
      }
      setStoredThumbnailOrigin(origin);
    },
    [data, setStoredThumbnailOrigin],
  );

  return {
    thumbnailOriginCandidates,
    selectedThumbnailOrigin,
    selectThumbnailOrigin,
  } as const;
}
