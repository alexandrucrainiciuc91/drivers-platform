"use client";

import {
  useEffect,
  useState
} from "react";

export default function SuccessPage() {

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function updateUser() {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // ============================================
        // GET UPDATED USER
        // ============================================

        const response =
          await fetch(
            "https://drivers-platform-production.up.railway.app/me",
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
          "UPDATED USER:",
          data
        );

        // ============================================
        // UPDATE LOCALSTORAGE
        // ============================================

        localStorage.setItem(
          "subscription_plan",
          data.subscription_plan
        );

        // ============================================
        // REDIRECT
        // ============================================

        setTimeout(() => {

          if (
            data.role === "driver"
          ) {

            window.location.href =
              "/driver-dashboard";
          }

          if (
            data.role === "company"
          ) {

            window.location.href =
              "/company-dashboard";
          }

        }, 2500);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    updateUser();

  }, []);

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      px-6
      relative
      overflow-hidden
    ">

      {/* BG */}

      <div className="absolute inset-0">

        <div className="
          absolute
          top-0
          left-0
          w-full xl:w-[500px]
          h-[500px]
          bg-yellow-500/20
          blur-[160px]
        " />

        <div className="
          absolute
          bottom-0
          right-0
          w-full xl:w-[500px]
          h-[500px]
          bg-orange-500/20
          blur-[160px]
        " />

      </div>

      {/* CARD */}

      <div className="
        relative
        z-10
        bg-white/5
        border
        border-white/10
        backdrop-blur-2xl
        rounded-[40px]
        p-14
        text-center
        max-w-2xl
        w-full
      ">

        {/* ICON */}

        <div className="
          w-28
          h-28
          rounded-full
          bg-yellow-400
          text-black
          flex
          items-center
          justify-center
          text-2xl md:text-4xl xl:text-5xl
          font-black
          mx-auto
          mb-8
          shadow-[0_0_80px_rgba(250,204,21,0.5)]
        ">

          ✓

        </div>

        <h1 className="
          text-3xl md:text-5xl xl:text-6xl
          font-black
          mb-6
        ">

          Payment Successful

        </h1>

        <p className="
          text-gray-400
          text-2xl
          leading-relaxed
          mb-10
        ">

          Your premium subscription
          has been activated successfully.

        </p>

        <div className="
          inline-flex
          items-center
          gap-3
          bg-green-500/10
          border
          border-green-500/20
          rounded-full
          px-6
          py-3
        ">

          <div className="
            w-3
            h-3
            rounded-full
            bg-green-400
            animate-pulse
          " />

          <span className="
            text-green-300
            font-bold
            tracking-wide
          ">

            Redirecting to dashboard...

          </span>

        </div>

      </div>

    </div>
  );
}