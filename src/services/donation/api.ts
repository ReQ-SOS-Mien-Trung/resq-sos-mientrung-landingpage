import api from "@/config/axios";
import type {
  DonationRequest,
  DonationResponse,
  PublicDonationsParams,
  PublicDonationsResponse,
} from "./type";

export const createDonation = async (
  data: DonationRequest,
): Promise<DonationResponse> => {
  const response = await api.post<DonationResponse>("/finance/donations", data);
  return response.data;
};

export const getPublicDonations = async (
  params: PublicDonationsParams = {},
): Promise<PublicDonationsResponse> => {
  const response = await api.get<PublicDonationsResponse>(
    "/finance/donations/public",
    { params },
  );
  return response.data;
};
