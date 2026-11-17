import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PaymentSuccess() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // GET BOOKING DETAILS
  // ==========================================

  useEffect(() => {

    const fetchBooking = async () => {

      try {

        const response = await fetch(
          `https://evchargehub-backend.onrender.com/api/bookings/${bookingId}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Booking not found");
        }

        const data = await response.json();

        console.log(
          "Payment Success Booking:",
          data
        );

        setBooking(data);

      } catch (error) {

        console.error(
          "Payment Success Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchBooking();

  }, [bookingId]);


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="container py-5 text-center">

        <div
          className="spinner-border text-success mb-3"
          role="status"
        ></div>

        <h3 className="fw-bold">
          Loading...
        </h3>

      </div>

    );

  }


  // ==========================================
  // BOOKING NOT FOUND
  // ==========================================

  if (!booking) {

    return (

      <div className="container py-5">

        <div className="text-center">

          <div className="display-4 mb-3">
            ❌
          </div>

          <h2 className="fw-bold">
            Booking Not Found
          </h2>

          <p className="text-muted">
            We couldn't find the booking details.
          </p>

          <button
            className="btn btn-success mt-3"
            onClick={() => navigate("/my-bookings")}
          >
            Go to My Bookings
          </button>

        </div>

      </div>

    );

  }


  // ==========================================
  // SUCCESS PAGE
  // ==========================================

  return (

    <div className="container py-5">

      <div
        className="card border-0 shadow-sm mx-auto"
        style={{ maxWidth: "700px" }}
      >

        <div className="card-body p-5 text-center">


          {/* ==================================
              SUCCESS ICON
          ================================== */}

          <div
            className="rounded-circle bg-success bg-opacity-10
                       d-flex align-items-center justify-content-center
                       mx-auto mb-4"
            style={{
              width: "90px",
              height: "90px"
            }}
          >

            <span
              className="text-success fw-bold"
              style={{ fontSize: "45px" }}
            >
              ✓
            </span>

          </div>


          {/* ==================================
              SUCCESS MESSAGE
          ================================== */}

          <span className="text-success fw-semibold">
            PAYMENT SUCCESSFUL
          </span>

          <h1 className="fw-bold mt-2">
            Payment Completed!
          </h1>

          <p className="text-muted">
            Your EV charging booking has been confirmed.
          </p>


          <hr className="my-4" />


          {/* ==================================
              BOOKING DETAILS
          ================================== */}

          <div className="text-start">

            <h4 className="fw-bold mb-4">
              Booking Details
            </h4>


            {/* Booking ID */}

            <div className="d-flex justify-content-between
                            border-bottom py-3">

              <span className="text-muted">
                Booking ID
              </span>

              <strong>
                #{booking.id}
              </strong>

            </div>


            {/* Station */}

            <div className="d-flex justify-content-between
                            border-bottom py-3">

              <span className="text-muted">
                Charging Station
              </span>

              <strong>
                {booking.chargingStation?.name ||
                  "Charging Station"}
              </strong>

            </div>


            {/* Location */}

            <div className="d-flex justify-content-between
                            border-bottom py-3">

              <span className="text-muted">
                Location
              </span>

              <strong>
                {booking.chargingStation?.location ||
                  "N/A"}
              </strong>

            </div>


            {/* Booking Time */}

            <div className="d-flex justify-content-between
                            border-bottom py-3">

              <span className="text-muted">
                Booking Time
              </span>

              <strong>
                {booking.bookingTime
                  ? new Date(
                      booking.bookingTime
                    ).toLocaleString()
                  : "N/A"}
              </strong>

            </div>


            {/* Duration */}

            <div className="d-flex justify-content-between
                            border-bottom py-3">

              <span className="text-muted">
                Duration
              </span>

              <strong>
                {booking.duration} Minutes
              </strong>

            </div>


            {/* Amount */}

            <div className="d-flex justify-content-between
                            py-3">

              <span className="text-muted">
                Amount Paid
              </span>

              <strong className="text-success fs-5">
                ₹{booking.totalAmount}
              </strong>

            </div>


            {/* Status */}

            <div className="text-center mt-3">

              <span className="badge bg-success px-4 py-2">
                BOOKING CONFIRMED
              </span>

            </div>

          </div>


          {/* ==================================
              BUTTONS
          ================================== */}

          <div className="mt-5">

            <button
              className="btn btn-success btn-lg px-5"
              onClick={() =>
                navigate("/my-bookings")
              }
            >
              View My Bookings
            </button>


            <button
              className="btn btn-outline-secondary
                         btn-lg px-5 ms-2"
              onClick={() =>
                navigate("/")
              }
            >
              Back to Home
            </button>

          </div>


        </div>

      </div>

    </div>

  );

}

export default PaymentSuccess;
