import api from "@/config/axios";
import type { CampaignMetadata } from "./type";

export const getCampaignsMetadata = async (): Promise<CampaignMetadata[]> => {
  const response = await api.get<CampaignMetadata[]>(
    "/finance/campaigns/metadata",
  );
  return response.data;
};
