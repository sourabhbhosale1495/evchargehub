import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminStations() {

  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // NEW: track which station is being deleted
  const [deletingId, setDeletingId] = useState(null);


  // ==============================
  // GET ALL STATIONS
  // ==============================

  const fetchStations = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "https://evchargehub-backend.onrender.com/api/stations"
      );

      if (!response.ok) {
        throw new Error("Failed to load charging stations");
      }

      const data = await response.json();

      console.log("Admin Stations:", data);

      setStations(data);

    } catch (error) {

      console.error("Station error:", error);

      setError(
        "Unable to load charging stations from the server."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==============================
  // DELETE STATION
  // ==============================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this charging station?"
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {

      const response = await fetch(
        `https://evchargehub-backend.onrender.com/api/stations/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete station");
      }

      // Remove station from table immediately
      setStations((currentStations) =>
        currentStations.filter(
          (station) => station.id !== id
        )
      );

      alert("Charging station deleted successfully! ⚡");

    } catch (error) {

      console.error(
        "Delete station error:",
        error
      );

      alert(
        "Failed to delete charging station."
      );

    } finally {

      setDeletingId(null);

    }
  };


  // ==============================
  // LOAD STATIONS
  // ==============================

  useEffect(() => {

    fetchStations();

  }, []);


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <div className="container py-5">

        <h3 className="fw-bold">
          Loading Charging Stations...
        </h3>

        <p className="text-muted">
          Please wait.
        </p>

      </div>
    );

  }


  // ==============================
  // ERROR
  // ==============================

  if (error) {

    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-success"
          onClick={fetchStations}
        >
          Try Again
        </button>

      </div>
    );

  }


  // ==============================
  // PAGE
  // ==============================

  return (

    <div className="admin-dashboard-page">

      <div className="container py-5">


        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-5">

          <div>

            <span className="text-success fw-semibold">
              ADMIN PANEL
            </span>

            <h1 className="fw-bold mt-2">
              Charging Station Management
            </h1>

            <p className="text-muted">
              Manage all EV charging stations.
            </p>

          </div>


          {/* ADD STATION */}

          <button
            className="btn btn-success"
            onClick={() =>
              navigate("/admin/stations/add")
            }
          >
            + Add New Station
          </button>

        </div>


        {/* STATIONS CARD */}

        <div className="card border-0 shadow-sm">

          <div className="card-body p-4">


            {/* CARD HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h3 className="fw-bold mb-1">
                  All Charging Stations
                </h3>

                <p className="text-muted mb-0">
                  Manage station information and availability.
                </p>

              </div>


              <span className="badge bg-success fs-6">
                {stations.length} Stations
              </span>

            </div>


            {/* NO STATIONS */}

            {stations.length === 0 ? (

              <div className="text-center py-5">

                <div className="fs-1">
                  ⚡
                </div>

                <h4 className="fw-bold mt-3">
                  No Charging Stations
                </h4>

                <p className="text-muted">
                  No stations are currently available.
                </p>

              </div>

            ) : (

              /* TABLE */

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-light">

                    <tr>

                      <th>ID</th>
                      <th>Station</th>
                      <th>Location</th>
                      <th>Charger Type</th>
                      <th>Price</th>
                      <th>Slots</th>
                      <th>Status</th>
                      <th>Action</th>

                    </tr>

                  </thead>


                  <tbody>

                    {stations.map((station) => (

                      <tr key={station.id}>


                        {/* ID */}

                        <td>

                          <strong>
                            #{station.id}
                          </strong>

                        </td>


                        {/* NAME */}

                        <td>

                          <strong>
                            {station.name}
                          </strong>

                        </td>


                        {/* LOCATION */}

                        <td>

                          {station.location ||
                            "Not available"}

                        </td>


                        {/* CHARGER */}

                        <td>

                          {station.chargerType ||
                            "Not available"}

                        </td>


                        {/* PRICE */}

                        <td>

                          ₹{station.pricePerUnit}

                        </td>


                        {/* SLOTS */}

                        <td>

                          <strong>
                            {station.availableSlots}
                          </strong>

                          {" / "}

                          {station.totalSlots}

                        </td>


                        {/* STATUS */}

                        <td>

                          {station.active ? (

                            <span className="badge bg-success">
                              Active
                            </span>

                          ) : (

                            <span className="badge bg-danger">
                              Inactive
                            </span>

                          )}

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="d-flex gap-2">


                            {/* EDIT */}

                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() =>
                                navigate(
                                  `/admin/stations/edit/${station.id}`
                                )
                              }
                            >

                              <i className="bi bi-pencil me-1"></i>

                              Edit

                            </button>


                            {/* DELETE */}

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                handleDelete(station.id)
                              }
                              disabled={
                                deletingId === station.id
                              }
                            >

                              {deletingId === station.id ? (

                                "Deleting..."

                              ) : (

                                <>
                                  <i className="bi bi-trash me-1"></i>
                                  Delete
                                </>

                              )}

                            </button>


                          </div>

                        </td>


                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminStations;
