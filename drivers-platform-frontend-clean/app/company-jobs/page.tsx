"use client";

import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import BackToDashboard from "../components/BackToDashboard";

export default function CompanyJobsPage() {

  const [jobs, setJobs] =
    useState<any[]>([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [pickupCountry, setPickupCountry] =
    useState("");

  const [deliveryCountry, setDeliveryCountry] =
    useState("");

  const [transportType, setTransportType] =
    useState("");

  const [salary, setSalary] =
    useState("");

  const [
    experienceRequired,
    setExperienceRequired
  ] = useState("");

  const [adrRequired,
    setAdrRequired] =
    useState(false);

  const [truckType,
    setTruckType] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // ============================================
  // AUTH
  // ============================================

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const userType =
      localStorage.getItem("user_type");

    if (!token) {

      window.location.href =
        "/login";

      return;
    }

    if (userType !== "company") {

      window.location.href =
        "/";

      return;
    }

    fetchJobs();

  }, []);

  // ============================================
  // FETCH JOBS
  // ============================================

  async function fetchJobs() {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      "https://drivers-platform-production.up.railway.app/company/jobs",
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    const data =
      await response.json();

    console.log(data);

    setJobs(data);
  }

  // ============================================
  // CREATE JOB
  // ============================================

  async function createJob() {

    try {

      setLoading(true);

      setMessage("");

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "https://drivers-platform-production.up.railway.app/job-post",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`
          },

          body: JSON.stringify({

            title,

            description,

            pickup_country:
              pickupCountry,

            delivery_country:
              deliveryCountry,

            transport_type:
              transportType,

            salary:
              Number(salary),

            experience_required:
              Number(experienceRequired),

            adr_required:
              adrRequired,

            truck_type:
              truckType
          })
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.error) {

        setMessage(data.error);

        return;
      }

      setMessage(
        "Job created successfully"
      );

      fetchJobs();

      // RESET

      setTitle("");

      setDescription("");

      setPickupCountry("");

      setDeliveryCountry("");

      setTransportType("");

      setSalary("");

      setExperienceRequired("");

      setAdrRequired(false);

      setTruckType("");

    } catch (error) {

      console.log(error);

      setMessage(
        "Server error"
      );

    } finally {

      setLoading(false);
    }
  }

  // ============================================
  // DELETE JOB
  // ============================================

  async function deleteJob(
    jobId: number
  ) {

    const token =
      localStorage.getItem("token");

    const response = await fetch(
      `https://drivers-platform-production.up.railway.app/job-post/${jobId}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    const data =
      await response.json();

    console.log(data);

    fetchJobs();
  }

  // ============================================
  // UI
  // ============================================

  return (

    <div className="flex bg-black text-white min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="flex-1 overflow-hidden relative">

        {/* BACKGROUND */}

        <div className="fixed inset-0 z-0">

          <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px]" />

          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-orange-500/10 blur-[180px]" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 p-10">

          <BackToDashboard />

          {/* HEADER */}

          <div className="flex items-center justify-between mb-12 gap-10">

            <div>

              <p className="text-yellow-400 tracking-[8px] uppercase mb-4">

                Logistics Hiring Center

              </p>

              <h1 className="text-7xl font-black leading-none">

                COMPANY JOBS

              </h1>

              <p className="text-gray-400 mt-6 text-2xl max-w-3xl">

                Create transport jobs and hire professional drivers across Europe.

              </p>

            </div>

            <div className="hidden xl:block">

              <img
                src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1200&auto=format&fit=crop"
                className="w-[520px] h-[300px] object-cover rounded-[40px] border border-white/10"
              />

            </div>

          </div>

          {/* GRID */}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

            {/* CREATE FORM */}

            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-10">

              <h2 className="text-4xl font-black mb-10">

                Create New Job

              </h2>

              <div className="grid grid-cols-2 gap-5">

                <input
                  type="text"
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
                />

                <input
                  type="text"
                  placeholder="Truck Type"
                  value={truckType}
                  onChange={(e) =>
                    setTruckType(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
                />

                <input
                  type="text"
                  placeholder="Pickup Country"
                  value={pickupCountry}
                  onChange={(e) =>
                    setPickupCountry(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
                />

                <input
                  type="text"
                  placeholder="Delivery Country"
                  value={deliveryCountry}
                  onChange={(e) =>
                    setDeliveryCountry(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
                />

                <input
                  type="text"
                  placeholder="Transport Type"
                  value={transportType}
                  onChange={(e) =>
                    setTransportType(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
                />

                <input
                  type="number"
                  placeholder="Salary €"
                  value={salary}
                  onChange={(e) =>
                    setSalary(e.target.value)
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
                />

                <input
                  type="number"
                  placeholder="Experience Required"
                  value={experienceRequired}
                  onChange={(e) =>
                    setExperienceRequired(
                      e.target.value
                    )
                  }
                  className="bg-black/40 border border-white/10 rounded-2xl px-5 py-4"
                />

                <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-2xl px-5 py-4">

                  <input
                    type="checkbox"
                    checked={adrRequired}
                    onChange={(e) =>
                      setAdrRequired(
                        e.target.checked
                      )
                    }
                  />

                  <p>ADR Required</p>

                </div>

              </div>

              <textarea
                placeholder="Job Description"
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full h-40 mt-5 bg-black/40 border border-white/10 rounded-2xl p-5"
              />

              <button
                onClick={createJob}
                disabled={loading}
                className="
                  w-full
                  mt-8
                  bg-yellow-400
                  text-black
                  py-5
                  rounded-2xl
                  font-black
                  text-xl
                  hover:scale-[1.02]
                  transition-all
                "
              >

                {loading
                  ? "Creating..."
                  : "Create Transport Job"}

              </button>

              {message && (

                <div className="mt-6 text-yellow-400 text-lg">

                  {message}

                </div>

              )}

            </div>

            {/* JOB LIST */}

            <div className="space-y-6 max-h-[900px] overflow-y-auto pr-3">

              {jobs.map((job) => (

                <div
                  key={job.id}
                  className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-2xl"
                >

                  <div className="flex items-start justify-between gap-6">

                    <div>

                      <p className="text-yellow-400 uppercase tracking-[4px] mb-3">

                        Active Job

                      </p>

                      <h2 className="text-4xl font-black">

                        {job.title}

                      </h2>

                      <p className="text-gray-400 mt-4 text-lg">

                        {job.description}

                      </p>

                    </div>

                    <div className="bg-yellow-400 text-black px-6 py-4 rounded-2xl font-black text-2xl">

                      €{job.salary}

                    </div>

                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-8">

                    <div className="bg-black/30 rounded-2xl p-5">

                      <p className="text-gray-400 mb-2">

                        Route

                      </p>

                      <h3 className="text-2xl font-bold">

                        {job.pickup_country}
                        {" → "}
                        {job.delivery_country}

                      </h3>

                    </div>

                    <div className="bg-black/30 rounded-2xl p-5">

                      <p className="text-gray-400 mb-2">

                        Truck

                      </p>

                      <h3 className="text-2xl font-bold">

                        {job.truck_type}

                      </h3>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-4 mt-8">

                    <button
                      onClick={() =>
                        window.location.href =
                          `/job/${job.id}`
                      }
                      className="
                        bg-yellow-400
                        text-black
                        px-6
                        py-3
                        rounded-xl
                        font-black
                      "
                    >

                      View

                    </button>

                    <button
                      onClick={() =>
                        deleteJob(job.id)
                      }
                      className="
                        bg-red-500
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-black
                      "
                    >

                      Delete

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}