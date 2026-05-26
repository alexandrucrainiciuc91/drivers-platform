"use client";

import Link from "next/link";

import {
  useEffect,
  useState
} from "react";

import {
  useTranslation
} from "react-i18next";

import "../i18n";

import LanguageSwitcher
from "./LanguageSwitcher";

export default function Sidebar() {

  const {
    t
  } = useTranslation();

  const [userType, setUserType] =
    useState("");

  const [messagesCount, setMessagesCount] =
    useState(0);

  const [notificationsCount, setNotificationsCount] =
    useState(0);

  // ============================================
  // LOAD USER
  // ============================================

  useEffect(() => {

    const storedUserType =
      localStorage.getItem("user_type");

    if (storedUserType) {

      setUserType(
        storedUserType
      );
    }

  }, []);

  // ============================================
  // FETCH COUNTS
  // ============================================

  useEffect(() => {

    fetchNotificationsCount();

    fetchMessagesCount();

    const interval =
      setInterval(() => {

        fetchNotificationsCount();

        fetchMessagesCount();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  // ============================================
  // NOTIFICATIONS
  // ============================================

  async function fetchNotificationsCount() {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) return;

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/notifications",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      if (Array.isArray(data)) {

        const unread =
          data.filter(
            (n: any) =>
              !n.is_read
          ).length;

        setNotificationsCount(
          unread
        );
      }

    } catch (error) {

      console.log(error);
    }
  }


  // ============================================
// MESSAGES
// ============================================

async function fetchMessagesCount() {

  try {

    const token =
      localStorage.getItem("token");

    if (!token) return;

    const response =
      await fetch(

        "https://drivers-platform-production.up.railway.app/notifications",

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    const data =
      await response.json();

    if (Array.isArray(data)) {

      const unreadMessages =
        data.filter(

          (notification: any) =>

            notification.title ===
            "New Message"

            &&

            notification.is_read === false
        );

      setMessagesCount(
        unreadMessages.length
      );
    }

  } catch (error) {

    console.log(error);
  }
}

  // ============================================
  // LOGOUT
  // ============================================

  function logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user_type");

    localStorage.removeItem("subscription_plan");

    localStorage.removeItem("user_id");

    window.location.href =
      "/login";
  }

  // ============================================
  // UI
  // ============================================

  return (

    <div className="
      w-[320px]
      min-h-screen
      bg-black
      border-r
      border-white/10
      p-8
      flex
      flex-col
      justify-between
      relative
      z-50
    ">

      <div>

        <h1 className="
          text-5xl
          font-black
          text-yellow-400
          mb-14
        ">

          {
            userType === "company"

              ? "COMPANY HUB"

              : "DRIVER HUB"
          }

        </h1>

        <LanguageSwitcher />

        <div className="flex flex-col gap-6 mt-8">

          {/* COMPANY */}

          {userType === "company" && (

            <>

              <Link
                href="/company-dashboard"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                Dashboard

              </Link>

              <Link
                href="/company-jobs"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                Jobs

              </Link>

              <Link
                href="/company-applications"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                Applications

              </Link>

              <Link
                href="/browse-drivers"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                Drivers

              </Link>

              {/* MESSAGES */}

              <Link
                href="/conversations"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <span>
                    Messages
                  </span>

                  {messagesCount > 0 && (

                    <div className="
                      bg-red-500
                      text-white
                      min-w-[28px]
                      h-7
                      px-2
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-black
                    ">

                      {messagesCount}

                    </div>

                  )}

                </div>

              </Link>

              {/* NOTIFICATIONS */}

              <Link
                href="/notifications"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <span>
                    Notifications
                  </span>

                  {notificationsCount > 0 && (

                    <div className="
                      bg-red-500
                      text-white
                      min-w-[32px]
                      h-8
                      px-2
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-black
                    ">

                      {notificationsCount}

                    </div>

                  )}

                </div>

              </Link>

            </>

          )}

          {/* DRIVER */}

          {userType === "driver" && (

            <>

              <Link
                href="/driver-dashboard"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                Dashboard

              </Link>

              <Link
                href="/jobs"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                Find Jobs

              </Link>

              <Link
                href="/applications"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                Applications

              </Link>

              {/* MESSAGES */}

              <Link
                href="/conversations"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <span>
                    Messages
                  </span>

                  {messagesCount > 0 && (

                    <div className="
                      bg-red-500
                      text-white
                      min-w-[28px]
                      h-7
                      px-2
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-black
                    ">

                      {messagesCount}

                    </div>

                  )}

                </div>

              </Link>

              {/* NOTIFICATIONS */}

              <Link
                href="/notifications"
                className="
                  block bg-white/5
                  hover:bg-yellow-400
                  hover:text-black
                  transition-all
                  border border-white/10
                  rounded-[28px]
                  p-8 text-3xl font-bold
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <span>
                    Notifications
                  </span>

                  {notificationsCount > 0 && (

                    <div className="
                      bg-red-500
                      text-white
                      min-w-[32px]
                      h-8
                      px-2
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-sm
                      font-black
                    ">

                      {notificationsCount}

                    </div>

                  )}

                </div>

              </Link>

            </>

          )}

        </div>

      </div>

      {/* LOGOUT */}

      <button
        onClick={logout}
        className="
          bg-red-500
          hover:bg-red-600
          transition-all
          text-white
          text-3xl
          font-black
          rounded-[28px]
          p-8
          mt-10
        "
      >

        Logout

      </button>

    </div>
  );
}