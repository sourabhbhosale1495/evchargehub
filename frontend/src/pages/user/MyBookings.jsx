import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser");

      if (!loggedInUser) {
        navigate("/login");
        return;
      }

      const user = JSON.parse(loggedInUser);

      // =========================
      // GET BOOKINGS
      // =========================

      const bookingResponse = await fetch(
        `http://localhost:8081/api/bookings/user/${user.id}`,
        { credentials: "include" }
      );

      if (!bookingResponse.ok) {
        throw new Error("Failed to load bookings");
      }

      const bookingData = await bookingResponse.json();

      // =========================
      // GET PAYMENTS
      // =========================

      const paymentResponse = await fetch(
        "http://localhost:8081/api/payments",
        { credentials: "include" }
      );

      if (!paymentResponse.ok) {
        throw new Error("Failed to load payments");
      }

      const paymentData = await paymentResponse.json();

      console.log("Bookings:", bookingData);
      console.log("Payments:", paymentData);

      setBookings(bookingData);
      setPayments(paymentData);

    } catch (error) {
      console.error(error);
      setError("Unable to load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FIND PAYMENT FOR BOOKING
  // =========================

  const getPaymentForBooking = (bookingId) => {
    return payments.find(
      (payment) => payment.booking?.id === bookingId
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading your bookings...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* Header */}

      <div className="mb-5">

        <span className="text-success fw-semibold">
          EV CHARGING
        </span>

        <h1 className="fw-bold mt-2">
          My Bookings
        </h1>

        <p className="text-muted">
          View and manage all your EV charging bookings.
        </p>

      </div>


      {/* Error */}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}


      {/* No bookings */}

      {!error && bookings.length === 0 && (
        <div className="text-center py-5">

          <div style={{ fontSize: "60px" }}>
            ⚡
          </div>

          <h3 className="mt-3">
            No bookings yet
          </h3>

          <p className="text-muted">
            You haven't booked a charging slot yet.
          </p>

          <button
            className="btn btn-success mt-2"
            onClick={() => navigate("/map")}
          >
            Find Charging Station
          </button>

        </div>
      )}


      {/* Booking List */}

      <div className="row g-4">

        {bookings.map((booking) => {

          const payment = getPaymentForBooking(booking.id);

          return (

            <div
              className="col-lg-6"
              key={booking.id}
            >

              <div className="card shadow-sm border-0 h-100">

                <div className="card-body p-4">

                  {/* Top */}

                  <div className="d-flex justify-content-between align-items-start">

                    <div>

                      <span className="text-success fw-semibold small">
                        BOOKING #{booking.id}
                      </span>

                      <h4 className="fw-bold mt-2">
                        {booking.chargingStation?.name ||
                          "Charging Station"}
                      </h4>

                    </div>

                    <span
                      className={
                        booking.status === "CONFIRMED"
                          ? "badge bg-success"
                          : "badge bg-secondary"
                      }
                    >
                      {booking.status}
                    </span>

                  </div>


                  <hr />


                  {/* Station */}

                  <div className="mb-3">

                    <small className="text-muted">
                      Location
                    </small>

                    <div className="fw-semibold">
                      📍{" "}
                      {booking.chargingStation?.location ||
                        "Location unavailable"}
                    </div>

                  </div>


                  {/* Date */}

                  <div className="mb-3">

                    <small className="text-muted">
                      Booking Date & Time
                    </small>

                    <div className="fw-semibold">
                      📅 {formatDate(booking.bookingTime)}
                    </div>

                  </div>


                  {/* Duration */}

                  <div className="mb-3">

                    <small className="text-muted">
                      Charging Duration
                    </small>

                    <div className="fw-semibold">
                      ⏱️ {booking.duration} minutes
                    </div>

                  </div>


                  {/* Amount */}

                  <div className="d-flex justify-content-between align-items-center mt-4">

                    <div>

                      <small className="text-muted">
                        Total Amount
                      </small>

                      <h3 className="fw-bold text-success mb-0">
                        ₹{booking.totalAmount}
                      </h3>

                    </div>

                  </div>


                  {/* PAYMENT STATUS */}

                  <div className="mt-4 p-3 rounded bg-light">

                    <div className="d-flex justify-content-between align-items-center">

                      <div>

                        <small className="text-muted d-block">
                          Payment Status
                        </small>

                        {payment?.paymentStatus === "SUCCESS" ? (

                          <span className="badge bg-success mt-1">
                            ✓ PAID
                          </span>

                        ) : payment?.paymentStatus === "FAILED" ? (

                          <span className="badge bg-danger mt-1">
                            ✕ FAILED
                          </span>

                        ) : (

                          <span className="badge bg-warning text-dark mt-1">
                            ⏳ PAYMENT PENDING
                          </span>

                        )}

                      </div>


                      {/* PAYMENT BUTTON */}

                      {payment?.paymentStatus !== "SUCCESS" && (

                        <button
                          className="btn btn-success btn-sm"
                          onClick={() =>
                            navigate(`/payment/${booking.id}`)
                          }
                        >
                          Pay Now
                        </button>

                      )}

                    </div>


                    {/* Payment method */}

                    {payment?.paymentStatus === "SUCCESS" && (

                      <div className="mt-2">

                        <small className="text-muted">
                          Payment Method
                        </small>

                        <div className="fw-semibold">
                          💳 {payment.paymentMethod || "UPI"}
                        </div>

                      </div>

                    )}

                  </div>


                  {/* View Bill */}

                  <button
                    className="btn btn-outline-success w-100 mt-3"
                    onClick={() =>
                      navigate(
                        `/booking-confirmation/${booking.id}`
                      )
                    }
                  >
                    View Bill
                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>


      {/* Book Another Slot */}

      {bookings.length > 0 && (
        <div className="text-center mt-5">

          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/map")}
          >
            + Book Another Charging Slot
          </button>

        </div>
      )}

    </div>
  );
}

export default MyBookings;
