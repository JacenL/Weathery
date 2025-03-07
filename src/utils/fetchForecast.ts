export interface ForecastDay {
  datetime: string;
  tempmax: number;
  tempmin: number;
  temp: number;
  humidity: number;
  conditions: string;
}

export async function fetchForecast(city: string): Promise<ForecastDay[] | null> {
  const API_KEY = process.env.NEXT_PUBLIC_VCAPIKey;
  if (!API_KEY) {
    console.error("API key is missing!");
    return null;
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.days && data.days.length > 0) {
      return data.days;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return null;
  }
}
