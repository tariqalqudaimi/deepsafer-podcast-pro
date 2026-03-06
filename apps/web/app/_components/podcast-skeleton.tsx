"use client";

export function PodcastSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px] animate-in fade-in duration-500">
      {/* سنقوم برسم 8 بطاقات وهمية بتصميم البينتو */}
      {Array.from({ length: 8 }).map((_, i) => {
        // محاكاة توزيع البينتو (العنصر الأول والسابع أكبر)
        const isLarge = i === 0 || i === 7;
        
        return (
          <div 
            key={i} 
            className={`relative rounded-[2.5rem] bg-white/[0.03] border border-white/5 overflow-hidden p-8 flex flex-col justify-end gap-4 animate-pulse ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
          >
            
            <div className="w-20 h-4 bg-white/10 rounded-full" />
            
           
            <div className="space-y-2">
              <div className="w-full h-8 bg-white/10 rounded-xl" />
              {isLarge && <div className="w-2/3 h-8 bg-white/10 rounded-xl" />}
            </div>
            
          
            <div className="w-1/3 h-4 bg-white/5 rounded-full" />

            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        );
      })}
    </div>
  );
}