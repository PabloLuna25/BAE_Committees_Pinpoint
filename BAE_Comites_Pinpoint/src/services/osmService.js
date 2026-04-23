export async function searchLocation(nombre, distrito, canton, provincia) {
  const query = `${nombre}, ${distrito}, ${canton}, ${provincia}, Costa Rica`;

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data)

  if (data.length > 0) {
    return {
      lat: data[0].lat,
      lon: data[0].lon
    };
  }

  return null;
}