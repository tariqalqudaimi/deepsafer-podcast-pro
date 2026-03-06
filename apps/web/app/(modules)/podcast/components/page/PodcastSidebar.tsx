import { Info, Share2 } from "lucide-react";
import { Podcast } from "@repo/types";

export function PodcastSidebar({ show }: { show: Podcast }) {
  return (
    <div className="p-8 rounded-[3rem] bg-white/[0.02] border border-white/5 space-y-8">
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 flex items-center gap-2">
          <Info size={12} /> Transmitting From
        </h4>
        <p className="text-sm text-white/60 leading-relaxed font-medium">
          {show.artistName} broadcasts this show globally. Current genre focuses on <span className="text-white font-bold">{show.primaryGenreName}</span> with a total of {show.trackCount} explored episodes.
        </p>
      </div>

      <div className="pt-8 border-t border-white/5">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6">Technical Specs</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <p className="text-[9px] text-white/30 font-black uppercase mb-1">Country</p>
            <p className="text-xs font-bold">{show.country}</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <p className="text-[9px] text-white/30 font-black uppercase mb-1">Entity</p>
            <p className="text-xs font-bold italic">Podcast</p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <a 
          href={show.collectionViewUrl} 
          target="_blank" 
          rel="noreferrer"
          className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all"
        >
          Listen on Apple Podcasts <Share2 size={12} />
        </a>
      </div>
    </div>
  );
}