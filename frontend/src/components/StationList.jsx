import StationCard from "./StationCard";

const stations = [
  {
    id: 1,
    name: "EVCharge Central",
    location: "Baner, Pune",
    chargerType: "DC Fast",
    power: "60 kW",
    price: "12",
    distance: "2.4 km",
  },
  {
    id: 2,
    name: "Green Power Station",
    location: "Aundh, Pune",
    chargerType: "Ultra Fast",
    power: "120 kW",
    price: "15",
    distance: "3.1 km",
  },
  {
    id: 3,
    name: "EcoCharge Point",
    location: "Wakad, Pune",
    chargerType: "AC",
    power: "22 kW",
    price: "10",
    distance: "4.7 km",
  },
];

function StationList() {
  return (
    <section className="stations-section">

      <div className="container">

        <div className="stations-heading">

          <div>
            <span className="section-label">
              <i className="bi bi-lightning-charge-fill me-2"></i>
              NEARBY STATIONS
            </span>

            <h2>
              Popular charging
              <span> stations.</span>
            </h2>
          </div>

          <button className="view-all-btn">
            View All
            <i className="bi bi-arrow-right ms-2"></i>
          </button>

        </div>

        <div className="row g-4">

          {stations.map((station) => (
            <div
              className="col-md-6 col-lg-4"
              key={station.id}
            >
              <StationCard station={station} />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default StationList;