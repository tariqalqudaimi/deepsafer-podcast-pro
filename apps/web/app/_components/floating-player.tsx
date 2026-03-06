"use client";
<<<<<<< Updated upstream
import { useAppStore } from "@repo/store"; // الربط مع الحزمة المشتركة
import { Play, Pause, Heart, Volume2 } from "lucide-react";
=======
import { useAppStore } from "@repo/store";
import { Play, Pause, Heart, X } from "lucide-react"; 
>>>>>>> Stashed changes
import { useEffect, useRef } from "react";

export function FloatingPlayer() {
  const { currentTrack, isPlaying, togglePlay, toggleFavorite, favorites, setIsPlaying } = useAppStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    isPlaying ? audio.play().catch(() => setIsPlaying(false)) : audio.pause();
  }, [isPlaying, currentTrack, setIsPlaying]);

  if (!currentTrack) return null;
  const isFav = favorites.some(f => f.trackId === currentTrack.trackId);

  return (
    <div className="fixed bottom-[80px] xl:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[92%] xl:w-[550px] animate-in slide-in-from-bottom-24 duration-700">
      <div className="bg-[#121212]/90 backdrop-blur-3xl border border-white/10 p-2 pr-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-4">
        
        <div className="relative w-14 h-14 shrink-0">
          <img 
            src={currentTrack.artworkUrl600} 
            className={`w-full h-full rounded-full object-cover border border-white/10 ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`} 
            alt="" 
          />
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate text-white">{currentTrack.trackName || currentTrack.collectionName}</h4>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider truncate">{currentTrack.artistName}</p>
        </div>

        <div className="flex items-center gap-4 border-l border-white/5 pl-4">
          <button onClick={() => toggleFavorite(currentTrack)} className={isFav ? "text-red-500" : "text-white/20 hover:text-white"}>
            <Heart fill={isFav ? "currentColor" : "none"} size={18} />
          </button>
          
          <button onClick={togglePlay} className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all">
            {isPlaying ? <Pause fill="black" size={20} /> : <Play fill="black" size={20} className="ml-1" />}
          </button>
        </div>

        <audio 
          ref={audioRef} 
          key={currentTrack.previewUrl}
          src={currentTrack.previewUrl} 
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  );
}