import EVMap from "../components/EVMap";

function Map() {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <span className="text-success fw-semibold">
          EV CHARGING NETWORK
        </span>

        <h1 className="fw-bold mt-2">
          Find EV Charging Stations
        </h1>

        <p className="text-muted">
          Discover nearby charging stations and book your
          charging slot easily.
        </p>
      </div>

      <EVMap />
    </div>
  );
}

export default Map;