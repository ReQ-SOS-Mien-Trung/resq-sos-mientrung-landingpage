import {
  useMutation,
  useQuery,
  type UseMutationResult,
} from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { ApiErrorResponse } from "@/types/api";
import {
  updateRescuerProfile,
  submitRescuerConsent,
  applyRescuer,
  submitDocuments,
  getDocumentFileTypes,
} from "./api";
import type {
  RescuerProfileRequest,
  RescuerProfileResponse,
  RescuerConsentRequest,
  RescuerConsentResponse,
  RescuerApplyRequest,
  RescuerApplyResponse,
  SubmitDocumentsRequest,
  SubmitDocumentsResponse,
  DocumentFileType,
} from "./type";
// Note: Error toasts (400/401) are handled globally by the axios interceptor.

// Fetch document file types
export const useDocumentFileTypes = () => {
  return useQuery<DocumentFileType[]>({
    queryKey: ["document-file-types"],
    queryFn: async () => {
      const data = await getDocumentFileTypes(true);
      return data.items;
    },
    staleTime: 1000 * 60 * 10, // cache 10 min
  });
};

// Update rescuer profile
export const useUpdateRescuerProfile = (): UseMutationResult<
  RescuerProfileResponse,
  AxiosError<ApiErrorResponse>,
  RescuerProfileRequest
> => {
  return useMutation({
    mutationFn: updateRescuerProfile,
    onSuccess: () => {
      toast.success("Cập nhật hồ sơ thành công!", {
        description: "Thông tin cá nhân đã được lưu.",
        duration: 3000,
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // Toast is shown by the global axios interceptor
      console.error("Profile update failed:", error.response?.data || error.message);
    },
  });
};

// Submit rescuer consent
export const useSubmitRescuerConsent = (): UseMutationResult<
  RescuerConsentResponse,
  AxiosError<ApiErrorResponse>,
  RescuerConsentRequest
> => {
  return useMutation({
    mutationFn: submitRescuerConsent,
    onSuccess: () => {
      toast.success("Xác nhận thành công!", {
        description: "Câu trả lời tiên quyết đã được ghi nhận.",
        duration: 3000,
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // Toast is shown by the global axios interceptor
      console.error("Consent submission failed:", error.response?.data || error.message);
    },
  });
};
// Apply as rescuer
export const useApplyRescuer = (): UseMutationResult<
  RescuerApplyResponse,
  AxiosError<ApiErrorResponse>,
  RescuerApplyRequest
> => {
  return useMutation({
    mutationFn: applyRescuer,
    onSuccess: () => {
      toast.success("Nộp hồ sơ thành công!", {
        description:
          "Hồ sơ của bạn đã được gửi, vui lòng hoàn tất các bước tiếp theo.",
        duration: 3000,
      });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // Toast is shown by the global axios interceptor
      console.error("Apply rescuer failed:", error.response?.data || error.message);
    },
  });
};

// Submit rescuer documents
export const useSubmitDocuments = (): UseMutationResult<
  SubmitDocumentsResponse,
  AxiosError<ApiErrorResponse>,
  SubmitDocumentsRequest
> => {
  return useMutation({
    mutationFn: submitDocuments,
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // Toast is shown by the global axios interceptor
      console.error("Submit documents failed:", error.response?.data || error.message);
    },
  });
};

