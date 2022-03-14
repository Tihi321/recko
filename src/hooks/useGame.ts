import { rangeMap } from "tsl-utils";

import { game } from "../store/game";

const attemptyObj = rangeMap(6, () => ({
  word: "",
  letters: [],
  locked: false,
  success: false,
}));

export const useGame = () => {
  const { set, update } = game;
  const setGameStart = () => {
    update((state) => ({
      ...state,
      started: true,
      data: {
        word: "Avokado",
        type: "imenica",
      },
      attempts: attemptyObj,
      attempt: 0,
    }));
  };

  const setGameEnd = () => {
    set({ started: false, data: undefined, attempts: [], attempt: 0 });
  };

  const resetGame = () => {
    update((state) => ({
      ...state,
      data: {
        word: "Avokado",
        type: "imenica",
      },
      attempts: attemptyObj,
      attempt: 0,
    }));
  };

  return {
    startGame: setGameStart,
    endGame: setGameEnd,
    resetGame,
    game,
  };
};
