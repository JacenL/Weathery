"use client";

import { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "../utils/fetchWeather";
import { useSearchParams } from "next/navigation";

export default function Weather() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [textClass, setTextClass] = useState("text-gray-200");
  
  useEffect(() => {
    if (!city) {
      console.warn("No city provided in URL, skipping fetch.");
      return;
    }

    async function fetchCityWeather() {
      setLoading(true);
      console.log(`Fetching weather for: ${city}`);
      try {
        const data = await fetchWeather(city);
        console.log("Weather data received:", data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
      setLoading(false);
    }

    fetchCityWeather();
  }, [city]);

  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen">
      <h1 className="text-gray-100 text-2xl font-bold mb-4">Current Weather</h1>

      {loading && <p className="mt-4 text-gray-400">Fetching weather...</p>}

      {weatherData && (
        <div className={`mt-4 ${textClass}`}>
          <h2 className="text-xl font-semibold">{city}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Max Temp: {weatherData.tempmax}°C</p>
          <p>Min Temp: {weatherData.tempmin}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Conditions: {weatherData.conditions}</p>
        </div>
      )}
    </div>
  );
}
