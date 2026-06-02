"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import LanguageSwitcher from "../components/LanguageSwitcher";

import {
  Crown,
  Check,
  Zap
} from "lucide-react";

export default function UpgradePlanPage() {

  const [role, setRole] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const userRole =
      localStorage.getItem(
        "user_type"
      );

    if (userRole) {

      setRole(userRole);
    }

  }, []);

  async function subscribe(
    priceId: string
  ) {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

     const response = await fetch(
  "https://drivelinkeed.com/subscribe",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      price_id: "price_1TVGXaEKIOywtjGZSQvQxhOF"
    }),
  }
);

const data = await response.json();

window.location.href = data.checkout_url;

    } catch (error) {

      console.log(error);

      alert("Stripe error");

    } finally {

      setLoading(false);
    }
  }

  return (

    <div className="flex bg-black text-white">

      <Sidebar />

      <div className="flex-1 min-h-screen relative overflow-hidden">

        {/* BG */}

        <div className="fixed inset-0">

          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-yellow-500/20 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-500/20 blur-[180px]" />

        </div>

        <div className="relative z-10 p-5 md:p-8 xl:p-10">

          <div className="flex justify-end mb-8">

            <LanguageSwitcher />

          </div>

          {/* HEADER */}

          <div className="text-center mb-20">

            <div className="
              inline-flex
              items-center
              gap-3
              bg-yellow-500/10
              border
              border-yellow-400/30
              px-6
              py-3
              rounded-full
              mb-8
            ">

              <Crown
                className="text-yellow-400"
              />

              <span className="uppercase tracking-[4px] text-yellow-300 font-bold">

                Ultra Premium

              </span>

            </div>

            <h1 className="text-4xl md:text-6xl xl:text-7xl font-black mb-8">

              UPGRADE
              {" "}
              <span className="text-yellow-400">

                YOUR PLAN

              </span>

            </h1>

            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">

              Unlock unlimited transport opportunities,
              premium visibility and advanced recruitment tools.

            </p>

          </div>

          {/* CARDS */}

          <div className="max-w-6xl mx-auto grid xl:grid-cols-1 md:grid-cols-2 gap-10">

            {/* DRIVER */}

            {role === "driver" && (

              <div className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-yellow-400/30
                bg-white/5
                backdrop-blur-3xl
                p-5 md:p-8 xl:p-10
                shadow-[0_0_80px_rgba(250,204,21,0.15)]
                hover:scale-[1.02]
                transition-all
              ">

                {/* BADGE */}

                <div className="
                  absolute
                  top-6
                  right-6
                  bg-yellow-400
                  text-black
                  px-5
                  py-2
                  rounded-full
                  font-black
                ">

                  MOST POPULAR

                </div>

                <div className="mb-10">

                  <h2 className="text-2xl md:text-4xl xl:text-5xl font-black mb-4">

                    PRO DRIVER

                  </h2>

                  <div className="flex items-end gap-2">

                    <span className="text-4xl md:text-6xl xl:text-7xl font-black text-yellow-400">

                      €5

                    </span>

                    <span className="text-2xl text-gray-400 mb-2">

                      /month

                    </span>

                  </div>

                </div>

                <div className="space-y-5 mb-12">

                  {[
                    "Unlimited job applications",
                    "View unlimited transport jobs",
                    "Premium driver visibility",
                    "Priority company access",
                    "Featured profile badge",
                    "Direct recruiter messaging"
                  ].map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-4"
                    >

                      <Check
                        className="text-yellow-400"
                      />

                      <span className="text-xl">

                        {feature}

                      </span>

                    </div>

                  ))}

                </div>

                <button
                  onClick={() =>
                    subscribe(
                      "price_1TVGXaEKIOywtjGZSQvQxhOF"
                    )
                  }
                  disabled={loading}
                  className="
                    w-full
                    bg-yellow-400
                    text-black
                    py-5
                    rounded-2xl
                    font-black
                    text-2xl
                    hover:scale-105
                    transition-all
                    shadow-[0_0_60px_rgba(250,204,21,0.4)]
                  "
                >

                  {loading
                    ? "Loading..."
                    : "Upgrade To PRO"}

                </button>

              </div>

            )}

            {/* COMPANY */}

            {role === "company" && (

              <div className="
                relative
                overflow-hidden
                rounded-[40px]
                border
                border-yellow-400/30
                bg-white/5
                backdrop-blur-3xl
                p-5 md:p-8 xl:p-10
                shadow-[0_0_80px_rgba(250,204,21,0.15)]
                hover:scale-[1.02]
                transition-all
              ">

                <div className="
                  absolute
                  top-6
                  right-6
                  bg-yellow-400
                  text-black
                  px-5
                  py-2
                  rounded-full
                  font-black
                ">

                  BUSINESS ELITE

                </div>

                <div className="mb-10">

                  <h2 className="text-2xl md:text-4xl xl:text-5xl font-black mb-4">

                    BUSINESS COMPANY

                  </h2>

                  <div className="flex items-end gap-2">

                    <span className="text-4xl md:text-6xl xl:text-7xl font-black text-yellow-400">

                      €45

                    </span>

                    <span className="text-2xl text-gray-400 mb-2">

                      /month

                    </span>

                  </div>

                </div>

                <div className="space-y-5 mb-12">

                  {[
                    "Unlimited job posting",
                    "Unlimited driver browsing",
                    "Premium company badge",
                    "Priority driver exposure",
                    "Advanced hiring analytics",
                    "Unlimited applications"
                  ].map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-4"
                    >

                      <Zap
                        className="text-yellow-400"
                      />

                      <span className="text-xl">

                        {feature}

                      </span>

                    </div>

                  ))}

                </div>

                <button
                  onClick={() =>
                    subscribe(
                      "price_1TWXnjEKIOywtjGZrBPeI3ek"
                    )
                  }
                  disabled={loading}
                  className="
                    w-full
                    bg-yellow-400
                    text-black
                    py-5
                    rounded-2xl
                    font-black
                    text-2xl
                    hover:scale-105
                    transition-all
                    shadow-[0_0_60px_rgba(250,204,21,0.4)]
                  "
                >

                  {loading
                    ? "Loading..."
                    : "Upgrade Business"}

                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}