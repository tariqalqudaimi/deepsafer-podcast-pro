"use client";
import { useAppStore } from "@repo/store";
import Link from "next/link";
import { Heart, Mic2, ArrowRight } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useAppStore();

  return (
    <div className="space-y-12 relative z-10 pt-10 animate-in fade-in duration-1000">
      <header className="border-b border-white/5 pb-10">
        <h1 className="text-[4rem] md:text-[6.5rem] font-black leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-4">
          Your <span className="text-red-500">Sanctuary.</span>
        </h1>
        <p className="text-xl text-white/40 font-medium italic">
          {favorites.length} podcasts saved in your personal library.
        </p>
      </header>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 bg-white/[0.02] border border-white/5 rounded-[4rem] backdrop-blur-sm">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 shadow-[0_0_100px_rgba(255,255,255,0.05)]">
            <Mic2 size={40} className="text-white/20" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">The library is silent</h2>
          <p className="text-white/30 max-w-sm mb-12 text-center text-lg">Start exploring to fill this space with your favorite voices.</p>
          <Link href="/" className="px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-110 transition-all flex items-center gap-3 shadow-2xl">
            Explore Sounds <ArrowRight size={20} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((podcast) => (
            <div key={podcast.trackId} className="group relative h-[350px] rounded-[3rem] overflow-hidden bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-700">
              <Link href={`/podcast/${podcast.collectionId}`} className="absolute inset-0 z-0">
                <img src={podcast.artworkUrl600} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-1000" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </Link>
              <button 
                onClick={() => toggleFavorite(podcast)}
                className="absolute top-6 right-6 w-12 h-12 bg-black/60 backdrop-blur-xl rounded-full flex items-center justify-center text-red-500 z-20 hover:scale-125 transition-transform"
              >
                <Heart fill="currentColor" size={24} />
              </button>
              <div className="absolute bottom-8 left-8 right-8 z-10 pointer-events-none">
                 <h3 className="font-black text-2xl text-white mb-2 line-clamp-1">{podcast.collectionName}</h3>
                 <p className="text-white/40 text-sm font-bold uppercase tracking-widest truncate">{podcast.artistName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}