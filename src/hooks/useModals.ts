import filter from "lodash/filter";
import isEqual from "lodash/isEqual";
import uniqBy from "lodash/uniqBy";

import type { EModals } from "../constants";
import { modals } from "../store/modals";

export const useModals = () => {
  const closeModals = () => {
    modals.update((state) => ({
      ...state,
      active: [],
    }));
  };

  const openModal = (name: EModals) => {
    modals.update((state) => ({
      ...state,
      active: uniqBy([...state.active, name]),
    }));
  };

  const closeModal = (name: EModals) => {
    modals.update((state) => ({
      ...state,
      active: filter(state.active, (activeName) => !isEqual(activeName, name)),
    }));
  };

  return {
    closeModals,
    closeModal,
    openModal,
    modals,
  };
};
