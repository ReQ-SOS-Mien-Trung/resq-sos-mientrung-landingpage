import api from "@/config/axios";
import type { DonationRequest, DonationResponse } from "./type";

export const createDonation = async (
  data: DonationRequest,
): Promise<DonationResponse> => {
  const response = await api.post<DonationResponse>("/finance/donations", data);
  return response.data;
};
