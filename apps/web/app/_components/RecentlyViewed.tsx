"use client";
import Link from "next/link";
import { useAppStore } from "@repo/store";

export function RecentlyViewed() {
  const { recentlyViewed } = useAppStore();
  if (recentlyViewed.length === 0) return null;

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/20 mb-8 flex items-center gap-4">
        <div className="w-12 h-[1px] bg-white/10" /> Recently Explored
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {recentlyViewed.map((p) => (
          <Link key={p.collectionId} href={`/podcast/${p.collectionId}`} className="shrink-0 w-32 group">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 mb-3">
              <img src={p.artworkUrl600} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt="" />
            </div>
            <h4 className="text-[10px] font-bold truncate text-white/40 group-hover:text-white text-center uppercase">{p.collectionName}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
}