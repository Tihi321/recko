import { writable } from "svelte/store";

import { ELanguages, EThemes } from "../constants";

export const settings = writable({
  theme: EThemes.Light,
  language: ELanguages.English,
});
