import get from "lodash/get";
import random from "lodash/random";

export const getRandomArrayIndex = <T>(array: Array<T>): number => random(array.length - 1);

export const getRandomArrayItem = <T>(array: Array<T>): T => get(array, getRandomArrayIndex(array));
