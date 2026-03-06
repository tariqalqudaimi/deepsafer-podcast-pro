"use client";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { podcastApi } from "@repo/api";
import { useAppStore } from "@repo/store";
import { Search, History, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EnhancedDashboard() {
  const [term, setTerm] = useState("");
  const { recentSearches, addRecentSearch, recentlyViewed, addRecentlyViewed } = useAppStore();

 
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["podcasts", term],
    queryFn: ({ pageParam = 0 }) => podcastApi.searchCollections(term, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => lastPage.length === 20 ? allPages.length : undefined,
  });

  const podcasts = data?.pages.flat() || [];

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
     
      <header className="pt-10">
        <h1 className="text-[4.5rem] md:text-[7rem] font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 mb-8">
          Sound <br /> Universe<span className="text-blue-500">.</span>
        </h1>
        <div className="max-w-xl space-y-4">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search cosmic sounds..." 
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addRecentSearch(term)}
              className="w-full bg-white/5 border border-white/10 focus:border-blue-500/50 focus:bg-white/10 text-white rounded-full py-5 pl-8 pr-14 outline-none transition-all backdrop-blur-3xl shadow-2xl"
            />
            <Search className="absolute right-6 top-5 text-white/20 group-hover:text-blue-500 transition-colors" size={24} />
          </div>

          {!term && recentSearches.length > 0 && (
            <div className="flex flex-wrap gap-2 px-2 animate-in slide-in-from-top-2">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest pt-2">History:</span>
              {recentSearches.map((s) => (
                <button key={s} onClick={() => setTerm(s)} className="px-4 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

    
      {!term && recentlyViewed.length > 0 && (
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-8 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/10" /> Recently Explored
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recentlyViewed.map((p) => (
              <Link key={p.collectionId} href={`/podcast/${p.collectionId}`} className="group relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 bg-[#111]">
                <img src={p.artworkUrl600} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent p-4 flex flex-col justify-end">
                   <h4 className="text-[10px] font-bold truncate text-white uppercase tracking-tighter">{p.collectionName}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    
      <section>
        <div className="flex items-end justify-between mb-10 border-b border-white/5 pb-6">
          <h2 className="text-2xl font-bold tracking-tight">{term ? `Universe: ${term}` : "Featured Streams"}</h2>
          <span className="text-white/20 text-xs font-mono tracking-widest">[{podcasts.length} ITEMS]</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({length: 8}).map((_, i) => <div key={i} className="aspect-square bg-white/5 rounded-[2.5rem] animate-pulse" />)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[320px]">
              {podcasts.map((p, index) => (
                <Link 
                  href={`/podcast/${p.collectionId}`} 
                  key={`${p.collectionId}-${index}`} 
                  onClick={() => addRecentlyViewed(p)}
                  className={`group relative rounded-[2.5rem] overflow-hidden bg-[#0F0F0F] border border-white/5 hover:border-white/20 transition-all duration-700 ${(index === 0 || index === 7) ? 'md:col-span-2' : ''}`}
                >
                  <img src={p.artworkUrl600} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
                    <span className="w-fit px-3 py-1 bg-blue-500/10 backdrop-blur-md rounded-full text-[9px] font-black tracking-widest uppercase mb-4 text-blue-400 border border-blue-500/20">
                      {p.primaryGenreName}
                    </span>
                    <h3 className="font-black text-white leading-tight text-2xl mb-1 truncate">{p.collectionName}</h3>
                    <p className="text-white/40 text-sm font-medium line-clamp-1">{p.artistName}</p>
                  </div>
                </Link>
              ))}
            </div>

           
            {hasNextPage && (
              <div className="mt-20 flex justify-center">
                <button 
                  onClick={() => fetchNextPage()} 
                  disabled={isFetchingNextPage}
                  className="px-12 py-5 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {isFetchingNextPage ? <Loader2 className="animate-spin" /> : "Load More Dimensions"}
                </button>
              </div>
            )}
          </>
        )}
      </section>
=======

import { useState, useEffect } from "react";
import { useDashboardPodcasts } from "./(modules)/podcast/hooks/useDashboardPodcasts";
import { HeroHeader } from "./(modules)/podcast/components/HeroHeader";
import { ResultsSection } from "./(modules)/podcast/components/ResultsSection";
import { RecentlyViewed } from "./_components/RecentlyViewed";

export default function DeepSonicDashboard() {
 
  const[term, setTerm] = useState("");
  
  const { podcasts, isLoading, isError } = useDashboardPodcasts(term);

 
  const[visibleCount, setVisibleCount] = useState(20);
  useEffect(() => setVisibleCount(20), [term]); 

  return (
    <div className="space-y-16 pb-40">
     
      <HeroHeader term={term} setTerm={setTerm} />

    
=======

import { useState, useEffect } from "react";
import { useDashboardPodcasts } from "./(modules)/podcast/hooks/useDashboardPodcasts";
import { HeroHeader } from "./(modules)/podcast/components/HeroHeader";
import { ResultsSection } from "./(modules)/podcast/components/ResultsSection";
import { RecentlyViewed } from "./_components/RecentlyViewed";

export default function DeepSonicDashboard() {

  const[term, setTerm] = useState("");
  
  
  const { podcasts, isLoading, isError } = useDashboardPodcasts(term);

  
  const[visibleCount, setVisibleCount] = useState(20);
  useEffect(() => setVisibleCount(20), [term]); 

  return (
    <div className="space-y-16 pb-40">
     
      <HeroHeader term={term} setTerm={setTerm} />

     
>>>>>>> Stashed changes
      {!term && <RecentlyViewed />}

     
      <ResultsSection 
        term={term}
        podcasts={podcasts}
        visibleCount={visibleCount}
        isLoading={isLoading}
        isError={isError}
        onLoadMore={() => setVisibleCount((prev) => prev + 20)}
      />
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    </div>
  );
}