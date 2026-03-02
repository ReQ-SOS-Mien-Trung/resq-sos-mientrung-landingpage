import api from "@/config/axios";
import type { UserProfile } from "./type";

// Get current user profile
export const getUserMe = async (): Promise<UserProfile> => {
  const response = await api.get<UserProfile>("/identity/user/me");
  return response.data;
};
