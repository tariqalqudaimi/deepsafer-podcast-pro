import { iTunesResponse, Podcast } from "@repo/types";

const BASE_URL = "https://itunes.apple.com";

export const podcastApi = {
  
  searchCollections: async (term: string, page: number = 0): Promise<Podcast[]> => {
    const limit = 20;
    const offset = page * limit;
    const query = term || "podcast";
    const res = await fetch(
      `${BASE_URL}/search?term=${encodeURIComponent(query)}&media=podcast&entity=podcast&limit=${limit}&offset=${offset}`
    );
    const data: iTunesResponse = await res.json();
    return data.results;
  },

  getDetailsWithEpisodes: async (id: string): Promise<{ show: Podcast; episodes: Podcast[] }> => {
    const res = await fetch(`${BASE_URL}/lookup?id=${id}&entity=podcastEpisode&limit=50`);
    const data: iTunesResponse = await res.json();
    return {
      show: data.results[0],
      episodes: data.results.slice(1)
    };
  }
};