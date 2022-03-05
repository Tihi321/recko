import { addMessages, getLocaleFromNavigator, init } from "svelte-i18n";

import en from "./translations/en.json";
import hr from "./translations/hr.json";

export const registerTranslations = () => {
  addMessages("en", en);
  addMessages("hr", hr);

  init({
    fallbackLocale: "en",
    initialLocale: getLocaleFromNavigator(),
  });
};
