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

export default function JobsPage() {

  const { t } =
    useTranslation();

  const [jobs, setJobs] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [country, setCountry] =
    useState("");

  const [transportType, setTransportType] =
    useState("");

  const [salary, setSalary] =
    useState("");

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

    fetchJobs();

  }, []);

  // ============================================
  // FETCH JOBS
  // ============================================

  async function fetchJobs() {

    try {

      const token =
  localStorage.getItem("token");

const response = await fetch(
  "http://127.0.0.1:8000/jobs",
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
);

    const data = await response.json();

if (Array.isArray(data)) {

  setJobs(data);

} else {

  setJobs([]);
}

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // SEARCH JOBS
  // ============================================

  async function searchJobs() {

    setLoading(true);

    try {

      let url =
        "http://127.0.0.1:8000/jobs/search?";

      if (country) {

        url +=
          `country=${country}&`;
      }

      if (transportType) {

        url +=
          `transport_type=${transportType}&`;
      }

      if (salary) {

        url +=
          `min_salary=${salary}`;
      }

      const response =
        await fetch(url);

      const data =
        await response.json();

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

  async function applyToJob(
    jobId: number
  ) {

    const token =
      localStorage.getItem("token");

    if (!token) {

      alert(
        t(
          "jobs.login_required"
        )
      );

      return;
    }

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/apply-job/${jobId}`,
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
            "jobs.application_success"
          )
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        t(
          "jobs.server_error"
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
              "jobs.loading"
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

        {/* BG */}

        <div className="fixed inset-0">

          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-500/10 blur-[160px]" />

          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 blur-[160px]" />

        </div>

        <div className="relative z-10 p-10">

          {/* TOP BAR */}

          <div className="flex items-center justify-between mb-10 flex-wrap gap-5">

            <BackToDashboard />

            <LanguageSwitcher />

          </div>

          {/* HEADER */}

          <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10 mb-14">

            <div>

              <p className="uppercase tracking-[6px] text-yellow-400 mb-4">

                {
                  t(
                    "jobs.marketplace"
                  )
                }

              </p>

              <h1 className="text-7xl font-black leading-none">

                {
                  t(
                    "jobs.title"
                  )
                }

              </h1>

              <p className="text-gray-400 text-2xl mt-6 max-w-3xl">

                {
                  t(
                    "jobs.subtitle"
                  )
                }

              </p>

            </div>

            <img
              src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop"
              className="w-full xl:w-[500px] h-[280px] object-cover rounded-[40px] border border-white/10"
            />

          </div>

          {/* FILTERS */}

          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 mb-10 backdrop-blur-2xl">

            <h2 className="text-3xl font-black mb-8">

              {
                t(
                  "jobs.filters"
                )
              }

            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

              <input
                type="text"
                placeholder={
                  t(
                    "jobs.country"
                  )
                }
                value={country}
                onChange={(e) =>
                  setCountry(e.target.value)
                }
                className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                placeholder={
                  t(
                    "jobs.transport_type"
                  )
                }
                value={transportType}
                onChange={(e) =>
                  setTransportType(
                    e.target.value
                  )
                }
                className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
              />

              <input
                type="number"
                placeholder={
                  t(
                    "jobs.minimum_salary"
                  )
                }
                value={salary}
                onChange={(e) =>
                  setSalary(e.target.value)
                }
                className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
              />

              <button
                onClick={searchJobs}
                className="bg-yellow-400 text-black rounded-2xl font-black text-xl hover:scale-105 transition-all"
              >

                {
                  t(
                    "jobs.search"
                  )
                }

              </button>

            </div>

          </div>

          {/* EMPTY */}

          {jobs.length === 0 && (

            <div className="bg-white/5 border border-white/10 rounded-[40px] p-16 text-center">

              <h2 className="text-4xl font-black mb-4">

                {
                  t(
                    "jobs.no_jobs"
                  )
                }

              </h2>

              <p className="text-gray-400 text-xl">

                {
                  t(
                    "jobs.no_jobs_subtitle"
                  )
                }

              </p>

            </div>

          )}

          {/* JOBS */}

          <div className="space-y-8">

           {Array.isArray(jobs) &&
  jobs.map((job) => (

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
                            "jobs.active_job"
                          )
                        }

                      </p>

                    </div>

                    <h2 className="text-5xl font-black">

                      {job.title}

                    </h2>

                    <p className="text-gray-400 mt-5 text-xl max-w-4xl">

                      {job.description}

                    </p>

                  </div>

                  <div className="bg-yellow-400 text-black px-8 py-5 rounded-3xl">

                    <p className="text-sm font-bold">

                      {
                        t(
                          "jobs.salary"
                        )
                      }

                    </p>

                    <h2 className="text-4xl font-black">

                      €{job.salary}

                    </h2>

                  </div>

                </div>

                {/* INFO */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">

                  <div className="bg-black/30 rounded-2xl p-5">

                    <p className="text-gray-400 mb-2">

                      {
                        t(
                          "jobs.country"
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
                          "jobs.transport_type"
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
                          "jobs.status"
                        )
                      }

                    </p>

                    <h3 className="text-2xl font-bold text-green-400">

                      {
                        t(
                          "jobs.available"
                        )
                      }

                    </h3>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="flex gap-5 mt-10 flex-wrap">

                  <button
                    onClick={() =>
                      applyToJob(job.id)
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
                        "jobs.apply"
                      )
                    }

                  </button>

                  <button
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
                        "jobs.save"
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