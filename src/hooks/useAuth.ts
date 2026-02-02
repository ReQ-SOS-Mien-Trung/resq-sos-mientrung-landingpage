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
  PERSONAL_INFO: "personalInfo",
  ABILITY_ANSWERS: "abilityAnswers",
  SELECTED_SKILLS: "selectedSkills",
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
      const personalInfo = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
      const abilityAnswers = localStorage.getItem(STORAGE_KEYS.ABILITY_ANSWERS);
      const selectedSkills = localStorage.getItem(STORAGE_KEYS.SELECTED_SKILLS);
      const onboardingComplete = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Check onboarding status
      const hasPersonalInfo = !!personalInfo && JSON.parse(personalInfo).firstName;
      const hasAbilityCheck = !!abilityAnswers && JSON.parse(abilityAnswers).length > 0;
      const hasDetailedAbilities = !!selectedSkills && JSON.parse(selectedSkills).length > 0;
      const isComplete = onboardingComplete === "true";

      setOnboardingStatus({
        isRegistered: !!savedUser,
        hasPersonalInfo,
        hasAbilityCheck,
        hasDetailedAbilities,
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
    localStorage.removeItem(STORAGE_KEYS.PERSONAL_INFO);
    localStorage.removeItem(STORAGE_KEYS.ABILITY_ANSWERS);
    localStorage.removeItem(STORAGE_KEYS.SELECTED_SKILLS);
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
