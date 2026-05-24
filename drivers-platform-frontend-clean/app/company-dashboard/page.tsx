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

  const [loads, setLoads] =
    useState<any[]>([]);

  const API_URL =
    "https://drivers-platform-production.up.railway.app";

  // ============================================
  // FETCH LOADS
  // ============================================

  const fetchLoads = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(

          `${API_URL}/my-loads`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      setLoads(data);

    } catch (error) {

      console.log(error);
    }
  };

  // ============================================
  // DELETE LOAD
  // ============================================

  const deleteLoad = async (
    loadId: number
  ) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await fetch(

        `${API_URL}/delete-load/${loadId}`,

        {

          method: "DELETE",

          headers: {

            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchLoads();

    } catch (error) {

      console.log(error);
    }
  };

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

          `${API_URL}/company/dashboard`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      console.log(
        "FULL COMPANY DASHBOARD:",
        data
      );

      if (
        !data.company_name
      ) {

        window.location.href =
          "/create-company-profile";

        return;
      }

      setDashboard(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

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

    fetchLoads();

  }, []);

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
                "price_1TWXnjEKIOywtjGZrBPeI3ek"
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
            w-[700px]
            h-[700px]
            bg-yellow-500/10
            blur-[180px]
          " />

          <div className="
            absolute
            bottom-0
            right-0
            w-[700px]
            h-[700px]
            bg-orange-500/10
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
            bg-white/5
            border
            border-white/10
            rounded-[50px]
            p-10
            backdrop-blur-2xl
            mb-10
          ">

            <div className="
              flex
              items-center
              justify-between
              gap-10
              flex-wrap
            ">

              <div>

                <p className="
                  uppercase
                  tracking-[6px]
                  text-yellow-400
                  mb-4
                ">

                  {
                    t(
                      "company_dashboard.dashboard"
                    )
                  }

                </p>

                <h1 className="
                  text-7xl
                  font-black
                  leading-none
                ">

                  {
                    dashboard?.company_name
                  }

                </h1>

                <p className="
                  text-gray-400
                  text-2xl
                  mt-6
                  max-w-3xl
                ">

                  {
                    t(
                      "company_dashboard.subtitle"
                    )
                  }

                </p>

                {/* PLAN */}

                <div className="
                  flex
                  gap-5
                  mt-8
                  flex-wrap
                ">

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

                  <div className="
                    bg-white/10
                    px-6
                    py-3
                    rounded-2xl
                  ">

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

          {/* LOAD MARKETPLACE */}

          <div className="
            grid
            lg:grid-cols-3
            gap-6
            mb-10
          ">

            {/* POST LOAD */}

            <a
              href="/post-load"
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
                hover:border-yellow-400/40
                transition
                backdrop-blur-xl
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

                Post Load

              </h2>

              <p className="
                text-gray-400
                leading-relaxed
              ">

                Publish transport loads
                for drivers and carriers.

              </p>

            </a>

            {/* VIEW LOADS */}

            <a
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

                Browse Loads

              </h2>

              <p className="
                text-gray-400
                leading-relaxed
              ">

                Explore all active
                transport requests.

              </p>

            </a>

            {/* PLAN */}

            <div className="
              bg-gradient-to-br
              from-yellow-500/10
              to-orange-500/10
              border
              border-yellow-400/20
              rounded-3xl
              p-8
            ">

              <p className="
                text-yellow-400
                uppercase
                text-sm
                mb-4
                font-bold
              ">

                Current Plan

              </p>

              <h2 className="
                text-5xl
                font-black
                mb-3
              ">

                {plan === "free"
                  ? "5"
                  : "∞"}

              </h2>

              <p className="
                text-gray-300
                mb-6
              ">

                Posted loads limit

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

                  Upgrade Business

                </button>

              )}

            </div>

          </div>

          {/* MY LOADS */}

          <div className="mb-10">

            <h2 className="
              text-4xl
              font-black
              mb-6
            ">

              My Loads

            </h2>

            <div className="
              grid
              gap-5
            ">

              {loads.map((load: any) => (

                <div
                  key={load.id}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-3xl
                    p-6
                    backdrop-blur-xl
                  "
                >

                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    flex-wrap
                  ">

                    <div>

                      <h3 className="
                        text-2xl
                        font-black
                      ">

                        {load.pickup_city}
                        {" → "}
                        {load.delivery_city}

                      </h3>

                      <p className="
                        text-gray-400
                        mt-2
                      ">

                        €{load.price}
                        {" • "}
                        {load.transport_type}

                      </p>

                      <div className="
                        mt-3
                        inline-flex
                        px-4
                        py-2
                        rounded-xl
                        bg-yellow-400/10
                        text-yellow-400
                        text-sm
                        font-bold
                      ">

                        {load.status}

                      </div>

                    </div>

                    <div className="
                      flex
                      gap-3
                      flex-wrap
                    ">

                      <button
                        onClick={() =>
                          window.location.href =
                            `/company-applications/${load.id}`
                        }
                        className="
                          bg-yellow-400
                          text-black
                          px-5
                          py-3
                          rounded-2xl
                          font-black
                        "
                      >

                        Applicants

                      </button>

                      <button
                        onClick={() =>
                          deleteLoad(load.id)
                        }
                        className="
                          bg-red-500
                          text-white
                          px-5
                          py-3
                          rounded-2xl
                          font-black
                        "
                      >

                        Delete

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}