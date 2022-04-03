import filter from "lodash/filter";
import find from "lodash/find";
import includes from "lodash/includes";
import indexOf from "lodash/indexOf";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import map from "lodash/map";
import { combineSelector } from "tsl-utils";

import { EGame } from "../constants";
import { getRandomArrayItem } from "../utils";
import {
  getApiWordsArray,
  getApiWordsState,
  getAttemptedWords,
  getAttempts,
  getGameWord,
  getIsDaily,
  getSuccess,
  getWordLength,
} from "./state";

export const getDailyChallengeDisabled = (dailyRestrictionsSelector) =>
  combineSelector(
    getSuccess(dailyRestrictionsSelector),
    getAttempts(dailyRestrictionsSelector),
    (success, attempts) => success || attempts >= EGame.NumberOfAttempts
  );

export const getCurrentRow = (gameStateSelector) =>
  combineSelector(
    getAttempts(gameStateSelector),
    getWordLength(gameStateSelector),
    (attempts, wordLength) => {
      const currentItem = find(attempts, (items) => items.length < wordLength);

      return currentItem ? indexOf(attempts, currentItem) : wordLength - 1;
    }
  );

export const getIsSuccess = (gameStateSelector) =>
  combineSelector(
    getAttemptedWords(gameStateSelector),
    getGameWord(gameStateSelector),
    (attemptedWords, gameWord) => Boolean(find(attemptedWords, (word) => isEqual(word, gameWord)))
  );

export const getIsFinished = (gameStateSelector, dailyRestrictionsStateSelector) =>
  combineSelector(
    getIsDaily(gameStateSelector),
    getAttemptedWords(gameStateSelector),
    getAttemptedWords(dailyRestrictionsStateSelector),
    (isDailyChallenge, gameAttempts, dailyChallengeAttepts) =>
      isDailyChallenge
        ? dailyChallengeAttepts >= EGame.NumberOfAttempts
        : gameAttempts >= EGame.NumberOfAttempts
  );

export const getRandomApiWord = (apiStateSelector) =>
  combineSelector(getApiWordsState(apiStateSelector), (words) => getRandomArrayItem(words));

export const getNewAttempts = (gameStateSelector, apiStateSelector, letter) =>
  combineSelector(
    getAttempts(gameStateSelector),
    getCurrentRow(gameStateSelector),
    getWordLength(gameStateSelector),
    getApiWordsArray(apiStateSelector),
    (attempts, currentRow, wordLength, words) => {
      let notWord = undefined;
      const newAttempts = map(attempts, (values, index) => {
        if (isEqual(currentRow, index)) {
          const valuesWithLetter = [...values, letter];
          const newWord = valuesWithLetter.join("");
          if (isEqual(wordLength, valuesWithLetter.length) && !includes(words, newWord)) {
            notWord = newWord;
            return [];
          }

          return valuesWithLetter;
        }
        return values;
      });
      const emptyNewAttempts = filter(newAttempts, (values) => isEmpty(values));
      const newAttemptsNumber = newAttempts.length - emptyNewAttempts.length;

      const emptyAttempts = filter(attempts, (values) => isEmpty(values));
      const attemptsNumber = attempts.length - emptyAttempts.length;

      return {
        attempts: newAttempts,
        attemptsUpdated: newAttemptsNumber !== attemptsNumber,
        notWord,
      };
    }
  );
