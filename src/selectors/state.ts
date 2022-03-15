import get from "lodash/get";
import join from "lodash/join";
import map from "lodash/map";
import split from "lodash/split";
import { combineSelector } from "tsl-utils";

export const getAttempts = (gameStateSelector) =>
  combineSelector(gameStateSelector, (state) => get(state, ["attempts"]));

export const getWordState = (gameStateSelector) =>
  combineSelector(gameStateSelector, (state) => get(state, ["data"]));

export const getWord = (gameStateSelector) =>
  combineSelector(getWordState(gameStateSelector), (state) => get(state, ["word"]));

export const getNumberOfAttempts = (gameStateSelector) =>
  combineSelector(getAttempts(gameStateSelector), (attempts) => attempts.length);

export const getAttemptedWords = (gameStateSelector) =>
  combineSelector(getAttempts(gameStateSelector), (attempts) =>
    map(attempts, (values) => join(values, ""))
  );

export const getWordLength = (gameStateSelector) =>
  combineSelector(getWord(gameStateSelector), (word) => word.length);

export const getWordArray = (gameStateSelector) =>
  combineSelector(getWord(gameStateSelector), (word) => split(word, ""));
