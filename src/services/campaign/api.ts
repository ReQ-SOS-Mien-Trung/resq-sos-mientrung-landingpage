import api from "@/config/axios";
import type {
  ActiveCampaign,
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

export const getActiveCampaigns = async (): Promise<ActiveCampaign[]> => {
  const response = await api.get<ActiveCampaign[]>("/finance/campaigns/active");
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
