import { dispatchEvent, generateSelector } from "tsl-utils";

import { EEvents } from "../constants";
import { getDailyChallengeState, getNewAttempts, getRandomApiWord } from "../selectors";
import { game } from "../store/game";
import { generateEmptyAttemptsArray } from "../utils";

export const useGame = () => {
  const { set, update } = game;

  const setDailyStart = (apiState) => {
    const apiStateSelector = generateSelector(apiState);
    set({
      started: true,
      daily: true,
      attempts: generateEmptyAttemptsArray(),
      data: getDailyChallengeState(apiStateSelector),
    });
  };
  const setGameStart = (apiState) => {
    const apiStateSelector = generateSelector(apiState);
    set({
      started: true,
      daily: false,
      attempts: generateEmptyAttemptsArray(),
      data: getRandomApiWord(apiStateSelector),
    });
  };

  const setGameEnd = () => {
    set({ started: false, daily: false, data: undefined, attempts: undefined });
  };

  const addLetter = (gameState, apiState, letter) => {
    const gameStateSelector = generateSelector(gameState);
    const apiStateSelector = generateSelector(apiState);
    const { attempts, notWord } = getNewAttempts(gameStateSelector, apiStateSelector, letter);

    if (notWord) {
      dispatchEvent({
        name: EEvents.NotRealWord,
        params: notWord,
        element: document as unknown as Element,
      });
    }
    update((state) => ({
      ...state,
      attempts,
    }));
  };

  return {
    startGame: setGameStart,
    startDailyChallenge: setDailyStart,
    endGame: setGameEnd,
    resetGame: setGameStart,
    game,
    addLetter,
  };
};
