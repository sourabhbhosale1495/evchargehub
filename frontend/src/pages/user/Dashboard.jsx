import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <main className="dashboard-page">

      <div className="container-fluid">

        <div className="dashboard-layout">

          {/* ================= SIDEBAR ================= */}

          <aside className="dashboard-sidebar">

            <div className="dashboard-logo">
              <div className="dashboard-logo-icon">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>

              <span>
                EVCharge<span>Hub</span>
              </span>
            </div>

            <nav className="dashboard-nav">

              <Link
                to="/dashboard"
                className="dashboard-nav-link active"
              >
                <i className="bi bi-grid-1x2-fill"></i>
                Dashboard
              </Link>

              <Link
                to="/stations"
                className="dashboard-nav-link"
              >
                <i className="bi bi-ev-front"></i>
                Find Station
              </Link>

              <Link
                to="/bookings"
                className="dashboard-nav-link"
              >
                <i className="bi bi-calendar-check"></i>
                My Bookings
              </Link>

              <Link
                to="/vehicles"
                className="dashboard-nav-link"
              >
                <i className="bi bi-car-front"></i>
                My Vehicles
              </Link>

              <Link
                to="/history"
                className="dashboard-nav-link"
              >
                <i className="bi bi-clock-history"></i>
                Charging History
              </Link>

              <Link
                to="/payments"
                className="dashboard-nav-link"
              >
                <i className="bi bi-credit-card"></i>
                Payments
              </Link>

            </nav>

            <div className="dashboard-sidebar-bottom">

              <Link
                to="/profile"
                className="dashboard-nav-link"
              >
                <i className="bi bi-person-circle"></i>
                Profile
              </Link>

              <Link
                to="/login"
                className="dashboard-nav-link logout-link"
              >
                <i className="bi bi-box-arrow-left"></i>
                Logout
              </Link>

            </div>

          </aside>


          {/* ================= MAIN CONTENT ================= */}

          <section className="dashboard-content">

            {/* Top Bar */}

            <div className="dashboard-topbar">

              <button className="dashboard-menu-btn">
                <i className="bi bi-list"></i>
              </button>

              <div className="dashboard-user">

                <div className="dashboard-user-avatar">
                  SB
                </div>

                <div>
                  <strong>Sourabh</strong>
                  <span>EV Driver</span>
                </div>

                <i className="bi bi-chevron-down"></i>

              </div>

            </div>


            {/* Welcome */}

            <div className="dashboard-welcome">

              <div>

                <span className="dashboard-label">
                  EVCHARGEHUB DASHBOARD
                </span>

                <h1>
                  Welcome back, <span>Sourabh!</span>
                </h1>

                <p>
                  Here's what's happening with your EV charging.
                </p>

              </div>

              <Link
                to="/stations"
                className="dashboard-primary-btn"
              >
                <i className="bi bi-plus-lg me-2"></i>
                Book a Charge
              </Link>

            </div>


            {/* ================= STATS ================= */}

            <div className="dashboard-stats">

              <div className="dashboard-stat-card">

                <div className="dashboard-stat-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>

                <div>
                  <span>Total Bookings</span>
                  <strong>12</strong>
                  <small>
                    <i className="bi bi-arrow-up"></i>
                    8% this month
                  </small>
                </div>

              </div>


              <div className="dashboard-stat-card">

                <div className="dashboard-stat-icon">
                  <i className="bi bi-lightning-charge"></i>
                </div>

                <div>
                  <span>Energy Consumed</span>
                  <strong>186 kWh</strong>
                  <small>
                    <i className="bi bi-arrow-up"></i>
                    12% this month
                  </small>
                </div>

              </div>


              <div className="dashboard-stat-card">

                <div className="dashboard-stat-icon">
                  <i className="bi bi-currency-rupee"></i>
                </div>

                <div>
                  <span>Total Spent</span>
                  <strong>₹2,480</strong>
                  <small>
                    This month
                  </small>
                </div>

              </div>


              <div className="dashboard-stat-card">

                <div className="dashboard-stat-icon">
                  <i className="bi bi-tree"></i>
                </div>

                <div>
                  <span>CO₂ Saved</span>
                  <strong>142 kg</strong>
                  <small>
                    <i className="bi bi-check-circle"></i>
                    Eco friendly
                  </small>
                </div>

              </div>

            </div>


            {/* ================= CONTENT GRID ================= */}

            <div className="dashboard-main-grid">

              {/* Upcoming Booking */}

              <div className="dashboard-panel upcoming-panel">

                <div className="dashboard-panel-header">

                  <div>
                    <span>UPCOMING</span>
                    <h2>Next Charging Session</h2>
                  </div>

                  <Link to="/bookings">
                    View All
                  </Link>

                </div>


                <div className="upcoming-booking">

                  <div className="upcoming-icon">
                    <i className="bi bi-ev-front-fill"></i>
                  </div>

                  <div className="upcoming-info">

                    <div className="booking-status">
                      <span></span>
                      Confirmed
                    </div>

                    <h3>
                      EVCharge Central
                    </h3>

                    <p>
                      <i className="bi bi-geo-alt me-1"></i>
                      Baner, Pune
                    </p>

                  </div>

                  <div className="upcoming-date">

                    <span>Tomorrow</span>

                    <strong>10:00 AM</strong>

                    <small>
                      DC Fast • 60 kW
                    </small>

                  </div>

                </div>


                <div className="upcoming-actions">

                  <button className="dashboard-outline-btn">
                    <i className="bi bi-map me-1"></i>
                    Directions
                  </button>

                  <button className="dashboard-outline-btn danger">
                    Cancel Booking
                  </button>

                </div>

              </div>


              {/* Quick Actions */}

              <div className="dashboard-panel">

                <div className="dashboard-panel-header">

                  <div>
                    <span>QUICK ACCESS</span>
                    <h2>Quick Actions</h2>
                  </div>

                </div>

                <div className="quick-actions">

                  <Link to="/stations">
                    <i className="bi bi-search"></i>
                    <span>Find Station</span>
                  </Link>

                  <Link to="/vehicles">
                    <i className="bi bi-car-front"></i>
                    <span>Add Vehicle</span>
                  </Link>

                  <Link to="/history">
                    <i className="bi bi-clock-history"></i>
                    <span>View History</span>
                  </Link>

                  <Link to="/payments">
                    <i className="bi bi-credit-card"></i>
                    <span>Payments</span>
                  </Link>

                </div>

              </div>

            </div>


            {/* ================= RECENT ACTIVITY ================= */}

            <div className="dashboard-panel recent-panel">

              <div className="dashboard-panel-header">

                <div>
                  <span>ACTIVITY</span>
                  <h2>Recent Charging History</h2>
                </div>

                <Link to="/history">
                  View History
                </Link>

              </div>


              <div className="charging-table">

                <div className="charging-table-header">
                  <span>Station</span>
                  <span>Date</span>
                  <span>Energy</span>
                  <span>Amount</span>
                  <span>Status</span>
                </div>


                <div className="charging-table-row">

                  <div className="charging-station-name">
                    <div>
                      <i className="bi bi-lightning-charge-fill"></i>
                    </div>

                    <span>
                      EVCharge Central
                    </span>
                  </div>

                  <span>15 Aug 2026</span>

                  <span>24.5 kWh</span>

                  <strong>₹294</strong>

                  <span className="table-status">
                    Completed
                  </span>

                </div>


                <div className="charging-table-row">

                  <div className="charging-station-name">
                    <div>
                      <i className="bi bi-lightning-charge-fill"></i>
                    </div>

                    <span>
                      Green Power Station
                    </span>
                  </div>

                  <span>10 Aug 2026</span>

                  <span>31.2 kWh</span>

                  <strong>₹468</strong>

                  <span className="table-status">
                    Completed
                  </span>

                </div>


                <div className="charging-table-row">

                  <div className="charging-station-name">
                    <div>
                      <i className="bi bi-lightning-charge-fill"></i>
                    </div>

                    <span>
                      EcoCharge Point
                    </span>
                  </div>

                  <span>05 Aug 2026</span>

                  <span>18.7 kWh</span>

                  <strong>₹187</strong>

                  <span className="table-status">
                    Completed
                  </span>

                </div>

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>
  );
}

export default Dashboard;