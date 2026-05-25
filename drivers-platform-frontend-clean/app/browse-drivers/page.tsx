"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import BackToDashboard from "../components/BackToDashboard";

import LanguageSwitcher from "../components/LanguageSwitcher";

import {
  useTranslation
} from "react-i18next";

export default function BrowseDriversPage() {

  const { t } =
    useTranslation();

  const [drivers, setDrivers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ============================================
  // AUTH
  // ============================================

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const userType =
      localStorage.getItem("user_type");

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

    fetchDrivers();

  }, []);

  // ============================================
  // FETCH DRIVERS
  // ============================================

  async function fetchDrivers() {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://drivers-platform-production.up.railway.app/drivers",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (Array.isArray(data)) {

        setDrivers(data);

      } else {

        setDrivers([]);
      }

    } catch (error) {

      console.log(error);

      setDrivers([]);

    } finally {

      setLoading(false);
    }
  }
  // ============================================
  // CONTACT DRIVER
  // ============================================

  function contactDriver(
    driver: any
  ) {

    if (driver.phone) {

      alert(
        `${t("browse_drivers.driver_phone")}: ${driver.phone}`
      );

    } else {

      alert(
        t(
          "browse_drivers.phone_not_available"
        )
      );
    }
  }

  // ============================================
  // VIEW PROFILE
  // ============================================

  function viewProfile(
    driverId: number
  ) {

    window.location.href =
      `/driver-profile/${driverId}`;
  }

  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (

      <div className="flex bg-black text-white">

        <Sidebar />

        <div className="flex-1 min-h-screen flex items-center justify-center text-3xl font-black">

          {
            t(
              "browse_drivers.loading"
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

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 min-h-screen overflow-hidden relative">

        {/* BACKGROUND */}

        <div className="fixed inset-0">

          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[180px]" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 p-10">

          {/* TOP BAR */}

          <div className="flex items-center justify-between flex-wrap gap-5 mb-10">

            <BackToDashboard />

            <LanguageSwitcher />

          </div>

          {/* HEADER */}

          <div className="mb-14">

            <p className="uppercase tracking-[6px] text-yellow-400 mb-4">

              {
                t(
                  "browse_drivers.recruitment_center"
                )
              }

            </p>

            <h1 className="text-7xl font-black leading-none">

              {
                t(
                  "browse_drivers.title"
                )
              }

            </h1>

            <p className="text-gray-400 text-2xl mt-6 max-w-3xl">

              {
                t(
                  "browse_drivers.subtitle"
                )
              }

            </p>

          </div>

          {/* EMPTY */}

          {drivers.length === 0 && (

            <div className="bg-white/5 border border-white/10 rounded-[40px] p-20 text-center backdrop-blur-2xl">

              <h2 className="text-5xl font-black mb-6">

                {
                  t(
                    "browse_drivers.no_drivers"
                  )
                }

              </h2>

              <p className="text-gray-400 text-2xl">

                {
                  t(
                    "browse_drivers.no_drivers_subtitle"
                  )
                }

              </p>

            </div>

          )}

          {/* DRIVERS */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {drivers.map((driver) => (

              <div
                key={driver.id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-[40px]
                  p-8
                  backdrop-blur-2xl
                  hover:border-yellow-400/30
                  transition-all
                "
              >

                {/* TOP */}

                <div className="flex items-center gap-5 mb-8 flex-wrap">

                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
                    className="
                      w-24
                      h-24
                      rounded-full
                      object-cover
                      border
                      border-white/10
                    "
                  />

                  <div>

                    <div className="flex items-center gap-4 mb-2">

                      <h2 className="text-4xl font-black">

                        {driver.full_name}

                      </h2>

                      <div className="bg-green-500/20 text-green-300 px-4 py-1 rounded-xl text-sm font-bold">

                        {
                          t(
                            "browse_drivers.active"
                          )
                        }

                      </div>

                    </div>

                    <p className="text-gray-400 text-xl">

                      {driver.city ||

                        t(
                          "browse_drivers.unknown_city"
                        )}

                    </p>

                  </div>

                </div>

                {/* STATS */}

                <div className="grid grid-cols-2 gap-4 mb-8">

                  <div className="bg-black/30 p-5 rounded-2xl">

                    <p className="text-gray-400 mb-2">

                      {
                        t(
                          "browse_drivers.experience"
                        )
                      }

                    </p>

                    <h3 className="text-3xl font-bold">

                      {driver.experience_years || 0}
                      {" "}
                      {
                        t(
                          "browse_drivers.years"
                        )
                      }

                    </h3>

                  </div>

                  <div className="bg-black/30 p-5 rounded-2xl">

                    <p className="text-gray-400 mb-2">

                      {
                        t(
                          "browse_drivers.license"
                        )
                      }

                    </p>

                    <h3 className="text-3xl font-bold">

                      {driver.license_category || "N/A"}

                    </h3>

                  </div>

                  <div className="bg-black/30 p-5 rounded-2xl">

                    <p className="text-gray-400 mb-2">

                      ADR

                    </p>

                    <h3 className="text-3xl font-bold">

                      {driver.adr_certificate ||

                        t(
                          "browse_drivers.no"
                        )}

                    </h3>

                  </div>

                  <div className="bg-black/30 p-5 rounded-2xl">

                    <p className="text-gray-400 mb-2">

                      {
                        t(
                          "browse_drivers.availability"
                        )
                      }

                    </p>

                    <h3 className="text-xl font-bold">

                      {driver.availability ||

                        t(
                          "browse_drivers.immediate"
                        )}

                    </h3>

                  </div>

                </div>

                {/* ABOUT */}

                <div className="bg-black/30 rounded-2xl p-5 mb-8">

                  <p className="text-gray-400 mb-3">

                    {
                      t(
                        "browse_drivers.about"
                      )
                    }

                  </p>

                  <p className="text-lg text-gray-300 leading-relaxed">

                    {driver.about ||

                      t(
                        "browse_drivers.no_description"
                      )}

                  </p>

                </div>

                {/* ACTIONS */}

                <div className="flex gap-5 flex-wrap">

                  <button
                    onClick={() =>
                      contactDriver(driver)
                    }
                    className="
                      bg-yellow-400
                      text-black
                      px-8
                      py-4
                      rounded-2xl
                      font-black
                      text-xl
                      hover:scale-105
                      transition-all
                    "
                  >

                    {
                      t(
                        "browse_drivers.contact_driver"
                      )
                    }

                  </button>

                  <button
                    onClick={() =>
                      viewProfile(driver.id)
                    }
                    className="
                      bg-white/10
                      px-8
                      py-4
                      rounded-2xl
                      font-black
                      text-xl
                      hover:bg-white/20
                      transition-all
                    "
                  >

                    {
                      t(
                        "browse_drivers.view_profile"
                      )
                    }

                  </button>

                </div>
{/* UPGRADE WALL */}

{
  drivers.length >= 3 &&

  localStorage.getItem(
    "subscription_plan"
  ) === "free" && (

    <div className="
      mt-12
      bg-yellow-400/10
      border
      border-yellow-400/20
      rounded-[40px]
      p-10
      text-center
      backdrop-blur-2xl
    ">

      <h2 className="
        text-5xl
        font-black
        mb-6
      ">

        Unlock All Drivers

      </h2>

      <p className="
        text-gray-400
        text-2xl
        mb-8
      ">

        Upgrade to Business
        and access unlimited
        professional drivers.

      </p>

      <button
        onClick={() =>
          window.location.href =
            "/subscription"
        }
        className="
          bg-yellow-400
          text-black
          px-10
          py-5
          rounded-2xl
          font-black
          text-2xl
          hover:scale-105
          transition-all
        "
      >

        Upgrade Business

      </button>

    </div>
  )
}
              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}