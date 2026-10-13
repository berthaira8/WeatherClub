import axios from "axios";

const GEOCODING_URL = import.meta.env.VITE_GEOCODING_URL;
const WEATHER_URL = import.meta.env.VITE_WEATHER_URL;

export async function getWeather(district) {
  try {
    const locationResponse = await axios.get(GEOCODING_URL, {
      params: {
        name: district,
        count: 1,
        countryCode: "RW",
        language: "en",
        format: "json",
      },
    });

    const location = locationResponse.data.results?.[0];

    if (!location) {
      throw new Error("District or location not found.");
    }

    const weatherResponse = await axios.get(WEATHER_URL, {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
        daily: "temperature_2m_max,temperature_2m_min",
        timezone: "auto",
        forecast_days: 1,
      },
    });

    return {
      location: location.name,
      temperature: weatherResponse.data.current.temperature_2m,
      humidity: weatherResponse.data.current.relative_humidity_2m,
      windSpeed: weatherResponse.data.current.wind_speed_10m,
      weatherCode: weatherResponse.data.current.weather_code,
      maxTemperature: weatherResponse.data.daily.temperature_2m_max[0],
      minTemperature: weatherResponse.data.daily.temperature_2m_min[0],
    };
  } catch (error) {
    if (error.response) {
      throw new Error("Weather service request failed.");
    }

    throw error;
  }
}