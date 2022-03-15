import { rangeMap } from "tsl-utils";

import { EGame } from "../constants";
import { game } from "../store/game";

const attemptsArray = rangeMap(EGame.NumberOfAttempts, () => []);

const gameResetState = {
  data: {
    word: "Avokado",
    type: "imenica",
  },
  attempts: attemptsArray,
};

export const useGame = () => {
  const { set, update } = game;
  const setGameStart = () => {
    update((state) => ({
      ...state,
      started: true,
      ...gameResetState,
    }));
  };

  const setGameEnd = () => {
    set({ started: false, data: undefined, attempts: undefined });
  };

  const resetGame = () => {
    update((state) => ({
      ...state,
      ...gameResetState,
    }));
  };

  return {
    startGame: setGameStart,
    endGame: setGameEnd,
    resetGame,
    game,
  };
};
