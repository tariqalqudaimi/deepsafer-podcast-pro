import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Podcast } from '@repo/types';

interface AppState {
  favorites: Podcast[];
  recentSearches: string[];
  recentlyViewed: Podcast[];
  currentTrack: Podcast | null;
  isPlaying: boolean;

  toggleFavorite: (p: Podcast) => void;
  addRecentSearch: (term: string) => void;
  addRecentlyViewed: (p: Podcast) => void;
  setTrack: (p: Podcast) => void;
  togglePlay: () => void;
  setIsPlaying: (s: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      recentSearches: [],
      recentlyViewed: [],
      currentTrack: null,
      isPlaying: false,

      toggleFavorite: (p) => set((state) => {
        const isFav = state.favorites.some(f => f.trackId === p.trackId);
        return { favorites: isFav ? state.favorites.filter(f => f.trackId !== p.trackId) : [p, ...state.favorites] };
      }),

      addRecentSearch: (term) => set((state) => {
        if (!term.trim()) return state;
        const filtered = state.recentSearches.filter(s => s !== term);
        return { recentSearches: [term, ...filtered].slice(0, 5) };
      }),

      addRecentlyViewed: (p) => set((state) => {
        const filtered = state.recentlyViewed.filter(rv => rv.collectionId !== p.collectionId);
        return { recentlyViewed: [p, ...filtered].slice(0, 6) };
      }),

      setTrack: (p) => set({ currentTrack: p, isPlaying: true }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setIsPlaying: (s) => set({ isPlaying: s }),
      closePlayer: () => set({ currentTrack: null, isPlaying: false }),
    }),
    { 
      name: 'pod-pro-storage',
     partialize: (state) => ({ 
        favorites: state.favorites, 
        recentSearches: state.recentSearches, 
        recentlyViewed: state.recentlyViewed 
      }),
    }
  )
);