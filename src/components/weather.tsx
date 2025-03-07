"use client";

import { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "../utils/fetchWeather";
import { usePathname } from "next/navigation";

export default function Weather() {
  const pathname = usePathname();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [textClass, setTextClass] = useState("text-gray-200");

  const getWeatherBackground = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return "bg-gradient-to-r from-blue-400 to-yellow-300";
      case "partly cloudy":
      case "partially cloudy":
        return "bg-gradient-to-r from-gray-300 to-blue-400";
      case "cloudy":
      case "overcast":
        return "bg-gray-600";
      case "rain":
      case "drizzle":
      case "showers":
        return "bg-blue-500";
      case "thunderstorm":
        return "bg-gray-900";
      case "snow":
        return "bg-gray-300";
      case "default":
        return "bg-gray-900";
      default:
        return "bg-gray-900";
    }
  };

  const getTextColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return "text-yellow-900";
      case "partly cloudy":
      case "partially cloudy":
        return "text-gray-800";
      case "cloudy":
      case "overcast":
        return "text-gray-300";
      case "rain":
      case "drizzle":
      case "showers":
        return "text-blue-300";
      case "thunderstorm":
        return "text-gray-400";
      case "snow":
        return "text-blue-900";
      default:
        return "text-gray-200";
    }
  };
  
  const addWeatherEffect = (condition: string) => {
    const effectContainer = document.getElementById("weather-effects");
    if (!effectContainer) return;

    effectContainer.innerHTML = "";

    if (["rain", "drizzle", "showers"].includes(condition.toLowerCase())) {
      for (let i = 0; i < 50; i++) {
        const drop = document.createElement("div");
        drop.className = "rain-drop";
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        effectContainer.appendChild(drop);
      }
    }

    if (condition.toLowerCase() === 'snow') {
      for (let i = 0; i < 30; i++) {
        const flake = document.createElement("div");
        flake.className = "snowflake";
        flake.style.left = `${Math.random() * 100}vw`;
        flake.style.animationDuration = `${Math.random() * 3 + 2}s`;
        effectContainer.appendChild(flake);
      }
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const condition = weatherData ? weatherData.conditions.split(",")[0].trim() : "default";
    const bgClass = getWeatherBackground(condition);
    setTextClass(getTextColor(condition));
    document.body.className = "min-h-screen w-full transition-colors duration-700 " + bgClass;
    if (weatherData) {
      addWeatherEffect(condition);
    }
    return () => {
      const effectContainer = document.getElementById("weather-effects");
      if (effectContainer) {
        effectContainer.innerHTML = "";
      }
    };
  }, [pathname, weatherData]);

  async function handleFetchWeather() {
    if (!city) return;
    setLoading(true);

    const data = await fetchWeather(city);
    setWeatherData(data);

    setLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center text-center">
      <h1 className="text-gray-100 text-2xl font-bold mb-4">Current Weather</h1>
      <div className="flex items-center space-x-1">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="text-gray-100 p-2 border rounded-lg"
        />
        <button
          onClick={handleFetchWeather}
          className="ml-2 p-2 bg-blue-400 text-white rounded-lg">
          Get Weather
        </button>
      </div>

      {loading && <p className="mt-4 text-gray-600">Fetching weather...</p>}

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
