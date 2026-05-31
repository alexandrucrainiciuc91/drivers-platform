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

export default function CreateDriverProfilePage() {

  const { t } =
    useTranslation();

  const [fullName, setFullName] =
    useState("");

  const [city, setCity] =
    useState("");

  const [
    experienceYears,
    setExperienceYears
  ] = useState("");

  const [
    licenseCategory,
    setLicenseCategory
  ] = useState("");

  const [
    preferredCountries,
    setPreferredCountries
  ] = useState("");

  const [
    adrCertificate,
    setAdrCertificate
  ] = useState("");

  const [
    availability,
    setAvailability
  ] = useState("");

  const [phone, setPhone] =
    useState("");

  const [about, setAbout] =
    useState("");

  const [profilePhoto, setProfilePhoto] =
  useState("")

const [licensePhoto, setLicensePhoto] =
  useState("")

const [adrPhoto, setAdrPhoto] =
  useState("")

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");


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

  }, []);
async function uploadDocument(

  file: File,

  endpoint: string

) {

  const token =
    localStorage.getItem("token")

  const formData =
    new FormData()

  formData.append(
    "file",
    file
  )

  const response =
    await fetch(

      `https://drivers-platform-production.up.railway.app/${endpoint}`,

      {
        method: "POST",

        headers: {

          Authorization:
            `Bearer ${token}`
        },

        body: formData
      }
    )

  const data =
    await response.json()

  return data.image_url
}
  // ============================================
  // CREATE PROFILE
  // ============================================

  async function createProfile() {

    try {

      setLoading(true);

      setMessage("");

      if (
        !fullName ||
        !city ||
        !licenseCategory
      ) {

        setMessage(
          t(
            "driver_profile.required_fields"
          )
        );

        return;
      }

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://drivers-platform-production.up.railway.app/driver-profile",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({

            full_name:
              fullName,

            city:
              city,

            experience_years:
              Number(
                experienceYears
              ),

            license_category:
              licenseCategory,

            preferred_countries:
              preferredCountries,

            adr_certificate:
              adrCertificate,

            availability:
              availability,

            phone:
              phone,

            about:
              about,
            profile_photo:
  profilePhoto,

driver_license_photo:
  licensePhoto,

adr_certificate_photo:
  adrPhoto

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
          "driver_profile.created_success"
        )
      );

      setTimeout(() => {

        window.location.href =
          "/driver-dashboard";

      }, 1500);

    } catch (error) {

      console.log(error);

      setMessage(
        t(
          "driver_profile.server_error"
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

        {/* BG */}

        <div className="absolute inset-0">

          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-yellow-500/20 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-500/20 blur-[180px]" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">

          {/* TOP */}

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
                      "driver_profile.setup"
                    )
                  }

                </span>

              </div>

              <h1 className="text-4xl md:text-6xl xl:text-7xl font-black leading-[0.95] mb-8">

                {
                  t(
                    "driver_profile.build"
                  )
                }

                <br />

                <span className="text-yellow-400">

                  {
                    t(
                      "driver_profile.profile"
                    )
                  }

                </span>

              </h1>

              <p className="text-gray-400 text-2xl leading-relaxed mb-10">

                {
                  t(
                    "driver_profile.subtitle"
                  )
                }

              </p>

              {/* STATS */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <h2 className="text-4xl font-black text-yellow-400">

                    12K+

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {
                      t(
                        "driver_profile.active_drivers"
                      )
                    }

                  </p>

                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">

                  <h2 className="text-4xl font-black text-yellow-400">

                    8K+

                  </h2>

                  <p className="text-gray-400 mt-2">

                    {
                      t(
                        "driver_profile.monthly_loads"
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
                        "driver_profile.routes"
                      )
                    }

                  </p>

                </div>

              </div>

            </div>

            {/* FORM */}

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-5 md:p-8 xl:p-10">

              <div className="flex items-center justify-between mb-10">

                <h2 className="text-4xl font-black">

                  {
                    t(
                      "driver_profile.driver_information"
                    )
                  }

                </h2>

                <div className="bg-yellow-400 text-black px-5 py-2 rounded-2xl font-black">

                  {
                    t(
                      "driver_profile.pro_ready"
                    )
                  }

                </div>

              </div>

              <div className="grid gap-5">

                {/* NAME */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "driver_profile.full_name"
                    )
                  }
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* CITY */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "driver_profile.city"
                    )
                  }
                  value={city}
                  onChange={(e) =>
                    setCity(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* EXPERIENCE */}

                <input
                  type="number"
                  placeholder={
                    t(
                      "driver_profile.experience"
                    )
                  }
                  value={experienceYears}
                  onChange={(e) =>
                    setExperienceYears(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* LICENSE */}

                <select
                  value={licenseCategory}
                  onChange={(e) =>
                    setLicenseCategory(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                >

                  <option value="">
                    {
                      t(
                        "driver_profile.select_license"
                      )
                    }
                  </option>

                  <option value="C">
                    Category C
                  </option>

                  <option value="CE">
                    Category CE
                  </option>

                  <option value="ADR">
                    ADR
                  </option>

                  <option value="C + CE + ADR">
                    C + CE + ADR
                  </option>

                </select>

                {/* COUNTRIES */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "driver_profile.preferred_countries"
                    )
                  }
                  value={preferredCountries}
                  onChange={(e) =>
                    setPreferredCountries(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* ADR */}

                <select
                  value={adrCertificate}
                  onChange={(e) =>
                    setAdrCertificate(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                >

                  <option value="">
                    {
                      t(
                        "driver_profile.adr_certificate"
                      )
                    }
                  </option>

                  <option value="Yes">
                    {
                      t(
                        "driver_profile.yes"
                      )
                    }
                  </option>

                  <option value="No">
                    {
                      t(
                        "driver_profile.no"
                      )
                    }
                  </option>

                </select>

                {/* DATE */}

                <input
                  type="date"
                  value={availability}
                  onChange={(e) =>
                    setAvailability(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* PHONE */}

                <input
                  type="text"
                  placeholder={
                    t(
                      "driver_profile.phone"
                    )
                  }
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg focus:outline-none focus:border-yellow-400"
                />

                {/* ABOUT */}

                <textarea
                  placeholder={
                    t(
                      "driver_profile.about"
                    )
                  }
                  value={about}
                  onChange={(e) =>
                    setAbout(
                      e.target.value
                    )
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5 text-lg h-40 resize-none focus:outline-none focus:border-yellow-400"
                />
<div className="space-y-4">

  <div>

    <label className="block mb-2 text-yellow-400">

      Profile Photo
    </label>

    <input
      type="file"
      accept="image/*"

      onChange={async (e) => {

        if (!e.target.files?.[0])
          return

        const url =
          await uploadDocument(

            e.target.files[0],

            "upload-profile-photo"
          )

        setProfilePhoto(url)
      }}

      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5"
    />

  </div>

  <div>

    <label className="block mb-2 text-yellow-400">

      Driver License
    </label>

    <input
      type="file"
      accept="image/*"

      onChange={async (e) => {

        if (!e.target.files?.[0])
          return

        const url =
          await uploadDocument(

            e.target.files[0],

            "upload-license"
          )

        setLicensePhoto(url)
      }}

      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5"
    />

  </div>

  <div>

    <label className="block mb-2 text-yellow-400">

      ADR Certificate
    </label>

    <input
      type="file"
      accept="image/*"

      onChange={async (e) => {

        if (!e.target.files?.[0])
          return

        const url =
          await uploadDocument(

            e.target.files[0],

            "upload-adr"
          )

        setAdrPhoto(url)
      }}

      className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-5"
    />

  </div>

</div>
                {/* BUTTON */}

                <button
                  onClick={createProfile}
                  disabled={loading}
                  className="
                    mt-4
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
                        "driver_profile.creating"
                      )

                    : t(
                        "driver_profile.create_button"
                      )}

                </button>

                {/* MESSAGE */}

                {message && (

                  <div className="text-center text-yellow-400 text-lg mt-4">

                    {message}

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}