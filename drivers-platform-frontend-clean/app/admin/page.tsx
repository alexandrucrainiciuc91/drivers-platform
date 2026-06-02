"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://drivers-platform-production.up.railway.app";

export default function AdminDashboard() {

  const [stats, setStats] =
    useState<any>(null);
useEffect(() => {

  const role =
    localStorage.getItem(
      "user_type"
    );

  if (role !== "admin") {

    window.location.href =
      "/login";
  }

}, []);
  useEffect(() => {

    loadStats();

  }, []);

  async function loadStats() {

    const token =
      localStorage.getItem("token");

    const response = await fetch(

      `${API_URL}/admin/stats`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    const data =
      await response.json();

    setStats(data);
  }

  function logout() {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user_type"
    );

    localStorage.removeItem(
      "subscription_plan"
    );

    localStorage.removeItem(
      "user_id"
    );

    window.location.href =
      "/login";
  }

  if (!stats) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        Loading...

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-5xl font-bold">

          Admin Dashboard

        </h1>

        <button

          onClick={logout}

          className="
            bg-red-600
            px-6
            py-3
            rounded-xl
            font-bold
          "
        >

          Logout

        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          title="Drivers"
          value={stats.drivers}
        />

        <Card
          title="Companies"
          value={stats.companies}
        />

        <Card
          title="Verified Drivers"
          value={stats.verified_drivers}
        />

        <Card
          title="PRO Users"
          value={stats.pro_users}
        />

      </div>

      <div className="mt-10 flex flex-wrap gap-4">

        <a
          href="/admin/drivers"
          className="
            bg-yellow-500
            text-black
            px-6
            py-4
            rounded-2xl
            font-bold
          "
        >

          Driver Verification

        </a>

      </div>

    </div>
  );
}

function Card({

  title,
  value

}: any) {

  return (

    <div
      className="
        bg-white/5
        border
        border-yellow-500
        rounded-3xl
        p-6
      "
    >

      <p className="text-gray-400">

        {title}

      </p>

      <h2 className="text-5xl font-bold mt-2">

        {value}

      </h2>

    </div>
  );
}