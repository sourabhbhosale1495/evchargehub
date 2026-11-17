import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BookingConfirmation() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchBooking = async () => {

      try {

        const response = await fetch(
          `http://localhost:8081/api/bookings/${id}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Booking not found");
        }

        const data = await response.json();

        setBooking(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchBooking();

  }, [id]);


  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading booking...</h3>
      </div>
    );
  }


  if (!booking) {
    return (
      <div className="container py-5 text-center">

        <h2>Booking Not Found</h2>

        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/map")}
        >
          Find Charging Station
        </button>

      </div>
    );
  }


  return (
    <div className="container py-5">

      <div className="text-center mb-5">

        <div
          style={{
            fontSize: "60px",
            color: "#198754"
          }}
        >
          ✓
        </div>

        <h1 className="fw-bold">
          Booking Confirmed!
        </h1>

        <p className="text-muted">
          Your EV charging slot has been successfully reserved.
        </p>

      </div>


      <div className="card shadow-sm mx-auto" style={{ maxWidth: "700px" }}>

        <div className="card-body p-4">

          <h3 className="mb-4">
            Booking Details
          </h3>


          <div className="row mb-3">

            <div className="col-sm-6">
              <strong>Booking ID</strong>
            </div>

            <div className="col-sm-6">
              #{booking.id}
            </div>

          </div>


          <div className="row mb-3">

            <div className="col-sm-6">
              <strong>Station</strong>
            </div>

            <div className="col-sm-6">
              {booking.chargingStation?.name || "Charging Station"}
            </div>

          </div>


          <div className="row mb-3">

            <div className="col-sm-6">
              <strong>Location</strong>
            </div>

            <div className="col-sm-6">
              {booking.chargingStation?.location || "N/A"}
            </div>

          </div>


          <div className="row mb-3">

            <div className="col-sm-6">
              <strong>Booking Time</strong>
            </div>

            <div className="col-sm-6">
              {booking.bookingTime}
            </div>

          </div>


          <div className="row mb-3">

            <div className="col-sm-6">
              <strong>Duration</strong>
            </div>

            <div className="col-sm-6">
              {booking.duration} minutes
            </div>

          </div>


          <div className="row mb-3">

            <div className="col-sm-6">
              <strong>Status</strong>
            </div>

            <div className="col-sm-6">
              <span className="badge bg-success">
                {booking.status}
              </span>
            </div>

          </div>


          <hr />


          <div className="d-flex justify-content-between align-items-center">

            <strong>Total Amount</strong>

            <h3 className="text-success mb-0">
              ₹{booking.totalAmount}
            </h3>

          </div>


          <div className="d-flex gap-3 mt-4">

            <button
              className="btn btn-success flex-grow-1"
              onClick={() => navigate(`/payment/${booking.id}`)}
            >
              <i className="bi bi-credit-card me-2"></i>
              Pay Now
            </button>

            <button
              className="btn btn-success flex-grow-1"
              onClick={() => navigate("/my-bookings")}
            >
              My Bookings
            </button>

            <button
              className="btn btn-outline-success flex-grow-1"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookingConfirmation;
