"use client";

import {
  useEffect,
  useState
} from "react";

export default function LoadsPage() {

  // =====================================================
  // STATES
  // =====================================================

  const [loads, setLoads] =
    useState<any[]>([]);

  const [
    filteredLoads,
    setFilteredLoads
  ] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // FILTERS

  const [
    pickupCountry,
    setPickupCountry
  ] = useState("");

  const [
    deliveryCountry,
    setDeliveryCountry
  ] = useState("");

  const [
    transportType,
    setTransportType
  ] = useState("");

  const [
    minPrice,
    setMinPrice
  ] = useState("");

  // =====================================================
  // FETCH LOADS
  // =====================================================

  useEffect(() => {

    fetchLoads();

  }, []);

  async function fetchLoads() {

    try {

      const response =
        await fetch(
          "http://127.0.0.1:8000/loads"
        );

      const data =
        await response.json();

      console.log(data);

      setLoads(data);

      setFilteredLoads(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // =====================================================
  // FILTERS
  // =====================================================

  useEffect(() => {

    const filtered = loads.filter(
      (load) => {

        const pickupMatch =

          pickupCountry === "" ||

          load.pickup_country ===
          pickupCountry;

        const deliveryMatch =

          deliveryCountry === "" ||

          load.delivery_country ===
          deliveryCountry;

        const transportMatch =

          transportType === "" ||

          load.transport_type ===
          transportType;

        const priceMatch =

          minPrice === "" ||

          load.price >=
          Number(minPrice);

        return (

          pickupMatch &&
          deliveryMatch &&
          transportMatch &&
          priceMatch
        );
      }
    );

    setFilteredLoads(filtered);

  }, [

    pickupCountry,

    deliveryCountry,

    transportType,

    minPrice,

    loads
  ]);

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

        Loading Loads...

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

      {/* HEADER */}

      <div className="
        max-w-7xl
        mx-auto
        mb-14
      ">

        <h1 className="
          text-7xl
          font-black
          mb-4
        ">

          LOAD MARKETPLACE

        </h1>

        <p className="
          text-gray-400
          text-2xl
          max-w-3xl
          mb-10
        ">

          Discover premium transport
          loads across Europe.

        </p>

        {/* FILTERS */}

        <div className="
          grid
          md:grid-cols-4
          gap-4
        ">

          <select
            value={pickupCountry}
            onChange={(e) =>
              setPickupCountry(
                e.target.value
              )
            }
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          >

            <option value="">
              Pickup Country
            </option>

            <option>
              Romania
            </option>

            <option>
              Germany
            </option>

            <option>
              France
            </option>

            <option>
              Spain
            </option>

          </select>

          <select
            value={deliveryCountry}
            onChange={(e) =>
              setDeliveryCountry(
                e.target.value
              )
            }
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          >

            <option value="">
              Delivery Country
            </option>

            <option>
              Romania
            </option>

            <option>
              Germany
            </option>

            <option>
              France
            </option>

            <option>
              Spain
            </option>

          </select>

          <select
            value={transportType}
            onChange={(e) =>
              setTransportType(
                e.target.value
              )
            }
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          >

            <option value="">
              Transport Type
            </option>

            <option>
              Frigo
            </option>

            <option>
              Curtain
            </option>

            <option>
              ADR
            </option>

            <option>
              Container
            </option>

          </select>

          <input
            type="number"
            placeholder="Min Price €"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(
                e.target.value
              )
            }
            className="
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
          />

        </div>

      </div>

      {/* LOADS */}

      <div className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-8
      ">

        {filteredLoads.map((load) => (

          <a
            href={`/load/${load.id}`}
            key={load.id}
            className="
              block
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-8
              backdrop-blur-xl
              hover:border-yellow-400/40
              transition
            "
          >

            {/* ROUTE */}

            <div className="
              flex
              items-center
              justify-between
              mb-8
            ">

              <div>

                <p className="
                  text-gray-500
                  text-sm
                  uppercase
                  mb-2
                ">

                  Pickup

                </p>

                <h2 className="
                  text-3xl
                  font-black
                ">

                  {load.pickup_city}

                </h2>

                <p className="
                  text-gray-400
                ">

                  {load.pickup_country}

                </p>

              </div>

              <div className="
                text-yellow-400
                text-5xl
              ">

                →

              </div>

              <div className="text-right">

                <p className="
                  text-gray-500
                  text-sm
                  uppercase
                  mb-2
                ">

                  Delivery

                </p>

                <h2 className="
                  text-3xl
                  font-black
                ">

                  {load.delivery_city}

                </h2>

                <p className="
                  text-gray-400
                ">

                  {load.delivery_country}

                </p>

              </div>

            </div>

            {/* INFO */}

            <div className="
              grid
              grid-cols-2
              gap-6
              mb-8
            ">

              <div className="
                bg-black/30
                rounded-2xl
                p-5
              ">

                <p className="
                  text-gray-500
                  text-sm
                  mb-2
                ">

                  Distance

                </p>

                <h3 className="
                  text-2xl
                  font-black
                ">

                  {load.distance_km} KM

                </h3>

              </div>

              <div className="
                bg-black/30
                rounded-2xl
                p-5
              ">

                <p className="
                  text-gray-500
                  text-sm
                  mb-2
                ">

                  Price

                </p>

                <h3 className="
                  text-2xl
                  font-black
                  text-yellow-400
                ">

                  €{load.price}

                </h3>

              </div>

            </div>

            {/* FOOTER */}

            <div className="
              flex
              items-center
              justify-between
              gap-4
            ">

              <div>

                <p className="
                  text-gray-500
                  text-sm
                ">

                  Loading Date

                </p>

                <p className="
                  text-lg
                  font-bold
                ">

                  {load.loading_date}

                </p>

              </div>

              <div
                className="
                  bg-yellow-400
                  text-black
                  px-8
                  py-4
                  rounded-2xl
                  font-black
                "
              >

                View Details

              </div>

            </div>

          </a>

        ))}

      </div>

    </div>
  );
}