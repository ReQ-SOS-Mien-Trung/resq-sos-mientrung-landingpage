import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiErrorResponse } from "@/types/api";
import { createDonation, getPublicDonations } from "./api";
import type {
  DonationRequest,
  DonationResponse,
  PublicDonationsParams,
  PublicDonationsResponse,
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

