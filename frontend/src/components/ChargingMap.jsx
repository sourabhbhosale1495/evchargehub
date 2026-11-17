import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "520px",
};

const center = {
  lat: 18.559,
  lng: 73.7868,
};

const stations = [
  {
    id: 1,
    name: "EVCharge Central",
    lat: 18.559,
    lng: 73.7868,
  },
  {
    id: 2,
    name: "Green Power Station",
    lat: 18.567,
    lng: 73.807,
  },
  {
    id: 3,
    name: "EcoCharge Point",
    lat: 18.599,
    lng: 73.763,
  },
];

function ChargingMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return (
      <div className="map-error">
        Unable to load Google Maps.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="map-loading">
        Loading map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={13}
      center={center}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      }}
    >
      {stations.map((station) => (
        <MarkerF
          key={station.id}
          position={{
            lat: station.lat,
            lng: station.lng,
          }}
          title={station.name}
        />
      ))}
    </GoogleMap>
  );
}

export default ChargingMap;