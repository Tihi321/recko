import { generateSelector } from "tsl-utils";

import { getGameWordType, getWordleData } from "../selectors";
import type { TGameStore } from "../types";

export const useWordle = () => {
  const generateWordleData = (gameState: TGameStore) => {
    const gameStateSelector = generateSelector(gameState);
    return getWordleData(gameStateSelector);
  };
  const getWordType = (gameState: TGameStore) => {
    const gameStateSelector = generateSelector(gameState);
    return getGameWordType(gameStateSelector);
  };

  return {
    generateWordleData,
    getWordType,
  };
};
