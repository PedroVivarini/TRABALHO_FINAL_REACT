
export const imageCache = new Map<string, string | null>();

export async function searchImageForQuery(query: string): Promise<string | null> {
  const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const pexelsKey = import.meta.env.VITE_PEXELS_KEY;

  if (unsplashKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1`,
        { headers: { Authorization: `Client-ID ${unsplashKey}` } }
      );
      if (!res.ok) return null;
      const data = await res.json();
  const first = data?.results?.[0];
  return first?.urls?.small || first?.urls?.regular || null;
    } catch (e) {
      console.error('Unsplash search error', e);
    }
  }

  if (pexelsKey) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
        { headers: { Authorization: pexelsKey } }
      );
      if (!res.ok) return null;
      const data = await res.json();
  const first = data?.photos?.[0];
  return first?.src?.medium || first?.src?.small || null;
    } catch (e) {
      console.error('Pexels search error', e);
    }
  }

  return null;
}
