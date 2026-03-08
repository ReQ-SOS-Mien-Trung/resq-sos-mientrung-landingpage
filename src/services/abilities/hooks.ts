import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from "@tanstack/react-query";
import { getAbilities, submitRescuerAbilities, getRescuerAbilities } from "./api";
import type { AbilitiesResponse, SubmitAbilitiesRequest, SubmitAbilitiesResponse, RescuerAbilitiesResponse } from "./type";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiErrorResponse } from "@/types/api";
// Note: Error toasts (400/401) are handled globally by the axios interceptor.

// Get all abilities
export const useGetAbilities = (): UseQueryResult<AbilitiesResponse, AxiosError> => {
  return useQuery({
    queryKey: ["abilities"],
    queryFn: getAbilities,
  });
};

// Get rescuer's own abilities
export const useGetRescuerAbilities = (): UseQueryResult<RescuerAbilitiesResponse, AxiosError> => {
  return useQuery({
    queryKey: ["rescuer-abilities"],
    queryFn: getRescuerAbilities,
  });
};

// Submit rescuer abilities
export const useSubmitRescuerAbilities = (): UseMutationResult<
  SubmitAbilitiesResponse,
  AxiosError<ApiErrorResponse>,
  SubmitAbilitiesRequest
> => {
  return useMutation({
    mutationFn: submitRescuerAbilities,
    onSuccess: () => {
      toast.success("Cập nhật kỹ năng thành công!", {
        description: "Kỹ năng của bạn đã được ghi nhận.",
        duration: 3000,
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // Toast is shown by the global axios interceptor
      console.error("Abilities submission failed:", error.response?.data || error.message);
    },
  });
};

