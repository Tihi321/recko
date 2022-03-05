import { locale } from "svelte-i18n";

import type { TSettingsStore } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { useSettings } from "./useSettings";

export const useLocalSettings = () => {
  const { set: setLanguage } = locale;
  const { getLocalSettings } = useLocalStorage();
  const { setStore: setSettings } = useSettings();

  const setLocalStorageState = () => {
    const settingsLocal = getLocalSettings() as TSettingsStore;

    if (settingsLocal) {
      setSettings(settingsLocal);
      setLanguage(settingsLocal.language);
    }
  };

  return {
    setLocalStorageState,
  };
};
