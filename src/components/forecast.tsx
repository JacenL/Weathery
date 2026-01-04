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
      if (!city) return;

      setLoading(true);
      try {
        const data = await fetchForecast(city);
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
    if (cond.includes("clear") || cond.includes("sunny"))
      return "from-yellow-300 to-blue-400";
    if (cond.includes("partly") || cond.includes("cloudy"))
      return "from-gray-300 to-blue-500";
    if (cond.includes("rain")) return "from-blue-600 to-blue-800";
    if (cond.includes("storm")) return "from-gray-700 to-black";
    if (cond.includes("snow")) return "from-white to-blue-200";
    return "from-gray-500 to-gray-700";
  };

  const days = forecast ? forecast.slice(1) : [];

  const CARD_W_REM = 15;
  const GAP_REM = 1.25;
  const COL_W_REM = CARD_W_REM + GAP_REM;
  const SIDE_PAD_REM = (COL_W_REM - CARD_W_REM) / 2;
  const TOTAL_W_REM = days.length * COL_W_REM;

  const firstBg = days.length
    ? getBackground(days[0].conditions)
    : "from-gray-500 to-gray-700";
  const lastBg = days.length
    ? getBackground(days[days.length - 1].conditions)
    : "from-gray-500 to-gray-700";

  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute inset-0 -z-10 flex pointer-events-none">
        <div className={`h-full flex-1 bg-gradient-to-b opacity-80 ${firstBg}`} />
        <div className="h-full flex" style={{ width: `${TOTAL_W_REM}rem` }}>
          {days.map((day, index) => (
            <div
              key={`bg-${index}`}
              className={`h-full bg-gradient-to-b opacity-80 ${getBackground(
                day.conditions
              )}`}
              style={{ width: `${COL_W_REM}rem` }}
            />
          ))}
        </div>
        <div className={`h-full flex-1 bg-gradient-to-b opacity-80 ${lastBg}`} />
      </div>

      <div className="w-full flex flex-col items-center text-center pt-20">
        <h1 className="text-gray-100 text-2xl font-bold mt-5">
          Weekly Weather Forecast
        </h1>

        {loading && <p className="mt-4 text-gray-600">Fetching forecast...</p>}

        {forecast && (
          <div className="w-full">
            <h2 className="text-gray-200 text-xl font-semibold mt-6">
              Forecast for {cityName}
            </h2>

            <div className="mt-8 w-full overflow-x-auto">
              <div className="relative flex">
                <div className="flex-1" />
                <div className="flex pt-12" style={{ width: `${TOTAL_W_REM}rem` }}>
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0"
                      style={{
                        width: `${COL_W_REM}rem`,
                        paddingLeft: `${SIDE_PAD_REM}rem`,
                        paddingRight: `${SIDE_PAD_REM}rem`,
                      }}
                    >
                      <div className="w-60 h-64 text-gray-100 bg-gray-800/80 rounded-lg p-4 shadow-md text-left">
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
                        <p className="text-gray-400">
                          Humidity: {day.humidity}%
                        </p>
                        <p className="text-gray-400">
                          Wind: {day.windspeed} km/h
                        </p>
                        <p className="text-gray-400">
                          Conditions: {day.conditions}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
