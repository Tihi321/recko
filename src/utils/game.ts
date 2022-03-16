import { rangeMap } from "tsl-utils";

import { EGame } from "../constants";

export const generateEmptyAttemptsArray = () => rangeMap(EGame.NumberOfAttempts, () => []);
