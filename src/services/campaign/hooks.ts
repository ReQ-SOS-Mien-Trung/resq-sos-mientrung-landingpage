import { useQuery } from "@tanstack/react-query";
import { getCampaignsMetadata, getPublicCampaignSpending } from "./api";
import type {
  CampaignMetadata,
  PublicCampaignSpendingParams,
  PublicCampaignSpendingResponse,
} from "./type";

export const useGetCampaignsMetadata = () => {
  return useQuery<CampaignMetadata[]>({
    queryKey: ["campaigns", "metadata"],
    queryFn: getCampaignsMetadata,
  });
};

export const useGetPublicCampaignSpending = (
  campaignId: number | null,
  params: PublicCampaignSpendingParams = { pageNumber: 1, pageSize: 10 },
) => {
  return useQuery<PublicCampaignSpendingResponse>({
    queryKey: ["campaigns", "public-spending", campaignId, params],
    queryFn: () => getPublicCampaignSpending(campaignId!, params),
    enabled: typeof campaignId === "number" && campaignId > 0,
  });
};
