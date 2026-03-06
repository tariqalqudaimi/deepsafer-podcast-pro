export interface Podcast {
  trackId: number;
  collectionId: number;
  collectionName: string;
  trackName?: string;
  artistName: string;
  artworkUrl600: string;
  previewUrl?: string;
  primaryGenreName?: string;
  trackTimeMillis?: number;
  releaseDate?: string;
  country?: string;
}

export interface iTunesResponse {
  resultCount: number;
  results: Podcast[];
}