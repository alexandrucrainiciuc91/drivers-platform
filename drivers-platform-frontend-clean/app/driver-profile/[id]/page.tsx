"use client";

import { useEffect, useState } from "react";

export default function DriverProfilePage({
  params
}: {
  params: { id: string }
}) {

  const [driver, setDriver] =
    useState<any>(null);

  useEffect(() => {

    fetch(
      `https://drivers-platform-production.up.railway.app/drivers/${params.id}`
    )
      .then(res => res.json())
      .then(data => setDriver(data));

  }, [params.id]);

  if (!driver) {

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <img
        src={
          driver.profile_photo ||
          "/placeholder.png"
        }
        className="
          w-40
          h-40
          rounded-full
          object-cover
          mb-6
        "
      />

      <h1 className="text-5xl font-bold mb-4">
        {driver.full_name}
      </h1>

      <p className="mb-2">
        City: {driver.city}
      </p>

      <p className="mb-2">
        Experience: {driver.experience_years} years
      </p>

      <p className="mb-2">
        License: {driver.license_category}
      </p>

      <p className="mb-2">
        ADR: {driver.adr_certificate}
      </p>

      <p className="mt-6">
        {driver.about}
      </p>

    </div>
  );
}