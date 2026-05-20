"use client";

import { useState } from "react";

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
                pickupCountry,

              pickup_city:
                pickupCity,

              delivery_country:
                deliveryCountry,

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

      console.log(data);

      if (response.ok) {

        setMessage(
          "Load posted successfully"
        );

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
        max-w-5xl
        mx-auto
      ">

        {/* HEADER */}

        <h1 className="
          text-6xl
          font-black
          mb-4
        ">

          POST LOAD

        </h1>

        <p className="
          text-gray-400
          text-xl
          mb-12
        ">

          Publish transport loads
          for drivers and carriers.

        </p>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            grid
            md:grid-cols-2
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
              "
            >

              <SelectItem value="Romania">
                🇷🇴 Romania
              </SelectItem>

              <SelectItem value="Germany">
                🇩🇪 Germany
              </SelectItem>

              <SelectItem value="France">
                🇫🇷 France
              </SelectItem>

              <SelectItem value="Spain">
                🇪🇸 Spain
              </SelectItem>

            </SelectContent>

          </Select>

          {/* PICKUP CITY */}

          <input
            type="text"
            placeholder="Pickup City"
            value={pickupCity}
            onChange={(e) =>
              setPickupCity(
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
            "
            required
          />

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
              "
            >

              <SelectItem value="Romania">
                🇷🇴 Romania
              </SelectItem>

              <SelectItem value="Germany">
                🇩🇪 Germany
              </SelectItem>

              <SelectItem value="France">
                🇫🇷 France
              </SelectItem>

              <SelectItem value="Spain">
                🇪🇸 Spain
              </SelectItem>

            </SelectContent>

          </Select>

          {/* DELIVERY CITY */}

          <input
            type="text"
            placeholder="Delivery City"
            value={deliveryCity}
            onChange={(e) =>
              setDeliveryCity(
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
            "
            required
          />

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
              placeholder:text-gray-500
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
              placeholder:text-gray-500
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
              placeholder:text-gray-500
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
              md:col-span-2
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
              min-h-[160px]
              text-white
              placeholder:text-gray-500
            "
          />

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              md:col-span-2
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
          ">

            {message}

          </div>

        )}

      </div>

    </div>
  );
}