import find from "lodash/find";
import get from "lodash/get";
import includes from "lodash/includes";
import indexOf from "lodash/indexOf";
import isEqual from "lodash/isEqual";
import { combineSelector, rangeMap } from "tsl-utils";

import {
  getAttemptedWords,
  getAttempts,
  getNumberOfAttempts,
  getWord,
  getWordArray,
  getWordLength,
} from "./state";

const getCurrentRow = (gameStateSelector) =>
  combineSelector(
    getAttempts(gameStateSelector),
    getWordLength(gameStateSelector),
    (attempts, wordLength) => {
      const currentItem = find(attempts, (items) => items.length < wordLength);

      return currentItem ? indexOf(attempts, currentItem) : wordLength - 1;
    }
  );

const getIsSuccess = (gameStateSelector) =>
  combineSelector(
    getAttemptedWords(gameStateSelector),
    getWord(gameStateSelector),
    (attemptedWords, gameWord) => Boolean(find(attemptedWords, (word) => isEqual(word, gameWord)))
  );

const getWordleTableData = (gameStateSelector) =>
  combineSelector(
    getWordArray(gameStateSelector),
    getAttempts(gameStateSelector),
    getNumberOfAttempts(gameStateSelector),
    getWordLength(gameStateSelector),
    getCurrentRow(gameStateSelector),
    (wordArray, attempts, numberOfAttempts, wordLength, currentRow) =>
      rangeMap(numberOfAttempts, (rowIndex: number) =>
        rangeMap(wordLength, (letterIndex: number) => {
          const isCurrentRow = isEqual(currentRow, rowIndex);
          const letter = get(attempts, [rowIndex, letterIndex], "");
          const success = isEqual(letter, get(wordArray, [letterIndex]));
          const exist = includes(wordArray, letter);

          return {
            letter,
            success: success && !isCurrentRow,
            exist: !success && exist && !isCurrentRow,
          };
        })
      )
  );

export const getWordleData = (gameStateSelector) =>
  combineSelector(
    getWordleTableData(gameStateSelector),
    getCurrentRow(gameStateSelector),
    getIsSuccess(gameStateSelector),
    (wordleTableData, currentRow, success) => ({
      table: wordleTableData,
      currentRow,
      success,
    })
  );
