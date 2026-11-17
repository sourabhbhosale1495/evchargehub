import { Link } from "react-router-dom";

function StationCard({ station }) {
  return (
    <div className="station-card">

      {/* Card Header */}
      <div className="station-card-header">

        <div className="station-icon">
          <i className="bi bi-ev-front-fill"></i>
        </div>

        <span className="station-available">
          <span></span>
          Available
        </span>

      </div>

      {/* Station Information */}
      <div className="station-card-body">

        <h3>{station.name}</h3>

        <p className="station-location">
          <i className="bi bi-geo-alt me-1"></i>
          {station.location}
        </p>

        <div className="station-details">

          <div>
            <i className="bi bi-lightning-charge"></i>
            <span>{station.chargerType}</span>
          </div>

          <div>
            <i className="bi bi-speedometer2"></i>
            <span>{station.power}</span>
          </div>

          <div>
            <i className="bi bi-currency-rupee"></i>
            <span>{station.price}/kWh</span>
          </div>

        </div>

      </div>

      {/* Card Footer */}
      <div className="station-card-footer">

        <span className="station-distance">
          <i className="bi bi-signpost-2 me-1"></i>
          {station.distance}
        </span>

        <Link
          to={`/stations/${station.id}`}
          className="station-book-btn"
        >
          View Station
          <i className="bi bi-arrow-right ms-2"></i>
        </Link>

      </div>

    </div>
  );
}

export default StationCard;