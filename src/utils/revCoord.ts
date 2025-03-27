export async function revCoord(lat: number, lon: number): Promise<string | null> {
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
        const response = await fetch(url, {
        headers: {
            'User-Agent': 'Weathery/1.0 (your@email.com)'
        }
        });

        const data = await response.json();
        const address = data.address;

        const primary =
        address.city ||
        address.town ||
        address.village ||
        address.hamlet ||
        address.county;

        const state = address.state;

        if (primary && state) {
            return `${primary}, ${state}`;
        } else if (primary) {
            return primary;
        } else if (state) {
            return state;
        } else {
            return data.display_name;
        }
    } catch (err) {
      console.error("Something went wrong while reverseing coordinates:", err);
      return null;
    }
  }
  