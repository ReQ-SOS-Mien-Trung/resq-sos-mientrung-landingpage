import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiErrorResponse } from "@/types/api";
import {
  createDonation,
  getPaymentMethods,
  getPublicDonations,
  verifyZaloPay,
} from "./api";
import type {
  DonationRequest,
  DonationResponse,
  PaymentMethod,
  PublicDonationsParams,
  PublicDonationsResponse,
  ZaloPayVerifyParams,
  ZaloPayVerifyResponse,
} from "./type";
// Note: Error toasts (400/401) are handled globally by the axios interceptor.

export const useCreateDonation = (): UseMutationResult<
  DonationResponse,
  AxiosError<ApiErrorResponse>,
  DonationRequest
> => {
  return useMutation({
    mutationFn: createDonation,
    onSuccess: (data) => {
      toast.success("Tạo đơn quyên góp thành công!", {
        description: "Vui lòng thanh toán để hoàn tất đóng góp.",
        duration: 4000,
      });
      console.log("Donation created:", data);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // Toast is shown by the global axios interceptor
      console.error("Donation failed:", error.response?.data || error.message);
    },
  });
};

/** Fetch public donations with optional smart polling (refetchInterval in ms) */
export const usePublicDonations = (
  params: PublicDonationsParams = {},
  refetchInterval?: number,
): UseQueryResult<PublicDonationsResponse, AxiosError> => {
  return useQuery({
    queryKey: ["donations", "public", params],
    queryFn: () => getPublicDonations(params),
    refetchInterval: refetchInterval ?? false,
    staleTime: 0,
  });
};

/** Fetch available payment methods */
export const usePaymentMethods = (): UseQueryResult<
  PaymentMethod[],
  AxiosError
> => {
  return useQuery({
    queryKey: ["donations", "payment-methods"],
    queryFn: getPaymentMethods,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useVerifyZaloPay = (
  params: ZaloPayVerifyParams,
  enabled = true,
): UseQueryResult<ZaloPayVerifyResponse, AxiosError> => {
  return useQuery({
    queryKey: ["donations", "zalopay-verify", params.apptransid],
    queryFn: () => verifyZaloPay(params),
    enabled: enabled && !!params.apptransid,
    staleTime: 0,
  });
};
