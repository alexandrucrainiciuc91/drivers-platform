"use client";

import {
  useEffect,
  useState
} from "react";

export default function LoadDetailsPage({

  params

}: any) {

  // =====================================================
  // STATES
  // =====================================================

  const [load, setLoad] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // FETCH LOAD
  // =====================================================

  useEffect(() => {

    void fetchLoad();

  }, []);

  async function fetchLoad() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(

          `${process.env.NEXT_PUBLIC_API_URL}/load/${params.id}`,

          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      setLoad(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-3xl
        font-black
      ">

        Loading...

      </div>
    );
  }

  // =====================================================
  // NOT FOUND
  // =====================================================

  if (!load) {

    return (

      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-4xl
        font-black
      ">

        Load Not Found

      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      px-6
      py-12
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="
          flex
          items-center
          justify-between
          mb-12
          gap-8
        ">

          <div>

            <p className="
              text-gray-500
              uppercase
              text-sm
              mb-3
            ">

              Transport Route

            </p>

            <h1 className="
              text-3xl md:text-5xl xl:text-6xl
              font-black
              leading-tight
            ">

              {load.pickup_city}
              {" "}
              →
              {" "}
              {load.delivery_city}

            </h1>

            <p className="
              text-gray-400
              text-2xl
              mt-4
            ">

              {load.pickup_country}
              {" "}
              →
              {" "}
              {load.delivery_country}

            </p>

          </div>

          <div className="
            bg-yellow-400
            text-black
            px-10
            py-6
            rounded-3xl
            text-4xl
            font-black
          ">

            €{load.price}

          </div>

        </div>

        {/* GRID */}

        <div className="
          grid
          lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-3
          gap-6
          mb-10
        ">

          {/* DISTANCE */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
          ">

            <p className="
              text-gray-500
              mb-3
            ">

              Distance

            </p>

            <h2 className="
              text-4xl
              font-black
            ">

              {load.distance_km} KM

            </h2>

          </div>

          {/* TRANSPORT */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
          ">

            <p className="
              text-gray-500
              mb-3
            ">

              Transport Type

            </p>

            <h2 className="
              text-4xl
              font-black
            ">

              {load.transport_type}

            </h2>

          </div>

          {/* WEIGHT */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
          ">

            <p className="
              text-gray-500
              mb-3
            ">

              Total Weight

            </p>

            <h2 className="
              text-4xl
              font-black
            ">

              {load.total_weight}

            </h2>

          </div>

        </div>

        {/* DETAILS */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
          mb-10
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            Load Details

          </h2>

          <div className="
            grid
            md:grid-cols-1 md:grid-cols-2
            gap-8
          ">

            <div>

              <p className="
                text-gray-500
                mb-2
              ">

                Cargo Type

              </p>

              <p className="
                text-2xl
                font-bold
              ">

                {load.cargo_type}

              </p>

            </div>

            <div>

              <p className="
                text-gray-500
                mb-2
              ">

                Loading Date

              </p>

              <p className="
                text-2xl
                font-bold
              ">

                {load.loading_date}

              </p>

            </div>

            <div>

              <p className="
                text-gray-500
                mb-2
              ">

                Contact Phone

              </p>

              <p className="
                text-2xl
                font-bold
              ">

                {load.phone}

              </p>

            </div>

            <div>

              <p className="
                text-gray-500
                mb-2
              ">

                Status

              </p>

              <p className="
                text-2xl
                font-bold
                text-green-400
              ">

                {load.status}

              </p>

            </div>

          </div>

        </div>

        {/* REQUIREMENTS */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-10
          mb-10
        ">

          <h2 className="
            text-3xl
            font-black
            mb-8
          ">

            Special Requirements

          </h2>

          <p className="
            text-xl
            text-gray-300
            leading-relaxed
          ">

            {load.special_requirements ||
              "No special requirements"}

          </p>

        </div>

        {/* CONTACT */}

        <div className="
          flex
          gap-6
        ">

          <button
            className="
              bg-yellow-400
              text-black
              px-10
              py-5
              rounded-3xl
              font-black
              text-xl
            "
          >

            Contact Company

          </button>

          <a
            href="/loads"
            className="
              bg-white/5
              border
              border-white/10
              px-10
              py-5
              rounded-3xl
              font-black
              text-xl
            "
          >

            Back To Loads

          </a>

        </div>

      </div>

    </div>
  );
}