"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://drivers-platform-production.up.railway.app";

export default function AdminDriversPage() {

  const [drivers, setDrivers] =
    useState<any[]>([]);

  async function loadDrivers() {

    const token =
      localStorage.getItem("token");

    const response = await fetch(

      `${API_URL}/admin/drivers`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    const data =
      await response.json();

    setDrivers(data);
  }

  async function verifyDriver(
    driverId: number
  ) {

    const token =
      localStorage.getItem("token");

    await fetch(

      `${API_URL}/verify-driver/${driverId}`,

      {
        method: "PUT",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    loadDrivers();
  }

  useEffect(() => {

    loadDrivers();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">

        Driver Verification

      </h1>

      <div className="space-y-8">

        {drivers.map((driver) => (

          <div
            key={driver.id}
            className="
              border
              border-yellow-500
              rounded-3xl
              p-6
              bg-white/5
            "
          >

            <div className="flex gap-6">

              <img

                src={
                  driver.profile_photo ||
                  "/placeholder.png"
                }

                alt="profile"

                className="
                  w-32
                  h-32
                  rounded-full
                  object-cover
                "
              />

              <div>

                <p className="text-xl">

                  {driver.email}

                </p>

                <p className="mt-2">

                  Status:

                  {" "}

                  {driver.driver_verified

                    ? "✅ VERIFIED"

                    : "⏳ PENDING"}
                </p>

                {driver.driver_license_photo && (

                  <a

                    href={
                      driver.driver_license_photo
                    }

                    target="_blank"

                    className="
                      block
                      mt-3
                      text-yellow-400
                    "
                  >

                    View License

                  </a>
                )}

                {driver.adr_certificate_photo && (

                  <a

                    href={
                      driver.adr_certificate_photo
                    }

                    target="_blank"

                    className="
                      block
                      mt-2
                      text-yellow-400
                    "
                  >

                    View ADR

                  </a>
                )}

                {!driver.driver_verified && (

                  <button

                    onClick={() =>
                      verifyDriver(
                        driver.id
                      )
                    }

                    className="
                      mt-5
                      bg-green-600
                      px-6
                      py-3
                      rounded-xl
                    "
                  >

                    Verify Driver

                  </button>
                )}

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}