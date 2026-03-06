export function LoadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-24 flex justify-center pb-20">
      <button 
        onClick={onClick} 
        className="group relative px-16 py-7 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
      >
        <div className="flex items-center gap-3 relative z-10">
          <span>Load More Sounds</span>
          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}