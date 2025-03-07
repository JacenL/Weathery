"use client";

import { useState } from "react";
import { fetchForecast, ForecastDay } from "../utils/fetchForecast";

export default function Forecast() {
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFetchForecast() {
    if (!city) return;
    setLoading(true);

    const data = await fetchForecast(city);
    setForecast(data);

    setLoading(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFetchForecast();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-gray-100 text-2xl font-bold mb-4">Weekly Weather Forecast</h1>
      <div className="flex items-center space-x-1">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-gray-100 p-2 border rounded-lg"
        />
        <button
          onClick={handleFetchForecast}
          className="ml-2 p-2 bg-blue-400 text-white rounded-lg"
        >
          Get Forecast
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Fetching forecast...</p>}

      {forecast && (
        <div className="mt-6">
          {forecast.map((day, index) => (
            <div key={index} className="text-gray-100 p-4 border-b">
              <h2 className="text-gray-100 text-xl font-semibold">{day.datetime}</h2>
              <p className="text-gray-400">Temp: {day.temp}°C</p>
              <p className="text-gray-400">Max: {day.tempmax}°C | Min: {day.tempmin}°C</p>
              <p className="text-gray-400">Humidity: {day.humidity}%</p>
              <p className="text-gray-400">Conditions: {day.conditions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
