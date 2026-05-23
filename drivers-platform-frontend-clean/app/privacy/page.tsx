"use client";

export default function PrivacyPage() {

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      px-6
      py-16
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="mb-16">

          <p className="
            text-yellow-400
            uppercase
            tracking-[6px]
            font-bold
            mb-4
          ">

            Legal

          </p>

          <h1 className="
            text-7xl
            font-black
            mb-6
          ">

            Privacy Policy

          </h1>

          <p className="
            text-gray-400
            text-xl
            max-w-3xl
          ">

            This Privacy Policy explains how
            personal data is collected,
            stored and processed when using
            the platform.

          </p>

        </div>

        {/* CONTENT */}

        <div className="
          space-y-10
        ">

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              1. Information We Collect

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              The platform may collect personal
              information including names,
              email addresses, phone numbers,
              company details, transport information,
              profile data and communication messages.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              2. Purpose Of Data Collection

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              User information is processed
              exclusively for platform functionality,
              account management, subscriptions,
              transport communication,
              marketplace operations and
              security purposes.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              3. Data Security

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              The platform implements reasonable
              technical and security measures
              to protect user data.

              However, no internet platform
              can guarantee absolute security.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              4. Third Party Services

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              The platform may use third-party
              providers such as payment processors,
              hosting services and analytics tools.

              These providers may process data
              according to their own privacy policies.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              5. User Rights

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              Users may request access,
              modification or deletion
              of personal information
              in accordance with applicable laws.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-red-500/10
            border
            border-red-500/20
            rounded-3xl
            p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
              text-red-400
            ">

              6. Liability Disclaimer

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              The platform is not responsible
              for transport disputes,
              damaged cargo, fraudulent users,
              delayed deliveries or any agreements
              established between companies and drivers.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}