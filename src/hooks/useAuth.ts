import { useState, useEffect, useCallback } from "react";

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
  ONBOARDING_COMPLETE: "resq_onboarding_complete",
};

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus>({
    isRegistered: false,
    hasPersonalInfo: false,
    hasAbilityCheck: false,
    hasDetailedAbilities: false,
    isComplete: false,
  });

  // Load user and onboarding status from localStorage
  const loadUserData = useCallback(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const onboardingComplete = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const isComplete = onboardingComplete === "true";

      setOnboardingStatus({
        isRegistered: !!savedUser,
        hasPersonalInfo: isComplete,
        hasAbilityCheck: isComplete,
        hasDetailedAbilities: isComplete,
        isComplete,
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // Register user (after Google or Email signup)
  const registerUser = useCallback((userData: Omit<UserData, "registeredAt">) => {
    const newUser: UserData = {
      ...userData,
      registeredAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setUser(newUser);
    setOnboardingStatus((prev) => ({ ...prev, isRegistered: true }));
  }, []);

  // Complete onboarding
  const completeOnboarding = useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, "true");
    setOnboardingStatus((prev) => ({ ...prev, isComplete: true }));
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
    // Clear authentication tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setOnboardingStatus({
      isRegistered: false,
      hasPersonalInfo: false,
      hasAbilityCheck: false,
      hasDetailedAbilities: false,
      isComplete: false,
    });
  }, []);

  // Get next onboarding step path
  const getNextOnboardingPath = useCallback((): string => {
    if (!onboardingStatus.hasPersonalInfo) {
      return "/auth/personal-info";
    }
    if (!onboardingStatus.hasAbilityCheck) {
      return "/auth/ability-check";
    }
    if (!onboardingStatus.hasDetailedAbilities) {
      return "/auth/detailed-abilities";
    }
    return "/profile";
  }, [onboardingStatus]);

  // Refresh onboarding status
  const refreshOnboardingStatus = useCallback(() => {
    loadUserData();
  }, [loadUserData]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    onboardingStatus,
    registerUser,
    completeOnboarding,
    logout,
    getNextOnboardingPath,
    refreshOnboardingStatus,
  };
};

export default useAuth;
