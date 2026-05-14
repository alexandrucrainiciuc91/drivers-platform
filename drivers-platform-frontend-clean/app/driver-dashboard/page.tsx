"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import LanguageSwitcher from "../components/LanguageSwitcher";

import {
  useTranslation
} from "react-i18next";

export default function DriverDashboard() {

  const { t } =
    useTranslation();

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [plan, setPlan] =
    useState("free");

  // ============================================
  // AUTH
  // ============================================

  useEffect(() => {

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

    fetchDashboard();

  }, []);

  // ============================================
  // FETCH DASHBOARD
  // ============================================

  async function fetchDashboard() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          "http://127.0.0.1:8000/driver/dashboard",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

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

      const response =
        await fetch(
          "http://127.0.0.1:8000/subscribe",
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

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user_type"
    );

    localStorage.removeItem(
      "subscription_plan"
    );

    window.location.href =
      "/login";
  }

  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-h-screen bg-black text-white flex items-center justify-center text-3xl">

          {
            t(
              "driver_dashboard.loading"
            )
          }

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

      <div className="flex-1 min-h-screen overflow-hidden relative">

        {/* BG */}

        <div className="fixed inset-0">

          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/20 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/20 blur-[180px]" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 p-10">

          {/* LANGUAGE */}

          <div className="flex justify-end mb-6">

            <LanguageSwitcher />

          </div>

          {/* HERO */}

          <div className="flex flex-col xl:flex-row items-start justify-between gap-10 mb-14">

            <div>

              <div className="flex items-center gap-4 mb-6">

                <p className="text-yellow-400 font-semibold uppercase tracking-[5px]">

                  {
                    t(
                      "driver_dashboard.control_center"
                    )
                  }

                </p>

                <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-2xl text-sm font-bold">

                  {
                    t(
                      "driver_dashboard.online"
                    )
                  }

                </div>

              </div>

              <h1 className="text-7xl font-black leading-none">

                {
                  t(
                    "driver_dashboard.welcome"
                  )
                }

                <br />

                {
                  dashboard?.driver_name ||
                  "Driver"
                }

              </h1>

              <p className="text-gray-400 text-2xl mt-6 max-w-2xl">

                {
                  t(
                    "driver_dashboard.subtitle"
                  )
                }

              </p>

              {/* PLAN */}

              <div className="mt-8 flex gap-4 flex-wrap">

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
                      hover:scale-105
                      transition-all
                      shadow-[0_0_60px_rgba(250,204,21,0.35)]
                    "
                  >

                    {
                      t(
                        "driver_dashboard.upgrade_plan"
                      )
                    }

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
                    hover:bg-red-500/30
                    transition-all
                  "
                >

                  {
                    t(
                      "driver_dashboard.logout"
                    )
                  }

                </button>

              </div>

            </div>

            {/* IMAGE */}

            <div className="hidden xl:block">

              <img
                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop"
                className="
                  w-[500px]
                  h-[320px]
                  object-cover
                  rounded-[40px]
                  border
                  border-white/10
                  shadow-2xl
                "
              />

            </div>

          </div>

          {/* PREMIUM CARD */}

          {plan === "free" && (

            <div className="
              relative
              overflow-hidden
              mb-10
              rounded-[40px]
              border
              border-yellow-400/20
              bg-gradient-to-br
              from-yellow-500/10
              via-black/60
              to-orange-500/10
              backdrop-blur-3xl
              p-10
            ">

              <div className="
                absolute
                inset-0
                bg-yellow-400/5
                blur-[120px]
              " />

              <div className="relative z-10">

                <div className="flex flex-wrap items-center justify-between gap-8">

                  <div>

                    <div className="
                      inline-flex
                      items-center
                      gap-3
                      bg-yellow-400
                      text-black
                      px-5
                      py-2
                      rounded-full
                      font-black
                      text-sm
                      mb-6
                    ">

                      MOST POPULAR

                    </div>

                    <h2 className="
                      text-5xl
                      font-black
                      leading-tight
                      mb-5
                    ">

                      Upgrade To
                      <span className="text-yellow-400">

                        {" "}PRO DRIVER

                      </span>

                    </h2>

                    <p className="
                      text-gray-300
                      text-xl
                      max-w-3xl
                      leading-relaxed
                    ">

                      Unlock unlimited job applications,
                      unlimited transport opportunities,
                      premium visibility and priority access
                      to top logistics companies.

                    </p>

                  </div>

                  {/* PRICE */}

                  <div className="
                    bg-black/40
                    border
                    border-yellow-400/20
                    rounded-[35px]
                    p-8
                    text-center
                    min-w-[240px]
                  ">

                    <p className="
                      text-gray-400
                      uppercase
                      tracking-[4px]
                      mb-4
                    ">

                      PRO DRIVER

                    </p>

                    <h2 className="
                      text-7xl
                      font-black
                      text-yellow-400
                      leading-none
                    ">

                      €5

                    </h2>

                    <p className="text-gray-400 mt-3">

                      per month

                    </p>

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  onClick={openCheckout}
                  className="
                    mt-12
                    bg-yellow-400
                    text-black
                    px-10
                    py-5
                    rounded-2xl
                    font-black
                    text-xl
                    hover:scale-105
                    transition-all
                    shadow-[0_0_80px_rgba(250,204,21,0.45)]
                  "
                >

                  Upgrade To PRO DRIVER

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}