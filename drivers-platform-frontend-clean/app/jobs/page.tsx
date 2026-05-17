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

  // ============================================
  // HYDRATION
  // ============================================

  const [mounted, setMounted] =
    useState(false);

  useEffect(() => {

    setMounted(true);

  }, []);

  // ============================================
  // STATES
  // ============================================

  const [jobs, setJobs] =
    useState<any[]>([]);

  const [appliedJobs, setAppliedJobs] =
    useState<number[]>([]);

  const [savedJobs, setSavedJobs] =
    useState<number[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [country, setCountry] =
    useState("");

  const [transportType, setTransportType] =
    useState("");

  const [salary, setSalary] =
    useState("");

  // ============================================
  // AUTH
  // ============================================

  useEffect(() => {

    if (!mounted) return;

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

    loadData();

  }, [mounted]);

  // ============================================
  // LOAD DATA
  // ============================================

  async function loadData() {

    setLoading(true);

    await Promise.all([

      fetchJobs(),

      fetchApplications(),

      fetchSavedJobs()

    ]);

    setLoading(false);
  }

  // ============================================
  // FETCH JOBS
  // ============================================

  async function fetchJobs() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/jobs",
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

        setJobs(data);

      } else {

        setJobs([]);
      }

    } catch (error) {

      console.log(error);

      setJobs([]);
    }
  }

  // ============================================
  // FETCH APPLICATIONS
  // ============================================

  async function fetchApplications() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/driver/applications",
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

        const ids =
          data.map(
            (app: any) =>
              Number(
                app.job_post_id
              )
          );

        setAppliedJobs(ids);

      } else {

        setAppliedJobs([]);
      }

    } catch (error) {

      console.log(error);

      setAppliedJobs([]);
    }
  }

  // ============================================
  // FETCH SAVED JOBS
  // ============================================

  async function fetchSavedJobs() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          "https://drivers-platform-production.up.railway.app/saved-jobs",
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

        const ids =
          data.map(
            (job: any) =>
              Number(job.job_id)
          );

        setSavedJobs(ids);

      } else {

        setSavedJobs([]);
      }

    } catch (error) {

      console.log(error);

      setSavedJobs([]);
    }
  }

  // ============================================
  // SEARCH JOBS
  // ============================================

  async function searchJobs() {

    setLoading(true);

    try {

      let url =
        "https://drivers-platform-production.up.railway.app/jobs/search?";

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

      if (
        data.error ===
        "JOB_ALREADY_SAVED"
      ) {

        return;
      }

      setSavedJobs(prev => [

        ...prev,
        Number(jobId)

      ]);

    } catch (error) {

      console.log(error);
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

      return;
    }

    try {

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

      if (
        data.error ===
        "ALREADY_APPLIED"
      ) {

        setAppliedJobs(prev => [

          ...prev,
          Number(jobId)

        ]);

        return;
      }

      if (
        data.error ===
        "FREE_PLAN_LIMIT_REACHED"
      ) {

        alert(
          t(
            "jobs.free_limit"
          )
        );

        return;
      }

      if (data.error) {

        alert(data.error);

        return;
      }

      setAppliedJobs(prev => [

        ...prev,
        Number(jobId)

      ]);

      alert(
        t(
          "jobs.application_success"
        )
      );

    } catch (error) {

      console.log(error);
    }
  }

  // ============================================
  // HYDRATION FIX
  // ============================================

  if (!mounted) {

    return null;
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
          text-3xl
        ">

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

    <div className="
      flex
      bg-black
      text-white
      min-h-screen
    ">

      <Sidebar />

      <div className="flex-1 overflow-hidden">

        <div className="fixed inset-0">

          <div className="
            absolute
            top-0
            left-0
            w-[600px]
            h-[600px]
            bg-yellow-500/10
            blur-[160px]
          " />

          <div className="
            absolute
            bottom-0
            right-0
            w-[600px]
            h-[600px]
            bg-orange-500/10
            blur-[160px]
          " />

        </div>

        <div className="relative z-10 p-10">

          {/* TOP */}

          <div className="
            flex
            items-center
            justify-between
            mb-10
            flex-wrap
            gap-5
          ">

            <BackToDashboard />

            <LanguageSwitcher />

          </div>

          {/* HEADER */}

          <div className="mb-14">

            <p className="
              uppercase
              tracking-[6px]
              text-yellow-400
              mb-4
            ">

              {
                t(
                  "jobs.marketplace"
                )
              }

            </p>

            <h1 className="
              text-7xl
              font-black
              leading-none
            ">

              {
                t(
                  "jobs.title"
                )
              }

            </h1>

          </div>

          {/* FILTERS */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-[40px]
            p-8
            mb-10
            backdrop-blur-2xl
          ">

            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-4
              gap-5
            ">

              <input
                type="text"
                placeholder={
                  t(
                    "jobs.country"
                  )
                }
                value={country}
                onChange={(e) =>
                  setCountry(
                    e.target.value
                  )
                }
                className="
                  bg-black/40
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                "
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
                className="
                  bg-black/40
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                "
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
                  setSalary(
                    e.target.value
                  )
                }
                className="
                  bg-black/40
                  border
                  border-white/10
                  rounded-2xl
                  px-5
                  py-4
                "
              />

              <button
                onClick={searchJobs}
                className="
                  bg-yellow-400
                  text-black
                  rounded-2xl
                  font-black
                  text-xl
                "
              >

                {
                  t(
                    "jobs.search"
                  )
                }

              </button>

            </div>

          </div>

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
                "
              >

                <div className="
                  flex
                  justify-between
                  gap-10
                  flex-wrap
                ">

                  <div>

                    <h2 className="
                      text-5xl
                      font-black
                    ">

                      {job.title}

                    </h2>

                    <p className="
                      text-gray-400
                      mt-5
                      text-xl
                    ">

                      {job.description}

                    </p>

                  </div>

                  <div className="
                    bg-yellow-400
                    text-black
                    px-8
                    py-5
                    rounded-3xl
                  ">

                    <h2 className="
                      text-4xl
                      font-black
                    ">

                      €{job.salary}

                    </h2>

                  </div>

                </div>

                {/* BUTTONS */}

                <div className="
                  mt-10
                  flex
                  items-center
                  gap-4
                  flex-wrap
                ">

                  {/* APPLY */}

                  <button
                    disabled={
                      appliedJobs.includes(
                        Number(job.id)
                      )
                    }
                    onClick={() =>
                      applyToJob(job.id)
                    }
                    className={`

                      px-8
                      py-4
                      rounded-2xl
                      font-black
                      text-xl
                      transition-all

                      ${
                        appliedJobs.includes(
                          Number(job.id)
                        )

                          ? "bg-green-500 text-white cursor-not-allowed"

                          : "bg-yellow-400 text-black hover:scale-105"
                      }
                    `}
                  >

                    {
                      appliedJobs.includes(
                        Number(job.id)
                      )

                        ? t("jobs.applied")

                        : t("jobs.apply")
                    }

                  </button>

                  {/* SAVE */}

                  <button
                    disabled={
                      savedJobs.includes(
                        Number(job.id)
                      )
                    }
                    onClick={() =>
                      saveJob(job.id)
                    }
                    className={`

                      px-8
                      py-4
                      rounded-2xl
                      font-black
                      text-xl
                      transition-all

                      ${
                        savedJobs.includes(
                          Number(job.id)
                        )

                          ? "bg-blue-500 text-white cursor-not-allowed"

                          : "bg-white/10 text-white hover:bg-white/20"
                      }
                    `}
                  >

                    {
                      savedJobs.includes(
                        Number(job.id)
                      )

                        ? "Saved"

                        : "Save Job"
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