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

// User profile response from GET /identity/user/me
export interface UserProfile {
  id: string;
  roleId: number;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  phone: string | null;
  address?: string | null;
  ward?: string | null;
  city?: string | null;
  rescuerType: string | null;
  email: string | null;
  isEmailVerified: boolean;
  isOnboarded: boolean;
  isEligibleRescuer: boolean;
  avatarUrl: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: string;
  updatedAt: string;
  approvedBy: string | null;
  approvedAt: string | null;
  rescuerApplicationDocuments: RescuerApplicationDocument[];
}

