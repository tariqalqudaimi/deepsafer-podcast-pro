"use client";
import { useState } from "react";
import { useAppStore } from "@repo/store";
import { useDashboardPodcasts } from "./(modules)/podcast/hooks/useDashboardPodcasts";
import { SearchBar } from "./(modules)/podcast/components/search-bar";
import { BentoPodcastCard } from "./(modules)/podcast/components/BentoPodcastCard";
import { SearchHistory } from "./_components/SearchHistory";
import { RecentlyViewed } from "./_components/RecentlyViewed";
import { PodcastSkeleton } from "./_components/podcast-skeleton";
import { Loader2, Zap } from "lucide-react";

export default function DeepSonicDashboard() {
  const [term, setTerm] = useState("");
  const { addRecentSearch } = useAppStore();
  
  const { 
    podcasts, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage,
    isError 
  } = useDashboardPodcasts(term);

  return (
    <div className="space-y-20 pb-40">
      <header className="pt-16 space-y-10">
        <h1 className="text-[4.5rem] md:text-[8rem] font-black leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
          Listen <br /> Beyond <span className="text-blue-500 italic">Limits.</span>
        </h1>
        <div className="max-w-2xl space-y-4">
          <SearchBar onSearch={(val) => { setTerm(val); if(val) addRecentSearch(val); }} />
          {!term && <SearchHistory onSelect={setTerm} />}
        </div>
      </header>

      {!term && <RecentlyViewed />}

      <section className="space-y-10">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <h2 className="text-2xl font-black italic flex items-center gap-3">
             <Zap className="text-blue-500" size={20} />
             {term ? `Universe: ${term}` : "Sonic Trends"}
          </h2>
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
            {podcasts.length} units detected
          </span>
        </div>

        {isLoading ? <PodcastSkeleton /> : isError ? (
           <div className="p-20 text-center bg-red-500/5 rounded-[3rem] text-red-500 font-bold uppercase tracking-widest border border-red-500/10">
             Frequency Lost. Check Connection.
           </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[340px]">
              {podcasts.map((p, i) => (
                <BentoPodcastCard key={`${p.collectionId}-${i}`} podcast={p as any} isLarge={i === 0 || i === 7} />
              ))}
            </div>

            {/* 🚀 زر التحميل المطور */}
            {hasNextPage && (
              <div className="mt-20 flex justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <button 
                  onClick={() => {
                    console.log("🖱️ Load More Clicked!");
                    fetchNextPage();
                  }} 
                  disabled={isFetchingNextPage}
                  className="group relative px-14 py-6 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-30"
                >
                  {isFetchingNextPage ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="animate-spin" size={16} />
                      <span>Syncing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span>Load More Dimensions</span>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                    </div>
                  )}
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