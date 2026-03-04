import { useQuery } from "@tanstack/react-query";
import { getCampaignsMetadata } from "./api";
import type { CampaignMetadata } from "./type";

export const useGetCampaignsMetadata = () => {
  return useQuery<CampaignMetadata[]>({
    queryKey: ["campaigns", "metadata"],
    queryFn: getCampaignsMetadata,
  });
};
