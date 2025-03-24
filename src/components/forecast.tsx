"use client";

import { useState, useEffect } from "react";
import { fetchForecast, ForecastDay } from "../utils/fetchForecast";
import { useSearchParams } from "next/navigation";

export default function Forecast() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";

  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [cityName, setCity] = useState(city);

  useEffect(() => {
    async function fetchCityForecast() {
      if (!city) {
        console.warn("No city provided in URL, skipping fetch.");
        return;
      }

      setLoading(true);
      console.log(`Fetching forecast for: ${city}`);

      try {
        const data = await fetchForecast(city);
        console.log("Forecast data received:", data);
        if (data) {
          setCity(data[0].address);
          setForecast(data);
        }
      } catch (error) {
        console.error("Error fetching forecast:", error);
      }

      setLoading(false);
    }
    fetchCityForecast();
  }, [city]);

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-gray-100 text-2xl font-bold mt-15">
        Weekly Weather Forecast
      </h1>

      {loading && <p className="mt-4 text-gray-600">Fetching forecast...</p>}

      {forecast && (
        <div className="mt-6">
          <h2 className="text-gray-200 text-xl font-semibold mb-4">
            Forecast for {cityName}
          </h2>
          {forecast.map((day, index) => (
            <div key={index} className="text-gray-100 p-4 border-b">
              <h2 className="text-gray-100 text-xl font-semibold">{day.datetime}</h2>
              <p className="text-gray-400">Temp: {day.temp}°C</p>
              <p className="text-gray-400">Max: {day.tempmax}°C | Min: {day.tempmin}°C</p>
              <p className="text-gray-400">Humidity: {day.humidity}%</p>
              <p className="text-gray-400">Wind Speed: {day.windspeed} km/h</p>
              <p className="text-gray-400">Conditions: {day.conditions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
