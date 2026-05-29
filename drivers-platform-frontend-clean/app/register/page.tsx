"use client";

import "../i18n";

import Link from "next/link";

import {
  useEffect,
  useState
} from "react";

import {
  useTranslation
} from "react-i18next";

import LanguageSwitcher
from "../components/LanguageSwitcher";

export default function RegisterPage() {

  const { t } =
    useTranslation();

  // ============================================
  // HYDRATION
  // ============================================

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  // ============================================
  // STATES
  // ============================================

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState("");

  const [role, setRole] =
    useState("driver");

  const [
    acceptedTerms,
    setAcceptedTerms
  ] = useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ============================================
  // REDIRECT IF LOGGED
  // ============================================

  useEffect(() => {

    if (!mounted) return;

    const token =
      localStorage.getItem("token");

    const userType =
      localStorage.getItem("user_type");

    if (token) {

      if (userType === "driver") {

        window.location.href =
          "/driver-dashboard";
      }

      if (userType === "company") {

        window.location.href =
          "/company-dashboard";
      }
    }

  }, [mounted]);

  // ============================================
  // REGISTER
  // ============================================

  async function handleRegister(
    e: any
  ) {

    e.preventDefault();

    setMessage("");

    // PASSWORD

    if (password.length < 6) {

      setMessage(
        t(
          "register.password_error"
        )
      );

      return;
    }

    // MATCH

    if (
      password !==
      confirmPassword
    ) {

      setMessage(
        t(
          "register.match_error"
        )
      );

      return;
    }

    // TERMS

    if (!acceptedTerms) {

      setMessage(
        t(
          "register.terms_error"
        )
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              email,

              password,

              role
            }),
          }
        );

      const data =
        await response.json();

      console.log(data);

      // ERROR

      if (data.error) {

        setMessage(
          data.error
        );

        return;
      }

      // ============================================
      // VERIFY EMAIL PAGE
      // ============================================

      window.location.href =
        "/verify-email";

    } catch (error) {

      console.log(error);

      setMessage(
        t(
          "register.server_error"
        )
      );

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // SSR FIX
  // ============================================

  if (!mounted) {

    return null;
  }

  // ============================================
  // UI
  // ============================================

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      px-6
      py-10
      overflow-hidden
      relative
    ">

      {/* LANGUAGE */}

      <div className="absolute top-6 right-6 z-50">

        <LanguageSwitcher />

      </div>

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-yellow-500/20
          blur-[160px]
        " />

        <div className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-orange-500/20
          blur-[160px]
        " />

      </div>

      {/* CARD */}

      <div className="
        relative
        z-10
        w-full
        max-w-2xl
        bg-white/5
        border
        border-white/10
        backdrop-blur-2xl
        rounded-[40px]
        p-10
        shadow-2xl
      ">

        {/* HEADER */}

        <div className="mb-10">

          <div className="
            inline-flex
            items-center
            gap-3
            bg-yellow-400/10
            border
            border-yellow-400/20
            rounded-full
            px-5
            py-2
            mb-6
          ">

            <div className="
              w-2
              h-2
              rounded-full
              bg-yellow-400
            " />

            <span className="
              text-yellow-300
              text-sm
              tracking-[4px]
              uppercase
            ">

              {t("register.badge")}

            </span>

          </div>

          <h1 className="
            text-3xl md:text-5xl xl:text-6xl
            font-black
            leading-none
            mb-5
          ">

            {t("register.title")}

          </h1>

          <p className="
            text-gray-400
            text-xl
            leading-relaxed
          ">

            {t("register.subtitle")}

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="space-y-7"
        >

          <input
            type="email"
            placeholder="john@email.com"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              bg-black/40
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
            required
          />

          <input
            type="password"
            placeholder={
              t(
                "register.password_placeholder"
              )
            }
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              bg-black/40
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
            required
          />

          <input
            type="password"
            placeholder={
              t(
                "register.confirm_placeholder"
              )
            }
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="
              w-full
              bg-black/40
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
            required
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
            className="
              w-full
              bg-black/40
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          >

            <option value="driver">

              {t("register.driver")}

            </option>

            <option value="company">

              {t("register.company")}

            </option>

          </select>

          <div className="
            flex
            items-center
            gap-3
          ">

            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) =>
                setAcceptedTerms(
                  e.target.checked
                )
              }
            />

            <p>

              {t("register.terms")}

            </p>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-yellow-400
              text-black
              py-5
              rounded-2xl
              font-black
              text-xl
            "
          >

            {loading
              ? t("register.creating")
              : t("register.create_account")}

          </button>

        </form>

        {message && (

          <div className="
            mt-6
            text-center
            text-yellow-400
          ">

            {message}

          </div>

        )}

        <div className="
          mt-10
          text-center
          text-gray-400
        ">

          {t("register.have_account")}

          <Link
            href="/login"
            className="
              text-yellow-400
              ml-2
            "
          >

            {t("register.login")}

          </Link>

        </div>

      </div>

    </div>
  );
}