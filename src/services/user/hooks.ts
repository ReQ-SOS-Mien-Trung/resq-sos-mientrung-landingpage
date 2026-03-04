import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getUserMe } from "./api";
import type { UserProfile } from "./type";
import type { AxiosError } from "axios";

// Get current user profile
export const useUserMe = (enabled = true): UseQueryResult<UserProfile, AxiosError> => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: getUserMe,
    enabled,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
