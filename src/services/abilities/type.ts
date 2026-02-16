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
