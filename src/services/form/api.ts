import api from "@/config/axios";
import type { RescuerProfileRequest, RescuerProfileResponse, RescuerConsentRequest, RescuerConsentResponse } from "./type";

// Update rescuer profile
export const updateRescuerProfile = async (data: RescuerProfileRequest): Promise<RescuerProfileResponse> => {
  const response = await api.put<RescuerProfileResponse>("/identity/user/rescuer/profile", data);
  return response.data;
};

// Submit rescuer consent
export const submitRescuerConsent = async (data: RescuerConsentRequest): Promise<RescuerConsentResponse> => {
  const response = await api.post<RescuerConsentResponse>("/identity/user/rescuer/consent", data);
  return response.data;
};
