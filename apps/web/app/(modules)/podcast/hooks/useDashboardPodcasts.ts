import { useQuery } from "@tanstack/react-query";
import { podcastApi } from "@repo/api";
import { useMemo } from "react";

export function useDashboardPodcasts(term: string) {
  const query = useQuery({
    queryKey: ["podcasts", term],
    queryFn: () => podcastApi.searchCollections(term),
  });

  
  const podcasts = useMemo(() => {
    if (!query.data) return[];
    const uniqueMap = new Map();
    query.data.forEach(p => {
      if (p.collectionId) uniqueMap.set(p.collectionId, p);
    });
    return Array.from(uniqueMap.values());
  },[query.data]);

  return { ...query, podcasts };
}