export function useDashboardPodcasts(term: string) {
  const query = useInfiniteQuery({
    queryKey: ["podcasts", term],
    queryFn: ({ pageParam = 0 }) => podcastApi.searchCollections(term, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length * 20;
    },
  });

  const podcasts = useMemo(() => {
    const flatData = query.data?.pages.flat() || [];
    const uniqueMap = new Map();
   
    flatData.forEach(p => {
      if (p.collectionId) uniqueMap.set(p.collectionId, p);
    });
    const result = Array.from(uniqueMap.values());
    console.log("📊 Total Unique Podcasts in UI:", result.length); // راقب هذا الرقم في الكونسول
    return result;
  }, [query.data]); // نراقب التغير في البيانات بالكامل

  return { ...query, podcasts };
}

function useInfiniteQuery(arg0: { queryKey: string[]; queryFn: ({ pageParam }: { pageParam?: number | undefined; }) => any; initialPageParam: number; getNextPageParam: (lastPage: any, allPages: any) => number | undefined; }) {
    throw new Error("Function not implemented.");
}
