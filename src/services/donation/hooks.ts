import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createDonation } from "./api";
import type { DonationRequest, DonationResponse, DonationError } from "./type";

export const useCreateDonation = (): UseMutationResult<
  DonationResponse,
  AxiosError<DonationError>,
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
    onError: (error: AxiosError<DonationError>) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.title ||
        "Tạo đơn quyên góp thất bại. Vui lòng thử lại.";
      toast.error("Thất bại", {
        description: errorMessage,
        duration: 4000,
      });
      console.error("Donation failed:", error.response?.data || error.message);
    },
  });
};
