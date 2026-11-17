import { useEffect, useState } from "react";

function AdminBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);


  // ==========================================
  // GET ALL BOOKINGS
  // ==========================================

  const fetchBookings = async () => {

    try {

      const response = await fetch(
        "https://evchargehub-backend.onrender.com/api/admin/bookings",
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load bookings");
      }

      const data = await response.json();

      console.log("Admin Bookings:", data);

      setBookings(data);

    } catch (error) {

      console.error("Booking error:", error);

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // CANCEL BOOKING
  // ==========================================

  const handleCancel = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    setActionId(id);

    try {

      const response = await fetch(
        `https://evchargehub-backend.onrender.com/api/admin/bookings/${id}/cancel`,
        {
          method: "PUT",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      const updatedBooking = await response.json();

      console.log(
        "Booking cancelled:",
        updatedBooking
      );

      // Update booking in table
      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === id
            ? updatedBooking
            : booking
        )
      );

      alert("Booking cancelled successfully.");

    } catch (error) {

      console.error(
        "Cancel booking error:",
        error
      );

      alert("Failed to cancel booking.");

    } finally {

      setActionId(null);

    }
  };


  // ==========================================
  // DELETE BOOKING
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete this booking?"
    );

    if (!confirmed) {
      return;
    }

    setActionId(id);

    try {

      const response = await fetch(
        `https://evchargehub-backend.onrender.com/api/admin/bookings/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete booking");
      }

      // Remove booking from table
      setBookings((currentBookings) =>
        currentBookings.filter(
          (booking) => booking.id !== id
        )
      );

      alert("Booking deleted successfully.");

    } catch (error) {

      console.error(
        "Delete booking error:",
        error
      );

      alert("Failed to delete booking.");

    } finally {

      setActionId(null);

    }
  };


  // ==========================================
  // LOAD BOOKINGS
  // ==========================================

  useEffect(() => {

    fetchBookings();

  }, []);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (
      <div className="container py-5">

        <h3 className="fw-bold">
          Loading Bookings...
        </h3>

        <p className="text-muted">
          Please wait while bookings are loading.
        </p>

      </div>
    );
  }


  // ==========================================
  // MAIN UI
  // ==========================================

  return (

    <div className="container-fluid py-4">

      {/* PAGE HEADER */}

      <div className="mb-4">

        <h2 className="fw-bold">
          Booking Management
        </h2>

        <p className="text-muted">
          View, cancel and delete EV charging bookings.
        </p>

      </div>


      {/* BOOKING CARD */}

      <div className="card border-0 shadow-sm">

        <div className="card-body p-4">


          {/* CARD HEADER */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h3 className="fw-bold mb-1">
                All Bookings
              </h3>

              <p className="text-muted mb-0">
                Manage charging reservations
              </p>

            </div>

            <span className="badge bg-success fs-6">
              {bookings.length} Bookings
            </span>

          </div>


          {/* NO BOOKINGS */}

          {bookings.length === 0 ? (

            <div className="text-center py-5">

              <div className="fs-1">
                📅
              </div>

              <h4 className="fw-bold mt-3">
                No Bookings Found
              </h4>

              <p className="text-muted">
                There are currently no bookings.
              </p>

            </div>

          ) : (

            /* TABLE */

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-light">

                  <tr>

                    <th>ID</th>

                    <th>User</th>

                    <th>Station</th>

                    <th>Booking Time</th>

                    <th>Duration</th>

                    <th>Amount</th>

                    <th>Status</th>

                    <th>Actions</th>

                  </tr>

                </thead>


                {/* TABLE BODY */}

                <tbody>

                  {bookings.map((booking) => (

                    <tr key={booking.id}>


                      {/* ID */}

                      <td>

                        <strong>
                          #{booking.id}
                        </strong>

                      </td>


                      {/* USER */}

                      <td>

                        <strong>
                          {booking.user?.name ||
                            "Unknown"}
                        </strong>

                        <br />

                        <small className="text-muted">

                          {booking.user?.email ||
                            "No email"}

                        </small>

                      </td>


                      {/* STATION */}

                      <td>

                        <strong>

                          {booking.chargingStation?.name ||
                            "Unknown Station"}

                        </strong>

                        <br />

                        <small className="text-muted">

                          {booking.chargingStation?.location ||
                            "No location"}

                        </small>

                      </td>


                      {/* BOOKING TIME */}

                      <td>

                        {booking.bookingTime
                          ? new Date(
                              booking.bookingTime
                            ).toLocaleString()
                          : "N/A"}

                      </td>


                      {/* DURATION */}

                      <td>

                        {booking.duration} min

                      </td>


                      {/* AMOUNT */}

                      <td>

                        <strong>
                          ₹{booking.totalAmount}
                        </strong>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            booking.status ===
                            "CONFIRMED"
                              ? "badge bg-success"
                              : booking.status ===
                                "CANCELLED"
                              ? "badge bg-danger"
                              : "badge bg-warning text-dark"
                          }
                        >

                          {booking.status}

                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="d-flex gap-2">


                          {/* CANCEL */}

                          {booking.status !==
                            "CANCELLED" && (

                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() =>
                                handleCancel(
                                  booking.id
                                )
                              }
                              disabled={
                                actionId ===
                                booking.id
                              }
                            >

                              {actionId ===
                              booking.id
                                ? "..."
                                : "Cancel"}

                            </button>

                          )}


                          {/* DELETE */}

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                booking.id
                              )
                            }
                            disabled={
                              actionId ===
                              booking.id
                            }
                          >

                            {actionId ===
                            booking.id
                              ? "..."
                              : "Delete"}

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

  );
}

export default AdminBookings;