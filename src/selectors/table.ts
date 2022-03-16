import get from "lodash/get";
import includes from "lodash/includes";
import isEqual from "lodash/isEqual";
import { combineSelector, rangeMap } from "tsl-utils";

import { getCurrentRow, getIsSuccess } from "./game";
import { getAttempts, getNumberOfAttempts, getWordArray, getWordLength } from "./state";

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
    getIsSuccess(gameStateSelector),
    (wordleTableData, success) => ({
      table: wordleTableData,
      success,
    })
  );
