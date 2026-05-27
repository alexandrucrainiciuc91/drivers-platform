"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import LanguageSwitcher from "../components/LanguageSwitcher";

export default function CompanyDashboard() {

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
            w-[700px]
            h-[700px]
            bg-yellow-500/10
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
            bg-white/5
            border
            border-white/10
            rounded-[50px]
            p-10
            backdrop-blur-2xl
            mb-10
          ">

            <h1 className="
              text-7xl
              font-black
            ">

              {
                dashboard?.company_name
              }

            </h1>

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
                    px-6
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
                    px-6
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

          <div className="
            grid
            lg:grid-cols-3
            gap-6
            mb-10
          ">

            <a
              href="/post-load"
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-8
              "
            >

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
                p-8
              "
            >

              <h2 className="
                text-3xl
                font-black
              ">

                Browse Drivers

              </h2>

            </a>

          </div>

          <div className="space-y-5">

            {loads.map((load: any) => (

              <div
                key={load.id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                  flex-wrap
                  gap-5
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

                  </div>

                  <div className="
                    flex
                    gap-3
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