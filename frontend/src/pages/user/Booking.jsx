import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [bookingTime, setBookingTime] = useState("");
  const [duration, setDuration] = useState("30");

  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // GET LOGGED-IN USER
  // ==============================

  const storedUser = localStorage.getItem("loggedInUser");

  // ==============================
  // GET STATION ID
  // ==============================

  const stationId = id?.startsWith("ST")
    ? Number(id.replace("ST", ""))
    : Number(id);

  // ==============================
  // FETCH REAL STATION
  // ==============================

  useEffect(() => {
    const fetchStation = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Booking URL ID:", id);
        console.log("Backend Station ID:", stationId);

        if (!stationId || Number.isNaN(stationId)) {
          throw new Error("Invalid station ID.");
        }

        const response = await fetch(
          `http://localhost:8081/api/stations/${stationId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Charging station not found.");
          }

          throw new Error("Failed to load charging station.");
        }

        const data = await response.json();

        console.log("Station from backend:", data);

        setStation(data);
      } catch (error) {
        console.error("Station error:", error);

        setError(
          error.message || "Unable to load charging station."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStation();
  }, [id, stationId]);

  // ==============================
  // BOOKING
  // ==============================

  
const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    let user;

    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("User data error:", error);
      localStorage.removeItem("loggedInUser");
      navigate("/login");
      return;
    }

    if (!station) {
      setError("Charging station information is missing.");
      return;
    }

    if (station.availableSlots <= 0 || !station.active) {
      setError("This charging station is currently unavailable.");
      return;
    }

    if (!bookingTime) {
      setError("Please select booking date and time.");
      return;
    }

    if (!duration) {
      setError("Please select booking duration.");
      return;
    }

    try {
      setBookingLoading(true);

      const durationMinutes = Number(duration);

      const totalAmount =
        Number(station.pricePerUnit || 0) * durationMinutes;

      const bookingData = {
        bookingTime: bookingTime,
        duration: durationMinutes,
        totalAmount: totalAmount,
        status: "CONFIRMED",

        // Backend uses the authenticated session
        // to determine the actual user.
        chargingStation: {
          id: Number(station.id),
        },
      };

      console.log("Creating booking:", bookingData);

      const response = await fetch(
        "http://localhost:8081/api/bookings",
        {
          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(bookingData),
        }
      );

      // Read response safely, even if it is empty.
      const responseText = await response.text();

      let data = null;

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          console.error(
            "Backend returned non-JSON response:",
            responseText
          );
        }
      }

      console.log("Booking status:", response.status);
      console.log("Booking response:", data || responseText);

      if (!response.ok) {
        throw new Error(
          data?.message ||
          data?.error ||
          responseText ||
          `Booking failed. HTTP status: ${response.status}`
        );
      }

      if (!data || !data.id) {
        throw new Error(
          "Booking response did not contain a booking ID. Check the backend response."
        );
      }

      alert("Booking created successfully!");

      navigate(`/payment/${data.id}`);

    } catch (error) {
      console.error("Booking error:", error);

      setError(
        error.message || "Unable to create booking."
      );

    } finally {
      setBookingLoading(false);
    }
  };

  // ==============================
  // LOADING SCREEN
  // ==============================

  if (loading) {
    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border text-success"
          role="status"
        ></div>

        <p className="mt-3 text-muted">
          Loading charging station...
        </p>

      </div>
    );
  }

  // ==============================
  // ERROR SCREEN
  // ==============================

  if (error && !station) {
    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-success"
          onClick={() => navigate("/stations")}
        >
          ← Back to Stations
        </button>

      </div>
    );
  }

  // ==============================
  // STATION NOT FOUND
  // ==============================

  if (!station) {
    return (
      <div className="container py-5 text-center">

        <h3>
          Charging Station Not Found
        </h3>

        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/stations")}
        >
          Back to Stations
        </button>

      </div>
    );
  }

  // ==============================
  // TOTAL AMOUNT
  // ==============================

  const totalAmount =
    Number(station.pricePerUnit || 0) *
    Number(duration || 0);

  return (
    <main className="booking-page">

      <div className="container py-5">

        {/* ==============================
            PAGE HEADER
        ============================== */}

        <div className="mb-4">

          <span className="text-success fw-semibold">
            EVCHARGEHUB
          </span>

          <h1 className="fw-bold mt-2">
            Book Charging Station
          </h1>

          <p className="text-muted">
            Select your preferred charging time and duration.
          </p>

        </div>


        {/* ==============================
            ERROR
        ============================== */}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}


        <div className="row g-4">

          {/* ==============================
              STATION INFORMATION
          ============================== */}

          <div className="col-lg-5">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <div className="d-flex align-items-center mb-4">

                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px",
                      background: "#e8f7ef",
                      fontSize: "25px",
                    }}
                  >
                    ⚡
                  </div>

                  <div className="ms-3">

                    <h4 className="mb-1">
                      {station.name}
                    </h4>

                    <p className="text-muted mb-0">
                      📍 {station.location}
                    </p>

                  </div>

                </div>


                <hr />


                <div className="mb-3">

                  <small className="text-muted">
                    Charger Type
                  </small>

                  <div className="fw-semibold">
                    ⚡ {station.chargerType}
                  </div>

                </div>


                <div className="mb-3">

                  <small className="text-muted">
                    Price
                  </small>

                  <div className="fw-semibold">
                    ₹{station.pricePerUnit}/kWh
                  </div>

                </div>


                <div className="mb-3">

                  <small className="text-muted">
                    Available Slots
                  </small>

                  <div className="fw-semibold text-success">
                    {station.availableSlots}
                  </div>

                </div>


                <div>

                  <small className="text-muted">
                    Station Status
                  </small>

                  <div>

                    <span
                      className={`badge ${
                        station.active
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {station.active
                        ? "Available"
                        : "Unavailable"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* ==============================
              BOOKING FORM
          ============================== */}

          <div className="col-lg-7">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-4">
                  Booking Details
                </h4>


                <form onSubmit={handleBooking}>

                  {/* DATE & TIME */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Select Date & Time
                    </label>

                    <input
                      type="datetime-local"
                      className="form-control"
                      value={bookingTime}
                      onChange={(e) =>
                        setBookingTime(e.target.value)
                      }
                      required
                    />

                  </div>


                  {/* DURATION */}

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Charging Duration
                    </label>

                    <select
                      className="form-select"
                      value={duration}
                      onChange={(e) =>
                        setDuration(e.target.value)
                      }
                    >

                      <option value="30">
                        30 Minutes
                      </option>

                      <option value="60">
                        1 Hour
                      </option>

                      <option value="90">
                        1.5 Hours
                      </option>

                      <option value="120">
                        2 Hours
                      </option>

                    </select>

                  </div>


                  {/* PRICE */}

                  <div
                    className="p-3 rounded mb-4"
                    style={{
                      background: "#f0faf4",
                    }}
                  >

                    <div className="d-flex justify-content-between">

                      <span>
                        Charging Rate
                      </span>

                      <strong>
                        ₹{station.pricePerUnit}/kWh
                      </strong>

                    </div>


                    <div className="d-flex justify-content-between mt-2">

                      <span>
                        Duration
                      </span>

                      <strong>
                        {duration} minutes
                      </strong>

                    </div>


                    <hr />


                    <div className="d-flex justify-content-between">

                      <strong>
                        Estimated Amount
                      </strong>

                      <strong className="text-success fs-5">
                        ₹{totalAmount.toFixed(2)}
                      </strong>

                    </div>

                  </div>


                  {/* BOOK BUTTON */}

                  <button
                    type="submit"
                    className="btn btn-success w-100 py-3"
                    disabled={
                      bookingLoading ||
                      station.availableSlots <= 0 ||
                      !station.active
                    }
                  >

                    {bookingLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking →
                      </>
                    )}

                  </button>


                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => navigate("/stations")}
                  >
                    ← Back to Stations
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Booking;