import { useState, useEffect, useCallback, useMemo } from "react";
import { useUserMe } from "@/services/user/hooks";
import {
  getOnboardingLabelByRescuerStep,
  getOnboardingPathByRescuerStep,
  getOnboardingStatusByRescuerStep,
  getSafeRescuerStep,
  isRescuerOnboardingComplete,
} from "@/services/user/utils";

export interface UserData {
  email: string;
  name?: string;
  avatar?: string;
  authMethod: "google" | "email";
  registeredAt: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
}

export interface OnboardingStatus {
  isRegistered: boolean;
  hasPersonalInfo: boolean;
  hasAbilityCheck: boolean;
  hasDetailedAbilities: boolean;
  isComplete: boolean;
}

const STORAGE_KEYS = {
  USER: "resq_user",
};

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  // Load user from localStorage
  const loadUserData = useCallback(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setUser(null);
    } finally {
      setIsBootstrapping(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const {
    data: userProfile,
    isLoading: isUserProfileLoading,
    refetch: refetchUserProfile,
  } = useUserMe(!isBootstrapping && !!user);

  const rescuerStep = getSafeRescuerStep(userProfile?.rescuerStep);
  const onboardingStatus = useMemo<OnboardingStatus>(
    () => getOnboardingStatusByRescuerStep(userProfile?.rescuerStep, !!user),
    [userProfile?.rescuerStep, user],
  );
  const currentOnboardingLabel = useMemo(
    () => getOnboardingLabelByRescuerStep(userProfile?.rescuerStep),
    [userProfile?.rescuerStep],
  );
  const isLoading = isBootstrapping || (!!user && isUserProfileLoading);

  // Register user (after Google or Email signup)
  const registerUser = useCallback(
    (userData: Omit<UserData, "registeredAt">) => {
      const newUser: UserData = {
        ...userData,
        registeredAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
      setUser(newUser);
    },
    [],
  );

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    // Clear authentication tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }, []);

  // Get next onboarding step path
  const getNextOnboardingPath = useCallback(
    (step?: number | null): string => getOnboardingPathByRescuerStep(step ?? rescuerStep),
    [rescuerStep],
  );

  // Refresh onboarding status
  const refreshOnboardingStatus = useCallback(() => {
    loadUserData();
    void refetchUserProfile();
  }, [loadUserData, refetchUserProfile]);

  return {
    user,
    userProfile,
    isLoading,
    isAuthenticated: !!user,
    onboardingStatus,
    rescuerStep,
    currentOnboardingLabel,
    isOnboardingComplete: isRescuerOnboardingComplete(userProfile?.rescuerStep),
    registerUser,
    logout,
    getNextOnboardingPath,
    refreshOnboardingStatus,
    refreshUserProfile: refetchUserProfile,
  };
};

export default useAuth;
