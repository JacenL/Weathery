export interface WeatherData {
    datetime: string;
    temp: number;
    tempmax: number;
    tempmin: number;
    humidity: number;
    conditions: string;
  }
  
  export async function fetchWeather(city: string): Promise<WeatherData | null> {
    const apiKey = process.env.NEXT_PUBLIC_VCAPIKey;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching weather data: ${errorText}`);
        return null;
      }
      const data = await response.json();
  
      if (data.days && data.days.length > 0) {
        return data.days[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  }