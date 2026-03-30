// Rescuer application document from GET /identity/user/me
export interface RescuerApplicationDocument {
  id: number;
  applicationId: number;
  fileUrl: string;
  fileTypeId: number;
  fileTypeCode: string | null;
  fileTypeName: string | null;
  uploadedAt: string;
}

export type UserPermission = string;

// Raw API response from GET /identity/user/me
export interface UserMeResponse {
  id: string;
  roleId: number;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  phone: string | null;
  rescuerType: string | null;
  email: string | null;
  isEmailVerified: boolean;
  isEligibleRescuer: boolean;
  rescuerStep: number;
  avatarUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
  rescuerApplicationDocuments: RescuerApplicationDocument[];
  permissions: UserPermission[];
  depotId: string | number | null;
  depotName: string | null;
  address?: string | null;
  ward?: string | null;
  city?: string | null;
}

export type UserProfile = UserMeResponse;
