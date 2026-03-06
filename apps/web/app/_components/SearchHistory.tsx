"use client";
import { useAppStore } from "@repo/store";

export function SearchHistory({ onSelect }: { onSelect: (val: string) => void }) {
  const { recentSearches } = useAppStore();
  if (recentSearches.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-2 animate-in slide-in-from-top-2">
      <span className="text-[10px] font-black text-white/20 uppercase tracking-widest pt-2">Recent:</span>
      {recentSearches.map((s) => (
        <button key={s} onClick={() => onSelect(s)} className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] font-bold text-white/40 hover:text-white transition-all uppercase">
          {s}
        </button>
      ))}
    </div>
  );
}