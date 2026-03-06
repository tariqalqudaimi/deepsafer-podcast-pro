"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { podcastApi } from "@repo/api";
import { useAppStore } from "@repo/store";
import { 
  Play, Pause, Heart, ArrowLeft, 
  Calendar, Clock, Share2, Info 
} from "lucide-react";
import { Podcast } from "@repo/types";

export default function PodcastDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["podcast-details", id],
    queryFn: () => podcastApi.getDetailsWithEpisodes(id as string),
    enabled: !!id,
  });

  
  const { 
    currentTrack, isPlaying, setTrack, 
    togglePlay, toggleFavorite, favorites 
  } = useAppStore();

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-[60vh] animate-pulse">
      <div className="text-blue-500 font-black text-2xl tracking-widest uppercase italic">Loading Dimension...</div>
    </div>
  );

  if (isError || !data) return (
    <div className="p-20 text-center text-white/40 bg-white/5 rounded-[4rem] border border-white/10">
      <p className="text-xl font-bold">The frequency was lost in space.</p>
      <button onClick={() => router.back()} className="mt-6 text-blue-500 underline uppercase text-xs font-black">Return to Earth</button>
    </div>
  );

  const { show, episodes } = data;
  const isShowFav = favorites.some(f => f.collectionId === show.collectionId);

  return (
    <div className="space-y-16 animate-in fade-in zoom-in-95 duration-1000">
      

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
              className="w-72 h-72 md:w-80 md:h-80 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 relative z-10" 
              alt="" 
            />
            <div className="absolute -inset-4 bg-blue-600/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>

          
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div>
              <span className="px-4 py-1 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                {show.primaryGenreName}
              </span>
              <h1 className="text-4xl md:text-7xl font-black mt-6 mb-4 leading-tight tracking-tighter italic">
                {show.collectionName}
              </h1>
              <p className="text-xl md:text-2xl text-white/50 font-medium">{show.artistName}</p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button 
                onClick={() => toggleFavorite(show)}
                className={`h-14 px-8 rounded-full font-black text-sm uppercase tracking-widest flex items-center gap-3 transition-all border shadow-2xl ${
                  isShowFav 
                  ? 'bg-red-500/10 border-red-500/20 text-red-500' 
                  : 'bg-white text-black hover:bg-slate-200'
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

      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 border-t border-white/5 pt-16">
        
        
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black italic">Episodes Fleet</h2>
            <span className="text-xs font-mono text-white/20">[{episodes.length} FREQUENCIES]</span>
          </div>

          <div className="space-y-2">
            {episodes.map((episode: Podcast, index: number) => {
              const isActive = currentTrack?.url === episode.previewUrl;
              const isPlayingNow = isActive && isPlaying;

              return (
                <div 
                  key={episode.trackId} 
                  className={`group p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 transition-all duration-500 border border-transparent hover:border-white/10 ${
                    isActive ? 'bg-white/[0.03] border-white/10' : 'hover:bg-white/[0.02]'
                  }`}
                >
           
                  <button 
                    onClick={() => {
                      if (isActive) togglePlay();
                      else setTrack({
                        ...episode,
                        url: episode.previewUrl!, // تأكدنا من النوع هنا
                        title: episode.trackName!,
                        artist: show.artistName,
                        artwork: episode.artworkUrl600 || show.artworkUrl600
                      } as any);
                    }}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isPlayingNow 
                      ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] animate-pulse' 
                      : 'bg-black/50 text-white group-hover:bg-white group-hover:text-black shadow-xl'
                    }`}
                  >
                    {isPlayingNow ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                  </button>

                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <h3 className={`font-bold text-lg mb-2 line-clamp-1 transition-colors ${isPlayingNow ? 'text-blue-400' : 'text-white'}`}>
                      {episode.trackName}
                    </h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                      <span className="flex items-center gap-2"><Calendar size={12}/> {new Date(episode.releaseDate!).toLocaleDateString()}</span>
                      <span className="flex items-center gap-2"><Clock size={12}/> {Math.floor(episode.trackTimeMillis! / 60000)} MIN</span>
                      <span className="hidden md:inline text-blue-500/40">EP.{index + 1}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

       
        <aside className="space-y-8">
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
                  className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  Listen on Apple Podcasts <Share2 size={12} />
                </a>
             </div>
          </div>
        </aside>

      </div>
    </div>
  );
}