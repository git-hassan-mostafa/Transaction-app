import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";
import en from "../../assets/locales/en.json";
import ar from "../../assets/locales/ar.json";
import { I18nManager } from "react-native";

const translations = {
  en,
  ar,
};
const i18n = new I18n(translations);

i18n.enableFallback = true;
i18n.defaultLocale = "en";
i18n.locale = getLocales()[0].languageCode ?? "en";

console.log("Current locale: ", i18n.locale);

i18n.enableFallback = true;

if (i18n.locale.startsWith("ar")) {
  I18nManager.forceRTL(true);
} else {
  I18nManager.forceRTL(false);
}

export default i18n;
