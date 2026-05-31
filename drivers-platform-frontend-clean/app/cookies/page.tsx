"use client";

export default function CookiesPage() {

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
            text-4xl md:text-6xl xl:text-7xl
            font-black
            mb-6
          ">

            Cookie Policy

          </h1>

          <p className="
            text-gray-400
            text-xl
            max-w-3xl
          ">

            This Cookie Policy explains
            how cookies and similar technologies
            are used on the platform.

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
            p-5 md:p-8 xl:p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              1. What Are Cookies

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              Cookies are small text files
              stored on your device
              to improve platform functionality,
              authentication and user experience.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-5 md:p-8 xl:p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              2. How We Use Cookies

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              Cookies may be used for:

            </p>

            <ul className="
              list-disc
              pl-8
              mt-4
              space-y-3
              text-gray-300
              text-lg
            ">

              <li>
                User authentication
              </li>

              <li>
                Session management
              </li>

              <li>
                Security purposes
              </li>

              <li>
                Language preferences
              </li>

              <li>
                Analytics and performance
              </li>

            </ul>

          </div>

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-5 md:p-8 xl:p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              3. Third Party Cookies

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              Third-party services such as
              payment processors or analytics providers
              may also use cookies
              according to their own policies.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-5 md:p-8 xl:p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
            ">

              4. Managing Cookies

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              Users may disable or remove cookies
              through browser settings.

              Some platform features may not function
              correctly if cookies are disabled.

            </p>

          </div>

          {/* SECTION */}

          <div className="
            bg-red-500/10
            border
            border-red-500/20
            rounded-3xl
            p-5 md:p-8 xl:p-10
          ">

            <h2 className="
              text-3xl
              font-black
              mb-6
              text-red-400
            ">

              5. Disclaimer

            </h2>

            <p className="
              text-gray-300
              text-lg
              leading-relaxed
            ">

              The platform owner is not responsible
              for damages, transport losses,
              cargo incidents or disputes
              occurring between platform users.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}