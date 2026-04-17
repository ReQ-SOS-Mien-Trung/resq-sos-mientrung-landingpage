import api from "@/config/axios";
import type { AbilitiesResponse, SubmitAbilitiesRequest, SubmitAbilitiesResponse, RescuerAbilitiesResponse } from "./type";

// Get all abilities
export const getAbilities = async (): Promise<AbilitiesResponse> => {
  const response = await api.get<AbilitiesResponse>("/identity/abilities");
  return response.data;
};

// Submit rescuer abilities
export const submitRescuerAbilities = async (data: SubmitAbilitiesRequest): Promise<SubmitAbilitiesResponse> => {
  const response = await api.post<SubmitAbilitiesResponse>("/identity/abilities/rescuer", data);
  return response.data;
};

// Get rescuer's own abilities
export const getRescuerAbilities = async (): Promise<RescuerAbilitiesResponse> => {
  const response = await api.get<RescuerAbilitiesResponse>("/identity/abilities/rescuer/me");
  return response.data;
};
