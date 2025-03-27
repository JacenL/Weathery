export interface ForecastDay {
  address: string;
  datetime: string;
  temp: number;
  tempmax: number;
  tempmin: number;
  humidity: number;
  windspeed: number;
  conditions: string;
}

type VisualCrossingDay = {
  datetime: string;
  temp: number;
  tempmax: number;
  tempmin: number;
  humidity: number;
  windspeed: number;
  conditions: string;
};

export async function fetchForecast(city: string): Promise<ForecastDay[] | null> {
  const apiKey = process.env.NEXT_PUBLIC_VCAPIKey;
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.days && data.days.length > 0) {
      return data.days.map((day: VisualCrossingDay) => ({
        address: data.resolvedAddress,
        datetime: day.datetime,
        temp: day.temp,
        tempmax: day.tempmax,
        tempmin: day.tempmin,
        humidity: day.humidity,
        windspeed: day.windspeed,
        conditions: day.conditions,
      }));
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching forecast:", error);
    return null;
  }
}
