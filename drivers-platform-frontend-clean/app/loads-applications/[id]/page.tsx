"use client";

import "../../../i18n";

import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "next/navigation";

import Sidebar from "./../../components/Sidebar";

export default function LoadApplicationsPage() {

  const params =
    useParams();

  const loadId =
    params.id;

  const [applications, setApplications] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const API_URL =
    "https://drivers-platform-production.up.railway.app";

  // ============================================
  // FETCH APPLICATIONS
  // ============================================

  const fetchApplications =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await fetch(

            `${API_URL}/load/${loadId}/applications`,

            {

              headers: {

                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        const data =
          await response.json();

        setApplications(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // ============================================
  // ACCEPT DRIVER
  // ============================================

  const acceptDriver =
    async (
      applicationId: number
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await fetch(

          `${API_URL}/application/${applicationId}/accept`,

          {

            method: "POST",

            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

        alert(
          "Driver accepted"
        );

        window.location.href =
          "/company-dashboard";

      } catch (error) {

        console.log(error);
      }
    };

  // ============================================
  // LOAD
  // ============================================

  useEffect(() => {

    fetchApplications();

  }, []);

  // ============================================
  // LOADING
  // ============================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-4xl
      ">

        Loading...

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
    ">

      <Sidebar />

      <div className="
        flex-1
        min-h-screen
        p-10
      ">

        <h1 className="
          text-6xl
          font-black
          mb-10
        ">

          Load Applicants

        </h1>

        <div className="
          grid
          gap-5
        ">

          {applications.map(
            (application: any) => (

              <div
                key={application.id}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-8
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                  gap-5
                  flex-wrap
                ">

                  <div>

                    <h2 className="
                      text-3xl
                      font-black
                      mb-3
                    ">

                      Driver ID:
                      {" "}
                      {application.driver_id}

                    </h2>

                    <p className="
                      text-gray-400
                      text-xl
                    ">

                      {
                        application.message
                      }

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      acceptDriver(
                        application.id
                      )
                    }
                    className="
                      bg-yellow-400
                      text-black
                      px-8
                      py-4
                      rounded-2xl
                      font-black
                    "
                  >

                    Accept Driver

                  </button>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}