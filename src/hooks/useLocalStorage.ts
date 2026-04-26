import { useCallback, useState } from "react";
import type { z } from "zod";

type SetValueAction<T> = T | ((prev: T) => T);

export function useLocalStorage<T>(
  schema: z.ZodType<T>,
  key: string,
  initialValue: T,
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? schema.parse(JSON.parse(item)) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (action: SetValueAction<T>) => {
      try {
        setStoredValue((prev) => {
          const next = action instanceof Function ? action(prev) : action;
          window.localStorage.setItem(key, JSON.stringify(next));
          return next;
        });
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key],
  );

  return [storedValue, setValue] as const;
}
