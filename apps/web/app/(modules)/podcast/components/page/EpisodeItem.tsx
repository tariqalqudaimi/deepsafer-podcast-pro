"use client";
import { Play, Pause, Calendar, Clock } from "lucide-react";
import { Podcast } from "@repo/types";
import { useAppStore } from "@repo/store";

interface Props {
  episode: Podcast;
  show: Podcast;
  index: number;
}

export function EpisodeItem({ episode, show, index }: Props) {
  const { currentTrack, isPlaying, setTrack, togglePlay } = useAppStore();
  
  const isActive = currentTrack?.url === episode.previewUrl;
  const isPlayingNow = isActive && isPlaying;

  const handlePlay = () => {
    if (isActive) {
      togglePlay();
    } else {
      setTrack({
        ...episode,
        url: episode.previewUrl!,
        title: episode.trackName!,
        artist: show.artistName,
        artwork: episode.artworkUrl600 || show.artworkUrl600,
      } as any);
    }
  };

  return (
    <div className={`group p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 transition-all duration-500 border border-transparent hover:border-white/10 ${isActive ? 'bg-white/[0.03] border-white/10' : 'hover:bg-white/[0.02]'}`}>
      <button 
        onClick={handlePlay}
        className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all ${
          isPlayingNow ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] animate-pulse' : 'bg-black/50 text-white group-hover:bg-white group-hover:text-black shadow-xl'
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
}