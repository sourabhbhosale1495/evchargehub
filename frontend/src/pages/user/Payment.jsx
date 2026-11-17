import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

function Payment() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);


  // ==============================
  // GET BOOKING
  // ==============================

  useEffect(() => {

    const fetchBooking = async () => {

      try {

        const response = await fetch(
          `https://evchargehub-backend.onrender.com/api/bookings/${bookingId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Booking not found");
        }

        const data = await response.json();

        console.log("Payment Booking:", data);

        setBooking(data);

      } catch (error) {

        console.error("Booking error:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchBooking();

  }, [bookingId]);


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <div className="container py-5 text-center">

        <h3>
          Loading payment...
        </h3>

      </div>
    );

  }


  // ==============================
  // BOOKING NOT FOUND
  // ==============================

  if (!booking) {

    return (
      <div className="container py-5 text-center">

        <h2>
          Booking Not Found
        </h2>

        <button
          className="btn btn-success mt-3"
          onClick={() => navigate("/my-bookings")}
        >
          My Bookings
        </button>

      </div>
    );

  }


  // ==============================
  // PAYMENT DETAILS
  // ==============================

  const amount = booking.totalAmount;

  const upiId = "evchargehub@upi";

  const upiLink =
    `upi://pay?pa=${upiId}` +
    `&pn=EVChargeHub` +
    `&am=${amount}` +
    `&cu=INR`;


  // ==============================
  // PAYMENT BUTTON
  // ==============================

  const handlePayment = async () => {

    try {

      const response = await fetch(
        "https://evchargehub-backend.onrender.com/api/payments",
        {
          method: "POST",
           credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: booking.totalAmount,
            paymentMethod: "UPI",
            paymentStatus: "SUCCESS",
            paymentTime: new Date().toISOString(),

            booking: {
              id: booking.id,
            },
          }),
        }
      );

      const data = await response.json();

      console.log("Payment response:", data);

      if (!response.ok) {

        throw new Error(
          data.message ||
          data.error ||
          "Payment failed"
        );

      }

      console.log("Payment saved:", data);

      // Update booking status on frontend
      setBooking((previousBooking) => ({
        ...previousBooking,
        status: "CONFIRMED",
      }));

      setPaymentSuccess(true);

    } catch (error) {

      console.error("Payment error:", error);

      alert(
        error.message ||
        "Payment failed. Please try again."
      );

    }
  };

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-5 text-center">


              {/* HEADER */}

              <div className="mb-4">

                <div className="text-success fs-1">
                  💳
                </div>

                <h2 className="fw-bold">
                  EVChargeHub Payment
                </h2>

                <p className="text-muted">
                  Complete your booking payment
                </p>

              </div>


              {/* BOOKING ID */}

              <div className="mb-3">

                <small className="text-muted">
                  Booking ID
                </small>

                <h5 className="fw-bold">
                  #{booking.id}
                </h5>

              </div>


              {/* STATION */}

              <div className="mb-3">

                <small className="text-muted">
                  Charging Station
                </small>

                <h5>
                  {booking.chargingStation?.name ||
                    "Charging Station"}
                </h5>

              </div>


              {/* AMOUNT */}

              <div className="my-4">

                <small className="text-muted">
                  Amount to Pay
                </small>

                <h1 className="fw-bold text-success">
                  ₹{amount}
                </h1>

              </div>


              {!paymentSuccess ? (

                <>

                  {/* QR CODE */}

                  <div className="d-flex justify-content-center mb-4">

                    <div className="p-3 border rounded bg-white">

                      <QRCodeCanvas
                        value={upiLink}
                        size={220}
                        level="H"
                      />

                    </div>

                  </div>


                  <p className="text-muted small">

                    Scan this QR code using
                    Google Pay, PhonePe, Paytm
                    or another UPI app.

                  </p>


                  {/* PAYMENT BUTTON */}

                  <button
                    className="btn btn-success btn-lg px-5 mt-3"
                    onClick={handlePayment}
                  >

                    <i className="bi bi-check-circle me-2"></i>

                    I Have Paid

                  </button>

                </>

              ) : (

                /* SUCCESS */

                <div className="py-3">

                  <div className="text-success fs-1">
                    ✓
                  </div>

                  <h3 className="fw-bold text-success">
                    Payment Successful
                  </h3>

                  <p className="text-muted">
                    Your payment has been recorded.
                  </p>


                  <button
                    className="btn btn-success mt-3"
                    onClick={() =>
                      navigate(
                        `/booking-confirmation/${booking.id}`
                      )
                    }
                  >
                    View Booking
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Payment;