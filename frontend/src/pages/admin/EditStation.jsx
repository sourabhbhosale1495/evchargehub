import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditStation() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    stationId: "",
    address: "",
    city: "",
    state: "Maharashtra",
    pincode: "",
    chargerType: "DC Fast Charger",
    ports: 1,
    power: 60,
    price: 12,
    status: "Active",
    latitude: "",
    longitude: "",
    openingTime: "06:00",
    closingTime: "23:00",
    description: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});


  // ===============================
  // GET STATION FROM BACKEND
  // ===============================

  useEffect(() => {

    const fetchStation = async () => {

      try {

        const response = await fetch(
          `https://evchargehub-backend.onrender.com/api/stations/${id}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Station not found");
        }

        const station = await response.json();

        console.log("Station from backend:", station);

        /*
         * Backend currently stores location
         * as one field, so we keep it in address.
         */

        setFormData({
          name: station.name || "",
          stationId: `ST${String(station.id).padStart(3, "0")}`,

          address: station.location || "",

          city: "",
          state: "Maharashtra",
          pincode: "",

          chargerType:
            station.chargerType || "DC Fast Charger",

          ports: station.totalSlots || 1,

          power: 60,

          price: station.pricePerUnit || 0,

          status: station.active
            ? "Active"
            : "Inactive",

          latitude:
            station.latitude !== undefined
              ? String(station.latitude)
              : "",

          longitude:
            station.longitude !== undefined
              ? String(station.longitude)
              : "",

          openingTime: "06:00",
          closingTime: "23:00",

          description: ""
        });

      } catch (error) {

        console.error("Station error:", error);

        alert("Unable to load station.");

        navigate("/admin/stations");

      } finally {

        setLoading(false);

      }

    };

    fetchStation();

  }, [id, navigate]);


  // ===============================
  // HANDLE INPUT
  // ===============================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: ""
    }));

  };


  // ===============================
  // VALIDATION
  // ===============================

  const validateForm = () => {

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Station name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Location is required";
    }

    if (!formData.ports || Number(formData.ports) < 1) {
      newErrors.ports = "At least one slot is required";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  // ===============================
  // UPDATE STATION
  // ===============================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {

      const stationData = {

        name: formData.name,

        location: formData.address,

        chargerType: formData.chargerType,

        pricePerUnit: Number(formData.price),

        totalSlots: Number(formData.ports),

        availableSlots: Number(formData.ports),

        latitude: Number(formData.latitude),

        longitude: Number(formData.longitude),

        active: formData.status === "Active"

      };

      console.log("Updating station:", stationData);

      const response = await fetch(
        `https://evchargehub-backend.onrender.com/api/stations/${id}`,
        {
          method: "PUT",
          credentials: "include",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(stationData)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update station");
      }

      const updatedStation = await response.json();

      console.log(
        "Updated station:",
        updatedStation
      );

      alert("Charging station updated successfully! ⚡");

      navigate("/admin/stations");

    } catch (error) {

      console.error(
        "Update station error:",
        error
      );

      alert(
        "Failed to update charging station."
      );

    } finally {

      setSaving(false);

    }

  };


  // ===============================
  // LOADING
  // ===============================

  if (loading) {

    return (
      <div className="container py-5">

        <h3 className="fw-bold">
          Loading Station...
        </h3>

        <p className="text-muted">
          Please wait.
        </p>

      </div>
    );

  }


  // ===============================
  // PAGE
  // ===============================

  return (

    <main className="admin-page">

      <div className="admin-layout">


        {/* SIDEBAR */}

        <aside className="admin-sidebar">

          <div className="admin-logo">

            <div className="admin-logo-icon">
              <i className="bi bi-lightning-charge-fill"></i>
            </div>

            <div>

              <strong>
                EVCharge<span>Hub</span>
              </strong>

              <small>
                ADMIN PANEL
              </small>

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

          </nav>


          <div className="admin-sidebar-bottom">

            <Link
              to="/login"
              className="admin-nav-link admin-logout"
            >
              <i className="bi bi-box-arrow-left"></i>
              Logout
            </Link>

          </div>

        </aside>


        {/* MAIN CONTENT */}

        <section className="admin-content">


          {/* TOP BAR */}

          <header className="admin-topbar">

            <div className="admin-page-title">

              <span>
                MANAGEMENT / STATIONS / EDIT
              </span>

              <h1>
                Edit Charging Station
              </h1>

            </div>

          </header>


          {/* PAGE HEADER */}

          <div className="stations-page-header">

            <div>

              <h2>
                Update Station Details
              </h2>

              <p>
                Modify the information and configuration
                for {formData.name}.
              </p>

            </div>

            <Link
              to="/admin/stations"
              className="admin-secondary-btn"
            >
              <i className="bi bi-arrow-left"></i>
              Back to Stations
            </Link>

          </div>


          {/* FORM */}

          <form
            className="edit-station-form"
            onSubmit={handleSubmit}
          >


            {/* BASIC INFORMATION */}

            <div className="edit-form-card">

              <div className="edit-form-heading">

                <div className="edit-form-heading-icon">
                  <i className="bi bi-building"></i>
                </div>

                <div>

                  <h3>
                    Basic Information
                  </h3>

                  <p>
                    General station information.
                  </p>

                </div>

              </div>


              <div className="edit-form-grid">


                <div className="edit-field full">

                  <label>
                    Station Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter station name"
                  />

                  {errors.name && (
                    <small className="field-error">
                      {errors.name}
                    </small>
                  )}

                </div>


                <div className="edit-field">

                  <label>
                    Station ID
                  </label>

                  <input
                    type="text"
                    value={formData.stationId}
                    disabled
                  />

                </div>


                <div className="edit-field">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

              </div>

            </div>


            {/* LOCATION */}

            <div className="edit-form-card">

              <div className="edit-form-heading">

                <div className="edit-form-heading-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>

                <div>

                  <h3>
                    Location Information
                  </h3>

                  <p>
                    Station location and coordinates.
                  </p>

                </div>

              </div>


              <div className="edit-form-grid">


                <div className="edit-field full">

                  <label>
                    Location <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Pune, Maharashtra"
                  />

                  {errors.address && (
                    <small className="field-error">
                      {errors.address}
                    </small>
                  )}

                </div>


                <div className="edit-field">

                  <label>
                    Latitude
                  </label>

                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                  />

                </div>


                <div className="edit-field">

                  <label>
                    Longitude
                  </label>

                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>


            {/* CHARGER CONFIGURATION */}

            <div className="edit-form-card">

              <div className="edit-form-heading">

                <div className="edit-form-heading-icon">
                  <i className="bi bi-lightning-charge"></i>
                </div>

                <div>

                  <h3>
                    Charger Configuration
                  </h3>

                  <p>
                    Charging type, slots and pricing.
                  </p>

                </div>

              </div>


              <div className="edit-form-grid">


                <div className="edit-field">

                  <label>
                    Charger Type
                  </label>

                  <select
                    name="chargerType"
                    value={formData.chargerType}
                    onChange={handleChange}
                  >

                    <option value="AC Charger">
                      AC Charger
                    </option>

                    <option value="DC Fast Charger">
                      DC Fast Charger
                    </option>

                    <option value="DC Ultra Fast Charger">
                      DC Ultra Fast Charger
                    </option>

                  </select>

                </div>


                <div className="edit-field">

                  <label>
                    Total Slots <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="ports"
                    min="1"
                    value={formData.ports}
                    onChange={handleChange}
                  />

                  {errors.ports && (
                    <small className="field-error">
                      {errors.ports}
                    </small>
                  )}

                </div>


                <div className="edit-field">

                  <label>
                    Charging Price <span>*</span>
                  </label>

                  <div className="input-with-unit">

                    <span>₹</span>

                    <input
                      type="number"
                      name="price"
                      min="1"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                    />

                    <span>/ kWh</span>

                  </div>

                  {errors.price && (
                    <small className="field-error">
                      {errors.price}
                    </small>
                  )}

                </div>

              </div>

            </div>


            {/* ACTIONS */}

            <div className="edit-form-actions">

              <Link
                to="/admin/stations"
                className="admin-secondary-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="admin-primary-btn"
                disabled={saving}
              >

                <i className="bi bi-check2-circle"></i>

                {saving
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>


          </form>

        </section>

      </div>

    </main>

  );
}

export default EditStation;
