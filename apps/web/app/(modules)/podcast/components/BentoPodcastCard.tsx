"use client";
import Link from "next/link";
import { Podcast } from "@repo/types";
import { useAppStore } from "@repo/store";

interface Props {
  podcast: Podcast;
  isLarge?: boolean;
}

export function BentoPodcastCard({ podcast, isLarge }: Props) {
  const { addRecentlyViewed } = useAppStore();

  return (
    <Link 
      href={`/podcast/${podcast.collectionId}`} 
      onClick={() => addRecentlyViewed(podcast)}
      className={`group relative rounded-[2.5rem] overflow-hidden bg-[#0F0F0F] border border-white/5 hover:border-white/20 transition-all duration-700 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <img src={podcast.artworkUrl600} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-90 group-hover:scale-105 transition-all duration-1000" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
        <span className="w-fit px-3 py-1 bg-blue-500/10 backdrop-blur-md rounded-full text-[9px] font-black tracking-widest uppercase mb-4 text-blue-400 border border-blue-500/20">
          {podcast.primaryGenreName}
        </span>
        <h3 className={`font-black text-white leading-tight ${isLarge ? 'text-4xl' : 'text-xl'} mb-2 line-clamp-2`}>
          {podcast.collectionName}
        </h3>
        <p className="text-white/40 text-sm font-medium line-clamp-1">{podcast.artistName}</p>
      </div>
    </Link>
  );
}