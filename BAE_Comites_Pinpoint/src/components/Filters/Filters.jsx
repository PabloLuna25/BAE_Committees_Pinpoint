import { useState } from "react";
import geoData from "../../../data/cr_geo.json";
//import "./Filters.css";

export default function Filters({ onFilter }) {
  const geo = geoData["Costa Rica"];

  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");
  const [distrito, setDistrito] = useState("");

  // Provincias
  const provincias = Object.keys(geo);

  // Cantones (depend on provincia)
  const cantones = provincia ? Object.keys(geo[provincia]) : [];

  // Distritos (depend on canton)
  const distritos =
    provincia && canton ? geo[provincia][canton] : [];

  return (
    <div>
      {/* Provincia */}
      <select
        onChange={(e) => {
          setProvincia(e.target.value);
          setCanton("");
          setDistrito("");
        }}
      >
        <option value="">Seleccione Provincia</option>
        {provincias.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {/* Cantón */}
      <select
        disabled={!provincia}
        onChange={(e) => {
          setCanton(e.target.value);
          setDistrito("");
        }}
      >
        <option value="">Seleccione Cantón</option>
        {cantones.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      {/* Distrito */}
      <select
        disabled={!canton}
        onChange={(e) => setDistrito(e.target.value)}
      >
        <option value="">Seleccione Distrito</option>
        {distritos.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <button
        onClick={() =>
          onFilter({ provincia, canton, distrito })
        }
      >
        Buscar
      </button>
    </div>
  );
}