export const RESCUER_STEP_PERSONAL_INFO = 0;
export const RESCUER_STEP_ABILITY_CHECK = 1;
export const RESCUER_STEP_DETAILED_ABILITIES = 2;
export const RESCUER_STEP_COMPLETED = 3;

export const getSafeRescuerStep = (rescuerStep?: number | null): number => {
  if (typeof rescuerStep !== "number" || Number.isNaN(rescuerStep)) {
    return RESCUER_STEP_PERSONAL_INFO;
  }

  return rescuerStep;
};

export const isRescuerOnboardingComplete = (rescuerStep?: number | null): boolean =>
  getSafeRescuerStep(rescuerStep) >= RESCUER_STEP_COMPLETED;

export const getOnboardingPathByRescuerStep = (rescuerStep?: number | null): string => {
  const step = getSafeRescuerStep(rescuerStep);

  if (step >= RESCUER_STEP_COMPLETED) {
    return "/profile";
  }

  if (step >= RESCUER_STEP_DETAILED_ABILITIES) {
    return "/auth/detailed-abilities";
  }

  if (step >= RESCUER_STEP_ABILITY_CHECK) {
    return "/auth/ability-check";
  }

  return "/auth/personal-info";
};

export const getOnboardingLabelByRescuerStep = (rescuerStep?: number | null): string => {
  const step = getSafeRescuerStep(rescuerStep);

  if (step >= RESCUER_STEP_COMPLETED) {
    return "Hoàn tất hồ sơ";
  }

  if (step >= RESCUER_STEP_DETAILED_ABILITIES) {
    return "Chứng chỉ và Tài liệu";
  }

  if (step >= RESCUER_STEP_ABILITY_CHECK) {
    return "4 câu hỏi tiên quyết";
  }

  return "Thông tin cá nhân";
};

export const getOnboardingStatusByRescuerStep = (
  rescuerStep: number | null | undefined,
  isRegistered: boolean,
) => {
  const step = getSafeRescuerStep(rescuerStep);

  return {
    isRegistered,
    hasPersonalInfo: step >= RESCUER_STEP_ABILITY_CHECK,
    hasAbilityCheck: step >= RESCUER_STEP_DETAILED_ABILITIES,
    hasDetailedAbilities: step >= RESCUER_STEP_COMPLETED,
    isComplete: isRescuerOnboardingComplete(step),
  };
};
