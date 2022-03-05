import type { ELanguages, EThemes } from "../constants";

export type TSettingsStore = {
  theme: EThemes;
  language: ELanguages;
};

export type TGameStore = {
  started: boolean;
  attempts: number;
};
