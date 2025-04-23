export async function fetchLunarPhase(
    location: string,
    date: string
  ): Promise<number | null> {
    const apiKey = process.env.NEXT_PUBLIC_VCAPIKey;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Visual Crossing API error:", errorText);
        return null;
      }
      const data = await response.json();
      return data?.days?.[0]?.moonphase ?? null;
    } catch (err) {
      console.error("Error fetching moon phase:", err);
      return null;
    }
  }
  