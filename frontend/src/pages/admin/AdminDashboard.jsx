import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStations: 0,
    totalBooking: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("https://evchargehub-backend.onrender.com/api/admin/dashboard", {
      credentials: "include"
    })
      .then((response) => {

        console.log("Dashboard response status:", response.status);

        if (!response.ok) {
          throw new Error(
            "Failed to load dashboard. Status: " + response.status
          );
        }

        return response.json();

      })
      .then((data) => {

        console.log("Admin Dashboard Data:", data);

        setStats({
          totalUsers: data.totalUsers ?? 0,
          totalStations: data.totalStations ?? 0,
          totalBooking: data.totalBooking ?? 0
        });

      })
      .catch((error) => {

        console.error("Dashboard error:", error);

      })
      .finally(() => {

        setLoading(false);

      });

  }, []);


  if (loading) {

    return (
      <div className="container py-5 text-center">

        <div className="spinner-border text-success"></div>

        <h5 className="mt-3">
          Loading Admin Dashboard...
        </h5>

      </div>
    );

  }


  return (

    <div className="admin-dashboard-page">

      <div className="container py-5">


        {/* ================= HEADER ================= */}

        <div className="d-flex justify-content-between align-items-center mb-5">

          <div>

            <span className="text-success fw-semibold">
              ADMIN PANEL
            </span>

            <h1 className="fw-bold mt-2 mb-2">
              Dashboard
            </h1>

            <p className="text-muted mb-0">
              Welcome back, Administrator. Here's what's happening
              with EVChargeHub.
            </p>

          </div>


          <button
            className="btn btn-success px-4"
            onClick={() => navigate("/admin/stations/add")}
          >

            <i className="bi bi-plus-lg me-2"></i>

            Add Station

          </button>

        </div>


        {/* ================= STATISTICS ================= */}

        <div className="row g-4">


          {/* USERS */}

          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/users")}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between">

                  <div>

                    <p className="text-muted mb-2">
                      Total Users
                    </p>

                    <h2 className="fw-bold mb-1">
                      {stats.totalUsers}
                    </h2>

                    <small className="text-success">
                      Registered users
                    </small>

                  </div>


                  <div
                    className="rounded-circle bg-success bg-opacity-10
                    d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px"
                    }}
                  >

                    <i className="bi bi-people-fill text-success fs-4"></i>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* STATIONS */}

          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/stations")}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between">

                  <div>

                    <p className="text-muted mb-2">
                      Charging Stations
                    </p>

                    <h2 className="fw-bold mb-1">
                      {stats.totalStations}
                    </h2>

                    <small className="text-success">
                      Active stations
                    </small>

                  </div>


                  <div
                    className="rounded-circle bg-success bg-opacity-10
                    d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px"
                    }}
                  >

                    <i className="bi bi-lightning-charge-fill text-success fs-4"></i>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* BOOKINGS */}

          <div className="col-xl-3 col-md-6">

            <div
              className="card border-0 shadow-sm h-100"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/admin/bookings")}
            >

              <div className="card-body p-4">

                <div className="d-flex justify-content-between">

                  <div>

                    <p className="text-muted mb-2">
                      Total Bookings
                    </p>

                    <h2 className="fw-bold mb-1">
                      {stats.totalBooking}
                    </h2>

                    <small className="text-success">
                      Charging reservations
                    </small>

                  </div>


                  <div
                    className="rounded-circle bg-success bg-opacity-10
                    d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px"
                    }}
                  >

                    <i className="bi bi-calendar-check-fill text-success fs-4"></i>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* PLATFORM */}

          <div className="col-xl-3 col-md-6">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <div className="d-flex justify-content-between">

                  <div>

                    <p className="text-muted mb-2">
                      Platform Status
                    </p>

                    <h4 className="fw-bold mb-2">
                      Operational
                    </h4>

                    <small className="text-success">
                      ● All systems running
                    </small>

                  </div>


                  <div
                    className="rounded-circle bg-success bg-opacity-10
                    d-flex align-items-center justify-content-center"
                    style={{
                      width: "55px",
                      height: "55px"
                    }}
                  >

                    <i className="bi bi-activity text-success fs-4"></i>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= MANAGEMENT ================= */}

        <div className="mt-5">

          <div className="mb-4">

            <span className="text-success fw-semibold">
              MANAGEMENT
            </span>

            <h3 className="fw-bold mt-2">
              Manage EVChargeHub
            </h3>

            <p className="text-muted">
              Quickly access and manage your platform resources.
            </p>

          </div>


          <div className="row g-4">


            {/* USERS */}

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-0 shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/admin/users")}
              >

                <div className="card-body p-4">

                  <i className="bi bi-people-fill text-success fs-1"></i>

                  <h4 className="fw-bold mt-3">
                    Users
                  </h4>

                  <p className="text-muted">
                    View and manage registered users.
                  </p>

                  <span className="text-success fw-semibold">
                    Manage Users →
                  </span>

                </div>

              </div>

            </div>


            {/* STATIONS */}

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-0 shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/admin/stations")}
              >

                <div className="card-body p-4">

                  <i className="bi bi-lightning-charge-fill text-success fs-1"></i>

                  <h4 className="fw-bold mt-3">
                    Stations
                  </h4>

                  <p className="text-muted">
                    Add, edit and manage charging stations.
                  </p>

                  <span className="text-success fw-semibold">
                    Manage Stations →
                  </span>

                </div>

              </div>

            </div>


            {/* BOOKINGS */}

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-0 shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/admin/bookings")}
              >

                <div className="card-body p-4">

                  <i className="bi bi-calendar-check-fill text-success fs-1"></i>

                  <h4 className="fw-bold mt-3">
                    Bookings
                  </h4>

                  <p className="text-muted">
                    Monitor all charging reservations.
                  </p>

                  <span className="text-success fw-semibold">
                    Manage Bookings →
                  </span>

                </div>

              </div>

            </div>


            {/* PAYMENTS */}

            <div className="col-lg-3 col-md-6">

              <div
                className="card border-0 shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/admin/payments")}
              >

                <div className="card-body p-4">

                  <i className="bi bi-credit-card-fill text-success fs-1"></i>

                  <h4 className="fw-bold mt-3">
                    Payments
                  </h4>

                  <p className="text-muted">
                    View and manage payment transactions.
                  </p>

                  <span className="text-success fw-semibold">
                    Manage Payments →
                  </span>

                </div>

              </div>

            </div>


          </div>

        </div>


        {/* ================= QUICK ACTIONS ================= */}

        <div className="card border-0 shadow-sm mt-5">

          <div className="card-body p-4">

            <div className="d-flex align-items-center mb-4">

              <div>

                <span className="text-success fw-semibold">
                  QUICK ACTIONS
                </span>

                <h4 className="fw-bold mt-2 mb-0">
                  Common Tasks
                </h4>

              </div>

            </div>


            <div className="d-flex flex-wrap gap-3">

              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/admin/stations/add")}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Charging Station
              </button>


              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/admin/users")}
              >
                <i className="bi bi-people me-2"></i>
                View Users
              </button>


              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/admin/bookings")}
              >
                <i className="bi bi-calendar-check me-2"></i>
                View Bookings
              </button>


              <button
                className="btn btn-outline-success"
                onClick={() => navigate("/admin/payments")}
              >
                <i className="bi bi-credit-card me-2"></i>
                View Payments
              </button>

            </div>

          </div>

        </div>


        {/* ================= FOOTER ================= */}

        <div className="text-center mt-5">

          <small className="text-muted">
            EVChargeHub Admin Panel • Platform Management
          </small>

        </div>


      </div>

    </div>

  );
}

export default AdminDashboard;