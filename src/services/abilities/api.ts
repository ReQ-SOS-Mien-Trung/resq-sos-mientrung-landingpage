import api from "@/config/axios";
import type { AbilitiesResponse, SubmitAbilitiesRequest, SubmitAbilitiesResponse } from "./type";

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
