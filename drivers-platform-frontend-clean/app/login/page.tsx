"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import LanguageSwitcher
from "../components/LanguageSwitcher";

import {
  useTranslation
} from "react-i18next";

export default function LoginPage() {

  const { t } =
    useTranslation();

  const [mounted, setMounted] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ============================================
  // MOUNT FIX
  // ============================================

  useEffect(() => {

    setMounted(true);

  }, []);

  // ============================================
  // REDIRECT IF LOGGED
  // ============================================

  useEffect(() => {

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

  }, []);

  // ============================================
  // LOGIN
  // ============================================

  async function handleLogin(
    e: any
  ) {

    e.preventDefault();

    setLoading(true);

    setMessage("");

    try {

      const formData =
        new URLSearchParams();

      formData.append(
        "username",
        email
      );

      formData.append(
        "password",
        password
      );

      const response = await fetch(
        "https://drivers-platform-production.up.railway.app/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },

          body: formData
        }
      );

      const data =
        await response.json();

      console.log(
        "LOGIN RESPONSE:",
        data
      );

      // FAILED

      if (
        !data.access_token
      ) {

        setMessage(

          data.error ||

          t(
            "login.invalid_credentials"
          )
        );

        return;
      }

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        data.access_token
      );

      // SAVE USER TYPE

      localStorage.setItem(
        "user_type",
        data.user_type
      );

      // SAVE PLAN

      localStorage.setItem(
        "subscription_plan",
        data.subscription_plan
      );

      setMessage(

        t(
          "login.login_success"
        )
      );
localStorage.setItem(
  "user_id",
  data.user.id
);
      // COMPANY

      if (
        data.user_type ===
        "company"
      ) {

        window.location.href =
          "/company-dashboard";
      }

      // DRIVER

      if (
        data.user_type ===
        "driver"
      ) {

        window.location.href =
          "/driver-dashboard";
      }

    } catch (error) {

      console.log(error);

      setMessage(

        t(
          "login.server_error"
        )
      );

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // HYDRATION FIX
  // ============================================

  if (!mounted) {

    return null;
  }

  // ============================================
  // UI
  // ============================================

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

      {/* LANGUAGE SWITCHER */}

      <div className="absolute top-6 right-6 z-50">

        <LanguageSwitcher />

      </div>

      {/* BACKGROUND */}

      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/20 blur-[160px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-[160px]" />

      </div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-lg bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10 shadow-2xl">

        {/* HEADER */}

        <div className="mb-10">

          <div className="flex items-center gap-3 mb-4">

            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />

            <p className="uppercase tracking-[4px] text-yellow-400">

              {
                t(
                  "login.secure_access"
                )
              }

            </p>

          </div>

          <h1 className="text-2xl md:text-4xl xl:text-5xl font-black mb-4">

            {
              t(
                "login.title"
              )
            }

          </h1>

          <p className="text-gray-400 text-lg leading-relaxed">

            {
              t(
                "login.subtitle"
              )
            }

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="block mb-3 text-gray-300">

              {
                t(
                  "login.email"
                )
              }

            </label>

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
                text-lg
                focus:outline-none
                focus:border-yellow-400
                transition-all
              "
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="block mb-3 text-gray-300">

              {
                t(
                  "login.password"
                )
              }

            </label>

            <input
              type="password"
              placeholder="••••••••"
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
                text-lg
                focus:outline-none
                focus:border-yellow-400
                transition-all
              "
              required
            />

          </div>

          {/* BUTTON */}

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
              text-lg
              hover:scale-[1.02]
              transition-all
              disabled:opacity-50
            "
          >

            {loading

              ? t(
                  "login.signing_in"
                )

              : t(
                  "login.login_button"
                )}

          </button>

        </form>

        {/* MESSAGE */}

        {message && (

          <div className="mt-6 text-center text-lg text-yellow-400">

            {message}

          </div>

        )}

        {/* FOOTER */}

        <div className="mt-10 space-y-4">

          <div className="text-center">

            <button
              className="text-gray-400 hover:text-yellow-400 transition-all"
            >

              {
                t(
                  "login.forgot_password"
                )
              }

            </button>

          </div>

          <div className="text-center text-gray-400">

            {
              t(
                "login.no_account"
              )
            }

            <Link
              href="/register"
              className="
                text-yellow-400
                ml-2
                hover:text-yellow-300
              "
            >

              {
                t(
                  "login.create_account"
                )
              }

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}