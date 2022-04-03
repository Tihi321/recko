import get from "lodash/get";
import join from "lodash/join";
import map from "lodash/map";
import split from "lodash/split";
import { combineSelector } from "tsl-utils";

export const getIsDaily = (gameStateSelector) =>
  combineSelector(gameStateSelector, (state) => get(state, ["daily"]));

export const getSuccess = (dailyRestrictionsSelector) =>
  combineSelector(dailyRestrictionsSelector, (state) => get(state, ["success"]));

export const getAttempts = (gameStateSelector) =>
  combineSelector(gameStateSelector, (state) => get(state, ["attempts"]));

export const getDailyChallengeState = (apiStateSelector) =>
  combineSelector(apiStateSelector, (state) => get(state, ["dailyChallenge"]));

export const getApiWordsState = (apiStateSelector) =>
  combineSelector(apiStateSelector, (state) => get(state, ["words"]));

export const getWordState = (gameStateSelector) =>
  combineSelector(gameStateSelector, (state) => get(state, ["data"]));

export const getGameWord = (gameStateSelector) =>
  combineSelector(getWordState(gameStateSelector), (state) => get(state, ["word"]));

export const getGameWordType = (gameStateSelector) =>
  combineSelector(getWordState(gameStateSelector), (state) => get(state, ["type"]));

export const getNumberOfAttempts = (gameStateSelector) =>
  combineSelector(getAttempts(gameStateSelector), (attempts) => attempts.length);

export const getAttemptedWords = (gameStateSelector) =>
  combineSelector(getAttempts(gameStateSelector), (attempts) =>
    map(attempts, (values) => join(values, ""))
  );

export const getWordLength = (gameStateSelector) =>
  combineSelector(getGameWord(gameStateSelector), (word) => word.length);

export const getApiWordsArray = (apiStateSelector) =>
  combineSelector(getApiWordsState(apiStateSelector), (words) =>
    map(words, (values) => get(values, ["word"]))
  );

export const getWordArray = (gameStateSelector) =>
  combineSelector(getGameWord(gameStateSelector), (word) => split(word, ""));
