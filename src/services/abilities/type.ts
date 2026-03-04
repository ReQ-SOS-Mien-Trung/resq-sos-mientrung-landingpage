// Ability item from GET /identity/abilities
export interface Ability {
  id: number;
  code: string;
  description: string;
}

// Abilities list response
export interface AbilitiesResponse {
  items: Ability[];
}

// Submit rescuer abilities request - POST /identity/abilities/rescuer
export interface RescuerAbilityItem {
  abilityId: number;
  level: number;
}

export interface SubmitAbilitiesRequest {
  abilities: RescuerAbilityItem[];
}

// Submit rescuer abilities response
export interface SubmitAbilitiesResponse {
  message?: string;
}

// GET /identity/abilities/rescuer/me - rescuer's own abilities
export interface RescuerAbilityDetail {
  abilityId: number;
  code: string;
  description: string;
  level: number;
}

export interface RescuerAbilitiesResponse {
  userId: string;
  abilities: RescuerAbilityDetail[];
}
