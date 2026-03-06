import { Zap } from "lucide-react";
import { Podcast } from "@repo/types";
import { BentoPodcastCard } from "./BentoPodcastCard";
import { PodcastSkeleton } from "../../../_components/podcast-skeleton";
import { LoadMoreButton } from "./LoadMoreButton"; 

interface Props {
  term: string;
  podcasts: Podcast[];
  visibleCount: number;
  isLoading: boolean;
  isError: boolean;
  onLoadMore: () => void;
}

export function ResultsSection({ term, podcasts, visibleCount, isLoading, isError, onLoadMore }: Props) {
  const visiblePodcasts = podcasts.slice(0, visibleCount);
  const hasMore = visibleCount < podcasts.length;

  return (
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
        <div className="p-20 text-center bg-red-500/5 rounded-[3rem] text-red-500 border border-red-500/10 font-bold uppercase tracking-widest">
          Signal Interrupted. Retry Search.
        </div>
      ) : (
        <>
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[340px] animate-in fade-in duration-700">
            {visiblePodcasts.map((p, i) => (
              <BentoPodcastCard key={p.collectionId} podcast={p} isLarge={i === 0 || i === 7} />
            ))}
          </div>

        
          {hasMore && <LoadMoreButton onClick={onLoadMore} />}
        </>
      )}
    </section>
  );
}