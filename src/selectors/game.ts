import find from "lodash/find";
import includes from "lodash/includes";
import indexOf from "lodash/indexOf";
import isEqual from "lodash/isEqual";
import map from "lodash/map";
import { combineSelector } from "tsl-utils";

import { getRandomArrayItem } from "../utils";
import {
  getApiWordsArray,
  getApiWordsState,
  getAttemptedWords,
  getAttempts,
  getGameWord,
  getWordLength,
} from "./state";

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
      return {
        attempts: newAttempts,
        notWord,
      };
    }
  );
