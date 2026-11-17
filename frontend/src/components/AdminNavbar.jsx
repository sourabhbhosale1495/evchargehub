import { NavLink, useNavigate } from "react-router-dom";

function AdminNavbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) {
      return;
    }

    localStorage.removeItem("loggedInUser");

    navigate("/login");
  };


  return (

    <nav className="admin-navbar">

      <div className="container-fluid px-4">

        <div className="d-flex align-items-center justify-content-between">

          {/* ================= LOGO ================= */}

          <NavLink
            to="/admin"
            className="admin-brand text-decoration-none"
          >

            <div className="admin-brand-icon">

              <i className="bi bi-lightning-charge-fill"></i>

            </div>

            <div>

              <div className="admin-brand-name">
                EVCharge<span>Hub</span>
              </div>

              <small>
                ADMIN PANEL
              </small>

            </div>

          </NavLink>


          {/* ================= NAVIGATION ================= */}

          <div className="admin-nav-links">

            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `admin-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <i className="bi bi-grid-1x2-fill"></i>

              <span>Dashboard</span>

            </NavLink>


            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `admin-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <i className="bi bi-people-fill"></i>

              <span>Users</span>

            </NavLink>


            <NavLink
              to="/admin/stations"
              className={({ isActive }) =>
                `admin-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <i className="bi bi-lightning-charge-fill"></i>

              <span>Stations</span>

            </NavLink>


            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `admin-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <i className="bi bi-calendar-check-fill"></i>

              <span>Bookings</span>

            </NavLink>


            <NavLink
              to="/admin/payments"
              className={({ isActive }) =>
                `admin-nav-link ${
                  isActive ? "active" : ""
                }`
              }
            >

              <i className="bi bi-credit-card-fill"></i>

              <span>Payments</span>

            </NavLink>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="admin-nav-right">

            <div className="admin-status">

              <span className="admin-status-dot"></span>

              <span>System Online</span>

            </div>


            <div className="admin-divider"></div>


            <div className="admin-profile">

              <div className="admin-avatar">
                <i className="bi bi-person-fill"></i>
              </div>

              <div className="admin-profile-text">

                <strong>Administrator</strong>

                <small>Admin</small>

              </div>

            </div>


            <button
              className="admin-logout-btn"
              onClick={handleLogout}
              title="Logout"
            >

              <i className="bi bi-box-arrow-right"></i>

            </button>

          </div>

        </div>

      </div>

    </nav>

  );
}

export default AdminNavbar;