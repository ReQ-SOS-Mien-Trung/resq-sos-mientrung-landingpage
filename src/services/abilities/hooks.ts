import { useQuery, useMutation, type UseQueryResult, type UseMutationResult } from "@tanstack/react-query";
import { getAbilities, submitRescuerAbilities } from "./api";
import type { AbilitiesResponse, SubmitAbilitiesRequest, SubmitAbilitiesResponse } from "./type";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface AbilitiesError {
  message?: string;
}

// Get all abilities
export const useGetAbilities = (): UseQueryResult<AbilitiesResponse, AxiosError<AbilitiesError>> => {
  return useQuery({
    queryKey: ["abilities"],
    queryFn: getAbilities,
  });
};

// Submit rescuer abilities
export const useSubmitRescuerAbilities = (): UseMutationResult<
  SubmitAbilitiesResponse,
  AxiosError<AbilitiesError>,
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
    onError: (error: AxiosError<AbilitiesError>) => {
      const errorMessage =
        error.response?.data?.message || "Cập nhật kỹ năng thất bại. Vui lòng thử lại.";
      toast.error("Gửi thất bại", {
        description: errorMessage,
        duration: 4000,
      });
      console.error(
        "Abilities submission failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
