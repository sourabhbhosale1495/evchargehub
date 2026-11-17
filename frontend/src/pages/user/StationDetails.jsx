import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const stationData = {
  1: {
    name: "EVCharge Central",
    location: "Baner, Pune",
    address: "Baner Road, Pune, Maharashtra",
    chargerType: "DC Fast Charging",
    power: "60 kW",
    price: "₹12 / kWh",
    distance: "2.4 km",
    availablePorts: 4,
    totalPorts: 6,
  },
  2: {
    name: "Green Power Station",
    location: "Aundh, Pune",
    address: "Aundh Road, Pune, Maharashtra",
    chargerType: "Ultra Fast Charging",
    power: "120 kW",
    price: "₹15 / kWh",
    distance: "3.1 km",
    availablePorts: 3,
    totalPorts: 5,
  },
  3: {
    name: "EcoCharge Point",
    location: "Wakad, Pune",
    address: "Wakad Road, Pune, Maharashtra",
    chargerType: "AC Charging",
    power: "22 kW",
    price: "₹10 / kWh",
    distance: "4.7 km",
    availablePorts: 5,
    totalPorts: 8,
  },
};

const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

function StationDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const station = stationData[id] || stationData[1];

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleBooking = () => {

    if (!selectedDate || !selectedSlot) {

      alert("Please select a date and charging slot.");

      return;
    }

    // Go to Booking page
    navigate(`/booking/${id}`);

  };

  return (
    <main className="station-details-page">

      {/* Breadcrumb */}
      <section className="station-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link>
          <i className="bi bi-chevron-right"></i>
          <span>Station Details</span>
        </div>
      </section>

      <section className="station-details-section">

        <div className="container">

          <div className="row g-4">

            {/* Left Side */}
            <div className="col-lg-8">

              <div className="station-main-card">

                <div className="station-large-icon">
                  <i className="bi bi-ev-front-fill"></i>
                </div>

                <div className="station-title-row">

                  <div>
                    <span className="station-status">
                      <span></span>
                      Available Now
                    </span>

                    <h1>{station.name}</h1>

                    <p>
                      <i className="bi bi-geo-alt-fill me-2"></i>
                      {station.address}
                    </p>
                  </div>

                  <div className="station-rating">
                    <i className="bi bi-star-fill"></i>
                    <strong>4.8</strong>
                    <span>(124)</span>
                  </div>

                </div>

                {/* Station Features */}
                <div className="station-feature-grid">

                  <div className="feature-item">
                    <i className="bi bi-lightning-charge-fill"></i>
                    <span>Charger</span>
                    <strong>{station.chargerType}</strong>
                  </div>

                  <div className="feature-item">
                    <i className="bi bi-speedometer2"></i>
                    <span>Power</span>
                    <strong>{station.power}</strong>
                  </div>

                  <div className="feature-item">
                    <i className="bi bi-currency-rupee"></i>
                    <span>Price</span>
                    <strong>{station.price}</strong>
                  </div>

                  <div className="feature-item">
                    <i className="bi bi-signpost-2-fill"></i>
                    <span>Distance</span>
                    <strong>{station.distance}</strong>
                  </div>

                </div>

                {/* Availability */}
                <div className="availability-box">

                  <div>
                    <span>Charging Ports</span>
                    <strong>
                      {station.availablePorts} / {station.totalPorts}
                    </strong>
                  </div>

                  <div className="availability-progress">
                    <div
                      style={{
                        width: `${
                          (station.availablePorts /
                            station.totalPorts) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <small>
                    {station.availablePorts} ports currently available
                  </small>

                </div>

              </div>

            </div>

            {/* Right Side - Booking */}
            <div className="col-lg-4">

              <div className="booking-card">

                <div className="booking-card-header">
                  <span>BOOK A CHARGING SLOT</span>
                  <h2>Reserve your slot</h2>
                </div>

                {/* Date */}
                <div className="booking-field">

                  <label>
                    Select Date
                  </label>

                  <div className="booking-input">

                    <i className="bi bi-calendar3"></i>

                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) =>
                        setSelectedDate(e.target.value)
                      }
                    />

                  </div>

                </div>

                {/* Slots */}
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

                {/* Price */}
                <div className="booking-summary">

                  <div>
                    <span>Charging Rate</span>
                    <strong>{station.price}</strong>
                  </div>

                  <div>
                    <span>Booking Fee</span>
                    <strong>₹0</strong>
                  </div>

                </div>

                <button
                  className="confirm-booking-btn"
                  onClick={handleBooking}
                >
                  Continue Booking
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>

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