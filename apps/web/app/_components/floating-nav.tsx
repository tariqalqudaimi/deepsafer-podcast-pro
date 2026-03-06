"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Mic2 } from "lucide-react";
import { useAppStore } from "@repo/store"; 

export function FloatingNav() {
  const pathname = usePathname();
  const { favorites } = useAppStore();

  return (
    <>

      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-8 py-8 px-4 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full shadow-2xl">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 mb-4">
          <Mic2 size={24} className="text-white" />
        </div>
        <div className="flex flex-col gap-6">
          <Link href="/" className={`p-3 rounded-full transition-all ${pathname === '/' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
            <Search size={24} />
          </Link>
          <Link href="/favorites" className={`p-3 rounded-full relative transition-all ${pathname === '/favorites' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
            <Heart size={24} fill={pathname === '/favorites' ? "black" : "none"} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#0A0A0A]" />
            )}
          </Link>
        </div>
      </nav>

   
      <nav className="fixed bottom-0 left-0 right-0 z-[60] xl:hidden flex items-center justify-around py-4 bg-black/80 backdrop-blur-2xl border-t border-white/10">
        <Link href="/" className={`flex flex-col items-center gap-1 ${pathname === '/' ? 'text-blue-500' : 'text-white/40'}`}>
          <Search size={22} />
          <span className="text-[10px] font-black uppercase">Explore</span>
        </Link>
        <div className="relative -top-5">
           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"><Mic2 size={20} className="text-white" /></div>
        </div>
        <Link href="/favorites" className={`flex flex-col items-center gap-1 ${pathname === '/favorites' ? 'text-blue-500' : 'text-white/40'}`}>
          <Heart size={22} />
          <span className="text-[10px] font-black uppercase">Library</span>
        </Link>
      </nav>
    </>
  );
}