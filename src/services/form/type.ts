// Rescuer profile update request - PUT /identity/user/rescuer/profile
export interface RescuerProfileRequest {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  ward: string;
  city: string;
  latitude: number;
  longitude: number;
}

// Rescuer profile update response
export interface RescuerProfileResponse {
  id: string;
  roleId: number;
  fullName: string | null;
  username: string | null;
  phone: string | null;
  rescuerType: string | null;
  email: string | null;
  isEmailVerified: boolean;
  isOnboarded: boolean;
  isEligibleRescuer: boolean;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
}

// Rescuer apply request - POST /identity/user/rescuer/apply
export interface RescuerApplyDocument {
  fileUrl: string;
  fileType: string;
}

export interface RescuerApplyRequest {
  rescuerType?: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  latitude: number;
  longitude: number;
  note?: string;
  documents: RescuerApplyDocument[];
}

export type RescuerApplyResponse = RescuerProfileResponse;

// Rescuer consent request - POST /identity/user/rescuer/consent
export interface RescuerConsentRequest {
  agreeMedicalFitness: boolean;
  agreeLegalResponsibility: boolean;
  agreeTraining: boolean;
  agreeCodeOfConduct: boolean;
}

// Rescuer consent response (reuse profile response)
export type RescuerConsentResponse = RescuerProfileResponse;
