"use client";

import {
  useEffect,
  useState
} from "react";

import {
  useRouter
} from "next/navigation";

export default function Navbar() {

  const router =
    useRouter();

  const [role, setRole] =
    useState("");

  const [subscriptionPlan,
    setSubscriptionPlan] =
    useState("");

  // ============================================
  // GET USER
  // ============================================

  useEffect(() => {

    async function getUser() {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) return;

        const response = await fetch(
          "https://drivers-platform-production.up.railway.app/me",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        const data =
          await response.json();

        console.log(data);

        setRole(data.role);

        setSubscriptionPlan(
          data.subscription_plan
        );

      } catch (error) {

        console.log(error);
      }
    }

    getUser();

  }, []);

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

    router.push("/");
  }

  // ============================================
  // UPGRADE
  // ============================================

  function upgradePlan() {

    router.push(
      "/upgrade-plan"
    );
  }

  // ============================================
  // UI
  // ============================================

  return (

    <div
      className="
        w-full
        h-[90px]
        bg-white/5
        border-b
        border-white/10
        backdrop-blur-2xl
        flex
        items-center
        justify-between
        px-10
      "
    >

      {/* LEFT */}

      <div>

        <h1
          className="
            text-3xl
            font-black
            text-white
          "
        >

          DRIVER PLATFORM

        </h1>

        <p className="text-gray-400 text-sm mt-1">

          Logistics Management System

        </p>

      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          items-center
          gap-5
        "
      >

        {/* ROLE */}

        <div
          className="
            bg-white/5
            border
            border-white/10
            px-5
            py-3
            rounded-2xl
          "
        >

          <p className="text-gray-400 text-sm">

            Account

          </p>

          <p className="font-black text-white">

            {
              role === "company"
                ? "Company"
                : "Driver"
            }

          </p>

        </div>

        {/* PLAN */}

        <div
          className="
            bg-yellow-400
            text-black
            px-5
            py-3
            rounded-2xl
            font-black
          "
        >

          {
            subscriptionPlan
              ?.toUpperCase()
          }

        </div>

        {/* UPGRADE */}

        {subscriptionPlan ===
          "free" && (

          <button
            onClick={upgradePlan}
            className="
              bg-white/10
              border
              border-white/10
              text-white
              px-6
              py-3
              rounded-2xl
              font-black
              hover:bg-yellow-400
              hover:text-black
              transition-all
            "
          >

            Upgrade

          </button>

        )}

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="
            bg-red-500
            text-white
            px-6
            py-3
            rounded-2xl
            font-black
            hover:scale-105
            transition-all
          "
        >

          Logout

        </button>

      </div>

    </div>
  );
}