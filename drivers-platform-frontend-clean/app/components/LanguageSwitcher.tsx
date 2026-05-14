"use client";

import "../i18n";

import i18n from "i18next";

export default function LanguageSwitcher() {

  function changeLanguage(
    language: string
  ) {

    i18n.changeLanguage(language);

    localStorage.setItem(
      "language",
      language
    );

    window.location.reload();
  }

  return (

    <div className="flex gap-3">

      <button
        onClick={() =>
          changeLanguage("en")
        }
        className="
          px-4
          py-2
          rounded-xl
          bg-white/10
          hover:bg-yellow-400
          hover:text-black
          transition-all
        "
      >

        EN

      </button>

      <button
        onClick={() =>
          changeLanguage("fr")
        }
        className="
          px-4
          py-2
          rounded-xl
          bg-white/10
          hover:bg-yellow-400
          hover:text-black
          transition-all
        "
      >

        FR

      </button>

      <button
        onClick={() =>
          changeLanguage("ro")
        }
        className="
          px-4
          py-2
          rounded-xl
          bg-white/10
          hover:bg-yellow-400
          hover:text-black
          transition-all
        "
      >

        RO

      </button>

    </div>
  );
}