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

import LanguageSwitcher from "../components/LanguageSwitcher";

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
        "Password must contain at least 6 characters."
      );

      return;
    }

    // MATCH

    if (
      password !==
      confirmPassword
    ) {

      setMessage(
        "Passwords do not match."
      );

      return;
    }

    // TERMS

    if (!acceptedTerms) {

      setMessage(
        "You must accept Terms & Conditions."
      );

      return;
    }

    try {

      setLoading(true);

      const response =
        await fetch(
          "http://127.0.0.1:8000/register",
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

      // SAVE AUTH

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user_type",
        data.user_type
      );

      localStorage.setItem(
        "subscription_plan",
        data.subscription_plan
      );

      // REDIRECT

      if (
        data.user_type ===
        "driver"
      ) {

        window.location.href =
          "/create-driver-profile";
      }

      if (
        data.user_type ===
        "company"
      ) {

        window.location.href =
          "/create-company-profile";
      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Server error."
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

              Premium Transport Platform

            </span>

          </div>

          <h1 className="
            text-6xl
            font-black
            leading-none
            mb-5
          ">

            Create Account

          </h1>

          <p className="
            text-gray-400
            text-xl
            leading-relaxed
          ">

            Join the logistics platform connecting
            professional drivers and transport
            companies across Europe.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleRegister}
          className="space-y-7"
        >

          {/* EMAIL */}

          <div>

            <label className="
              block
              mb-3
              text-gray-300
              font-medium
            ">

              Email

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
              "
              required
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="
              block
              mb-3
              text-gray-300
              font-medium
            ">

              Password

            </label>

            <input
              type="password"
              placeholder="Minimum 6 characters"
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
              "
              required
            />

          </div>

          {/* CONFIRM */}

          <div>

            <label className="
              block
              mb-3
              text-gray-300
              font-medium
            ">

              Confirm Password

            </label>

            <input
              type="password"
              placeholder="Repeat password"
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
                text-lg
                focus:outline-none
                focus:border-yellow-400
              "
              required
            />

          </div>

          {/* ROLE */}

          <div>

            <label className="
              block
              mb-3
              text-gray-300
              font-medium
            ">

              Account Type

            </label>

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
                text-lg
                focus:outline-none
                focus:border-yellow-400
              "
            >

              <option value="driver">

                Driver

              </option>

              <option value="company">

                Company

              </option>

            </select>

          </div>

          {/* INFO */}

          <div className="
            bg-yellow-500/10
            border
            border-yellow-400/20
            rounded-[30px]
            p-6
          ">

            <h3 className="
              text-2xl
              font-black
              text-yellow-400
              mb-3
            ">

              Free Plan Included

            </h3>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              All new accounts start with the FREE plan.
              You can upgrade later from your dashboard
              using secure Stripe checkout.

            </p>

          </div>

          {/* TERMS */}

          <div className="
            flex
            items-start
            gap-4
          ">

            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) =>
                setAcceptedTerms(
                  e.target.checked
                )
              }
              className="mt-1"
            />

            <p className="
              text-gray-400
              leading-relaxed
            ">

              I accept the Terms &
              Conditions and Privacy Policy.

            </p>

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
              text-xl
              hover:scale-[1.02]
              transition-all
              disabled:opacity-50
              shadow-[0_0_40px_rgba(250,204,21,0.35)]
            "
          >

            {loading
              ? "Creating account..."
              : "Create Account"}

          </button>

        </form>

        {/* MESSAGE */}

        {message && (

          <div className="
            mt-6
            text-center
            text-yellow-400
            font-semibold
          ">

            {message}

          </div>

        )}

        {/* LOGIN */}

        <div className="
          mt-10
          text-center
          text-gray-400
        ">

          Already have an account?

          <Link
            href="/login"
            className="
              text-yellow-400
              ml-2
              hover:text-yellow-300
            "
          >

            Login

          </Link>

        </div>

      </div>

    </div>
  );
}