import type { ELanguages, EThemes } from "../constants";
import type { TWordDetail, TWordsDetail } from "./words";

export type TSettingsStore = {
  theme: EThemes;
  language: ELanguages;
};

export type TGameStore = {
  started: boolean;
  daily: boolean;
  data: TWordDetail;
  attempts: string[][];
};

export type TApiStore = {
  dailyChallenge: TWordDetail;
  words: TWordsDetail;
};
