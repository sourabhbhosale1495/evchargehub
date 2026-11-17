import { useEffect, useState } from "react";

function AdminPayments() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==============================
  // GET ALL PAYMENTS
  // ==============================

  const fetchPayments = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8081/api/admin/payments",
        {
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load payments");
      }

      const data = await response.json();

      console.log("Admin Payments:", data);

      setPayments(data);

    } catch (error) {

      console.error("Payment error:", error);

      setError(
        "Unable to load payments from the server."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==============================
  // DELETE PAYMENT
  // ==============================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmed) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8081/api/admin/payments/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete payment");
      }

      setPayments((currentPayments) =>
        currentPayments.filter(
          (payment) => payment.id !== id
        )
      );

      alert("Payment deleted successfully.");

    } catch (error) {

      console.error(
        "Delete payment error:",
        error
      );

      alert("Failed to delete payment.");

    }
  };


  // ==============================
  // LOAD PAYMENTS
  // ==============================

  useEffect(() => {
    fetchPayments();
  }, []);


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <div className="container py-5">

        <h3 className="fw-bold">
          Loading Payments...
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
          onClick={fetchPayments}
        >
          Try Again
        </button>

      </div>
    );

  }


  return (

    <div className="admin-dashboard-page">

      <div className="container py-5">


        {/* HEADER */}

        <div className="mb-5">

          <span className="text-success fw-semibold">
            ADMIN PANEL
          </span>

          <h1 className="fw-bold mt-2">
            Payment Management
          </h1>

          <p className="text-muted">
            View and manage all EV charging payments.
          </p>

        </div>


        {/* PAYMENT CARD */}

        <div className="card border-0 shadow-sm">

          <div className="card-body p-4">


            {/* CARD HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h3 className="fw-bold mb-1">
                  All Payments
                </h3>

                <p className="text-muted mb-0">
                  Monitor payment transactions.
                </p>

              </div>

              <span className="badge bg-success fs-6">
                {payments.length} Payments
              </span>

            </div>


            {/* NO PAYMENTS */}

            {payments.length === 0 ? (

              <div className="text-center py-5">

                <div className="fs-1">
                  💳
                </div>

                <h4 className="fw-bold mt-3">
                  No Payments Found
                </h4>

                <p className="text-muted">
                  There are currently no payment records.
                </p>

              </div>

            ) : (

              /* PAYMENT TABLE */

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-light">

                    <tr>

                      <th>ID</th>
                      <th>Booking</th>
                      <th>Amount</th>
                      <th>Method</th>
                      <th>Payment Time</th>
                      <th>Status</th>
                      <th>Action</th>

                    </tr>

                  </thead>


                  <tbody>

                    {payments.map((payment) => (

                      <tr key={payment.id}>


                        {/* ID */}

                        <td>

                          <strong>
                            #{payment.id}
                          </strong>

                        </td>


                        {/* BOOKING */}

                        <td>

                          {payment.booking ? (

                            <strong>
                              Booking #
                              {payment.booking.id}
                            </strong>

                          ) : (

                            <span className="text-muted">
                              No booking
                            </span>

                          )}

                        </td>


                        {/* AMOUNT */}

                        <td>

                          <strong>
                            ₹{payment.amount}
                          </strong>

                        </td>


                        {/* METHOD */}

                        <td>

                          {payment.paymentMethod ||
                            "Not specified"}

                        </td>


                        {/* PAYMENT TIME */}

                        <td>

                          {payment.paymentTime
                            ? new Date(
                                payment.paymentTime
                              ).toLocaleString()
                            : "N/A"}

                        </td>


                        {/* STATUS */}

                        <td>

                          {payment.paymentStatus ===
                          "SUCCESS" ? (

                            <span className="badge bg-success">
                              SUCCESS
                            </span>

                          ) : payment.paymentStatus ===
                            "FAILED" ? (

                            <span className="badge bg-danger">
                              FAILED
                            </span>

                          ) : (

                            <span className="badge bg-warning text-dark">
                              {payment.paymentStatus ||
                                "PENDING"}
                            </span>

                          )}

                        </td>


                        {/* DELETE */}

                        <td>

                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              handleDelete(
                                payment.id
                              )
                            }
                          >

                            <i className="bi bi-trash me-1"></i>

                            Delete

                          </button>

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

export default AdminPayments;