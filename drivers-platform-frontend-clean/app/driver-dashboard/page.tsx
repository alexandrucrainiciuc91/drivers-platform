"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

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

  // ============================================
  // MOUNT FIX
  // ============================================

  useEffect(() => {

    setMounted(true);

  }, []);

  // ============================================
  // AUTH
  // ============================================

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

    console.log(
      "DASHBOARD TOKEN:",
      token
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

    fetchDashboard(token);

  }, [mounted]);

  // ============================================
  // FETCH DASHBOARD
  // ============================================

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

    console.log(
      "DASHBOARD STATUS:",
      response.status
    );

    // ============================================
    // NO PROFILE
    // ============================================

    if (response.status === 404) {

      window.location.href =
        "/create-driver-profile";

      return;
    }

    const data =
      await response.json();

    console.log(
      "FULL DASHBOARD:",
      data
    );

    setDashboard(data);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);
  }
}

  // ============================================
  // STRIPE CHECKOUT
  // ============================================

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

      console.log(data);

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

  // ============================================
  // LOGOUT
  // ============================================

  function logout() {

    localStorage.clear();

    window.location.href =
      "/login";
  }

  // ============================================
  // HYDRATION FIX
  // ============================================

  if (!mounted) {

    return null;
  }

  // ============================================
  // LOADING
  // ============================================

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

  // ============================================
  // UI
  // ============================================

  return (

    <div className="flex bg-black text-white">

      <Sidebar />

      <div className="
        flex-1
        min-h-screen
        overflow-hidden
        relative
      ">

        {/* BG */}

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

        <div className="relative z-10 p-10">

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

        </div>

      </div>

    </div>
  );
}