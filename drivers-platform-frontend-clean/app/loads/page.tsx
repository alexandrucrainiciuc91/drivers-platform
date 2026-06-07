"use client";

import {
  useEffect,
  useState
} from "react";

import Link from "next/link";

import {

  Country,

  City

} from "country-state-city";

import {

  Select,

  SelectContent,

  SelectItem,

  SelectTrigger,

  SelectValue

} from "@/components/ui/select";

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

  const [takingLoad, setTakingLoad] =
    useState<number | null>(null);

  // =====================================================
  // FILTERS
  // =====================================================

  const [
    pickupCountry,
    setPickupCountry
  ] = useState("");

  const [
    pickupCity,
    setPickupCity
  ] = useState("");

  const [
    deliveryCountry,
    setDeliveryCountry
  ] = useState("");

  const [
    deliveryCity,
    setDeliveryCity
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
  // EUROPE COUNTRIES
  // =====================================================

  const europeanCountryCodes = [

    "AL",
    "AD",
    "AT",
    "BY",
    "BE",
    "BA",
    "BG",
    "HR",
    "CY",
    "CZ",
    "DK",
    "EE",
    "FI",
    "FR",
    "DE",
    "GR",
    "HU",
    "IS",
    "IE",
    "IT",
    "LV",
    "LI",
    "LT",
    "LU",
    "MT",
    "MD",
    "MC",
    "ME",
    "NL",
    "MK",
    "NO",
    "PL",
    "PT",
    "RO",
    "SM",
    "RS",
    "SK",
    "SI",
    "ES",
    "SE",
    "CH",
    "TR",
    "UA",
    "GB",
    "VA"

  ];

  const europeanCountries =
    Country.getAllCountries()
      .filter(
        (country) =>

          europeanCountryCodes.includes(
            country.isoCode
          )
      );

  const pickupCities =
    pickupCountry
      ? City.getCitiesOfCountry(
          pickupCountry
        ) || []
      : [];

  const deliveryCities =
    deliveryCountry
      ? City.getCitiesOfCountry(
          deliveryCountry
        ) || []
      : [];

  // =====================================================
  // FETCH LOADS
  // =====================================================

  useEffect(() => {

    void fetchLoads();

  }, []);

  async function fetchLoads() {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/loads`,
          {
            headers: {

              Authorization:
                `Bearer ${token}`
            }
          }
        );

      const data =
        await response.json();

      setLoads(data);

      setFilteredLoads(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  }

  // =====================================================
  // TAKE LOAD
  // =====================================================

  async function takeLoad(
    loadId: number
  ) {

    try {

      setTakingLoad(loadId);

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(

          `${process.env.NEXT_PUBLIC_API_URL}/load/${loadId}/apply`,

          {
            method: "POST",

            headers: {

              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({

              message:
                "Driver interested in this load"

            })
          }
        );

      const data =
        await response.json();

      if (response.ok) {

        alert(
          "Application sent successfully"
        );

      } else {

        alert(
          data.detail ||
          "Application failed"
        );
      }

    } catch (error) {

      console.log(error);

      alert(
        "Server error"
      );

    } finally {

      setTakingLoad(null);
    }
  }

  // =====================================================
  // FILTERS
  // =====================================================

  useEffect(() => {

    const filtered = loads.filter(
      (load) => {

        const pickupCountryMatch =

          pickupCountry === "" ||

          load.pickup_country ===
          Country.getCountryByCode(
            pickupCountry
          )?.name;

        const pickupCityMatch =

          pickupCity === "" ||

          load.pickup_city ===
          pickupCity;

        const deliveryCountryMatch =

          deliveryCountry === "" ||

          load.delivery_country ===
          Country.getCountryByCode(
            deliveryCountry
          )?.name;

        const deliveryCityMatch =

          deliveryCity === "" ||

          load.delivery_city ===
          deliveryCity;

        const transportMatch =

          transportType === "" ||

          load.transport_type ===
          transportType;

        const priceMatch =

          minPrice === "" ||

          load.price >=
          Number(minPrice);

        return (

          pickupCountryMatch &&
          pickupCityMatch &&
          deliveryCountryMatch &&
          deliveryCityMatch &&
          transportMatch &&
          priceMatch
        );
      }
    );

    setFilteredLoads(filtered);

  }, [

    pickupCountry,

    pickupCity,

    deliveryCountry,

    deliveryCity,

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

      {/* BACK */}

      <div className="
        max-w-7xl
        mx-auto
        mb-8
      ">

        <Link
          href="/driver-dashboard"
          className="
            inline-flex
            items-center
            gap-2
            bg-white/5
            border
            border-white/10
            px-6
            py-3
            rounded-2xl
            font-bold
            hover:border-yellow-400/40
            transition
          "
        >

          ← Back To Dashboard

        </Link>

      </div>

      {/* HEADER */}

      <div className="
        max-w-7xl
        mx-auto
        mb-14
      ">

        <h1 className="
          text-4xl md:text-6xl xl:text-7xl
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
          md:grid-cols-1 md:grid-cols-2 xl:grid-cols-3
          lg:grid-cols-6
          gap-4
        ">

          {/* PICKUP COUNTRY */}

          <Select
            value={pickupCountry}
            onValueChange={
              setPickupCountry
            }
          >

            <SelectTrigger
              className="
                h-14
                rounded-2xl
                bg-white/5
                border-white/10
                text-white
              "
            >

              <SelectValue
                placeholder="
                  Pickup Country
                "
              />

            </SelectTrigger>

            <SelectContent
              className="
                bg-black
                border-white/10
                text-white
                max-h-72
              "
            >

              {europeanCountries.map(
                (country) => (

                  <SelectItem
                    key={country.isoCode}
                    value={country.isoCode}
                  >

                    {country.flag}
                    {" "}
                    {country.name}

                  </SelectItem>
                )
              )}

            </SelectContent>

          </Select>

          {/* PICKUP CITY */}

          <Select
            value={pickupCity}
            onValueChange={
              setPickupCity
            }
          >

            <SelectTrigger
              className="
                h-14
                rounded-2xl
                bg-white/5
                border-white/10
                text-white
              "
            >

              <SelectValue
                placeholder="
                  Pickup City
                "
              />

            </SelectTrigger>

            <SelectContent
              className="
                bg-black
                border-white/10
                text-white
                max-h-72
              "
            >

              {pickupCities.map(
                (city) => (

                  <SelectItem
                    key={city.name}
                    value={city.name}
                  >

                    {city.name}

                  </SelectItem>
                )
              )}

            </SelectContent>

          </Select>

          {/* DELIVERY COUNTRY */}

          <Select
            value={deliveryCountry}
            onValueChange={
              setDeliveryCountry
            }
          >

            <SelectTrigger
              className="
                h-14
                rounded-2xl
                bg-white/5
                border-white/10
                text-white
              "
            >

              <SelectValue
                placeholder="
                  Delivery Country
                "
              />

            </SelectTrigger>

            <SelectContent
              className="
                bg-black
                border-white/10
                text-white
                max-h-72
              "
            >

              {europeanCountries.map(
                (country) => (

                  <SelectItem
                    key={country.isoCode}
                    value={country.isoCode}
                  >

                    {country.flag}
                    {" "}
                    {country.name}

                  </SelectItem>
                )
              )}

            </SelectContent>

          </Select>

          {/* DELIVERY CITY */}

          <Select
            value={deliveryCity}
            onValueChange={
              setDeliveryCity
            }
          >

            <SelectTrigger
              className="
                h-14
                rounded-2xl
                bg-white/5
                border-white/10
                text-white
              "
            >

              <SelectValue
                placeholder="
                  Delivery City
                "
              />

            </SelectTrigger>

            <SelectContent
              className="
                bg-black
                border-white/10
                text-white
                max-h-72
              "
            >

              {deliveryCities.map(
                (city) => (

                  <SelectItem
                    key={city.name}
                    value={city.name}
                  >

                    {city.name}

                  </SelectItem>
                )
              )}

            </SelectContent>

          </Select>

          {/* TRANSPORT */}

          <Select
            value={transportType}
            onValueChange={
              setTransportType
            }
          >

            <SelectTrigger
              className="
                h-14
                rounded-2xl
                bg-white/5
                border-white/10
                text-white
              "
            >

              <SelectValue
                placeholder="
                  Transport Type
                "
              />

            </SelectTrigger>

            <SelectContent
              className="
                bg-black
                border-white/10
                text-white
              "
            >

              <SelectItem value="Frigo">
  ❄️ Frigo
</SelectItem>

<SelectItem value="Curtain">
  🚛 Curtain
</SelectItem>

<SelectItem value="ADR">
  ☣️ ADR
</SelectItem>

<SelectItem value="Container">
  📦 Container
</SelectItem>

<SelectItem value="Jumbo">
  📦 Jumbo
</SelectItem>

<SelectItem value="Mega">
  📦 Mega
</SelectItem>

              <SelectItem value="Tautliner">
  🚛 Tautliner
</SelectItem>

<SelectItem value="Box">
  📦 Box
</SelectItem>

<SelectItem value="Walking Floor">
  🚜 Walking Floor
</SelectItem>

            </SelectContent>

          </Select>

          {/* MIN PRICE */}

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
              h-14
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              text-white
              placeholder:text-gray-500
              focus:outline-none
              focus:border-yellow-400/40
            "
          />

        </div>

      </div>

      {/* LOADS */}

      <div className="
        max-w-7xl
        mx-auto
        grid
        lg:grid-cols-1 md:grid-cols-2
        gap-8
      ">

        {filteredLoads.map((load) => (

          <div
            key={load.id}
            className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-4 md:p-8
              backdrop-blur-xl
              hover:border-yellow-400/40
              transition
              duration-300
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
                text-2xl md:text-4xl xl:text-5xl
              ">

                →

              </div>

              <div className="
                text-right
              ">

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
              grid-cols-1 md:grid-cols-2
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

              <button
                onClick={() =>
                  takeLoad(load.id)
                }
                disabled={
                  takingLoad ===
                  load.id
                }
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

                {takingLoad === load.id

                  ? "TAKING..."

                  : "TAKE LOAD"}

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}