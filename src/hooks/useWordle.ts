import { generateSelector } from "tsl-utils";

import { getWordleData } from "../selectors";
import type { TGameStore } from "../types";

export const useWordle = () => {
  const generateWordleData = (gameState: TGameStore) => {
    const gameStateSelector = generateSelector(gameState);
    return getWordleData(gameStateSelector);
  };

  return {
    generateWordleData,
  };
};
