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

  const getBackground = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes("clear") || cond.includes("sunny")) return "from-yellow-300 to-blue-400";
    if (cond.includes("partly") || cond.includes("cloudy")) return "from-gray-300 to-blue-500";
    if (cond.includes("rain")) return "from-blue-600 to-blue-800";
    if (cond.includes("storm")) return "from-gray-700 to-black";
    if (cond.includes("snow")) return "from-white to-blue-200";
    return "from-gray-500 to-gray-700";
  };

  return (
    <div className="flex flex-col items-center text-center min-h-screen">
      <h1 className="text-gray-100 text-2xl font-bold mt-15">
        Weekly Weather Forecast
      </h1>

      {loading && <p className="mt-4 text-gray-600">Fetching forecast...</p>}

      {forecast && (
        <div className="w-full">
          <h2 className="text-gray-200 text-xl font-semibold mt-6">
            Forecast for {cityName}
          </h2>
          <div className="mt-12 w-max min-h-screen flex justify-center">
            {forecast.slice(1).map((day, index, arr) => {
              const bg = getBackground(day.conditions);
              const offset = 15 + 1.25;
              const isFirst = index === 0;
              const isLast = index === arr.length - 1;
              return (
                <div
                  key={`bg-${index}`}
                  className={`absolute top-0 w-65.25 min-h-screen bg-gradient-to-b opacity-80 ${bg} -z-10`}
                  style={{
                    left: `${index * offset}rem`,
                    transform:
                      index === 0
                        ? `translateX(calc(1rem - 5vw))`
                        : `translateX(0.985rem)`,
                    width:
                      index === 0 || index === forecast.length - 2
                        ? `calc(16.25rem + 5vw)`
                        : `16.25rem`,
                  }}
                />
              );
            })}
            <div className="flex gap-5">
              {forecast.slice(1).map((day, index) => (
                <div
                  key={index}
                  className="w-60 h-64  text-gray-100 bg-gray-800 bg-opacity-80 rounded-lg p-4 shadow-md text-left flex-shrink-0 z-10"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {new Date(day.datetime).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </h2>
                  <p className="text-gray-400">Temp: {day.temp}°C</p>
                  <p className="text-gray-400">
                    Max: {day.tempmax}°C | Min: {day.tempmin}°C
                  </p>
                  <p className="text-gray-400">Humidity: {day.humidity}%</p>
                  <p className="text-gray-400">Wind: {day.windspeed} km/h</p>
                  <p className="text-gray-400">Conditions: {day.conditions}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
