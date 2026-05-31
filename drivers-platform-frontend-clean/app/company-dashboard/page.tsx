"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import LanguageSwitcher
from "../components/LanguageSwitcher";

interface Load {
  id: number;
  pickup_city: string;
  delivery_city: string;
  price: number;
  status: string;
}

export default function CompanyDashboard() {

  const API_URL =
    "https://drivers-platform-production.up.railway.app";

  const [loading, setLoading] =
    useState(true);

  const [dashboard, setDashboard] =
    useState<any>(null);

  const [loads, setLoads] =
    useState<Load[]>([]);

  const [plan, setPlan] =
    useState("free");

  // =====================================================
  // AUTH
  // =====================================================

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

  // =====================================================
  // DASHBOARD
  // =====================================================

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
      if (!data.company_name) {

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

  // =====================================================
  // LOADS
  // =====================================================

  async function fetchLoads() {

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
  }

  // =====================================================
  // DELETE LOAD
  // =====================================================

  async function deleteLoad(
    loadId: number
  ) {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await fetch(

        `${API_URL}/load/${loadId}`,

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
  }

  // =====================================================
  // STRIPE
  // =====================================================

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
    }
  }

  async function cancelSubscription() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

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
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-3xl
      ">

        Loading...

      </div>
    );
  }

  return (

    <div className="
      flex
      bg-black
      text-white
      min-h-screen
    ">

      <Sidebar />

      <div className="
        flex-1
        relative
        overflow-hidden
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
            blur-[200px]
          " />

          <div className="
            absolute
            bottom-0
            right-0
            w-[600px]
            h-[600px]
            bg-orange-500/10
            blur-[180px]
          " />

        </div>

        <div className="
          relative
          z-10
          p-5 md:p-8 xl:p-5 md:p-8 xl:p-10
        ">

          {/* TOP BAR */}

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
            border-yellow-500/20
            rounded-[45px]
            p-5 md:p-8 xl:p-10
            backdrop-blur-2xl
            mb-10
            flex
            flex-col
            xl:flex-row
            items-center
            justify-between
            gap-10
          ">

            <div>

              <p className="
                text-yellow-400
                uppercase
                tracking-[5px]
                font-semibold
                mb-5
              ">

                COMPANY CONTROL CENTER

              </p>

              <h1 className="
                text-7xl
                font-black
                leading-none
                mb-6
              ">

                {
                  dashboard?.company_name
                }

              </h1>

              <p className="
                text-gray-400
                text-2xl
                max-w-2xl
              ">

                Manage transport operations,
                drivers and logistics across Europe.

              </p>

              <div className="
                flex
                gap-4
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

                {plan === "free" && (

                  <button
                    onClick={openCheckout}
                    className="
                      bg-yellow-400
                      text-black
                      px-7
                      py-3
                      rounded-2xl
                      font-black
                    "
                  >

                    Upgrade Business

                  </button>

                )}

                {plan === "business" && (

                  <button
                    onClick={cancelSubscription}
                    className="
                      bg-red-500/20
                      text-red-400
                      px-7
                      py-3
                      rounded-2xl
                      font-black
                    "
                  >

                    Cancel Subscription

                  </button>

                )}

              </div>

            </div>

            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200"
              className="
                w-full
                xl:w-full xl:w-[450px]
                h-[260px]
                object-cover
                rounded-[35px]
              "
            />

          </div>

          {/* STATS */}

          <div className="
            grid
            lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-4
            gap-6
            mb-10
          ">

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-4 md:p-8
            ">

              <p className="
                text-gray-500
                uppercase
                text-sm
              ">

                Active Loads

              </p>

              <h2 className="
                text-2xl md:text-4xl xl:text-5xl
                font-black
                mt-3
              ">

                {loads.length}

              </h2>

            </div>

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-4 md:p-8
            ">

              <p className="
                text-gray-500
                uppercase
                text-sm
              ">

                Drivers Visible

              </p>

              <h2 className="
                text-2xl md:text-4xl xl:text-5xl
                font-black
                mt-3
              ">

                {
                  plan === "business"

                  ? "∞"

                  : "3"
                }

              </h2>

            </div>

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-4 md:p-8
            ">

              <p className="
                text-gray-500
                uppercase
                text-sm
              ">

                Active Jobs

              </p>

              <h2 className="
                text-2xl md:text-4xl xl:text-5xl
                font-black
                mt-3
              ">

                {
                  plan === "business"

                  ? "∞"

                  : "1"
                }

              </h2>

            </div>

            <div className="
              bg-yellow-500/10
              border
              border-yellow-500/30
              rounded-3xl
              p-4 md:p-8
            ">

              <p className="
                text-yellow-400
                uppercase
                text-sm
              ">

                Current Plan

              </p>

              <h2 className="
                text-4xl
                font-black
                mt-3
              ">

                {
                  plan === "business"

                  ? "BUSINESS"

                  : "FREE"
                }

              </h2>

            </div>

          </div>

          {/* ACTIONS */}

          <div className="
            grid
            md:grid-cols-1 md:grid-cols-2
            xl:grid-cols-1 md:grid-cols-2 xl:grid-cols-4
            gap-6
            mb-14
          ">

            <a
              href="/post-load"
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-4 md:p-8
                hover:border-yellow-400/30
                transition
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
              ">

                Post Load

              </h2>

            </a>

            <a
              href="/browse-drivers"
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-4 md:p-8
                hover:border-yellow-400/30
                transition
              "
            >

              <p className="
                text-gray-500
                uppercase
                text-sm
                mb-4
              ">

                Drivers

              </p>

              <h2 className="
                text-3xl
                font-black
              ">

                Browse Drivers

              </h2>

            </a>

            <a
              href="/company-jobs"
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-4 md:p-8
                hover:border-yellow-400/30
                transition
              "
            >

              <p className="
                text-gray-500
                uppercase
                text-sm
                mb-4
              ">

                Recruitment

              </p>

              <h2 className="
                text-3xl
                font-black
              ">

                Company Jobs

              </h2>

            </a>

            <a
              href="/messages"
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-4 md:p-8
                hover:border-yellow-400/30
                transition
              "
            >

              <p className="
                text-gray-500
                uppercase
                text-sm
                mb-4
              ">

                Communication

              </p>

              <h2 className="
                text-3xl
                font-black
              ">

                Messages

              </h2>

            </a>

          </div>

          {/* LOADS */}

          <h2 className="
            text-2xl md:text-4xl xl:text-5xl
            font-black
            mb-8
          ">

            Active Loads

          </h2>

          <div className="space-y-5">

            {loads.map((load) => (

              <div
                key={load.id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-4 md:p-8
                "
              >

                <div className="
                  flex
                  flex-col
                  xl:flex-row
                  justify-between
                  items-start
                  xl:items-center
                  gap-6
                ">

                  <div>

                    <h3 className="
                      text-3xl
                      font-black
                      mb-3
                    ">

                      {
                        load.pickup_city
                      }

                      {" → "}

                      {
                        load.delivery_city
                      }

                    </h3>

                    <p className="
                      text-gray-400
                    ">

                      €{load.price}

                    </p>

                  </div>

                  <div className="
                    flex
                    gap-3
                    flex-wrap
                  ">

                    <button
                      onClick={() =>
                        window.location.href =
                        `/load-applications/${load.id}`
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
  );
}