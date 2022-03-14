import type { ELanguages, EThemes } from "../constants";
import type { TWordDetail, TWordsDetail } from "./words";

export type TSettingsStore = {
  theme: EThemes;
  language: ELanguages;
};

export type TGameStore = {
  started: boolean;
  attempts: number;
};

export type TApiStore = {
  dailyChallenge: TWordDetail;
  words: TWordsDetail;
};
