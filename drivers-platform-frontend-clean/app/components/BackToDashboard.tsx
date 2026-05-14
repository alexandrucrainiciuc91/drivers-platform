"use client";

export default function BackToDashboard() {

  function goBack() {

    const userType =
      localStorage.getItem("user_type");

    // COMPANY

    if (userType === "company") {

      window.location.href =
        "/company-dashboard";

      return;
    }

    // DRIVER

    window.location.href =
      "/driver-dashboard";
  }

  return (

    <div className="mb-10">

      <button
        onClick={goBack}
        className="
          group
          flex
          items-center
          gap-4
          bg-white/5
          border
          border-white/10
          backdrop-blur-2xl
          text-white
          px-8
          py-4
          rounded-2xl
          font-black
          text-lg
          hover:border-yellow-400/40
          hover:bg-yellow-400/10
          hover:scale-105
          transition-all
        "
      >

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-yellow-400
            text-black
            flex
            items-center
            justify-center
            font-black
            group-hover:rotate-[-8deg]
            transition-all
          "
        >

          ←

        </div>

        <div className="text-left">

          <p className="text-sm text-gray-400">

            Navigation

          </p>

          <p className="text-xl">

            Back To Dashboard

          </p>

        </div>

      </button>

    </div>
  );
}