import { locale } from "svelte-i18n";

import type { TDailyRestrictionsStore, TSettingsStore } from "../types";
import { getDate } from "../utils";
import { useDailyRestrictions } from "./useDailyRestrictions";
import { useLocalStorage } from "./useLocalStorage";
import { useSettings } from "./useSettings";

export const useLocalSettings = () => {
  const { set: setLanguage } = locale;
  const { getLocalSettings, getDailyRestriction, setDailyRestriction } = useLocalStorage();
  const { setStore: setSettings } = useSettings();
  const { setDailyStore } = useDailyRestrictions();

  const setLocalStorageState = () => {
    const dailyRestrictions = getDailyRestriction() as TDailyRestrictionsStore;
    const settingsLocal = getLocalSettings() as TSettingsStore;

    if (settingsLocal) {
      setSettings(settingsLocal);
      setLanguage(settingsLocal.language);
    }

    if (dailyRestrictions) {
      const todayDate = getDate();

      if (todayDate !== dailyRestrictions.date) {
        setDailyRestriction({
          date: todayDate,
          success: dailyRestrictions.success,
          attempts: 0,
        });
      } else {
        setDailyStore(dailyRestrictions);
      }
    }
  };

  return {
    setLocalStorageState,
  };
};
