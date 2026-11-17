import { Link } from "react-router-dom";

import StationSearch from "../../components/StationSearch";
import StationList from "../../components/StationList";

function Home() {
  return (
    <main>

      {/* Hero Section */}
      <section className="hero-section">

        <div className="container">

          <div className="row align-items-center min-vh-75">

            {/* Left Content */}
            <div className="col-lg-7">

              <div className="hero-badge">
                <i className="bi bi-lightning-charge-fill me-2"></i>
                Smart EV Charging Network
              </div>

              <h1 className="hero-title">
                Power Your Journey.
                <br />
                <span>Charge Smarter.</span>
              </h1>

              <p className="hero-description">
                Find nearby EV charging stations, check real-time
                availability, and book your charging slot in seconds.
              </p>

              {/* Buttons */}
              <div className="hero-buttons">

                <Link to="/stations" className="hero-btn-primary">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Find Charging Station
                </Link>

                <Link to="/map" className="hero-btn-secondary">
                  Explore Map
                  <i className="bi bi-arrow-up-right ms-2"></i>
                </Link>

              </div>

              {/* Statistics */}
              <div className="hero-stats">

                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Charging Stations</p>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                  <h3>10K+</h3>
                  <p>Happy Users</p>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                  <h3>24/7</h3>
                  <p>Availability</p>
                </div>

              </div>

            </div>

            {/* Right Visual */}
            <div className="col-lg-5">

              <div className="hero-visual">

                <div className="hero-circle"></div>

                <div className="charging-card">

                  <div className="charging-icon">
                    <i className="bi bi-lightning-charge-fill"></i>
                  </div>

                  <div>
                    <span className="charging-label">
                      Charging Available
                    </span>

                    <h4>Ready to Charge</h4>
                  </div>

                  <div className="charging-status">
                    <span></span>
                  </div>

                </div>

                <div className="energy-card">

                  <i className="bi bi-battery-charging"></i>

                  <div>
                    <small>Energy Delivered</small>
                    <strong>82.4 kWh</strong>
                  </div>

                </div>

                <div className="floating-bolt">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
        <StationSearch />
        <StationList />

    </main>
  );
}

export default Home;