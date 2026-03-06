"use client";

import { useState, useEffect } from "react";
import { Search, Zap } from "lucide-react";

import { useAppStore } from "@repo/store";
import { useDashboardPodcasts } from "./(modules)/podcast/hooks/useDashboardPodcasts";

import { SearchBar } from "./(modules)/podcast/components/search-bar";
import { BentoPodcastCard } from "./(modules)/podcast/components/BentoPodcastCard";
import { RecentlyViewed } from "./_components/RecentlyViewed";
import { SearchHistory } from "./_components/SearchHistory";
import { PodcastSkeleton } from "./_components/podcast-skeleton";

export default function DeepSonicDashboard() {
  const [term, setTerm] = useState("");
  const { addRecentSearch } = useAppStore();
  
  const { podcasts, isLoading, isError } = useDashboardPodcasts(term);

  
  const [visibleCount, setVisibleCount] = useState(10);


  useEffect(() => {
    setVisibleCount(10);
  }, [term]);

  
  const visiblePodcasts = podcasts.slice(0, visibleCount);
  const hasMore = visibleCount < podcasts.length;

  return (
    <div className="space-y-16 pb-40">
      <header className="pt-10 space-y-10 relative z-20">
        <h1 className="text-[4rem] md:text-[8rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
          Listen <br /> Beyond <span className="text-blue-500 italic">Limits.</span>
        </h1>
        
        <div className="max-w-2xl space-y-4">
          <SearchBar 
            initialValue={term}
            onSearch={(val) => {
              setTerm(val);
              if (val) addRecentSearch(val);
            }} 
          />
          {!term && <SearchHistory onSelect={setTerm} />}
        </div>
      </header>

      {!term && <RecentlyViewed />}

      <section className="relative z-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-10">
          <h2 className="text-2xl font-black italic flex items-center gap-3">
            <Zap className="text-blue-500" size={20} />
            {term ? `Universe: ${term}` : "Featured Frequencies"}
          </h2>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
            {podcasts.length} Units Found
          </span>
        </div>

        {isLoading ? (
          <PodcastSkeleton />
        ) : isError ? (
          <div className="p-20 text-center bg-red-500/5 rounded-[3rem] text-red-500 border border-red-500/10">
            <p className="font-bold uppercase tracking-widest">Signal Interrupted. Retry Search.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[340px] animate-in fade-in duration-700">
              {visiblePodcasts.map((p, i) => (
                <BentoPodcastCard 
                  key={p.collectionId} 
                  podcast={p as any} 
                  isLarge={i === 0 || i === 7} 
                />
              ))}
            </div>

            
            {hasMore && (
              <div className="mt-24 flex justify-center pb-20">
                <button 
                  onClick={() => setVisibleCount((prev) => prev + 20)} 
                  className="group relative px-16 py-7 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                >
                  <div className="flex items-center gap-3">
                    <span>Load More Sounds</span>
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                  </div>
                  <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}