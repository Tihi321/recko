import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { TApiStore } from "../types";

export const api: Writable<TApiStore> = writable({
  dailyChallenge: undefined,
  words: [],
});
