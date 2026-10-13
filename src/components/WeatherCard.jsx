export default function WeatherCard({ weather }) {
  if (!weather) {
    return null;
  }

  return (
    <div className="weather-card">
      <h2>{weather.location}</h2>

      <p className="temperature">
        {weather.temperature}°C
      </p>

      <p>Humidity: {weather.humidity}%</p>
      <p>Wind speed: {weather.windSpeed} km/h</p>
      <p>Maximum: {weather.maxTemperature}°C</p>
      <p>Minimum: {weather.minTemperature}°C</p>
      <p>
        Weather: {getWeatherDescription(weather.weatherCode)}
      </p>
    </div>
  );
}

function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Partly cloudy or overcast";
  if ([45, 48].includes(code)) return "Fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "Rain";
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
  if ([95, 96, 99].includes(code)) return "Thunderstorm";

  return "Weather conditions unavailable";
}