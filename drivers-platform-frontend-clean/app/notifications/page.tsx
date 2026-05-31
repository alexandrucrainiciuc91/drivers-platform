"use client";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

export default function NotificationsPage() {

  const [notifications, setNotifications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ============================================
  // FETCH NOTIFICATIONS
  // ============================================

  useEffect(() => {

    fetchNotifications();

  }, []);

  async function fetchNotifications() {

    try {

      const token =
        localStorage.getItem("token");

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

        setNotifications(data);

      } else {

        setNotifications([]);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // MARK AS READ
  // ============================================

  async function markAsRead(
    notificationId: number
  ) {

    try {

      const token =
        localStorage.getItem("token");

      await fetch(
        `https://drivers-platform-production.up.railway.app/notifications/${notificationId}/read`,
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
window.location.reload();
      setNotifications(prev =>

        prev.map(notification =>

          notification.id === notificationId

            ? {
                ...notification,
                is_read: true
              }

            : notification
        )
      );

    } catch (error) {

      console.log(error);
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
          text-4xl
          font-black
        ">

          Loading...

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
      min-h-screen
    ">

      <Sidebar />

      <div className="
        flex-1
        p-5 md:p-8 xl:p-10
      ">

        <h1 className="
          text-3xl md:text-5xl xl:text-6xl
          font-black
          mb-10
        ">

          Notifications

        </h1>

        {notifications.length === 0 && (

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[30px]
            p-5 md:p-8 xl:p-10
            text-2xl
          ">

            No notifications yet.

          </div>

        )}

        <div className="space-y-6">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className={`
                border
                rounded-[30px]
                p-4 md:p-8
                transition-all

                ${
                  notification.is_read

                    ? "bg-white/5 border-white/10"

                    : "bg-yellow-400/10 border-yellow-400"
                }
              `}
            >

              <div className="
                flex
                justify-between
                items-start
                gap-6
                flex-wrap
              ">

                <div>

                  <h2 className="
                    text-3xl
                    font-black
                    mb-3
                  ">

                    {notification.title}

                  </h2>

                  <p className="
                    text-xl
                    text-gray-300
                  ">

                    {notification.message}

                  </p>

                </div>

                {!notification.is_read && (

                  <button
                    onClick={() =>
                      markAsRead(
                        notification.id
                      )
                    }
                    className="
                      bg-yellow-400
                      text-black
                      px-6
                      py-3
                      rounded-2xl
                      font-black
                    "
                  >

                    Mark Read

                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}