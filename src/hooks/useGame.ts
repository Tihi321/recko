import { game } from "../store/game";

export const useGame = () => {
  const { set, update } = game;
  const setGameStart = () => {
    update((state) => ({
      ...state,
      started: true,
    }));
  };

  const setGameEnd = () => {
    set({ attempts: 0, started: false });
  };

  const resetGame = () => {
    update((state) => ({
      ...state,
      attempts: 0,
    }));
  };

  const addAttempt = () => {
    update((state) => ({
      ...state,
      attempts: state.attempts + 1,
    }));
  };

  return {
    addAttempt,
    startGame: setGameStart,
    endGame: setGameEnd,
    resetGame,
    game,
  };
};
