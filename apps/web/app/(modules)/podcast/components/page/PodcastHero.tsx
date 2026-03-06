"use client";
import { useRouter } from "next/navigation";
import { useAppStore } from "@repo/store";
import { Heart, ArrowLeft, Share2 } from "lucide-react";
import { Podcast } from "@repo/types";

export function PodcastHero({ show }: { show: Podcast }) {
  const router = useRouter();
  const { toggleFavorite, favorites } = useAppStore();
  const isShowFav = favorites.some(f => f.collectionId === show.collectionId);

  return (
    <section className="relative">
      <button 
        onClick={() => router.back()} 
        className="group mb-12 flex items-center gap-3 text-white/30 hover:text-white transition-all font-bold uppercase text-[10px] tracking-[0.3em]"
      >
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors">
          <ArrowLeft size={14} />
        </div>
        Back to Explore
      </button>

      <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end relative z-10">
        <div className="relative group">
          <img 
            src={show.artworkUrl600} 
            className="w-72 h-72 md:w-80 md:h-80 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 relative z-10 object-cover" 
            alt={show.collectionName} 
          />
          <div className="absolute -inset-4 bg-blue-600/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </div>

        <div className="flex-1 text-center lg:text-left space-y-6">
          <div>
            <span className="px-4 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              {show.primaryGenreName}
            </span>
            <h1 className="text-4xl md:text-7xl font-black mt-6 mb-4 leading-tight tracking-tighter italic line-clamp-2">
              {show.collectionName}
            </h1>
            <p className="text-xl md:text-2xl text-white/50 font-medium">{show.artistName}</p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={() => toggleFavorite(show)}
              className={`h-14 px-8 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all border shadow-2xl ${
                isShowFav ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white text-black hover:bg-slate-200'
              }`}
            >
              <Heart fill={isShowFav ? "currentColor" : "none"} size={20} />
              {isShowFav ? 'In Library' : 'Add to Library'}
            </button>
            <button className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
              <Share2 size={20} className="text-white/40" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}