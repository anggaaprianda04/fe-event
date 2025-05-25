import useChangeUrl from "@/hooks/useChangeUrl";
import categoryService from "@/services/category.service";
import eventService from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useEvent = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const router = useRouter();
  const { currentPage, currentLimit, currentSearch } = useChangeUrl();

  const getEvents = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    const res = await eventService.getEvents(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataEvent,
    isLoading: isLoadingEvent,
    isRefetching: isRefetchingEvent,
    refetch: refecthEvent,
  } = useQuery({
    queryKey: ["Events", currentPage, currentLimit, currentSearch],
    queryFn: () => getEvents(),
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    refecthEvent,
    selectedId,
    setSelectedId,
  };
};

export default useEvent;
