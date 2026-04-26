import { useLocalStorage } from "@hooks/useLocalStorage";
import z from "zod";

const OPEN_IN_NEW_TAB_KEY = "open-in-new-tab";

export function useOpenInNewTab() {
  const [openInNewTab, setOpenInNewTab] = useLocalStorage(
    z.boolean(),
    OPEN_IN_NEW_TAB_KEY,
    false,
  );

  return {
    openInNewTab,
    setOpenInNewTab,
  } as const;
}
