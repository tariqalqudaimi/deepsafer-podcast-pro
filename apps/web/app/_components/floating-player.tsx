"use client";
import { useAppStore } from "@repo/store";
import { Play, Pause, Heart, X } from "lucide-react"; // استيراد X
import { useEffect, useRef } from "react";

export function FloatingPlayer() {
  const { currentTrack, isPlaying, togglePlay, toggleFavorite, favorites, setIsPlaying, closePlayer } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      isPlaying ? audioRef.current.play().catch(() => setIsPlaying(false)) : audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, setIsPlaying]);

  if (!currentTrack) return null;
  const isFav = favorites.some(f => f.trackId === currentTrack.trackId);

  return (
    <div className="fixed bottom-24 xl:bottom-10 left-1/2 -translate-x-1/2 z-50 w-[92%] xl:w-[600px] animate-in slide-in-from-bottom-24 duration-700 ease-out">
      <div className="bg-[#121212]/90 backdrop-blur-3xl border border-white/10 p-2 pr-6 rounded-[2.5rem] shadow-2xl flex items-center gap-4 relative group">
      
        <button 
          onClick={closePlayer}
          className="absolute -top-3 -right-3 w-8 h-8 bg-black/80 border border-white/10 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
        >
          <X size={14} />
        </button>

        <div className="relative w-14 h-14 shrink-0">
          <img src={currentTrack.artworkUrl600} className={`w-full h-full rounded-full object-cover border border-white/5 ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} alt="" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate text-white">{currentTrack.trackName || currentTrack.collectionName}</h4>
          <p className="text-[10px] text-white/40 font-black uppercase tracking-widest truncate">{currentTrack.artistName}</p>
        </div>

        <div className="flex items-center gap-4 border-l border-white/5 pl-4">
          <button onClick={() => toggleFavorite(currentTrack)} className={isFav ? "text-red-500" : "text-white/20"}>
            <Heart fill={isFav ? "currentColor" : "none"} size={18} />
          </button>
          <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all">
            {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} className="ml-1" />}
          </button>
        </div>

        <audio ref={audioRef} key={currentTrack.previewUrl} src={currentTrack.previewUrl} onEnded={() => setIsPlaying(false)} />
      </div>
    </div>
  );
}