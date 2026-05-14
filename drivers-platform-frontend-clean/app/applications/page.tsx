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

export default function DriverApplicationsPage() {

  const { t } =
    useTranslation();

  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ============================================
  // AUTH CHECK
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

    if (userType !== "driver") {

      window.location.href =
        "/";

      return;
    }

    fetchApplications();

  }, []);

  // ============================================
  // FETCH APPLICATIONS
  // ============================================

async function fetchApplications() {

  try {

    const token =
      localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (!token) {
      return;
    }

    const response = await fetch(
      "http://127.0.0.1:8000/driver/applications",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    console.log(data);

    setApplications(data);

  } catch (error) {

    console.log(error);
  }
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
              "applications.loading"
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

          <div className="flex items-center justify-between mb-10 flex-wrap gap-5">

            <BackToDashboard />

            <LanguageSwitcher />

          </div>

          {/* HEADER */}

          <div className="mb-14">

            <p className="uppercase tracking-[6px] text-yellow-400 mb-4">

              {
                t(
                  "applications.control_center"
                )
              }

            </p>

            <h1 className="text-7xl font-black leading-none">

              {
                t(
                  "applications.title"
                )
              }

            </h1>

            <p className="text-gray-400 text-2xl mt-6 max-w-3xl">

              {
                t(
                  "applications.subtitle"
                )
              }

            </p>

          </div>

          {/* EMPTY STATE */}

          {applications.length === 0 && (

            <div className="bg-white/5 border border-white/10 rounded-[40px] p-20 text-center backdrop-blur-2xl">

              <h2 className="text-5xl font-black mb-6">

                {
                  t(
                    "applications.empty_title"
                  )
                }

              </h2>

              <p className="text-gray-400 text-2xl mb-10">

                {
                  t(
                    "applications.empty_subtitle"
                  )
                }

              </p>

              <button
                onClick={() =>
                  window.location.href =
                    "/jobs"
                }
                className="
                  bg-yellow-400
                  text-black
                  px-10
                  py-5
                  rounded-2xl
                  font-black
                  text-xl
                  hover:scale-105
                  transition-all
                "
              >

                {
                  t(
                    "applications.browse_jobs"
                  )
                }

              </button>

            </div>

          )}

          {/* APPLICATIONS */}

          <div className="space-y-8">

            {applications.map((application) => (

              <div
                key={application.id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-[40px]
                  p-8
                  backdrop-blur-2xl
                  hover:border-yellow-400/20
                  transition-all
                "
              >

                <div className="flex items-start justify-between gap-10 flex-wrap">

                  {/* LEFT */}

                  <div className="flex-1">

                    <div className="flex items-center gap-4 mb-5">

                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />

                      <p className="uppercase tracking-[4px] text-yellow-400">

                        {
                          t(
                            "applications.active_application"
                          )
                        }

                      </p>

                    </div>

                    <h2 className="text-5xl font-black">

                      {application.job_title}

                    </h2>

                    <p className="text-gray-400 text-xl mt-5 max-w-3xl">

                      {application.company_name ||

                        t(
                          "applications.transport_company"
                        )}

                    </p>

                    <div className="flex gap-5 flex-wrap mt-8">

                      <div className="bg-white/10 px-5 py-3 rounded-2xl">

                        {
                          t(
                            "applications.status"
                          )
                        }

                        :
                        {" "}

                        <span className={`
                          font-bold
                          ${
                            application.status === "accepted"
                              ? "text-green-400"
                              : application.status === "rejected"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }
                        `}>

                          {application.status}

                        </span>

                      </div>

                      <div className="bg-white/10 px-5 py-3 rounded-2xl">

                        {
                          t(
                            "applications.application_id"
                          )
                        }

                        :
                        {" "}
                        #{application.id}

                      </div>

                    </div>

                  </div>

                  {/* RIGHT */}

                  <div className="bg-yellow-400 text-black px-8 py-5 rounded-3xl">

                    <p className="text-sm font-bold">

                      {
                        t(
                          "applications.application"
                        )
                      }

                    </p>

                    <h2 className="text-4xl font-black">

                      {
                        t(
                          "applications.active"
                        )
                      }

                    </h2>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex gap-5 mt-10 flex-wrap">

                  <button
                    onClick={() =>
                      window.location.href =
                        "/jobs"
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
                        "applications.browse_more_jobs"
                      )
                    }

                  </button>

                  <button
                    onClick={() =>
                      alert(
                        t(
                          "applications.messaging_soon"
                        )
                      )
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
                        "applications.contact_company"
                      )
                    }

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}