"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { podcastApi } from "@repo/api";
import { useAppStore } from "@repo/store";
import Link from "next/link";
import { Search, History, Mic2 } from "lucide-react";

export default function DashboardPage() {
  const [term, setTerm] = useState("");
  const { recentSearches, addRecentSearch, addRecentlyViewed, recentlyViewed } = useAppStore();

  const { data: podcasts, isLoading } = useQuery({
    queryKey: ["podcasts", term],
    queryFn: () => podcastApi.searchCollections(term),
  });

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {/* 1. Hero Section - Typography Focus */}
      <header className="pt-12 relative z-10">
        <h1 className="text-[4rem] md:text-[7rem] font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 mb-8">
          Sound <br /> without <span className="text-blue-500">limits.</span>
        </h1>
        
        <div className="max-w-xl space-y-6">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search universe..." 
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addRecentSearch(term)}
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 text-white rounded-full py-5 pl-8 pr-14 outline-none transition-all backdrop-blur-2xl placeholder:text-white/20 shadow-2xl"
            />
            <Search className="absolute right-6 top-5 text-white/20 group-hover:text-blue-500 transition-colors" size={24} />
          </div>

          {/* Recent Searches Tags */}
          {!term && recentSearches.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2">
              {recentSearches.map((s) => (
                <button key={s} onClick={() => setTerm(s)} className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 2. Recently Viewed - Horizontal Minimal List */}
      {!term && recentlyViewed.length > 0 && (
        <section className="animate-in slide-in-from-left-4 duration-700">
           <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-3">
             <div className="w-8 h-[1px] bg-white/10" /> Recently Viewed
           </h2>
           <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {recentlyViewed.map((p) => (
                <Link key={p.collectionId} href={`/podcast/${p.collectionId}`} className="shrink-0 w-32 group">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 mb-3">
                    <img src={p.artworkUrl600} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt="" />
                  </div>
                  <h4 className="text-[10px] font-bold truncate text-white/50 group-hover:text-white text-center uppercase tracking-tighter">{p.collectionName}</h4>
                </Link>
              ))}
           </div>
        </section>
      )}

      {/* 3. Bento Grid Results */}
      <section className="relative z-10">
        <div className="flex items-end justify-between mb-10 border-b border-white/5 pb-6">
          <h2 className="text-2xl font-bold tracking-tight">{term ? `Universe: ${term}` : "Trending Now"}</h2>
          <span className="text-white/20 text-xs font-mono tracking-widest uppercase">[{podcasts?.length || 0} items]</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {Array.from({length: 8}).map((_, i) => <div key={i} className="aspect-square bg-white/5 rounded-[2rem] animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px]">
            {podcasts?.map((p: any, index: number) => {
              const isLarge = index === 0 || index === 5; // Bento logic
              return (
                <Link 
                  href={`/podcast/${p.collectionId}`} 
                  key={p.collectionId} 
                  onClick={() => addRecentlyViewed(p)}
                  className={`group relative rounded-[2.5rem] overflow-hidden bg-[#0F0F0F] border border-white/5 hover:border-white/20 transition-all duration-700 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  <img src={p.artworkUrl600} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <span className="w-fit px-3 py-1 bg-blue-600/20 backdrop-blur-md rounded-full text-[9px] font-black tracking-[0.2em] uppercase mb-4 text-blue-400 border border-blue-500/20">
                      {p.primaryGenreName}
                    </span>
                    <h3 className={`font-black text-white leading-tight ${isLarge ? 'text-4xl' : 'text-xl'} mb-2`}>{p.collectionName}</h3>
                    <p className="text-white/40 text-sm font-medium line-clamp-1">{p.artistName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}