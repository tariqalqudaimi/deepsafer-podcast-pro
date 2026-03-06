"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { podcastApi } from "@repo/api";

<<<<<<< Updated upstream
// استيراد المكونات المقسمة
import { PodcastHero } from "../../(modules)/podcast/components/ditalspodcast/PodcastHero";
import { EpisodeItem } from "../../(modules)/podcast/components/EpisodeItem";
import { PodcastSidebar } from "../../(modules)/podcast/components/ditalspodcast/PodcastSidebar";
=======
import { PodcastHero } from "../../(modules)/podcast/components/page/PodcastHero";
import { EpisodeItem } from "../../(modules)/podcast/components/EpisodeItem";
import { PodcastSidebar } from "../../(modules)/podcast/components/page/PodcastSidebar";
>>>>>>> Stashed changes

export default function PodcastDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["podcast-details", id],
    queryFn: () => podcastApi.getDetailsWithEpisodes(id as string),
    enabled: !!id,
  });

<<<<<<< Updated upstream
  // معالجة حالات التحميل والخطأ
=======

>>>>>>> Stashed changes
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

  return (
    <div className="space-y-16 animate-in fade-in zoom-in-95 duration-1000 pb-40">
<<<<<<< Updated upstream
      {/* الجزء العلوي: الهيدر */}
      <PodcastHero show={show} />

      {/* التقسيم الشبكي: الحلقات يمين، والمعلومات يسار */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 border-t border-white/5 pt-16">
        
        {/* قائمة الحلقات */}
=======
     
      <PodcastHero show={show} />

   
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 border-t border-white/5 pt-16">
        
       
>>>>>>> Stashed changes
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black italic">Episodes Fleet</h2>
            <span className="text-xs font-mono text-white/20">[{episodes.length} FREQUENCIES]</span>
          </div>
          <div className="space-y-2">
            {episodes.map((episode, index) => (
              <EpisodeItem 
                key={episode.trackId} 
                episode={episode} 
                show={show} 
                index={index} 
              />
            ))}
          </div>
        </div>

<<<<<<< Updated upstream
        {/* الشريط الجانبي */}
=======
   
>>>>>>> Stashed changes
        <aside>
          <PodcastSidebar show={show} />
        </aside>

      </div>
    </div>
  );
}