import { useState } from "react";

function StationSearch() {
  const [location, setLocation] = useState("");
  const [chargerType, setChargerType] = useState("All");

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Search:", {
      location,
      chargerType,
    });
  };

  return (
    <section className="station-search-section">

      <div className="container">

        {/* Section Header */}
        <div className="section-heading text-center">

          <span className="section-label">
            <i className="bi bi-ev-front-fill me-2"></i>
            FIND YOUR CHARGER
          </span>

          <h2>
            Find a charging station
            <span> near you.</span>
          </h2>

          <p>
            Discover nearby charging stations and find the perfect
            place to power up your EV.
          </p>

        </div>

        {/* Search Box */}
        <div className="station-search-box">

          <form onSubmit={handleSearch}>

            <div className="row g-3 align-items-end">

              {/* Location */}
              <div className="col-lg-5">

                <label className="search-label">
                  Location
                </label>

                <div className="search-input-wrapper">

                  <i className="bi bi-geo-alt"></i>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city or location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />

                </div>

              </div>

              {/* Charger Type */}
              <div className="col-lg-4">

                <label className="search-label">
                  Charger Type
                </label>

                <div className="search-input-wrapper">

                  <i className="bi bi-lightning-charge"></i>

                  <select
                    className="form-select"
                    value={chargerType}
                    onChange={(e) => setChargerType(e.target.value)}
                  >

                    <option value="All">
                      All Charger Types
                    </option>

                    <option value="AC">
                      AC Charging
                    </option>

                    <option value="DC">
                      DC Fast Charging
                    </option>

                    <option value="Fast">
                      Ultra Fast Charging
                    </option>

                  </select>

                </div>

              </div>

              {/* Search Button */}
              <div className="col-lg-3">

                <button
                  type="submit"
                  className="station-search-btn w-100"
                >
                  <i className="bi bi-search me-2"></i>
                  Search Stations
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </section>
  );
}

export default StationSearch;