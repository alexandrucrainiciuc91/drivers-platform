"use client";

import "../i18n";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import {
  useTranslation
} from "react-i18next";

export default function ApplicationsPage() {

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

      console.log(
        "APPLICATIONS:",
        data
      );

      if (Array.isArray(data)) {

        setApplications(data);

      } else {

        setApplications([]);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
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

          Loading Applications...

        </div>

      </div>
    );
  }

  // ============================================
  // UI
  // ============================================

  return (

    <div className="flex bg-black text-white min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl md:text-5xl xl:text-6xl font-black mb-10">

          Applications

        </h1>

        {applications.length === 0 && (

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-10">

            <h2 className="text-3xl font-bold">

              No applications found

            </h2>

          </div>

        )}

        <div className="space-y-6">

          {applications.map((application) => (

            <div
              key={application.id}
              className="bg-white/5 border border-white/10 rounded-[30px] p-8"
            >

              <h2 className="text-4xl font-black mb-4">

                {application.job_title}

              </h2>

              <p className="text-gray-400 text-xl mb-4">

                {application.description}

              </p>

              <div className="flex gap-6 flex-wrap">

                <div className="bg-black/30 px-5 py-3 rounded-2xl">

                  €{application.salary}

                </div>

                <div className="bg-black/30 px-5 py-3 rounded-2xl">

                  {application.country}

                </div>

                <div className="bg-black/30 px-5 py-3 rounded-2xl">

                  {application.transport_type}

                </div>

                <div className="bg-yellow-400 text-black px-5 py-3 rounded-2xl font-bold">

                  {application.status}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}