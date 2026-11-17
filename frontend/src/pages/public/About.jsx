import { Link } from "react-router-dom";

const features = [
  {
    icon: "bi-geo-alt",
    title: "Find a station",
    description:
      "Search for charging locations and explore stations on an interactive map.",
  },
  {
    icon: "bi-calendar2-check",
    title: "Plan your charge",
    description:
      "Review station details and reserve a charging slot that fits your journey.",
  },
  {
    icon: "bi-credit-card",
    title: "Manage bookings",
    description:
      "Complete payment and keep track of your reservations from your account.",
  },
];

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container about-hero-content">
          <span className="about-eyebrow">
            <i className="bi bi-lightning-charge-fill" aria-hidden="true" />
            ABOUT EVCHARGEHUB
          </span>
          <h1>Make every stop part of the journey.</h1>
          <p>
            EVChargeHub brings station discovery, charging reservations, and
            booking management together in one place, helping electric vehicle
            drivers plan their next charge with confidence.
          </p>
          <Link to="/stations" className="about-cta">
            Explore stations <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="about-intro container">
        <div className="about-intro-mark" aria-hidden="true">
          <i className="bi bi-plug-fill" />
        </div>
        <div>
          <span className="about-section-label">OUR PURPOSE</span>
          <h2>A simpler way to find your next charge</h2>
          <p>
            Finding a place to charge should feel straightforward. EVChargeHub
            helps drivers browse available charging stations, view their
            location and details, and book a slot through a clear online flow.
            Whether you are planning ahead or checking what is nearby, the
            tools you need are easy to reach.
          </p>
        </div>
      </section>

      <section className="about-features-section">
        <div className="container">
          <div className="about-section-heading">
            <span className="about-section-label">HOW IT WORKS</span>
            <h2>From searching to charging</h2>
            <p>Everything you need to organize a charging stop.</p>
          </div>
          <div className="about-feature-grid">
            {features.map((feature, index) => (
              <article className="about-feature-card" key={feature.title}>
                <div className="about-feature-top">
                  <span className="about-feature-icon">
                    <i className={`bi ${feature.icon}`} aria-hidden="true" />
                  </span>
                  <span className="about-feature-number">0{index + 1}</span>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-platform container">
        <div className="about-platform-copy">
          <span className="about-section-label">BUILT FOR DRIVERS AND OPERATORS</span>
          <h2>One platform, two useful perspectives</h2>
          <p>
            Drivers can discover stations and manage their bookings. The
            administrative tools help operators maintain station listings and
            oversee users, bookings, and payments. Together, these features
            support the full charging reservation experience.
          </p>
          <Link to="/register" className="about-text-link">
            Create your account <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
        <div className="about-platform-card">
          <div className="about-platform-row">
            <span className="about-platform-icon"><i className="bi bi-car-front-fill" aria-hidden="true" /></span>
            <div><strong>For drivers</strong><small>Search, book, and manage charging visits</small></div>
            <i className="bi bi-check-circle-fill about-check" aria-hidden="true" />
          </div>
          <div className="about-platform-row">
            <span className="about-platform-icon"><i className="bi bi-ev-station-fill" aria-hidden="true" /></span>
            <div><strong>For operators</strong><small>Maintain stations and oversee activity</small></div>
            <i className="bi bi-check-circle-fill about-check" aria-hidden="true" />
          </div>
          <div className="about-platform-note">
            <i className="bi bi-shield-check" aria-hidden="true" />
            Booking and account tools in one connected experience
          </div>
        </div>
      </section>

      <section className="about-bottom-cta">
        <div className="container about-bottom-inner">
          <div>
            <span>Ready for your next stop?</span>
            <h2>Find a charging station and plan ahead.</h2>
          </div>
          <Link to="/map" className="about-cta about-cta-light">
            Open the map <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
