"use client";

import "./i18n";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Truck,
  Briefcase,
  Users,
  MessageCircle,
  Shield,
} from "lucide-react";

import { useTranslation } from "react-i18next";

import LanguageSwitcher from "./components/LanguageSwitcher";

export default function HomePage() {

  const { t } = useTranslation();

const [mounted, setMounted] =
  useState(false);

useEffect(() => {

  setMounted(true);

}, []);

if (!mounted) {

  return null;
}

  const jobs = [

    {
      route: "Romania → Germany",
      salary: "€3200/month",
      type: "International",
    },

    {
      route: "France → Italy",
      salary: "€2900/month",
      type: "Refrigerated",
    },

    {
      route: "Spain → Netherlands",
      salary: "€3500/month",
      type: "Long Haul",
    },
  ];

  const benefits = [

    "Upgrade for Premium and get acces to more jobs as a Driver and see more drivers as a Company",
      "🚛 Verified EU Companies",
    "💬 Live Recruiter Messaging",
    "⚡ Fast Hiring Process",
    "🌍 International Logistics Jobs",
    "🛡️ Secure Applications",
    "📈 Fleet Growth For Companies",
    "👨‍✈️ Professional Driver Profiles",
    "🔔 Smart Notifications",
  ];

  return (

    <main className="bg-black text-white overflow-hidden">

      {/* HERO */}

      <section className="relative min-h-screen overflow-hidden">

        {/* BG */}

        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501706362039-c6e80948f11f?q=80&w=2070&auto=format&fit=crop')",
          }}
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-black/85" />

        {/* GLOW */}

        <div className="hero-glow-left" />

        <div className="hero-glow-right" />

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 xl:px-8 py-10">

          {/* TOP */}

          <div className="flex justify-end mb-10">

            <LanguageSwitcher />

          </div>

          {/* GRID */}

          <div className="grid xl:grid-cols-2 gap-20 items-center min-h-[85vh]">

            {/* LEFT */}

            <div className="flex justify-center">

              <div className="relative">

                {/* CARD */}

                <div className="
                  relative
                  bg-white/5
                  border
                  border-yellow-500/20
                  backdrop-blur-3xl
                  rounded-[48px]
                  px-10
                  py-12
                  w-full
                  max-w-[560px]
                  shadow-[0_0_100px_rgba(250,204,21,0.08)]
                ">

                  {/* LOGO */}

                  <div className="flex justify-center mb-10">

                    <div className="
                      relative
                      w-[190px]
                      h-[190px]
                      rounded-[42px]
                      bg-gradient-to-br
                      from-yellow-300
                      via-yellow-400
                      to-orange-400
                      flex
                      items-center
                      justify-center
                      shadow-[0_0_120px_rgba(250,204,21,0.35)]
                    ">

                      {/* D */}

                      <div className="
                        text-[120px]
                        font-black
                        text-black
                        leading-none
                      ">

                        D

                      </div>

                      {/* ROAD */}

                      <div className="
                        absolute
                        bottom-[48px]
                        right-[38px]
                        w-24
                        h-[6px]
                        bg-white
                        rounded-full
                        rotate-[-36deg]
                      " />

                      {/* ROAD DOTS */}

                      <div className="absolute bottom-[82px] right-[82px] w-3 h-3 rounded-full bg-yellow-100" />

                      <div className="absolute bottom-[66px] right-[66px] w-3 h-3 rounded-full bg-yellow-100" />

                    </div>

                  </div>

                  {/* TITLE */}

                  <div className="text-center">

                    <h1 className="
                      text-6xl
                      xl:text-7xl
                      font-black
                      leading-none
                      tracking-tight
                    ">

                      <span className="text-white">

                        Drive

                      </span>

                      <span className="text-yellow-400">

                        LINKEED

                      </span>

                    </h1>

                    {/* TAGLINE */}

                    <div className="
                      flex
                      items-center
                      justify-center
                      gap-5
                      mt-6
                    ">

                      <div className="w-16 h-[2px] bg-yellow-400" />

                      <p className="
                        text-gray-300
                        uppercase
                        tracking-[4px]
                        text-xs
                      ">

                        CONNECTING ROADS.
                        BUILDING FUTURES.

                      </p>

                      <div className="w-16 h-[2px] bg-yellow-400" />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <div>

              {/* BADGE */}

              <div className="
                inline-flex
                items-center
                gap-3
                border
                border-yellow-500/30
                bg-yellow-500/10
                px-5
                py-3
                rounded-full
                mb-8
                backdrop-blur-xl
              ">

                <Truck
                  className="text-yellow-400"
                  size={18}
                />

                <span className="
                  text-yellow-300
                  text-sm
                  tracking-[4px]
                  uppercase
                ">

                  {t("home.platform")}

                </span>

              </div>

              {/* TITLE */}

              <h1 className="
                text-6xl
                md:text-7xl
                xl:text-8xl
                font-black
                leading-[0.9]
                tracking-tight
                mb-8
              ">

                {t("home.find")}

                <span className="text-yellow-400">

                  {" "}
                  {t("home.drivers")}

                </span>

                <br />

                {t("home.find")}

                <span className="text-yellow-400">

                  {" "}
                  {t("home.transport")}

                </span>

                <br />

                {t("home.jobs")}

              </h1>

              {/* TEXT */}

              <p className="
                text-gray-300
                text-xl
                xl:text-2xl
                leading-relaxed
                max-w-3xl
                mb-12
              ">

                {t("home.subtitle")}

              </p>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-5 mb-16">

                <Link href="/register">

                  <button className="
                    group
                    bg-yellow-400
                    text-black
                    px-10
                    py-5
                    rounded-2xl
                    font-black
                    text-lg
                    hover:scale-105
                    transition-all
                    duration-300
                    shadow-[0_0_60px_rgba(250,204,21,0.4)]
                  ">

                    {t("home.register")}

                    <ArrowRight className="
                      inline
                      ml-3
                      group-hover:translate-x-1
                      transition
                    " />

                  </button>

                </Link>

                <Link href="/login">

                  <button className="
                    border
                    border-white/20
                    bg-white/5
                    backdrop-blur-xl
                    px-10
                    py-5
                    rounded-2xl
                    font-bold
                    text-lg
                    hover:bg-white/10
                    transition-all
                  ">

                    {t("home.login")}

                  </button>

                </Link>

              </div>

              {/* STATS */}

              <div className="
                grid
                grid-cols-2
                xl:grid-cols-4
                gap-5
              ">

                {[
                  ["2450+", t("home.drivers_count")],
                  ["380+", t("home.companies_count")],
                  ["14K+", t("home.applications_count")],
                  ["24/7", t("home.support_count")],
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                      bg-white/5
                      border
                      border-white/10
                      backdrop-blur-2xl
                      rounded-3xl
                      p-6
                      hover:scale-105
                      transition-all
                    "
                  >

                    <h2 className="
                      text-4xl
                      font-black
                      text-yellow-400
                      mb-2
                    ">

                      {item[0]}

                    </h2>

                    <p className="text-gray-400">

                      {item[1]}

                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* BENEFITS BAR */}

      <section className="
        py-6
        border-y
        border-white/10
        bg-black
        overflow-hidden
      ">

        <div className="marquee flex">

          {[...benefits, ...benefits].map((item, index) => (

            <div
              key={index}
              className="
                mx-4
                border
                border-yellow-500/20
                bg-white/5
                rounded-full
                px-8
                py-4
                text-yellow-300
                font-semibold
                backdrop-blur-xl
                whitespace-nowrap
              "
            >

              {item}

            </div>

          ))}

        </div>

      </section>

      {/* DRIVER + COMPANY */}

      <section className="py-32 px-6 bg-gradient-to-b from-black to-zinc-950">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* DRIVERS */}

          <div className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            min-h-[700px]
            group
          ">

            <div
              className="
                absolute
                inset-0
                bg-cover
                bg-center
                group-hover:scale-105
                transition-all
                duration-700
              "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1974&auto=format&fit=crop')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <div className="relative z-10 p-10 flex flex-col justify-end h-full">

              <div className="
                bg-yellow-500/10
                border
                border-yellow-500/30
                backdrop-blur-xl
                rounded-2xl
                px-5
                py-2
                w-fit
                mb-6
              ">

                FOR DRIVERS

              </div>

              <h2 className="
                text-5xl
                font-black
                mb-6
                leading-tight
              ">

                GET HIRED
                <br />

                FASTER

              </h2>

              <p className="
                text-gray-300
                text-xl
                leading-relaxed
                mb-10
                max-w-xl
              ">

                Create your driver profile,
                apply to transport companies,
                communicate directly with recruiters
                and find better trucking jobs.

              </p>

              <div className="space-y-4 mb-10">

                {[
                  "Create professional driver profile",
                  "Apply to transport companies",
                  "Chat with recruiters instantly",
                  "Track job applications live",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                      text-lg
                    "
                  >

                    <div className="w-3 h-3 rounded-full bg-yellow-400" />

                    {item}

                  </div>

                ))}

              </div>

              <Link href="/register">

                <button className="
                  bg-yellow-400
                  text-black
                  px-8
                  py-4
                  rounded-2xl
                  font-black
                  text-lg
                  w-fit
                  hover:scale-105
                  transition-all
                ">

                  Join As Driver

                </button>

              </Link>

            </div>

          </div>

          {/* COMPANIES */}

          <div className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            min-h-[700px]
            group
          ">

            <div
              className="
                absolute
                inset-0
                bg-cover
                bg-center
                group-hover:scale-105
                transition-all
                duration-700
              "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2070&auto=format&fit=crop')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            <div className="relative z-10 p-10 flex flex-col justify-end h-full">

              <div className="
                bg-yellow-500/10
                border
                border-yellow-500/30
                backdrop-blur-xl
                rounded-2xl
                px-5
                py-2
                w-fit
                mb-6
              ">

                FOR COMPANIES

              </div>

              <h2 className="
                text-5xl
                font-black
                mb-6
                leading-tight
              ">

                HIRE
                <br />

                PROFESSIONAL
                <br />

                DRIVERS

              </h2>

              <p className="
                text-gray-300
                text-xl
                leading-relaxed
                mb-10
                max-w-xl
              ">

                Publish transport jobs,
                manage applications and connect
                with experienced truck drivers
                across Europe.

              </p>

              <div className="space-y-4 mb-10">

                {[
                  "Post transport jobs",
                  "Search verified drivers",
                  "Manage applications",
                  "Build your transport fleet",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      gap-4
                      text-lg
                    "
                  >

                    <div className="w-3 h-3 rounded-full bg-yellow-400" />

                    {item}

                  </div>

                ))}

              </div>

              <Link href="/register">

                <button className="
                  bg-yellow-400
                  text-black
                  px-8
                  py-4
                  rounded-2xl
                  font-black
                  text-lg
                  w-fit
                  hover:scale-105
                  transition-all
                ">

                  Register Company

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* LIVE JOBS */}

      <section className="py-32 px-6 bg-black">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="
              text-6xl
              font-black
              mb-6
            ">

              LIVE

              <span className="text-yellow-400">

                {" "}
                TRANSPORT JOBS

              </span>

            </h2>

            <p className="
              text-gray-400
              text-xl
            ">

              New trucking opportunities added daily.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {jobs.map((job, index) => (

              <div
                key={index}
                className="
                  group
                  bg-zinc-950
                  border
                  border-white/10
                  rounded-[36px]
                  overflow-hidden
                  hover:border-yellow-400/40
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >

                <div
                  className="
                    h-60
                    bg-cover
                    bg-center
                    group-hover:scale-105
                    transition-all
                    duration-700
                  "
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070&auto=format&fit=crop')",
                  }}
                />

                <div className="p-8">

                  <div className="
                    flex
                    justify-between
                    items-center
                    mb-6
                  ">

                    <div className="
                      bg-yellow-500/10
                      text-yellow-300
                      px-4
                      py-2
                      rounded-full
                      text-sm
                    ">

                      {job.type}

                    </div>

                    <div className="
                      text-yellow-400
                      font-black
                      text-xl
                    ">

                      {job.salary}

                    </div>

                  </div>

                  <h3 className="
                    text-3xl
                    font-black
                    mb-4
                  ">

                    {job.route}

                  </h3>

                  <p className="
                    text-gray-400
                    text-lg
                    mb-8
                  ">

                    International truck driver
                    position for experienced
                    C+E drivers.

                  </p>

                  <button className="
                    w-full
                    bg-yellow-400
                    text-black
                    py-4
                    rounded-2xl
                    font-black
                    hover:scale-[1.02]
                    transition-all
                  ">

                    Apply Now

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-32 px-6 bg-zinc-950">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20">

            <h2 className="
              text-6xl
              font-black
              mb-6
            ">

              BUILT FOR

              <span className="text-yellow-400">

                {" "}
                MODERN TRANSPORT

              </span>

            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                icon:
                  <Users size={42} />,

                title:
                  "Driver Profiles",
              },

              {
                icon:
                  <Briefcase size={42} />,

                title:
                  "Transport Jobs",
              },

              {
                icon:
                  <MessageCircle size={42} />,

                title:
                  "Live Messaging",
              },

              {
                icon:
                  <Shield size={42} />,

                title:
                  "Verified Companies",
              },
            ].map((feature, index) => (

              <div
                key={index}
                className="
                  bg-black
                  border
                  border-white/10
                  rounded-[32px]
                  p-10
                  hover:border-yellow-400/40
                  hover:-translate-y-2
                  transition-all
                  duration-500
                "
              >

                <div className="
                  text-yellow-400
                  mb-8
                ">

                  {feature.icon}

                </div>

                <h3 className="
                  text-3xl
                  font-black
                  leading-tight
                ">

                  {feature.title}

                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* FOOTER */}

<footer className="
  border-t
  border-white/10
  bg-black
  px-6
  py-16
">

  <div className="
    max-w-7xl
    mx-auto
  ">

    {/* TOP */}

    <div className="
      grid
      lg:grid-cols-4
      gap-12
      mb-14
    ">

      {/* BRAND */}

      <div>

        <h2 className="
          text-4xl
          font-black
          mb-6
        ">

          <span className="text-white">

            Drive

          </span>

          <span className="text-yellow-400">

            LINKEED

          </span>

        </h2>

        <p className="
          text-gray-400
          leading-relaxed
          text-lg
        ">

          Premium logistics and transport
          marketplace connecting companies
          and professional drivers
          across Europe.

        </p>

      </div>

      {/* PLATFORM */}

      <div>

        <h3 className="
          text-xl
          font-black
          mb-6
        ">

          Platform

        </h3>

        <div className="
          flex
          flex-col
          gap-4
          text-gray-400
        ">

          <Link
            href="/register"
            className="
              hover:text-yellow-400
              transition
            "
          >

            Register

          </Link>

          <Link
            href="/login"
            className="
              hover:text-yellow-400
              transition
            "
          >

            Login

          </Link>

          <Link
            href="/loads"
            className="
              hover:text-yellow-400
              transition
            "
          >

            Marketplace

          </Link>

        </div>

      </div>

      {/* LEGAL */}

      <div>

        <h3 className="
          text-xl
          font-black
          mb-6
        ">

          Legal

        </h3>

        <div className="
          flex
          flex-col
          gap-4
          text-gray-400
        ">

          <Link
            href="/terms"
            className="
              hover:text-yellow-400
              transition
            "
          >

            Terms & Conditions

          </Link>

          <Link
            href="/privacy"
            className="
              hover:text-yellow-400
              transition
            "
          >

            Privacy Policy

          </Link>

          <Link
            href="/cookies"
            className="
              hover:text-yellow-400
              transition
            "
          >

            Cookie Policy

          </Link>

          <Link
            href="/faq"
            className="
              hover:text-yellow-400
              transition
            "
          >

            FAQ

          </Link>

        </div>

      </div>

      {/* DISCLAIMER */}

      <div>

        <h3 className="
          text-xl
          font-black
          mb-6
          text-red-400
        ">

          Disclaimer

        </h3>

        <p className="
          text-gray-400
          leading-relaxed
        ">

          The platform acts exclusively
          as a digital marketplace.

          The platform owner is NOT
          responsible for cargo damages,
          transport disputes, delivery delays,
          fraudulent users or agreements
          established between drivers
          and companies.

        </p>

      </div>

    </div>

    {/* BOTTOM */}

    <div className="
      border-t
      border-white/10
      pt-8
      flex
      flex-col
      md:flex-row
      items-center
      justify-between
      gap-6
    ">

      <p className="
        text-gray-500
      ">

        © 2026 DriveLINKEED.
        All rights reserved.

      </p>

      <div className="
        flex
        items-center
        gap-6
        text-sm
        text-gray-500
        flex-wrap
      ">

        <span>
          Secure Platform
        </span>

        <span>
          EU Marketplace
        </span>

        <span>
          Real-Time Messaging
        </span>

        <span>
          Premium Logistics Network
        </span>

      </div>

    </div>

  </div>

</footer>

</main>
);
}