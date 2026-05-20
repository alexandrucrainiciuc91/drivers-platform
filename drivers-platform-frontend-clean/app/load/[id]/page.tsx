"use client";

import {
  useEffect,
  useState
} from "react";

export default function LoadDetailsPage({

  params

}: any) {

  const [load, setLoad] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // FETCH LOAD
  // =====================================================

  useEffect(() => {

    fetchLoad();

  }, []);

  async function fetchLoad() {

    try {

      const response =
        await fetch(
          `http://127.0.0.1:8000/load/${params.id}`
        );

      const data =
        await response.json();

      console.log(data);

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
        text-3xl
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

        {/* ROUTE */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-[40px]
          p-10
          mb-10
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-10
          ">

            {/* PICKUP */}

            <div>

              <p className="
                text-gray-500
                uppercase
                text-sm
                mb-3
              ">

                Pickup

              </p>

              <h1 className="
                text-6xl
                font-black
                mb-2
              ">

                {load.pickup_city}

              </h1>

              <p className="
                text-2xl
                text-gray-400
              ">

                {load.pickup_country}

              </p>

            </div>

            {/* ARROW */}

            <div className="
              text-yellow-400
              text-8xl
            ">

              →

            </div>

            {/* DELIVERY */}

            <div className="text-right">

              <p className="
                text-gray-500
                uppercase
                text-sm
                mb-3
              ">

                Delivery

              </p>

              <h1 className="
                text-6xl
                font-black
                mb-2
              ">

                {load.delivery_city}

              </h1>

              <p className="
                text-2xl
                text-gray-400
              ">

                {load.delivery_country}

              </p>

            </div>

          </div>

        </div>

        {/* INFO GRID */}

        <div className="
          grid
          lg:grid-cols-2
          gap-8
          mb-10
        ">

          {/* LEFT */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
          ">

            <h2 className="
              text-3xl
              font-black
              mb-8
            ">

              Load Details

            </h2>

            <div className="
              space-y-6
            ">

              <div>

                <p className="
                  text-gray-500
                  mb-2
                ">

                  Distance

                </p>

                <h3 className="
                  text-3xl
                  font-black
                ">

                  {load.distance_km} KM

                </h3>

              </div>

              <div>

                <p className="
                  text-gray-500
                  mb-2
                ">

                  Price

                </p>

                <h3 className="
                  text-4xl
                  font-black
                  text-yellow-400
                ">

                  €{load.price}

                </h3>

              </div>

              <div>

                <p className="
                  text-gray-500
                  mb-2
                ">

                  Transport Type

                </p>

                <h3 className="
                  text-2xl
                  font-bold
                ">

                  {load.transport_type}

                </h3>

              </div>

              <div>

                <p className="
                  text-gray-500
                  mb-2
                ">

                  Cargo Type

                </p>

                <h3 className="
                  text-2xl
                  font-bold
                ">

                  {load.cargo_type}

                </h3>

              </div>

              <div>

                <p className="
                  text-gray-500
                  mb-2
                ">

                  Total Weight

                </p>

                <h3 className="
                  text-2xl
                  font-bold
                ">

                  {load.total_weight}

                </h3>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            p-8
          ">

            <h2 className="
              text-3xl
              font-black
              mb-8
            ">

              Additional Information

            </h2>

            <div className="
              space-y-8
            ">

              <div>

                <p className="
                  text-gray-500
                  mb-3
                ">

                  Loading Date

                </p>

                <h3 className="
                  text-2xl
                  font-bold
                ">

                  {load.loading_date}

                </h3>

              </div>

              <div>

                <p className="
                  text-gray-500
                  mb-3
                ">

                  Special Requirements

                </p>

                <p className="
                  text-gray-300
                  leading-relaxed
                  text-lg
                ">

                  {load.special_requirements ||
                    "No special requirements"}

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* CONTACT */}

        <div className="
          bg-yellow-400
          text-black
          rounded-[40px]
          p-10
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-8
        ">

          <div>

            <h2 className="
              text-5xl
              font-black
              mb-4
            ">

              Contact Company

            </h2>

            <p className="
              text-2xl
            ">

              Call directly to discuss
              transport details.

            </p>

          </div>

          <a
            href={`tel:${load.phone}`}
            className="
              bg-black
              text-white
              px-10
              py-5
              rounded-2xl
              text-2xl
              font-black
              hover:scale-105
              transition
            "
          >

            {load.phone}

          </a>

        </div>

      </div>

    </div>
  );
}