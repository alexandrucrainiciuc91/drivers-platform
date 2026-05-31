"use client";

export default function TermsPage() {

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
            leading-none
            mb-6
          ">

            Terms & Conditions

          </h1>

          <p className="
            text-gray-400
            text-xl
            leading-relaxed
            max-w-3xl
          ">

            By accessing and using the platform,
            all users agree to the following
            terms and legal conditions.

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

              1. Platform Purpose

            </h2>

            <p className="
              text-gray-300
              leading-relaxed
              text-lg
            ">

              The platform acts exclusively as a
              digital marketplace connecting
              transport companies and drivers.

              The platform does not operate as
              a transport carrier, freight broker,
              logistics operator or shipping company.

            </p>

          </div>

          {/* LIABILITY */}

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

              2. Liability Disclaimer

            </h2>

            <div className="
              space-y-5
              text-lg
              text-gray-300
              leading-relaxed
            ">

              <p>

                The platform owner and administrators
                are NOT responsible for:

              </p>

              <ul className="
                list-disc
                pl-8
                space-y-3
              ">

                <li>
                  Cargo damages or losses
                </li>

                <li>
                  Incorrect transport information
                </li>

                <li>
                  Delayed deliveries
                </li>

                <li>
                  Transport cancellations
                </li>

                <li>
                  Fraudulent users or companies
                </li>

                <li>
                  Incorrect load details
                </li>

                <li>
                  Financial disputes between users
                </li>

                <li>
                  Traffic incidents or accidents
                </li>

                <li>
                  Customs or legal transport issues
                </li>

                <li>
                  Contract disputes between parties
                </li>

              </ul>

              <p>

                All transport agreements are made
                directly between companies and drivers.

                Users assume full responsibility
                for all transport operations,
                communication and contractual obligations.

              </p>

            </div>

          </div>

          {/* ACCOUNTS */}

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

              3. User Accounts

            </h2>

            <p className="
              text-gray-300
              leading-relaxed
              text-lg
            ">

              Users are responsible for maintaining
              the security of their accounts and
              login credentials.

              The platform reserves the right
              to suspend or terminate accounts
              involved in suspicious, illegal
              or abusive activities.

            </p>

          </div>

          {/* SUBSCRIPTIONS */}

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

              4. Subscriptions & Payments

            </h2>

            <p className="
              text-gray-300
              leading-relaxed
              text-lg
            ">

              Subscription payments are processed
              securely through third-party payment providers.

              The platform does not store
              payment card information.

              Subscription access may be limited,
              suspended or terminated in case
              of abuse or payment failure.

            </p>

          </div>

          {/* CONTENT */}

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

              5. User Generated Content

            </h2>

            <p className="
              text-gray-300
              leading-relaxed
              text-lg
            ">

              Users are fully responsible for
              all posted loads, messages,
              profile information and uploaded documents.

              The platform reserves the right
              to remove content that violates
              legal regulations or platform policies.

            </p>

          </div>

          {/* TERMINATION */}

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

              6. Account Suspension

            </h2>

            <p className="
              text-gray-300
              leading-relaxed
              text-lg
            ">

              The platform may suspend or permanently
              remove accounts involved in fraud,
              abuse, illegal transport activity,
              fake listings or payment manipulation.

            </p>

          </div>

          {/* GOVERNING */}

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

              7. Governing Law

            </h2>

            <p className="
              text-gray-300
              leading-relaxed
              text-lg
            ">

              These terms shall be governed
              in accordance with the laws
              applicable in the jurisdiction
              of the platform owner.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}