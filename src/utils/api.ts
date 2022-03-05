import get from "lodash/get";

import { ELanguages, Endpoints } from "../constants";
export const getLocalizedDailyEndpoint = (language: string) =>
  language === ELanguages.Croatian ? Endpoints.DailyWordCro : Endpoints.DailyWordEng;

export const getLocalizedEndpoint = (language: string) =>
  language === ELanguages.Croatian ? Endpoints.WordsCro : Endpoints.WordsEng;

export const fetchData = (url: string, callback: Function) => {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      callback(get(res, ["data"]));
    });
};
