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

export default function DriverDashboard() {

  const [mounted, setMounted] =
    useState(false);

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [plan, setPlan] =
    useState("free");

  const API_URL =
    "https://drivers-platform-production.up.railway.app";

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
          `${API_URL}/driver/dashboard`,
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
          `${API_URL}/subscribe`,
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
  // CANCEL SUBSCRIPTION
  // =====================================================

  async function cancelSubscription() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(

          `${API_URL}/cancel-subscription`,

          {

            method: "POST",

            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      alert(data.message);

      localStorage.setItem(
        "subscription_plan",
        "free"
      );

      window.location.reload();

    } catch (error) {

      console.log(error);
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

        <div className="
          relative
          z-10
          p-10
        ">

          <div className="
            flex
            justify-end
            mb-6
          ">

            <LanguageSwitcher />

          </div>

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

                {plan === "pro" && (

                  <button
                    onClick={cancelSubscription}
                    className="
                      bg-red-500/20
                      text-red-400
                      px-6
                      py-3
                      rounded-2xl
                      font-black
                    "
                  >

                    Cancel Subscription

                  </button>

                )}

                <button
                  onClick={logout}
                  className="
                    bg-red-500
                    text-white
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

          <div className="
            grid
            md:grid-cols-3
            gap-6
            mt-14
          ">

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

            </Link>

            <Link
              href="/jobs"
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

                Jobs

              </p>

              <h2 className="
                text-3xl
                font-black
                mb-3
              ">

                Browse Jobs

              </h2>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}