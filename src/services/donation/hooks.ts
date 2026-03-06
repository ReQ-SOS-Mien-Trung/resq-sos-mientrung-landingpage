import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { isApiErrorResponse } from "@/types/api";
import { createDonation, getPublicDonations } from "./api";
import type {
  DonationRequest,
  DonationResponse,
  PublicDonationsParams,
  PublicDonationsResponse,
  ApiErrorResponse,
} from "./type";

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
      // ApiErrorResponse errors are already handled by the global interceptor (toast shown).
      // Only show a fallback toast for non-ApiErrorResponse errors (e.g. network errors).
      if (!isApiErrorResponse(error.response?.data)) {
        toast.error("Thất bại", {
          description: "Tạo đơn quyên góp thất bại. Vui lòng thử lại.",
          duration: 4000,
        });
      }
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
