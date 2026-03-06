import { iTunesResponse, Podcast } from "@repo/types";

const BASE_URL = "https://itunes.apple.com";

export const podcastApi = {
  // للبحث عن البرامج (القنوات)
  searchCollections: async (term: string): Promise<Podcast[]> => {
    const query = term || "podcast";
    const res = await fetch(`${BASE_URL}/search?term=${encodeURIComponent(query)}&media=podcast&entity=podcast&limit=25`);
    if (!res.ok) throw new Error("Failed to fetch collections");
    const data: iTunesResponse = await res.json();
    return data.results;
  },

  // لجلب تفاصيل البرنامج والحلقات
  getDetailsWithEpisodes: async (id: string): Promise<{ show: Podcast; episodes: Podcast[] }> => {
    const res = await fetch(`${BASE_URL}/lookup?id=${id}&entity=podcastEpisode&limit=50`);
    if (!res.ok) throw new Error("Failed to fetch episodes");
    const data: iTunesResponse = await res.json();
    return {
      show: data.results[0],
      episodes: data.results.slice(1)
    };
  }
};