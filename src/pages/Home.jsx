import { useEffect, useState } from "react";
import { getWeather } from "../services/weatherApi";
import useDebounce from "../hooks/useDebounce";
import WeatherCard from "../components/WeatherCard";

export default function Home() {
  const [district, setDistrict] = useState("Kigali");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedDistrict = useDebounce(district, 500);

  useEffect(() => {
    if (!debouncedDistrict.trim()) {
      setWeather(null);
      setError("");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadWeather() {
      setLoading(true);
      setError("");

      try {
        const data = await getWeather(debouncedDistrict.trim());

        if (!cancelled) {
          setWeather(data);
        }
      } catch (err) {
        if (!cancelled) {
          setWeather(null);
          setError(err.message || "Unable to load weather.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [debouncedDistrict]);

  return (
    <main className="container">
      <h1>Club Trips Weather</h1>

      <p>
        Check the weather before choosing a destination
        for your club trip.
      </p>

      <label htmlFor="district">Search for a district</label>

      <input
        id="district"
        type="text"
        placeholder="Example: Kigali, Huye, Musanze"
        value={district}
        onChange={(event) => setDistrict(event.target.value)}
      />

      {loading && <p>Loading weather...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && weather && (
        <WeatherCard weather={weather} />
      )}
    </main>
  );
}