import { Link } from "react-router-dom";

function Navbar() {
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
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/stations">
                Stations
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/map">
                <i className="bi bi-geo-alt me-1"></i>
                Map
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-2">

            <Link to="/login" className="btn btn-login">
              Login
            </Link>

            <Link to="/register" className="btn btn-register">
              Get Started
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;