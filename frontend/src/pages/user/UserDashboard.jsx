import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Realtime greeting based on user's local time
function getGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { text: "Good morning", emoji: "👋", sub: "Ready to charge your EV and continue your journey?" };
  }
  if (hour >= 12 && hour < 17) {
    return { text: "Good afternoon", emoji: "☀️", sub: "Hope your day is going well. Ready for your next charge?" };
  }
  if (hour >= 17 && hour < 21) {
    return { text: "Good evening", emoji: "🌇", sub: "Winding down? Make sure your EV is ready for tomorrow." };
  }
  return { text: "Good night", emoji: "🌙", sub: "Late night charge? We've got you covered." };
}

function UserDashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const loggedInUser = JSON.parse(storedUser);

    setUser(loggedInUser);

    fetch(
      `https://evchargehub-backend.onrender.com/api/bookings/user/${loggedInUser.id}`,
      { credentials: "include" }
    )
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        return response.json();

      })
      .then((data) => {

        setBookings(data);

      })
      .catch((error) => {

        console.error("Booking error:", error);

      })
      .finally(() => {

        setLoading(false);

      });

  }, [navigate]);

  const handleLogout = () => {

    fetch("https://evchargehub-backend.onrender.com/api/users/logout", {
      method: "POST",
      credentials: "include"
    }).catch((error) => console.error("Logout error:", error));

    localStorage.removeItem("loggedInUser");

    navigate("/login");

  };

  if (!user) {
    return null;
  }

  // Calculate total amount spent
  const totalSpent = bookings.reduce(
    (total, booking) =>
      total + (booking.totalAmount || 0),
    0
  );

  // Upcoming confirmed bookings
  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  );

  // Realtime greeting
  const greeting = getGreeting();

  return (

    <main className="user-dashboard">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">

          <i className="bi bi-lightning-charge-fill"></i>

          <span>
            EV<span>ChargeHub</span>
          </span>

        </div>

        <div className="dashboard-nav-links">

          <Link to="/dashboard" className="active">
            Dashboard
          </Link>

          <Link to="/stations">
            Stations
          </Link>

          <Link to="/my-bookings">
            My Bookings
          </Link>

        </div>

        <div className="dashboard-user">

          <div className="dashboard-user-info">

            <strong>
              {user.name}
            </strong>

            <small>
              {user.role || "USER"}
            </small>

          </div>

          <button
            onClick={handleLogout}
            className="dashboard-logout"
            title="Logout"
          >
            <i className="bi bi-box-arrow-right"></i>
          </button>

        </div>

      </nav>

      {/* ================= CONTENT ================= */}

      <div className="dashboard-container">

        {/* WELCOME */}

        <section className="dashboard-welcome">

          <div>

            <span className="dashboard-eyebrow">
              USER DASHBOARD
            </span>

            <h1>
              {greeting.text}, {user.name} {greeting.emoji}
            </h1>

            <p>
              {greeting.sub}
            </p>

          </div>

          <Link
            to="/stations"
            className="dashboard-primary-btn"
          >

            <i className="bi bi-lightning-charge-fill"></i>

            Find Charging Station

          </Link>

        </section>

        {/* ================= STATS ================= */}

        <section className="dashboard-stats">

          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <i className="bi bi-calendar-check"></i>
            </div>

            <div>

              <span>
                Total Bookings
              </span>

              <strong>
                {bookings.length}
              </strong>

            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <i className="bi bi-clock-history"></i>
            </div>

            <div>

              <span>
                Upcoming
              </span>

              <strong>
                {upcomingBookings.length}
              </strong>

            </div>

          </div>

          <div className="dashboard-stat-card">

            <div className="stat-icon">
              <i className="bi bi-wallet2"></i>
            </div>

            <div>

              <span>
                Total Spent
              </span>

              <strong>
                ₹{totalSpent.toFixed(2)}
              </strong>

            </div>

          </div>

        </section>

        {/* ================= UPCOMING BOOKING ================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>

              <span>
                YOUR ACTIVITY
              </span>

              <h2>
                Upcoming Booking
              </h2>

            </div>

            <Link to="/my-bookings">
              View all →
            </Link>

          </div>

          {loading ? (

            <div className="dashboard-empty-card">

              <i className="bi bi-arrow-repeat"></i>

              <p>
                Loading your bookings...
              </p>

            </div>

          ) : upcomingBookings.length === 0 ? (

            <div className="dashboard-empty-card">

              <div className="empty-icon">
                <i className="bi bi-ev-front"></i>
              </div>

              <h3>
                No upcoming bookings
              </h3>

              <p>
                Find a charging station and reserve your next slot.
              </p>

              <Link
                to="/stations"
                className="dashboard-primary-btn"
              >
                Find a Station
              </Link>

            </div>

          ) : (

            <div className="dashboard-booking-card">

              <div className="booking-station-icon">
                <i className="bi bi-lightning-charge-fill"></i>
              </div>

              <div className="booking-main">

                <div className="booking-title-row">

                  <div>

                    <h3>
                      {upcomingBookings[0].chargingStation?.name}
                    </h3>

                    <p>
                      <i className="bi bi-geo-alt"></i>

                      {upcomingBookings[0].chargingStation?.location}
                    </p>

                  </div>

                  <span className="booking-status">
                    {upcomingBookings[0].status}
                  </span>

                </div>

                <div className="booking-details">

                  <div>

                    <span>
                      Date & Time
                    </span>

                    <strong>
                      {upcomingBookings[0].bookingTime}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Duration
                    </span>

                    <strong>
                      {upcomingBookings[0].duration} min
                    </strong>

                  </div>

                  <div>

                    <span>
                      Amount
                    </span>

                    <strong>
                      ₹{upcomingBookings[0].totalAmount}
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          )}

        </section>

        {/* ================= QUICK ACTIONS ================= */}

        <section className="dashboard-section">

          <div className="section-heading">

            <div>

              <span>
                QUICK ACTIONS
              </span>

              <h2>
                What would you like to do?
              </h2>

            </div>

          </div>

          <div className="quick-actions">

            <Link
              to="/stations"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                <i className="bi bi-geo-alt-fill"></i>
              </div>

              <div>

                <h3>
                  Find a Station
                </h3>

                <p>
                  Discover nearby EV charging stations.
                </p>

              </div>

              <i className="bi bi-arrow-right"></i>

            </Link>

            <Link
              to="/my-bookings"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                <i className="bi bi-calendar2-check"></i>
              </div>

              <div>

                <h3>
                  My Bookings
                </h3>

                <p>
                  View and manage your charging bookings.
                </p>

              </div>

              <i className="bi bi-arrow-right"></i>

            </Link>

            <Link
              to="/profile"
              className="quick-action-card"
            >

              <div className="quick-action-icon">
                <i className="bi bi-person-circle"></i>
              </div>

              <div>

                <h3>
                  My Profile
                </h3>

                <p>
                  Manage your account information.
                </p>

              </div>

              <i className="bi bi-arrow-right"></i>

            </Link>

          </div>

        </section>

      </div>

    </main>

  );
}

export default UserDashboard;