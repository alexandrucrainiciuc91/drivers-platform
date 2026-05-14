"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation }
from "react-i18next";
import "../i18n";
import LanguageSwitcher
from "./LanguageSwitcher";
export default function Sidebar() {

  const [userType, setUserType] =
    useState("");
const { t } = useTranslation();
  useEffect(() => {

    const storedUserType =
      localStorage.getItem("user_type");

    if (storedUserType) {

      setUserType(storedUserType);
    }

  }, []);

  function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user_type");

    localStorage.removeItem("subscription_plan");

    window.location.href = "/login";
  }

  return (

    <div className="w-[320px] min-h-screen bg-black border-r border-white/10 p-8 flex flex-col justify-between relative z-50">

      {/* TOP */}

      <div>

        <h1 className="text-5xl font-black text-yellow-400 mb-14">

          {userType === "company"
            ? "COMPANY HUB"
            : "DRIVER HUB"}
        </h1>

  <LanguageSwitcher />
        <div className="flex flex-col gap-6">
          {/* COMPANY */}

          {userType === "company" && (

            <>

              <Link
                href="/company-dashboard"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
                {t("Dashboard")}
              </Link>

              <Link
                href="/company-jobs"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
                Jobs
              </Link>

              <Link
                href="/company-applications"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
                Applications
              </Link>

              <Link
                href="/browse-drivers"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
                Drivers
              </Link>

            </>

          )}

          {/* DRIVER */}

          {userType === "driver" && (

            <>

              <Link
                href="/driver-dashboard"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
               {t("Dashboard")}
              </Link>

              <Link
                href="/jobs"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
                Find Jobs
              </Link>

              <Link
                href="/saved-jobs"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
                Saved Jobs
              </Link>

              <Link
                href="/applications"
                className="block bg-white/5 hover:bg-yellow-400 hover:text-black transition-all border border-white/10 rounded-[28px] p-8 text-3xl font-bold"
              >
                Applications
              </Link>

            </>

          )}

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 transition-all text-white text-3xl font-black rounded-[28px] p-8 mt-10"
      >

        Logout

      </button>

    </div>
  );
}