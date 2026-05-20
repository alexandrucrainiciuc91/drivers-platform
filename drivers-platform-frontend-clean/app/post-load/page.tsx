"use client";

import { useState } from "react";

export default function PostLoadPage() {

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
          "https://drivers-platform-production.up.railway.app/create-load",
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

  return (

    <div className="
      min-h-screen
      bg-black
      text-white
      px-6
      py-12
    ">

      <div className="
        max-w-4xl
        mx-auto
      ">

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
          mb-10
        ">

          Publish transport loads
          for drivers and carriers.

        </p>

        <form
          onSubmit={handleSubmit}
          className="
            grid
            md:grid-cols-2
            gap-6
          "
        >

          {/* PICKUP COUNTRY */}

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
            required
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
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
            required
          />

          {/* DELIVERY COUNTRY */}

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
            required
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
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
            required
          />

          {/* KM */}

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
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
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
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
            "
            required
          />

          {/* TRANSPORT TYPE */}

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
            required
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

          {/* CARGO TYPE */}

          <select
            value={cargoType}
            onChange={(e) =>
              setCargoType(
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
            required
          >

            <option value="">
              Cargo Type
            </option>

            <option>
              General Cargo
            </option>

            <option>
              Food
            </option>

            <option>
              ADR
            </option>

            <option>
              Cars
            </option>

          </select>

          {/* WEIGHT */}

          <select
            value={totalWeight}
            onChange={(e) =>
              setTotalWeight(
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
            required
          >

            <option value="">
              Total Weight
            </option>

            <option>
              0-3.5T
            </option>

            <option>
              3.5-7.5T
            </option>

            <option>
              7.5-24T
            </option>

            <option>
              24T+
            </option>

          </select>

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
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
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
              bg-white/5
              border
              border-white/10
              rounded-2xl
              px-5
              py-4
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
              min-h-[140px]
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