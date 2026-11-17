import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";

function MapController({ selectedStation }) {
  const map = useMap();

  useEffect(() => {
    if (selectedStation) {
      map.flyTo(
        [selectedStation.latitude, selectedStation.longitude],
        13,
        {
          duration: 1,
        }
      );
    }
  }, [selectedStation, map]);

  return null;
}

function EVMap() {
  const navigate = useNavigate();

  const [stations, setStations] = useState([]);
  const [search, setSearch] = useState("");
  const [chargerType, setChargerType] = useState("All");
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH STATIONS FROM BACKEND
  // =========================

  useEffect(() => {
    fetch("https://evchargehub-backend.onrender.com/api/stations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stations");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Stations from backend:", data);

        setStations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Station fetch error:", error);

        setError("Unable to load charging stations.");
        setLoading(false);
      });
  }, []);

  // =========================
  // FILTER STATIONS
  // =========================

  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      const stationName = station.name || "";
      const stationLocation = station.location || "";
      const stationType = station.chargerType || "";

      const matchesSearch =
        stationName.toLowerCase().includes(search.toLowerCase()) ||
        stationLocation.toLowerCase().includes(search.toLowerCase());

      const matchesType =
        chargerType === "All" ||
        stationType === chargerType;

      return matchesSearch && matchesType;
    });
  }, [stations, search, chargerType]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
        </div>

        <p className="mt-3 text-muted">
          Loading charging stations...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="alert alert-danger text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="station-finder">

      {/* =========================
          SEARCH HEADER
      ========================= */}

      <div className="station-search-panel">

        <div className="station-search-box">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search by city or station..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <select
          value={chargerType}
          onChange={(e) => setChargerType(e.target.value)}
        >
          <option value="All">
            All Chargers
          </option>

          <option value="DC Fast Charger">
            DC Fast Charger
          </option>

          <option value="AC Charger">
            AC Charger
          </option>
        </select>

      </div>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="station-map-layout">

        {/* =========================
            STATION LIST
        ========================= */}

        <div className="station-list">

          <div className="station-list-header">

            <div>

              <span className="station-label">
                EV NETWORK
              </span>

              <h3>
                Charging Stations
              </h3>

            </div>

            <span className="station-count">
              {filteredStations.length}
            </span>

          </div>


          {/* NO STATIONS */}

          {filteredStations.length === 0 ? (

            <div className="no-stations">

              <div>
                🔍
              </div>

              <h4>
                No stations found
              </h4>

              <p>
                Try another location or charger type.
              </p>

            </div>

          ) : (

            filteredStations.map((station) => (

              <div
                key={station.id}
                className={`station-card ${
                  selectedStation?.id === station.id
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedStation(station)
                }
              >

                {/* =========================
                    STATION TOP
                ========================= */}

                <div className="station-card-top">

                  <div className="station-icon">
                    ⚡
                  </div>

                  <div className="station-card-title">

                    <h4>
                      {station.name}
                    </h4>

                    <p>
                      📍 {station.location}
                    </p>

                  </div>

                  <span
                    className={`station-status ${
                      station.active
                        ? "available"
                        : "unavailable"
                    }`}
                  >
                    {station.active
                      ? "Available"
                      : "Unavailable"}
                  </span>

                </div>


                {/* =========================
                    STATION DETAILS
                ========================= */}

                <div className="station-details">

                  <span>
                    ⚡ {station.chargerType}
                  </span>

                  <span>
                    🔋 {station.availableSlots} slots
                  </span>

                  <span>
                    ₹{station.pricePerUnit}/kWh
                  </span>

                </div>


                {/* =========================
                    BOTTOM
                ========================= */}

                <div className="station-card-bottom">

                  <span className="slots">

                    {station.availableSlots > 0
                      ? `${station.availableSlots} slots available`
                      : "No slots available"}

                  </span>


                  <div className="station-actions">

                    {/* VIEW */}

                    <button
                      className="view-station-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(
                          `/stations/${station.id}`
                        );
                      }}
                    >
                      View
                    </button>


                    {/* BOOK */}

                    <button
                      disabled={
                        station.availableSlots === 0 ||
                        !station.active
                      }
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(
                          `/booking/${station.id}`
                        );
                      }}
                    >
                      Book Now
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>


        {/* =========================
            MAP
        ========================= */}

        <div className="map-section">

          <MapContainer
            center={[18.5204, 73.8567]}
            zoom={7}
            scrollWheelZoom={true}
            className="ev-map"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <MapController
              selectedStation={selectedStation}
            />


            {/* =========================
                MAP MARKERS
            ========================= */}

            {filteredStations.map((station) => (

              <CircleMarker
                key={station.id}
                center={[
                  station.latitude,
                  station.longitude,
                ]}
                radius={10}
                pathOptions={{
                  color: station.active
                    ? "#15803d"
                    : "#9ca3af",

                  fillColor: station.active
                    ? "#22c55e"
                    : "#9ca3af",

                  fillOpacity: 0.9,
                }}
                eventHandlers={{
                  click: () =>
                    setSelectedStation(station),
                }}
              >

                <Popup>

                  <div className="station-popup">

                    <h5>
                      {station.name}
                    </h5>

                    <p>
                      📍 {station.location}
                    </p>

                    <p>
                      ⚡ {station.chargerType}
                    </p>

                    <p>
                      🔋 {station.availableSlots} slots
                    </p>

                    <p>
                      💰 ₹{station.pricePerUnit}/kWh
                    </p>


                    <button
                      className="popup-book-btn"
                      disabled={
                        station.availableSlots === 0 ||
                        !station.active
                      }
                      onClick={() =>
                        navigate(
                          `/booking/${station.id}`
                        )
                      }
                    >
                      {station.availableSlots > 0 &&
                      station.active
                        ? "Book Now"
                        : "Unavailable"}
                    </button>

                  </div>

                </Popup>

              </CircleMarker>

            ))}

          </MapContainer>

        </div>

      </div>

    </div>
  );
}

export default EVMap;