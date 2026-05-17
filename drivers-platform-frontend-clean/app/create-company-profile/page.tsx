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

export default function CreateCompanyProfilePage() {

  const { t } =
    useTranslation();

  const [companyName, setCompanyName] =
    useState("");

  const [country, setCountry] =
    useState("");

  const [city, setCity] =
    useState("");

  const [fleetSize, setFleetSize] =
    useState("");

  const [transportType, setTransportType] =
    useState("");

  const [website, setWebsite] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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

  }, []);

  // ============================================
  // CREATE PROFILE
  // ============================================

  async function createCompanyProfile() {

    try {

      setLoading(true);

      setMessage("");

      if (
        !companyName ||
        !country ||
        !city
      ) {

        setMessage(
          t(
            "company_profile.required_fields"
          )
        );

        return;
      }

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://drivers-platform-production.up.railway.app/company-profile",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({

            company_name:
              companyName,

            country:
              country,

            city:
              city,

            fleet_size:
              Number(fleetSize),

            transport_type:
              transportType,

            website:
              website,

            phone:
              phone,

            description:
              description
          })
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.error) {

        setMessage(
          data.error
        );

        return;
      }

      setMessage(
        t(
          "company_profile.created_success"
        )
      );

      setTimeout(() => {

        window.location.href =
          "/company-dashboard";

      }, 1500);

    } catch (error) {

      console.log(error);

      setMessage(
        t(
          "company_profile.server_error"
        )
      );

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // UI
  // ============================================

  return (

    <div className="flex bg-black text-white min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 overflow-hidden relative">

        {/* BACKGROUND */}

        <div className="absolute inset-0">

          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-yellow-500/20 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-500/20 blur-[180px]" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">

          {/* TOP BAR */}

          <div className="flex items-center justify-between mb-10 flex-wrap gap-5">

            <BackToDashboard />

            <LanguageSwitcher />

          </div>

          <div className="grid xl:grid-cols-2 gap-20 items-start">

            {/* LEFT */}

            <div>

              <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 px-5 py-3 rounded-full mb-8">

                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />

                <span className="text-yellow-300 font-semibold">

                  {
                    t(
                      "company_profile.network"
                    )
                  }

                </span>

              </div>

              <h1 className="text-7xl font-black leading-[0.95] mb-8">

                {
                  t(
                    "company_profile.build"
                  )
                }

                <br />

                <span className="text-yellow-400">

                  {
                    t(
                      "company_profile.profile"
                    )
                  }

                </span>

              </h1>

              <p className="text-gray-400 text-2xl leading-relaxed mb-10">

                {
                  t(
                    "company_profile.subtitle"
                  )
                }

              </p>

              {/* STATS */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <h2 className="text-4xl font-black text-yellow-400">

                    5K+

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {
                      t(
                        "company_profile.transport_companies"
                      )
                    }

                  </p>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <h2 className="text-4xl font-black text-yellow-400">

                    40K+

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {
                      t(
                        "company_profile.verified_drivers"
                      )
                    }

                  </p>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <h2 className="text-4xl font-black text-yellow-400">

                    EU

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {
                      t(
                        "company_profile.freight_coverage"
                      )
                    }

                  </p>

                </div>

              </div>

            </div>

            {/* FORM */}

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10">

              <div className="flex items-center justify-between mb-10">

                <h2 className="text-4xl font-black">

                  {
                    t(
                      "company_profile.company_information"
                    )
                  }

                </h2>

                <div className="bg-yellow-400 text-black px-5 py-2 rounded-2xl font-black">

                  {
                    t(
                      "company_profile.business_ready"
                    )
                  }

                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* COMPANY */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "company_profile.company_name"
                    )
                  }
                  value={companyName}
                  onChange={(e) =>
                    setCompanyName(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* COUNTRY */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "company_profile.country"
                    )
                  }
                  value={country}
                  onChange={(e) =>
                    setCountry(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* CITY */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "company_profile.city"
                    )
                  }
                  value={city}
                  onChange={(e) =>
                    setCity(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* FLEET */}

                <input
                  type="number"
                  placeholder={
                    t(
                      "company_profile.fleet_size"
                    )
                  }
                  value={fleetSize}
                  onChange={(e) =>
                    setFleetSize(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* TRANSPORT */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "company_profile.transport_type"
                    )
                  }
                  value={transportType}
                  onChange={(e) =>
                    setTransportType(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* WEBSITE */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "company_profile.website"
                    )
                  }
                  value={website}
                  onChange={(e) =>
                    setWebsite(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-yellow-400"
                />

              </div>

              {/* PHONE */}

              <input
                type="text"
                placeholder={
                  t(
                    "company_profile.phone"
                  )
                }
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full mt-5 bg-black/40 border border-white/10 rounded-2xl p-5 text-lg focus:outline-none focus:border-yellow-400"
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder={
                  t(
                    "company_profile.description"
                  )
                }
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full mt-5 bg-black/40 border border-white/10 rounded-2xl p-5 text-lg h-40 resize-none focus:outline-none focus:border-yellow-400"
              />

              {/* BUTTON */}

              <button
                onClick={createCompanyProfile}
                disabled={loading}
                className="
                  w-full
                  mt-8
                  bg-yellow-400
                  text-black
                  py-5
                  rounded-2xl
                  font-black
                  text-xl
                  hover:scale-[1.02]
                  transition-all
                  disabled:opacity-50
                "
              >

                {loading

                  ? t(
                      "company_profile.creating"
                    )

                  : t(
                      "company_profile.create_button"
                    )}

              </button>

              {/* MESSAGE */}

              {message && (

                <div className="mt-6 text-yellow-400 text-center text-lg">

                  {message}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}