import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function StationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");


  // ==========================================
  // GET STATION FROM BACKEND
  // ==========================================

  useEffect(() => {

    const fetchStation = async () => {

      try {

        setLoading(true);

        console.log("Station Details URL ID:", id);

        // ------------------------------------------
        // Convert ST001 / ST002 to numeric ID
        // ------------------------------------------

        const stationId = id.startsWith("ST")
          ? Number(id.replace("ST", ""))
          : Number(id);

        console.log("Backend Station ID:", stationId);


        if (!stationId || isNaN(stationId)) {

          throw new Error("Invalid station ID");

        }


        // ------------------------------------------
        // GET STATION
        // ------------------------------------------

        const response = await fetch(
          `http://localhost:8081/api/stations/${stationId}`
        );


        if (!response.ok) {

          throw new Error("Station not found");

        }


        const data = await response.json();

        console.log("Station from backend:", data);

        setStation(data);


      } catch (error) {

        console.error("Station error:", error);

        setStation(null);

      } finally {

        setLoading(false);

      }

    };


    fetchStation();

  }, [id]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <h3>
          Loading charging station...
        </h3>

        <p className="text-muted">
          Please wait.
        </p>

      </div>

    );

  }


  // ==========================================
  // STATION NOT FOUND
  // ==========================================

  if (!station) {

    return (

      <div className="container py-5 text-center">

        <h2>
          Station Not Found
        </h2>

        <p className="text-muted">
          We could not find this charging station.
        </p>

        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/map")}
        >
          ← Back to Stations
        </button>

      </div>

    );

  }


  // ==========================================
  // CONTINUE BOOKING
  // ==========================================

  const handleBooking = () => {

    if (!selectedDate || !selectedSlot) {

      alert(
        "Please select a date and charging slot."
      );

      return;

    }


    // ------------------------------------------
    // Convert database ID to ST format
    //
    // Example:
    // 2 → ST002
    // ------------------------------------------

    const stationCode =
      `ST${String(station.id).padStart(3, "0")}`;


    console.log(
      "Booking Station:",
      stationCode
    );


    // Navigate to Booking page

    navigate(`/booking/${stationCode}`);

  };


  // ==========================================
  // CALCULATIONS
  // ==========================================

  const availableSlots =
    station.availableSlots ?? 0;

  const totalSlots =
    station.totalSlots ?? 0;


  const availabilityPercentage =
    totalSlots > 0
      ? (availableSlots / totalSlots) * 100
      : 0;


  // ==========================================
  // TIME SLOTS
  // ==========================================

  const slots = [

    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"

  ];


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <main className="station-details-page">


      {/* ======================================
          BREADCRUMB
      ======================================= */}

      <section className="station-breadcrumb">

        <div className="container">

          <Link to="/">
            Home
          </Link>

          <i className="bi bi-chevron-right"></i>

          <span>
            Station Details
          </span>

        </div>

      </section>



      <section className="station-details-section">

        <div className="container">

          <div className="row g-4">


            {/* ==================================
                LEFT SIDE
            ================================== */}

            <div className="col-lg-8">

              <div className="station-main-card">


                {/* STATION ICON */}

                <div className="station-large-icon">

                  <i className="bi bi-ev-front-fill"></i>

                </div>



                {/* TITLE */}

                <div className="station-title-row">

                  <div>

                    <span className="station-status">

                      <span></span>

                      {station.active
                        ? "Available Now"
                        : "Currently Unavailable"}

                    </span>


                    <h1>
                      {station.name}
                    </h1>


                    <p>

                      <i className="bi bi-geo-alt-fill me-2"></i>

                      {station.location}

                    </p>

                  </div>


                  {/* RATING */}

                  <div className="station-rating">

                    <i className="bi bi-star-fill"></i>

                    <strong>
                      4.8
                    </strong>

                    <span>
                      (124)
                    </span>

                  </div>

                </div>



                {/* ==================================
                    STATION FEATURES
                ================================== */}

                <div className="station-feature-grid">


                  {/* CHARGER */}

                  <div className="feature-item">

                    <i className="bi bi-lightning-charge-fill"></i>

                    <span>
                      Charger
                    </span>

                    <strong>
                      {station.chargerType}
                    </strong>

                  </div>



                  {/* POWER */}

                  <div className="feature-item">

                    <i className="bi bi-speedometer2"></i>

                    <span>
                      Available Slots
                    </span>

                    <strong>
                      {availableSlots}
                    </strong>

                  </div>



                  {/* PRICE */}

                  <div className="feature-item">

                    <i className="bi bi-currency-rupee"></i>

                    <span>
                      Price
                    </span>

                    <strong>
                      ₹{station.pricePerUnit} / kWh
                    </strong>

                  </div>



                  {/* STATION ID */}

                  <div className="feature-item">

                    <i className="bi bi-hash"></i>

                    <span>
                      Station ID
                    </span>

                    <strong>
                      ST{String(station.id).padStart(3, "0")}
                    </strong>

                  </div>


                </div>



                {/* ==================================
                    AVAILABILITY
                ================================== */}

                <div className="availability-box">


                  <div>

                    <span>
                      Charging Slots
                    </span>

                    <strong>

                      {availableSlots} / {totalSlots}

                    </strong>

                  </div>


                  <div className="availability-progress">

                    <div
                      style={{
                        width: `${availabilityPercentage}%`
                      }}
                    ></div>

                  </div>


                  <small>

                    {availableSlots} slots currently available

                  </small>


                </div>


              </div>

            </div>



            {/* ==================================
                RIGHT SIDE - BOOKING
            ================================== */}

            <div className="col-lg-4">

              <div className="booking-card">


                {/* HEADER */}

                <div className="booking-card-header">

                  <span>
                    BOOK A CHARGING SLOT
                  </span>

                  <h2>
                    Reserve your slot
                  </h2>

                </div>



                {/* ==================================
                    DATE
                ================================== */}

                <div className="booking-field">

                  <label>
                    Select Date
                  </label>


                  <div className="booking-input">

                    <i className="bi bi-calendar3"></i>


                    <input
                      type="date"
                      value={selectedDate}
                      min={
                        new Date()
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) =>
                        setSelectedDate(
                          e.target.value
                        )
                      }
                    />

                  </div>

                </div>



                {/* ==================================
                    TIME SLOTS
                ================================== */}

                <div className="booking-field">

                  <label>
                    Select Time
                  </label>


                  <div className="slot-grid">

                    {slots.map((slot) => (

                      <button
                        key={slot}
                        type="button"
                        className={`slot-btn ${
                          selectedSlot === slot
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedSlot(slot)
                        }
                      >

                        {slot}

                      </button>

                    ))}

                  </div>

                </div>



                {/* ==================================
                    PRICE SUMMARY
                ================================== */}

                <div className="booking-summary">


                  <div>

                    <span>
                      Charging Rate
                    </span>

                    <strong>
                      ₹{station.pricePerUnit} / kWh
                    </strong>

                  </div>


                  <div>

                    <span>
                      Booking Fee
                    </span>

                    <strong>
                      ₹0
                    </strong>

                  </div>


                </div>



                {/* ==================================
                    CONTINUE BOOKING
                ================================== */}

                <button
                  className="confirm-booking-btn"
                  onClick={handleBooking}
                  disabled={!station.active}
                >

                  {station.active
                    ? "Continue Booking"
                    : "Station Unavailable"}

                  {station.active && (

                    <i className="bi bi-arrow-right ms-2"></i>

                  )}

                </button>



                {/* NOTE */}

                <p className="booking-note">

                  <i className="bi bi-shield-check me-1"></i>

                  Secure booking with EVChargeHub

                </p>


              </div>

            </div>


          </div>

        </div>

      </section>

    </main>

  );

}


export default StationDetails;