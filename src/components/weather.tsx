"use client";

import { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "../utils/fetchWeather";
import { useSearchParams } from "next/navigation";
import { revCoord } from "../utils/revCoord";

export default function Weather() {
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [textClass, setTextClass] = useState("text-gray-200");
  const [bgClass, setBgClass] = useState("bg-gray-900");
  const [outfit, setOutfit] = useState<string>("");

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
        return "text-yellow-600";
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
        return "text-gray-600";
      default:
        return "text-gray-500";
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
    if (!city) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const location = `${latitude},${longitude}`;
            try {
              const data = await fetchWeather(location);
              if (data) {
                const humanName = await revCoord(latitude, longitude);
                if (humanName) {
                  data.address = humanName;
                }
                setWeatherData(data);
              }
            } catch (error) {
              console.error("Error fetching weather from location:", error);
            }
          },
          (error) => {
            console.warn("Geolocation permission denied", error);
          }
        );
      } else {
        console.warn("Geolocation not supported.");
      }
      return;
    }

    async function fetchCityWeather() {
      console.log(`Fetching weather for: ${city}`);
      try {
        const data = await fetchWeather(city);
        if (data) {
          setWeatherData(data);
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }

    fetchCityWeather();
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      fetch("/api/outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forecast: weatherData }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.suggestion) setOutfit(data.suggestion);
        })
        .catch((err) => console.error("Error getting outfit:", err));
    }
  }, [weatherData]);

  useEffect(() => {
    if (!weatherData) {
      setBgClass("bg-gray-900");
      document.body.className = "min-h-screen w-full transition-colors duration-700 " + bgClass;
      return;
    }

    const condition = weatherData.conditions.split(",")[0].trim();
    const newBgClass = getWeatherBackground(condition);
    setBgClass(newBgClass);

    document.body.className =
      "min-h-screen w-full transition-colors duration-700 " +
      newBgClass;

    setTextClass(getTextColor(condition));
    addWeatherEffect(condition);

    return () => {
      const effectContainer = document.getElementById("weather-effects");
      if (effectContainer) {
        effectContainer.innerHTML = "";
      }
    };
  }, [weatherData, bgClass]);

  return (
    <div className="flex flex-col justify-center items-center text-center min-h-screen relative">
      <div id="weather-effects" className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>

      {weatherData && (
        <div className={`-mt-12 ${textClass}`}>
          <h1 className="text-2xl font-semibold mb-2">{weatherData.address}</h1>
          {outfit && (
            <div className="mt-4 max-w-xl mx-auto mb-4">
              <p className="whitespace-pre-line">{outfit}</p>
            </div>
          )}
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Max Temp: {weatherData.tempmax}°C</p>
          <p>Min Temp: {weatherData.tempmin}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>Wind Speed: {weatherData.windspeed} km/h</p>
          <p>Conditions: {weatherData.conditions}</p>
        </div>
      )}
    </div>
  );
}
