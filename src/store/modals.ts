import { writable } from "svelte/store";

export const modals = writable({
  active: [],
});
