import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import i18next from "eslint-plugin-i18next";

export default [

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {

    plugins: {

      "@next/next": nextPlugin,

      i18next
    },

    rules: {

      // ============================================
      // DISABLE ANNOYING REACT 19 RULES
      // ============================================

      "@typescript-eslint/no-explicit-any": "off",

      "react-hooks/set-state-in-effect": "off",

      "react-hooks/exhaustive-deps": "off",

      "react-hooks/immutability": "off",

      "@next/next/no-img-element": "off",

      "jsx-a11y/alt-text": "off",

      // ============================================
      // TRANSLATIONS
      // ===========================================


    }
  }
];