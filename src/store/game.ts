import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { TDailyRestrictionsStore, TGameStore } from "../types";
import { getDate } from "../utils/date";

export const game: Writable<TGameStore> = writable({
  started: false,
  daily: false,
  data: undefined,
  attempts: undefined,
});

export const dailyRestrictions: Writable<TDailyRestrictionsStore> = writable({
  date: getDate(),
  success: false,
  attempts: 0,
});
