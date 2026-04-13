export default function LocationCard({ location, onView }) {
    console.log("Location card event called")
  return (
    <div className="card">
      <h3>{location.nombre}</h3>
      <p>{location.distrito}</p>

      <button
        disabled={!location.coords}
        onClick={() => onView(location)}
      >
        Ver
      </button>
    </div>
  );
}