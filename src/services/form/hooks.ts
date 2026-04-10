import {
  useMutation,
  useQuery,
  useQueryClient,
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
import type { UserProfile } from "@/services/user/type";
// Note: Error toasts (400/401) are handled globally by the axios interceptor.

const mergeUserProfile = (
  current: UserProfile | undefined,
  data: RescuerProfileResponse,
): UserProfile => ({
  id: data.id,
  roleId: data.roleId,
  firstName: current?.firstName ?? null,
  lastName: current?.lastName ?? null,
  username: data.username,
  phone: data.phone,
  rescuerType: data.rescuerType,
  email: data.email,
  isEmailVerified: data.isEmailVerified,
  isEligibleRescuer: data.isEligibleRescuer,
  rescuerStep: data.rescuerStep,
  avatarUrl: current?.avatarUrl ?? null,
  latitude: data.latitude,
  longitude: data.longitude,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
  approvedBy: data.approvedBy,
  approvedAt: data.approvedAt,
  rescuerApplicationDocuments: current?.rescuerApplicationDocuments ?? [],
  permissions: current?.permissions ?? [],
  depotId: current?.depotId ?? null,
  depotName: current?.depotName ?? null,
  rescuerScore: current?.rescuerScore ?? null,
  address: current?.address ?? null,
  ward: current?.ward ?? null,
  city: current?.city ?? null,
});

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRescuerProfile,
    onSuccess: (data) => {
      queryClient.setQueryData<UserProfile>(["user", "me"], (current) =>
        mergeUserProfile(current, data),
      );
      void queryClient.invalidateQueries({ queryKey: ["user", "me"] });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitRescuerConsent,
    onSuccess: (data) => {
      queryClient.setQueryData<UserProfile>(["user", "me"], (current) =>
        mergeUserProfile(current, data),
      );
      void queryClient.invalidateQueries({ queryKey: ["user", "me"] });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyRescuer,
    onSuccess: (data) => {
      queryClient.setQueryData<UserProfile>(["user", "me"], (current) =>
        mergeUserProfile(current, data),
      );
      void queryClient.invalidateQueries({ queryKey: ["user", "me"] });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitDocuments,
    onSuccess: (data) => {
      queryClient.setQueryData<UserProfile>(["user", "me"], (current) =>
        mergeUserProfile(current, data),
      );
      void queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      // Toast is shown by the global axios interceptor
      console.error("Submit documents failed:", error.response?.data || error.message);
    },
  });
};
