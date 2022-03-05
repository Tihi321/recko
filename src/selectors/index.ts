import get from "lodash/get";
import { combineSelector } from "tsl-utils";

export const getAttempts = (gameStateSelector) =>
  combineSelector(gameStateSelector, (state) => get(state, ["attempts"]));
