import api from "@/config/axios";
import type {
  DonationRequest,
  DonationResponse,
  PaymentMethod,
  PublicDonationsParams,
  PublicDonationsResponse,
  ZaloPayVerifyParams,
  ZaloPayVerifyResponse,
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

export const getPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await api.get<PaymentMethod[]>(
    "/finance/donations/payment-methods",
  );
  return response.data;
};

export const verifyZaloPay = async (
  params: ZaloPayVerifyParams,
): Promise<ZaloPayVerifyResponse> => {
  const response = await api.get<ZaloPayVerifyResponse>(
    "/finance/donations/zalopay-verify",
    { params },
  );
  return response.data;
};
