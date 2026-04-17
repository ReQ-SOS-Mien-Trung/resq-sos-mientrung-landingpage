import api from "@/config/axios";
import type {
  CampaignMetadata,
  PublicCampaignSpendingParams,
  PublicCampaignSpendingResponse,
} from "./type";

export const getCampaignsMetadata = async (): Promise<CampaignMetadata[]> => {
  const response = await api.get<CampaignMetadata[]>(
    "/finance/campaigns/metadata",
  );
  return response.data;
};

export const getPublicCampaignSpending = async (
  campaignId: number,
  params: PublicCampaignSpendingParams = {},
): Promise<PublicCampaignSpendingResponse> => {
  const response = await api.get<PublicCampaignSpendingResponse>(
    `/finance/disbursements/public/campaigns/${campaignId}/spending`,
    {
      params,
    },
  );
  return response.data;
};
