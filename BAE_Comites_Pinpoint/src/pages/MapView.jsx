import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import "../styles/mapView.css"

// Needed for the usual "mark" or "pin" .png to show in deploy (specially cellphone)
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapView() {
  const { state } = useLocation();

  if (!state || !state.coords) return <p>No location found</p>;

  const copyCoords = () => {
    navigator.clipboard.writeText(
      `${state.coords.lat} ${state.coords.lon}`
    );
    alert("Coordenadas copiadas");
  };

  return (
    <div className="mapStats">
      <h2>{state.nombre}</h2>

      <MapContainer
        className="mapContainer"
        center={[state.coords.lat, state.coords.lon]}
        zoom={15}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[state.coords.lat, state.coords.lon]}>
          <Popup>
            <div className="marker">
              <strong>{state.nombre}</strong>
              <div className="coords" onClick={copyCoords}>
                {state.coords.lat}, {state.coords.lon}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}