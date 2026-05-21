"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import Sidebar from "../components/Sidebar";

import LanguageSwitcher
from "../components/LanguageSwitcher";

import {
  useTranslation
} from "react-i18next";

export default function DriverDashboard() {

  const { t } =
    useTranslation();

  const [mounted, setMounted] =
    useState(false);

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [plan, setPlan] =
    useState("free");

  // =====================================================
  // MOUNT FIX
  // =====================================================

  useEffect(() => {

    setMounted(true);

  }, []);

  // =====================================================
  // AUTH
  // =====================================================

  useEffect(() => {

    if (!mounted) {
      return;
    }

    const token =
      localStorage.getItem("token");

    const userType =
      localStorage.getItem("user_type");

    const subscription =
      localStorage.getItem(
        "subscription_plan"
      );

    if (subscription) {

      setPlan(subscription);
    }

    if (!token) {

      window.location.href =
        "/login";

      return;
    }

    if (userType !== "driver") {

      window.location.href =
        "/";

      return;
    }

    void fetchDashboard(token);

  }, [mounted]);

  // =====================================================
  // FETCH DASHBOARD
  // =====================================================

  async function fetchDashboard(
    token: string
  ) {

    try {

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/driver/dashboard",
          {
            method: "GET",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      // ============================================
      // NO DRIVER PROFILE
      // ============================================

      if (
        !data.driver_name
      ) {

        window.location.href =
          "/create-driver-profile";

        return;
      }

      setDashboard(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // =====================================================
  // STRIPE CHECKOUT
  // =====================================================

  async function openCheckout() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        return;
      }

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/subscribe",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({

              price_id:
                "price_1TVGXaEKIOywtjGZSQvQxhOF"

            })
          }
        );

      const data =
        await response.json();

      if (data.checkout_url) {

        window.location.href =
          data.checkout_url;
      }

    } catch (error) {

      console.log(error);

      alert(
        "Stripe checkout failed"
      );
    }
  }

  // =====================================================
  // LOGOUT
  // =====================================================

  function logout() {

    localStorage.clear();

    window.location.href =
      "/login";
  }

  // =====================================================
  // HYDRATION FIX
  // =====================================================

  if (!mounted) {

    return null;
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="flex">

        <Sidebar />

        <div className="
          flex-1
          min-h-screen
          bg-black
          text-white
          flex
          items-center
          justify-center
          text-3xl
        ">

          Loading Dashboard...

        </div>

      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="
      flex
      bg-black
      text-white
    ">

      <Sidebar />

      <div className="
        flex-1
        min-h-screen
        overflow-hidden
        relative
      ">

        {/* BACKGROUND */}

        <div className="fixed inset-0">

          <div className="
            absolute
            top-0
            left-0
            w-[500px]
            h-[500px]
            bg-yellow-500/20
            blur-[180px]
          " />

          <div className="
            absolute
            bottom-0
            right-0
            w-[500px]
            h-[500px]
            bg-orange-500/20
            blur-[180px]
          " />

        </div>

        {/* CONTENT */}

        <div className="
          relative
          z-10
          p-10
        ">

          {/* LANGUAGE */}

          <div className="
            flex
            justify-end
            mb-6
          ">

            <LanguageSwitcher />

          </div>

          {/* HERO */}

          <div className="
            flex
            flex-col
            xl:flex-row
            items-start
            justify-between
            gap-10
            mb-14
          ">

            <div>

              <div className="
                flex
                items-center
                gap-4
                mb-6
              ">

                <p className="
                  text-yellow-400
                  font-semibold
                  uppercase
                  tracking-[5px]
                ">

                  DRIVER CONTROL CENTER

                </p>

                <div className="
                  bg-green-500/20
                  text-green-400
                  px-4
                  py-2
                  rounded-2xl
                  text-sm
                  font-bold
                ">

                  ONLINE

                </div>

              </div>

              <h1 className="
                text-7xl
                font-black
                leading-none
              ">

                Welcome

                <br />

                {
                  dashboard?.driver_name ||
                  "Driver"
                }

              </h1>

              <p className="
                text-gray-400
                text-2xl
                mt-6
                max-w-2xl
              ">

                Manage your transport career,
                applications and premium opportunities.

              </p>

              {/* PLAN */}

              <div className="
                mt-8
                flex
                gap-4
                flex-wrap
              ">

                <div className={`
                  px-6
                  py-3
                  rounded-2xl
                  font-black
                  uppercase
                  ${
                    plan === "pro"

                      ? "bg-yellow-400 text-black"

                      : "bg-green-500/20 text-green-400"
                  }
                `}>

                  {
                    plan === "pro"

                      ? "PRO DRIVER"

                      : "FREE PLAN"
                  }

                </div>

                {plan === "free" && (

                  <button
                    onClick={openCheckout}
                    className="
                      bg-yellow-400
                      text-black
                      px-6
                      py-3
                      rounded-2xl
                      font-black
                    "
                  >

                    Upgrade Plan

                  </button>

                )}

                <button
                  onClick={logout}
                  className="
                    bg-red-500/20
                    text-red-400
                    px-6
                    py-3
                    rounded-2xl
                    font-bold
                  "
                >

                  Logout

                </button>

              </div>

            </div>

          </div>

          {/* MARKETPLACE ACTIONS */}

          <div className="
            grid
            md:grid-cols-3
            gap-6
            mt-14
          ">

            {/* LOADS */}

            <Link
              href="/loads"
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
                hover:border-yellow-400/40
                transition
                backdrop-blur-xl
                block
              "
            >

              <p className="
                text-gray-500
                uppercase
                text-sm
                mb-4
              ">

                Marketplace

              </p>

              <h2 className="
                text-3xl
                font-black
                mb-3
              ">

                Loads Marketplace

              </h2>

              <p className="
                text-gray-400
                leading-relaxed
              ">

                Browse transport loads
                across Europe.

              </p>

            </Link>

            {/* FREE LIMIT */}

            <div
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
                backdrop-blur-xl
              "
            >

              <p className="
                text-gray-500
                uppercase
                text-sm
                mb-4
              ">

                Free Plan Limit

              </p>

              <h2 className="
                text-5xl
                font-black
                text-yellow-400
                mb-3
              ">

                {plan === "free"
                  ? "3"
                  : "∞"}

              </h2>

              <p className="
                text-gray-400
              ">

                Visible loads

              </p>

            </div>

            {/* PREMIUM */}

            <div
              className="
                bg-gradient-to-br
                from-yellow-500/10
                to-orange-500/10
                border
                border-yellow-400/20
                rounded-3xl
                p-8
              "
            >

              <p className="
                text-yellow-400
                uppercase
                text-sm
                mb-4
                font-bold
              ">

                Premium Access

              </p>

              <h2 className="
                text-3xl
                font-black
                mb-4
              ">

                Unlimited Loads

              </h2>

              <p className="
                text-gray-300
                mb-6
              ">

                Upgrade your account
                to unlock all marketplace loads.

              </p>

              {plan === "free" && (

                <button
                  onClick={openCheckout}
                  className="
                    bg-yellow-400
                    text-black
                    px-6
                    py-3
                    rounded-2xl
                    font-black
                  "
                >

                  Upgrade Now

                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}