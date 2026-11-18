import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const stored = localStorage.getItem("loggedInUser");
      setUser(stored ? JSON.parse(stored) : null);
    };
    checkUser();
    window.addEventListener("userChanged", checkUser);
    window.addEventListener("storage", checkUser);
    return () => {
      window.removeEventListener("userChanged", checkUser);
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("https://evchargehub-backend.onrender.com/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {}
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("isAdmin");
    setUser(null);
    window.dispatchEvent(new Event("userChanged"));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">

        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <div className="brand-icon">
            <i className="bi bi-lightning-charge-fill"></i>
          </div>
          <div>
            <span className="brand-name">EVCharge</span>
            <span className="brand-highlight">Hub</span>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stations">Stations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/map">
                <i className="bi bi-geo-alt me-1"></i> Map
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>

            {/* NAYA - Sirf Login hone pe dikhega */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link fw-bold text-success" to="/dashboard">
                    <i className="bi bi-speedometer2 me-1"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-bookings">
                    My Bookings
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard" className="d-flex align-items-center gap-2 text-decoration-none me-1">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                    style={{ width: "38px", height: "38px", background: "#198754", fontSize: "16px" }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="lh-1">
                    <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>
                      {user.name}
                    </div>
                    <small className="text-muted" style={{ fontSize: "11px" }}>
                      {user.role || "USER"}
                    </small>
                  </div>
                </Link>

                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill px-3">
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-login">Login</Link>
                <Link to="/register" className="btn btn-register">
                  Get Started <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;