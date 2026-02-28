import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import {
  updateRescuerProfile,
  submitRescuerConsent,
  applyRescuer,
  submitDocuments,
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
} from "./type";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface FormError {
  message?: string;
  errors?: Record<string, string[]>;
}

// Update rescuer profile
export const useUpdateRescuerProfile = (): UseMutationResult<
  RescuerProfileResponse,
  AxiosError<FormError>,
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
    onError: (error: AxiosError<FormError>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Cập nhật hồ sơ thất bại. Vui lòng thử lại.";
      const errors = error.response?.data?.errors;

      if (errors && Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            toast.error(`Lỗi ${field}`, {
              description: msg,
              duration: 4000,
            });
          });
        });
      } else {
        toast.error("Cập nhật thất bại", {
          description: errorMessage,
          duration: 4000,
        });
      }
      console.error(
        "Profile update failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};

// Submit rescuer consent
export const useSubmitRescuerConsent = (): UseMutationResult<
  RescuerConsentResponse,
  AxiosError<FormError>,
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
    onError: (error: AxiosError<FormError>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Gửi xác nhận thất bại. Vui lòng thử lại.";
      toast.error("Gửi thất bại", {
        description: errorMessage,
        duration: 4000,
      });
      console.error(
        "Consent submission failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
// Apply as rescuer
export const useApplyRescuer = (): UseMutationResult<
  RescuerApplyResponse,
  AxiosError<FormError>,
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
    onError: (error: AxiosError<FormError>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Nộp hồ sơ thất bại. Vui lòng thử lại.";
      const errors = error.response?.data?.errors;

      if (errors && Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            toast.error(`Lỗi ${field}`, { description: msg, duration: 4000 });
          });
        });
      } else {
        toast.error("Nộp hồ sơ thất bại", {
          description: errorMessage,
          duration: 4000,
        });
      }
      console.error(
        "Apply rescuer failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};

// Submit rescuer documents
export const useSubmitDocuments = (): UseMutationResult<
  SubmitDocumentsResponse,
  AxiosError<FormError>,
  SubmitDocumentsRequest
> => {
  return useMutation({
    mutationFn: submitDocuments,
    onError: (error: AxiosError<FormError>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Tải lên chứng chỉ thất bại. Vui lòng thử lại.";
      toast.error("Lỗi nộp chứng chỉ", {
        description: errorMessage,
        duration: 4000,
      });
      console.error(
        "Submit documents failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
