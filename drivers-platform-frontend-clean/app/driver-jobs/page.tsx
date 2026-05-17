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

export default function DriverJobsPage() {

  const { t } =
    useTranslation();

  const [jobs, setJobs] =
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

    if (userType !== "driver") {

      window.location.href =
        "/";

      return;
    }

    fetchJobs();

  }, []);

  // ============================================
  // FETCH JOBS
  // ============================================

  async function fetchJobs() {

    try {

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/jobs"
        );

      const data =
        await response.json();

      console.log(data);

      setJobs(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // APPLY
  // ============================================

  async function applyJob(
    jobId: number
  ) {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `https://drivers-platform-production.up.railway.app/apply-job/${jobId}`,
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

      console.log(data);

      if (data.error) {

        alert(data.error);

      } else {

        alert(
          t(
            "driver_jobs.application_sent"
          )
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        t(
          "driver_jobs.server_error"
        )
      );
    }
  }

  // ============================================
  // SAVE JOB
  // ============================================

  async function saveJob(
    jobId: number
  ) {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `https://drivers-platform-production.up.railway.app/save-job/${jobId}`,
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

      console.log(data);

      if (data.error) {

        alert(data.error);

      } else {

        alert(
          t(
            "driver_jobs.job_saved"
          )
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        t(
          "driver_jobs.server_error"
        )
      );
    }
  }

  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (

      <div className="flex">

        <Sidebar />

        <div className="flex-1 min-h-screen bg-black text-white flex items-center justify-center text-3xl">

          {
            t(
              "driver_jobs.loading"
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

    <div className="flex bg-black text-white min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENT */}

      <div className="flex-1 overflow-hidden">

        {/* BACKGROUND */}

        <div className="fixed inset-0">

          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[160px]" />

          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[160px]" />

        </div>

        <div className="relative z-10 p-10">

          {/* TOP */}

          <div className="flex items-center justify-between mb-8 flex-wrap gap-5">

            <BackToDashboard />

            <LanguageSwitcher />

          </div>

          {/* HEADER */}

          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10 mb-14">

            <div>

              <p className="uppercase tracking-[6px] text-yellow-400 mb-4">

                {
                  t(
                    "driver_jobs.control_center"
                  )
                }

              </p>

              <h1 className="text-7xl font-black leading-none">

                {
                  t(
                    "driver_jobs.title"
                  )
                }

              </h1>

              <p className="text-gray-400 text-2xl mt-6 max-w-3xl">

                {
                  t(
                    "driver_jobs.subtitle"
                  )
                }

              </p>

            </div>

            <img
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop"
              className="w-full xl:w-[500px] h-[300px] rounded-[40px] object-cover border border-white/10"
            />

          </div>

          {/* EMPTY */}

          {jobs.length === 0 && (

            <div className="bg-white/5 border border-white/10 rounded-[40px] p-16 text-center">

              <h2 className="text-4xl font-black mb-4">

                {
                  t(
                    "driver_jobs.no_jobs"
                  )
                }

              </h2>

              <p className="text-gray-400 text-xl">

                {
                  t(
                    "driver_jobs.no_jobs_subtitle"
                  )
                }

              </p>

            </div>

          )}

          {/* JOBS */}

          <div className="space-y-8">

            {jobs.map((job) => (

              <div
                key={job.id}
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

                <div className="flex flex-col xl:flex-row items-start justify-between gap-10">

                  <div>

                    <div className="flex items-center gap-4 mb-4">

                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />

                      <p className="uppercase tracking-[4px] text-yellow-400">

                        {
                          t(
                            "driver_jobs.active_opportunity"
                          )
                        }

                      </p>

                    </div>

                    <h2 className="text-5xl font-black">

                      {job.title}

                    </h2>

                    <p className="mt-5 text-xl text-gray-400 max-w-4xl">

                      {job.description}

                    </p>

                  </div>

                  <div className="bg-yellow-400 text-black px-8 py-5 rounded-3xl">

                    <p className="text-sm font-bold">

                      {
                        t(
                          "driver_jobs.salary"
                        )
                      }

                    </p>

                    <h2 className="text-4xl font-black">

                      €{job.salary}

                    </h2>

                  </div>

                </div>

                {/* INFO */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

                  <div className="bg-black/30 rounded-2xl p-5">

                    <p className="text-gray-400 mb-2">

                      {
                        t(
                          "driver_jobs.country"
                        )
                      }

                    </p>

                    <h3 className="text-2xl font-bold">

                      {job.country}

                    </h3>

                  </div>

                  <div className="bg-black/30 rounded-2xl p-5">

                    <p className="text-gray-400 mb-2">

                      {
                        t(
                          "driver_jobs.transport_type"
                        )
                      }

                    </p>

                    <h3 className="text-2xl font-bold">

                      {job.transport_type}

                    </h3>

                  </div>

                  <div className="bg-black/30 rounded-2xl p-5">

                    <p className="text-gray-400 mb-2">

                      {
                        t(
                          "driver_jobs.availability"
                        )
                      }

                    </p>

                    <h3 className="text-2xl font-bold text-green-400">

                      {
                        t(
                          "driver_jobs.open"
                        )
                      }

                    </h3>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="flex gap-5 mt-10 flex-wrap">

                  <button
                    onClick={() =>
                      applyJob(job.id)
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
                        "driver_jobs.apply"
                      )
                    }

                  </button>

                  <button
                    onClick={() =>
                      saveJob(job.id)
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
                        "driver_jobs.save"
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