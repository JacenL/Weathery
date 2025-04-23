export async function fetchLunarPhase(location: string): Promise<number | null> {
    const apiKey = process.env.NEXT_PUBLIC_VCAPIKey;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data?.days?.[0]?.moonphase ?? null;
    } catch (err) {
      console.error("Error fetching moon phase:", err);
      return null;
    }
  }
  