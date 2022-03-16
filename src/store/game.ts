import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

import type { TGameStore } from "../types";

export const game: Writable<TGameStore> = writable({
  started: false,
  daily: false,
  data: undefined,
  attempts: undefined,
});
