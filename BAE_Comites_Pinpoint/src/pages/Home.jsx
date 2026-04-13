import { useEffect, useState } from "react";
import Filters from "../components/Filters/Filters";
import LocationCard from "../components/Locationcard/LocationCard";
import { searchLocation } from "../services/osmService";
import data from "../../data/locations.json";

export default function Home({ navigate }) {
  const [filtered, setFiltered] = useState([]);


  async function handleFilter({ provincia, canton, distrito }) {
    const results = data.filter(d =>
      d.provincia.toLowerCase() == provincia.toLowerCase() &&
      d.canton.toLowerCase() == canton.toLowerCase() &&
      d.distrito.toLowerCase() == distrito.toLowerCase()
    );

    console.log(results)

    console.log("Selected:", provincia, canton, distrito);
    console.log("First item:", data[0]);

    // Check OSM
    const withCoords = await Promise.all(results.map(async loc => {
      const coords = await searchLocation(
        loc.nombre,
        loc.distrito,
        loc.canton,
        loc.provincia
      );

      return { ...loc, coords };
    }));

    setFiltered(withCoords);
  }

  return (
    <div>
      <h1>¡Descubra los comités cerca de usted!</h1>

      <Filters data={data} onFilter={handleFilter} />

      <div className="grid">
        {filtered.map((loc, i) => (
          <LocationCard
            key={i}
            location={loc}
            onView={(l) => navigate(`/map`, { state: l })}
          />
        ))}
      </div>
    </div>
  );
}