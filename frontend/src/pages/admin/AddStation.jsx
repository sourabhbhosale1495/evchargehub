import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddStation() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    stationName: "",
    stationId: "",
    address: "",
    city: "Pune",
    state: "Maharashtra",
    pincode: "",
    latitude: "",
    longitude: "",
    chargerType: "DC Fast Charger",
    numberOfPorts: "",
    powerCapacity: "",
    pricePerKwh: "",
    openingTime: "06:00",
    closingTime: "23:00",
    status: "Active",
    description: ""
  });


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const stationData = {
        name: formData.stationName,
        location: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,

        chargerType: formData.chargerType,

        pricePerUnit: Number(formData.pricePerKwh),

        totalSlots: Number(formData.numberOfPorts),

        availableSlots: Number(formData.numberOfPorts),

        latitude: Number(formData.latitude),

        longitude: Number(formData.longitude),

        active: formData.status === "Active"
      };

      console.log("Sending station:", stationData);

      const response = await fetch(
        "https://evchargehub-backend.onrender.com/api/stations",
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(stationData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add charging station");
      }

      const data = await response.json();

      console.log("Station created:", data);

      alert("Charging station added successfully! ⚡");

      navigate("/admin/stations");

    } catch (error) {

      console.error("Add station error:", error);

      alert("Failed to add charging station. Please try again.");

    }

  };


  const handleReset = () => {

    setFormData({
      stationName: "",
      stationId: "",
      address: "",
      city: "Pune",
      state: "Maharashtra",
      pincode: "",
      latitude: "",
      longitude: "",
      chargerType: "DC Fast Charger",
      numberOfPorts: "",
      powerCapacity: "",
      pricePerKwh: "",
      openingTime: "06:00",
      closingTime: "23:00",
      status: "Active",
      description: ""
    });

  };


  return (

    <main className="admin-page">

      <div className="admin-layout">


        {/* ================= SIDEBAR ================= */}

        <aside className="admin-sidebar">

          <div className="admin-logo">

            <div className="admin-logo-icon">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>

            <div>

              <strong>
                EVCharge<span>Hub</span>
              </strong>

              <small>ADMIN PANEL</small>

            </div>

          </div>


          <nav className="admin-nav">

            <span className="admin-nav-title">
              OVERVIEW
            </span>


            <Link
              to="/admin"
              className="admin-nav-link"
            >
              <i className="bi bi-grid-1x2-fill"></i>
              Dashboard
            </Link>


            <span className="admin-nav-title">
              MANAGEMENT
            </span>


            <Link
              to="/admin/stations"
              className="admin-nav-link active"
            >
              <i className="bi bi-ev-front"></i>
              Charging Stations
            </Link>


            <Link
              to="/admin/bookings"
              className="admin-nav-link"
            >
              <i className="bi bi-calendar-check"></i>
              Bookings
            </Link>


            <Link
              to="/admin/users"
              className="admin-nav-link"
            >
              <i className="bi bi-people"></i>
              Users
            </Link>


            <Link
              to="/admin/vehicles"
              className="admin-nav-link"
            >
              <i className="bi bi-car-front"></i>
              Vehicles
            </Link>


            <Link
              to="/admin/payments"
              className="admin-nav-link"
            >
              <i className="bi bi-credit-card"></i>
              Payments
            </Link>


            <span className="admin-nav-title">
              ANALYTICS
            </span>


            <Link
              to="/admin/reports"
              className="admin-nav-link"
            >
              <i className="bi bi-bar-chart"></i>
              Reports
            </Link>

          </nav>


          <div className="admin-sidebar-bottom">

            <Link
              to="/admin/settings"
              className="admin-nav-link"
            >
              <i className="bi bi-gear"></i>
              Settings
            </Link>


            <Link
              to="/login"
              className="admin-nav-link admin-logout"
            >
              <i className="bi bi-box-arrow-left"></i>
              Logout
            </Link>

          </div>

        </aside>


        {/* ================= MAIN CONTENT ================= */}

        <section className="admin-content">


          {/* TOPBAR */}

          <header className="admin-topbar">

            <div className="admin-page-title">

              <span>MANAGEMENT / STATIONS</span>

              <h1>
                Add New Station
              </h1>

            </div>


            <div className="admin-top-actions">

              <button className="admin-icon-btn">

                <i className="bi bi-bell"></i>

                <span className="notification-dot"></span>

              </button>


              <div className="admin-profile">

                <div className="admin-avatar">
                  AD
                </div>

                <div>

                  <strong>Admin</strong>

                  <span>Administrator</span>

                </div>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>

          </header>


          {/* ================= PAGE HEADER ================= */}

          <div className="add-station-header">

            <div>

              <Link
                to="/admin/stations"
                className="back-to-stations"
              >

                <i className="bi bi-arrow-left"></i>

                Back to Charging Stations

              </Link>


              <h2>
                Create Charging Station
              </h2>

              <p>
                Add a new EV charging station to your network.
              </p>

            </div>

          </div>


          {/* ================= FORM ================= */}

          <form
            className="add-station-form"
            onSubmit={handleSubmit}
          >


            {/* ======================================
                BASIC INFORMATION
            ====================================== */}

            <section className="station-form-card">

              <div className="station-form-card-header">

                <div className="station-form-section-icon">

                  <i className="bi bi-ev-front-fill"></i>

                </div>

                <div>

                  <h3>
                    Station Information
                  </h3>

                  <p>
                    Basic details about the charging station.
                  </p>

                </div>

              </div>


              <div className="station-form-grid">


                <div className="station-form-group station-form-full">

                  <label>
                    Station Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="stationName"
                    value={formData.stationName}
                    onChange={handleChange}
                    placeholder="e.g. EVCharge Central"
                    required
                  />

                </div>


                <div className="station-form-group">

                  <label>
                    Station ID
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="stationId"
                    value={formData.stationId}
                    onChange={handleChange}
                    placeholder="e.g. ST007"
                    required
                  />

                  <small>
                    Unique identification number
                  </small>

                </div>


                <div className="station-form-group">

                  <label>
                    Pincode
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 411045"
                    maxLength="6"
                    required
                  />

                </div>


                <div className="station-form-group station-form-full">

                  <label>
                    Address
                    <span>*</span>
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter complete station address"
                    rows="3"
                    required
                  ></textarea>

                </div>


                <div className="station-form-group">

                  <label>
                    City
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="station-form-group">

                  <label>
                    State
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

            </section>


            {/* ======================================
                LOCATION
            ====================================== */}

            <section className="station-form-card">

              <div className="station-form-card-header">

                <div className="station-form-section-icon map-icon">

                  <i className="bi bi-geo-alt-fill"></i>

                </div>

                <div>

                  <h3>
                    Station Location
                  </h3>

                  <p>
                    Set the exact geographical location of the station.
                  </p>

                </div>

              </div>


              {/* MAP PLACEHOLDER */}

              <div className="station-map-preview">

                <div className="station-map-grid"></div>


                <div className="station-map-content">

                  <div className="map-marker-large">

                    <i className="bi bi-lightning-charge-fill"></i>

                  </div>

                  <strong>
                    Google Maps
                  </strong>

                  <span>
                    Map integration will be connected here
                  </span>

                  <button
                    type="button"
                    className="map-select-btn"
                  >

                    <i className="bi bi-crosshair"></i>

                    Select Location

                  </button>

                </div>

              </div>


              <div className="station-form-grid location-coordinates">

                <div className="station-form-group">

                  <label>
                    Latitude
                    <span>*</span>
                  </label>

                  <div className="input-with-icon">

                    <i className="bi bi-compass"></i>

                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleChange}
                      placeholder="e.g. 18.5590"
                      required
                    />

                  </div>

                </div>


                <div className="station-form-group">

                  <label>
                    Longitude
                    <span>*</span>
                  </label>

                  <div className="input-with-icon">

                    <i className="bi bi-compass"></i>

                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleChange}
                      placeholder="e.g. 73.7868"
                      required
                    />

                  </div>

                </div>

              </div>

            </section>


            {/* ======================================
                CHARGER CONFIGURATION
            ====================================== */}

            <section className="station-form-card">

              <div className="station-form-card-header">

                <div className="station-form-section-icon charger-icon">

                  <i className="bi bi-lightning-charge-fill"></i>

                </div>

                <div>

                  <h3>
                    Charger Configuration
                  </h3>

                  <p>
                    Configure charging ports and pricing.
                  </p>

                </div>

              </div>


              <div className="station-form-grid">


                <div className="station-form-group">

                  <label>
                    Charger Type
                    <span>*</span>
                  </label>

                  <select
                    name="chargerType"
                    value={formData.chargerType}
                    onChange={handleChange}
                    required
                  >

                    <option>
                      DC Fast Charger
                    </option>

                    <option>
                      AC Charger
                    </option>

                    <option>
                      DC Ultra Fast Charger
                    </option>

                    <option>
                      Tesla Supercharger
                    </option>

                  </select>

                </div>


                <div className="station-form-group">

                  <label>
                    Number of Ports
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="numberOfPorts"
                    value={formData.numberOfPorts}
                    onChange={handleChange}
                    placeholder="e.g. 6"
                    min="1"
                    required
                  />

                </div>


                <div className="station-form-group">

                  <label>
                    Power Capacity
                    <span>*</span>
                  </label>

                  <div className="input-with-unit">

                    <input
                      type="number"
                      name="powerCapacity"
                      value={formData.powerCapacity}
                      onChange={handleChange}
                      placeholder="e.g. 60"
                      min="1"
                      required
                    />

                    <span>
                      kW
                    </span>

                  </div>

                </div>


                <div className="station-form-group">

                  <label>
                    Price per kWh
                    <span>*</span>
                  </label>

                  <div className="input-with-unit">

                    <span className="currency">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="pricePerKwh"
                      value={formData.pricePerKwh}
                      onChange={handleChange}
                      placeholder="e.g. 12"
                      min="0"
                      step="0.01"
                      required
                    />

                    <span>
                      / kWh
                    </span>

                  </div>

                </div>

              </div>

            </section>


            {/* ======================================
                OPERATING HOURS
            ====================================== */}

            <section className="station-form-card">

              <div className="station-form-card-header">

                <div className="station-form-section-icon clock-icon">

                  <i className="bi bi-clock-fill"></i>

                </div>

                <div>

                  <h3>
                    Operating Hours
                  </h3>

                  <p>
                    Set when customers can use this station.
                  </p>

                </div>

              </div>


              <div className="station-hours-row">

                <div className="station-form-group">

                  <label>
                    Opening Time
                  </label>

                  <div className="input-with-icon">

                    <i className="bi bi-clock"></i>

                    <input
                      type="time"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="hours-separator">
                  TO
                </div>


                <div className="station-form-group">

                  <label>
                    Closing Time
                  </label>

                  <div className="input-with-icon">

                    <i className="bi bi-clock"></i>

                    <input
                      type="time"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleChange}
                    />

                  </div>

                </div>


                <div className="station-form-group status-group">

                  <label>
                    Station Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Maintenance">
                      Maintenance
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

            </section>


            {/* ======================================
                DESCRIPTION
            ====================================== */}

            <section className="station-form-card">

              <div className="station-form-card-header">

                <div className="station-form-section-icon description-icon">

                  <i className="bi bi-file-text-fill"></i>

                </div>

                <div>

                  <h3>
                    Additional Information
                  </h3>

                  <p>
                    Add useful information about this station.
                  </p>

                </div>

              </div>


              <div className="station-form-group">

                <label>
                  Station Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe facilities, parking information, nearby landmarks, etc."
                  rows="4"
                ></textarea>

              </div>

            </section>


            {/* ======================================
                FORM ACTIONS
            ====================================== */}

            <div className="station-form-actions">

              <button
                type="button"
                className="station-cancel-btn"
                onClick={handleReset}
              >
                Reset
              </button>


              <Link
                to="/admin/stations"
                className="station-secondary-btn"
              >
                Cancel
              </Link>


              <button
                type="submit"
                className="station-save-btn"
              >

                <i className="bi bi-check2-circle"></i>

                Add Charging Station

              </button>

            </div>


          </form>

        </section>

      </div>

    </main>

  );
}

export default AddStation;
