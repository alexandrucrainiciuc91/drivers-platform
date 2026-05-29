"use client";

import Link from "next/link";

export default function VerifyEmailPage() {

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        max-w-2xl
        w-full
        bg-white/5
        border
        border-white/10
        rounded-3xl
        p-12
        text-center
        backdrop-blur-xl
      ">

        <div className="
          text-4xl md:text-6xl xl:text-7xl
          mb-8
        ">
          📩
        </div>

        <h1 className="
          text-2xl md:text-4xl xl:text-5xl
          font-black
          mb-6
        ">

          Verify Your Email

        </h1>

        <p className="
          text-gray-400
          text-xl
          leading-relaxed
          mb-10
        ">

          Your account has been created successfully.

          <br />
          <br />

          Please check your email and click the
          verification link to activate your account.

        </p>

        <div className="
          flex
          flex-col
          md:flex-row
          gap-4
          justify-center
        ">

          <Link
            href="/"
            className="
              bg-yellow-400
              text-black
              px-8
              py-4
              rounded-2xl
              font-black
              hover:scale-105
              transition
            "
          >

            Go To Homepage

          </Link>

          <Link
            href="/login"
            className="
              bg-white/10
              border
              border-white/10
              px-8
              py-4
              rounded-2xl
              font-bold
              hover:bg-white/20
              transition
            "
          >

            Login

          </Link>

        </div>

      </div>

    </div>
  );
}