"use client";

import { useState } from "react";

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

export default function PostLoadPage() {

  // =====================================================
  // STATES
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
    distanceKm,
    setDistanceKm
  ] = useState("");

  const [price, setPrice] =
    useState("");

  const [
    transportType,
    setTransportType
  ] = useState("");

  const [
    cargoType,
    setCargoType
  ] = useState("");

  const [
    totalWeight,
    setTotalWeight
  ] = useState("");

  const [
    specialRequirements,
    setSpecialRequirements
  ] = useState("");

  const [
    loadingDate,
    setLoadingDate
  ] = useState("");

  const [phone, setPhone] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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
  // SUBMIT
  // =====================================================

  async function handleSubmit(
    e: any
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const token =
          localStorage.getItem(
              "token"
          );

      const response =
          await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/create-load`,
              {
                method: "POST",

                headers: {

                  "Content-Type":
                      "application/json",

                  Authorization:
                      `Bearer ${token}`
                },

                body: JSON.stringify({

                 pickup_country:
  Country.getCountryByCode(
    pickupCountry
  )?.name || pickupCountry,

                  pickup_city:
                  pickupCity,

                  delivery_country:
  Country.getCountryByCode(
    deliveryCountry
  )?.name || deliveryCountry,

                  delivery_city:
                  deliveryCity,

                  distance_km:
                      Number(distanceKm),

                  price:
                      Number(price),

                  transport_type:
                  transportType,

                  cargo_type:
                  cargoType,

                  total_weight:
                  totalWeight,

                  special_requirements:
                  specialRequirements,

                  loading_date:
                  loadingDate,

                  phone
                })
              }
          );

      const data =
          await response.json();

      if (response.ok) {

        // ============================================
        // SUCCESS MESSAGE
        // ============================================

        setMessage(
            "Load posted successfully"
        );

        // ============================================
        // RESET FORM
        // ============================================

        setPickupCountry("");

        setPickupCity("");

        setDeliveryCountry("");

        setDeliveryCity("");

        setDistanceKm("");

        setPrice("");

        setTransportType("");

        setCargoType("");

        setTotalWeight("");

        setSpecialRequirements("");

        setLoadingDate("");

        setPhone("");

        // ============================================
        // REDIRECT
        // ============================================

        setTimeout(() => {

          window.location.href =
              "/loads";

        }, 1200);


      } else {

        setMessage(
          data.detail ||
          "Error posting load"
        );
      }

    } catch (error) {

      console.log(error);

      setMessage(
        "Server error"
      );

    } finally {

      setLoading(false);
    }
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
        max-w-7xl
        mx-auto
      ">

        {/* HEADER */}

        <h1 className="
          text-7xl
          font-black
          mb-4
        ">

          POST LOAD

        </h1>

        <p className="
          text-gray-400
          text-2xl
          mb-12
          max-w-3xl
        ">

          Publish transport loads
          for drivers and carriers.

        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            grid
            lg:grid-cols-2
            gap-6
          "
        >

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

          {/* DISTANCE */}

          <input
            type="number"
            placeholder="Distance KM"
            value={distanceKm}
            onChange={(e) =>
              setDistanceKm(
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
            "
            required
          />

          {/* PRICE */}

          <input
            type="number"
            placeholder="Price €"
            value={price}
            onChange={(e) =>
              setPrice(
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
            "
            required
          />

          {/* TRANSPORT TYPE */}

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

            </SelectContent>

          </Select>

          {/* CARGO TYPE */}

          <Select
            value={cargoType}
            onValueChange={
              setCargoType
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
                  Cargo Type
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

              <SelectItem value="General Cargo">
                📦 General Cargo
              </SelectItem>

              <SelectItem value="Food">
                🍎 Food
              </SelectItem>

              <SelectItem value="ADR">
                ☣️ ADR
              </SelectItem>

              <SelectItem value="Cars">
                🚗 Cars
              </SelectItem>

            </SelectContent>

          </Select>

          {/* WEIGHT */}

          <Select
            value={totalWeight}
            onValueChange={
              setTotalWeight
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
                  Total Weight
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

              <SelectItem value="0-3.5T">
                0-3.5T
              </SelectItem>

              <SelectItem value="3.5-7.5T">
                3.5-7.5T
              </SelectItem>

              <SelectItem value="7.5-24T">
                7.5-24T
              </SelectItem>

              <SelectItem value="24T+">
                24T+
              </SelectItem>

            </SelectContent>

          </Select>

          {/* DATE */}

          <input
            type="date"
            value={loadingDate}
            onChange={(e) =>
              setLoadingDate(
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
            "
            required
          />

          {/* PHONE */}

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(
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
            "
            required
          />

          {/* REQUIREMENTS */}

          <textarea
            placeholder="Special Requirements"
            value={specialRequirements}
            onChange={(e) =>
              setSpecialRequirements(
                e.target.value
              )
            }
            className="
              lg:col-span-2
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              min-h-[180px]
              text-white
            "
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              lg:col-span-2
              bg-yellow-400
              text-black
              py-5
              rounded-2xl
              font-black
              text-xl
              hover:scale-[1.01]
              transition
            "
          >

            {loading
              ? "Posting..."
              : "POST LOAD"}

          </button>

        </form>

        {/* MESSAGE */}

        {message && (

          <div className="
            mt-8
            text-yellow-400
            font-bold
            text-xl
          ">

            {message}

          </div>

        )}

      </div>

    </div>
  );
}