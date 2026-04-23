import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";

export default function MapView() {
  const { state } = useLocation();

  if (!state || !state.coords) return <p>No location found</p>;

  return (
    <div>
      <h2>{state.nombre}</h2>

      <MapContainer
        center={[state.coords.lat, state.coords.lon]}
        zoom={15}
        style={{ height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[state.coords.lat, state.coords.lon]}>
          <Popup>{state.nombre}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}