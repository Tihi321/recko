import type { ELanguages, EThemes } from "../constants";
import type { TWordDetail, TWordsDetail } from "./words";

export type TSettingsStore = {
  theme: EThemes;
  language: ELanguages;
};

export type TGameStore = {
  started: boolean;
  data: any;
  attempts: any;
};

export type TApiStore = {
  dailyChallenge: TWordDetail;
  words: TWordsDetail;
};
