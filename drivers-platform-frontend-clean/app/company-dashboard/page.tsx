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

export default function CompanyDashboard() {

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
      localStorage.getItem(
        "token"
      );

    const userType =
      localStorage.getItem(
        "user_type"
      );

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

    if (userType !== "company") {

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
          "http://127.0.0.1:8000/company/dashboard",
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
                "price_1TWXnjEKIOywtjGZrBPeI3ek"

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
  // LOADING
  // ============================================

  if (loading) {

    return (

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-h-screen bg-black text-white flex items-center justify-center text-3xl">

          {
            t(
              "company_dashboard.loading"
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

        {/* BACKGROUND */}

        <div className="fixed inset-0">

          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-500/10 blur-[180px]" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 p-10">

          {/* LANGUAGE */}

          <div className="flex justify-end mb-6">

            <LanguageSwitcher />

          </div>

          {/* HERO */}

          <div className="bg-white/5 border border-white/10 rounded-[50px] p-10 backdrop-blur-2xl mb-10">

            <div className="flex items-center justify-between gap-10 flex-wrap">

              <div>

                <p className="uppercase tracking-[6px] text-yellow-400 mb-4">

                  {
                    t(
                      "company_dashboard.dashboard"
                    )
                  }

                </p>

                <h1 className="text-7xl font-black leading-none">

                  {
                    dashboard?.company_name
                  }

                </h1>

                <p className="text-gray-400 text-2xl mt-6 max-w-3xl">

                  {
                    t(
                      "company_dashboard.subtitle"
                    )
                  }

                </p>

                {/* PLAN */}

                <div className="flex gap-5 mt-8 flex-wrap">

                  <div className={`
                    px-6
                    py-3
                    rounded-2xl
                    font-black
                    uppercase
                    ${
                      plan === "business"

                        ? "bg-yellow-400 text-black"

                        : "bg-green-500/20 text-green-400"
                    }
                  `}>

                    {
                      plan === "business"

                        ? "BUSINESS PLAN"

                        : "FREE PLAN"
                    }

                  </div>

                  <div className="bg-white/10 px-6 py-3 rounded-2xl">

                    {
                      dashboard?.transport_type
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
                          "company_dashboard.upgrade_plan"
                        )
                      }

                    </button>

                  )}

                </div>

              </div>

              {/* IMAGE */}

              <img
                src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1400&auto=format&fit=crop"
                className="
                  w-[500px]
                  h-[320px]
                  rounded-[40px]
                  object-cover
                  border
                  border-white/10
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
              rounded-[45px]
              border
              border-yellow-400/20
              bg-gradient-to-br
              from-yellow-500/10
              via-black/70
              to-orange-500/10
              backdrop-blur-3xl
              p-10
            ">

              <div className="
                absolute
                inset-0
                bg-yellow-400/5
                blur-[140px]
              " />

              <div className="relative z-10">

                <div className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-10
                ">

                  {/* LEFT */}

                  <div className="max-w-4xl">

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
                      xl:text-6xl
                      font-black
                      leading-tight
                      mb-6
                    ">

                      Upgrade To
                      <span className="text-yellow-400">

                        {" "}BUSINESS

                      </span>

                    </h2>

                    <p className="
                      text-gray-300
                      text-xl
                      leading-relaxed
                      max-w-3xl
                    ">

                      Unlock unlimited drivers,
                      unlimited jobs,
                      premium visibility,
                      priority support
                      and advanced recruitment tools.

                    </p>

                  </div>

                  {/* PRICE */}

                  <div className="
                    bg-black/50
                    border
                    border-yellow-400/20
                    rounded-[35px]
                    p-10
                    text-center
                    min-w-[260px]
                  ">

                    <p className="
                      text-gray-400
                      uppercase
                      tracking-[4px]
                      mb-4
                    ">

                      BUSINESS PLAN

                    </p>

                    <h2 className="
                      text-7xl
                      font-black
                      text-yellow-400
                      leading-none
                    ">

                      €45

                    </h2>

                    <p className="
                      text-gray-400
                      mt-4
                      text-lg
                    ">

                      per month

                    </p>

                  </div>

                </div>

                {/* FEATURES */}

                <div className="
                  grid
                  md:grid-cols-4
                  gap-5
                  mt-14
                ">

                  {[
                    "Unlimited Jobs",
                    "Unlimited Drivers",
                    "Priority Visibility",
                    "Premium Badge"
                  ].map((item, index) => (

                    <div
                      key={index}
                      className="
                        bg-black/30
                        border
                        border-white/10
                        rounded-2xl
                        px-5
                        py-5
                        text-center
                        font-semibold
                      "
                    >

                      {item}

                    </div>

                  ))}

                </div>

                {/* BUTTON */}

                <button
                  onClick={openCheckout}
                  className="
                    mt-14
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

                  Upgrade To BUSINESS

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}