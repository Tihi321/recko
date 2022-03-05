import { ELocalStorage } from "../constants";
import type { TSettingsStore } from "../types";

export const useLocalStorage = () => {
  const getItem = (key: string) => localStorage.getItem(key);
  const setItem = (key: string, value: string) => localStorage.setItem(key, value);

  const setJSONItem = (key: string, value: any) => {
    setItem(key, JSON.stringify(value));
  };
  const getJSONItem = (key: string) => {
    let output = undefined;
    const localJSONSettings = getItem(key);

    if (localJSONSettings) {
      output = JSON.parse(localJSONSettings);
    }

    return output;
  };

  const getLocalSettings = () => getJSONItem(ELocalStorage.Settings);
  const setLocalSettings = (settings: TSettingsStore) =>
    setJSONItem(ELocalStorage.Settings, settings);

  return {
    getLocalSettings,
    setLocalSettings,
  };
};
