import api from "@/config/axios";
import type {
  RescuerProfileRequest,
  RescuerProfileResponse,
  RescuerConsentRequest,
  RescuerConsentResponse,
  RescuerApplyRequest,
  RescuerApplyResponse,
  SubmitDocumentsRequest,
  SubmitDocumentsResponse,
  DocumentFileTypesResponse,
} from "./type";

// Get document file types - GET /identity/document-file-types
export const getDocumentFileTypes = async (
  activeOnly = true,
): Promise<DocumentFileTypesResponse> => {
  const response = await api.get<DocumentFileTypesResponse>(
    "/identity/document-file-types",
    {
      params: { activeOnly },
    },
  );
  return response.data;
};

// Update rescuer profile
export const updateRescuerProfile = async (
  data: RescuerProfileRequest,
): Promise<RescuerProfileResponse> => {
  const response = await api.put<RescuerProfileResponse>(
    "/identity/user/rescuer/profile",
    data,
  );
  return response.data;
};

// Apply as rescuer - POST /identity/user/rescuer/apply
export const applyRescuer = async (
  data: RescuerApplyRequest,
): Promise<RescuerApplyResponse> => {
  const response = await api.post<RescuerApplyResponse>(
    "/identity/user/rescuer/apply",
    data,
  );
  return response.data;
};

// Submit rescuer documents - POST /identity/user/rescuer/documents
export const submitDocuments = async (
  data: SubmitDocumentsRequest,
): Promise<SubmitDocumentsResponse> => {
  const response = await api.post<SubmitDocumentsResponse>(
    "/identity/user/rescuer/documents",
    data,
  );
  return response.data;
};

// Submit rescuer consent
export const submitRescuerConsent = async (
  data: RescuerConsentRequest,
): Promise<RescuerConsentResponse> => {
  const response = await api.post<RescuerConsentResponse>(
    "/identity/user/rescuer/consent",
    data,
  );
  return response.data;
};
