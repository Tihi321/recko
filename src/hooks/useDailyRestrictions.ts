import { generateSelector } from "tsl-utils";

import { getDailyChallengeDisabled } from "../selectors";
import { dailyRestrictions } from "../store/game";
import type { TDailyRestrictionsStore } from "../types";
import { getDate } from "../utils";
import { useLocalStorage } from "./useLocalStorage";

export const useDailyRestrictions = () => {
  const { setDailyRestriction } = useLocalStorage();
  const { set, update } = dailyRestrictions;

  const setDailyStore = (localState: TDailyRestrictionsStore) => {
    set({ date: getDate(), attempts: localState.attempts, success: localState.success });
  };

  const addAttempt = () => {
    update((state) => {
      const newState = {
        ...state,
        attempts: state.attempts + 1,
      };

      setDailyRestriction(newState);
      return newState;
    });
  };

  const setSuccess = () => {
    update((state) => {
      const newState = {
        ...state,
        success: true,
      };

      setDailyRestriction(newState);
      return newState;
    });
  };

  const getIsDailyDisabled = (dailyRestrictionsState: TDailyRestrictionsStore) => {
    const dailyRestrictionsSelector = generateSelector(dailyRestrictionsState);

    return getDailyChallengeDisabled(dailyRestrictionsSelector);
  };

  return {
    setDailyStore,
    addAttempt,
    setSuccess,
    getIsDailyDisabled,
    dailyRestrictions,
  };
};
