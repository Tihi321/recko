import type { ELanguages } from "../constants";
import { api } from "../store/api";
import type { TWordDetail, TWordsDetail } from "../types";
import { fetchData, getLocalizedDailyEndpoint, getLocalizedEndpoint } from "../utils";

export const useApi = () => {
  const addWords = (data: TWordsDetail) => {
    api.update((state) => ({
      ...state,
      words: data,
    }));
  };

  const addDailyChallenge = (data: TWordDetail) => {
    api.update((state) => ({
      ...state,
      dailyChallenge: data,
    }));
  };

  const fetchApiWordsData = (language: ELanguages) => {
    const dailyWordUrl = getLocalizedDailyEndpoint(language);
    const wordsUrl = getLocalizedEndpoint(language);

    fetchData(wordsUrl, (data: TWordsDetail) => {
      addWords(data);
    });

    fetchData(dailyWordUrl, (data: TWordDetail) => {
      addDailyChallenge(data);
    });
  };

  return {
    fetchApiWordsData,
    api,
  };
};
