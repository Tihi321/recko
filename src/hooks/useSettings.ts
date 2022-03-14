import { locale } from "svelte-i18n";

import type { ELanguages } from "../constants";
import { settings } from "../store/settings";
import type { TSettingsStore } from "../types";
import { useApi } from "./useApi";
import { useLocalStorage } from "./useLocalStorage";

export const useSettings = () => {
  const { fetchApiWordsData } = useApi();
  const { set: setLocale } = locale;
  const { subscribe, set, update } = settings;
  const { setLocalSettings } = useLocalStorage();

  const setState = (newState: TSettingsStore) => {
    setLocalSettings(newState);
    set(newState);
  };

  const setLanguage = (language: ELanguages) => {
    setLocale(language);
    update((state) => {
      const newState = {
        ...state,
        language,
      };
      setLocalSettings(newState);
      return newState;
    });
    fetchApiWordsData(language);
  };

  return {
    setStore: (state) => set(state),
    settings: {
      subscribe,
      set: (state) => setState(state),
    },
    setLanguage,
  };
};
