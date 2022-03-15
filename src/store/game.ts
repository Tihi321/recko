import { writable } from "svelte/store";

export const game = writable({
  started: false,
  data: undefined,
  attempts: undefined,
});
