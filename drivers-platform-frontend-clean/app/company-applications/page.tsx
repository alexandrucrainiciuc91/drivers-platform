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

export default function CompanyApplicationsPage() {

  const { t } =
    useTranslation();

  const [applications, setApplications] =
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

    fetchApplications();

  }, []);

  // ============================================
  // FETCH APPLICATIONS
  // ============================================

  async function fetchApplications() {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://drivers-platform-production.up.railway.app/company/applications",
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

        setApplications(data);

      } else {

        setApplications([]);
      }

    } catch (error) {

      console.log(error);

      setApplications([]);

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // UPDATE STATUS
  // ============================================

  async function updateStatus(
    applicationId: number,
    status: string
  ) {

    try {

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `https://drivers-platform-production.up.railway.app/application/${applicationId}/status?status=${status}`,
        {
          method: "PUT",

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const data =
        await response.json();

      console.log(data);

      // ============================================
      // LIVE UPDATE UI
      // ============================================

      setApplications(prev =>
        prev.map(app =>

          app.application_id ===
          applicationId

            ? {
                ...app,
                status: status
              }

            : app
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

      <div className="flex bg-black text-white">

        <Sidebar />

        <div className="flex-1 min-h-screen flex items-center justify-center text-4xl font-black">

          {
            t(
              "company_applications.loading"
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

          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-500/10 blur-[180px]" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 p-5 md:p-4 md:p-8 xl:p-10">

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
                  "company_applications.recruitment_center"
                )
              }

            </p>

            <h1 className="text-7xl font-black leading-none">

              {
                t(
                  "company_applications.title"
                )
              }

            </h1>

            <p className="text-gray-400 text-2xl mt-6">

              {
                t(
                  "company_applications.subtitle"
                )
              }

            </p>

          </div>

          {/* EMPTY */}

          {applications.length === 0 && (

            <div className="bg-white/5 border border-white/10 rounded-[40px] p-20 text-center backdrop-blur-2xl">

              <h2 className="text-2xl md:text-4xl xl:text-5xl font-black mb-6">

                {
                  t(
                    "company_applications.no_applications"
                  )
                }

              </h2>

              <p className="text-gray-400 text-2xl">

                {
                  t(
                    "company_applications.no_applications_subtitle"
                  )
                }

              </p>

            </div>

          )}

          {/* APPLICATIONS */}

          <div className="space-y-8">

            {applications.map((application) => (

              <div
                key={application.application_id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-[40px]
                  p-4 md:p-8
                  backdrop-blur-2xl
                  hover:border-yellow-400/20
                  transition-all
                "
              >

                <div className="flex items-center justify-between gap-10 flex-wrap">

                  {/* LEFT */}

                  <div className="flex-1">

                    <div className="flex items-center gap-4 mb-5">

                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />

                      <p className="uppercase tracking-[4px] text-yellow-400">

                        {
                          t(
                            "company_applications.driver_candidate"
                          )
                        }

                      </p>

                    </div>

                    <h2 className="text-2xl md:text-4xl xl:text-5xl font-black mb-5">

                      {application.driver_name}

                    </h2>

                    <div className="space-y-3 text-xl text-gray-300">

                      <p>

                        {
                          t(
                            "company_applications.applied_for"
                          )
                        }
                        :
                        {" "}

                        <span className="text-yellow-400">

                          {application.job_title}

                        </span>

                      </p>

                      <p>

                        {
                          t(
                            "company_applications.experience"
                          )
                        }
                        :
                        {" "}

                        {application.experience}
                        {" "}

                        {
                          t(
                            "company_applications.years"
                          )
                        }

                      </p>

                      <p>

                        {
                          t(
                            "company_applications.license"
                          )
                        }
                        :
                        {" "}

                        {application.license}

                      </p>

                    </div>

                    {/* STATUS */}

                    <div className="mt-8 flex gap-6 flex-wrap">

                      <div className="bg-white/10 px-5 py-3 rounded-2xl">

                        {
                          t(
                            "company_applications.status"
                          )
                        }
                        :
                        {" "}

                        <span
                          className={`
                            font-bold
                            ${
                              application.status === "accepted"
                                ? "text-green-400"
                                : application.status === "rejected"
                                ? "text-red-400"
                                : "text-yellow-400"
                            }
                          `}
                        >

                          {application.status}

                        </span>

                      </div>

                      <div className="bg-white/10 px-5 py-3 rounded-2xl">

                        {
                          t(
                            "company_applications.application_id"
                          )
                        }
                        :
                        {" "}
                        #

                        {application.application_id}

                      </div>

                    </div>

                  </div>

                  {/* IMAGE */}

                  <img
                    src={
                        profile_photo ||
                        "/placeholder.png"
                    }
                    className="
                      w-36
                      h-36
                      rounded-full
                      object-cover
                      border-4
                      border-white/10
                    "
                  />

                </div>

                {/* ACTIONS */}

                {
                  application.status === "pending" && (

                    <div className="flex gap-5 mt-10 flex-wrap">

                      <button
                        onClick={() =>
                          updateStatus(
                            application.application_id,
                            "accepted"
                          )
                        }
                        className="
                          bg-green-500
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
                            "company_applications.accept_driver"
                          )
                        }

                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            application.application_id,
                            "rejected"
                          )
                        }
                        className="
                          bg-red-500
                          text-white
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
                            "company_applications.reject"
                          )
                        }

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