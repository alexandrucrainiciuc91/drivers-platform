"use client";

import i18n from "i18next";

import { initReactI18next }
from "react-i18next";

import en from "./locales/en/common.json";
import fr from "./locales/fr/common.json";
import ro from "./locales/ro/common.json";

const savedLanguage =

  typeof window !== "undefined"

    ? localStorage.getItem("language")

    : "en";

i18n
  .use(initReactI18next)
  .init({

    resources: {

      en: {
        translation: en
      },

      fr: {
        translation: fr
      },

      ro: {
        translation: ro
      }

    },

    lng:
      savedLanguage || "en",

    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;