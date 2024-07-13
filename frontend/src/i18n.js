import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import vn from "./locales/vn.json";
import fr from "./locales/fr.json";
import ko from "./locales/ko.json";

const resources = {
  en: {
    translation: en,
  },
  vn: {
    translation: vn,
  },
  fr: {
    translation: fr,
  },
  ko: {
    translation: ko,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Default language
    interpolation: {
      escapeValue: false,
    },
  })
  .then((r) => console.log("i18n initialized"));
