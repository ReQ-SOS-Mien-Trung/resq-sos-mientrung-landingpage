import api from "@/config/axios";
import type { RegisterRequest, RegisterResponse, LoginRequest, LoginResponse, GoogleAuthRequest, GoogleAuthResponse } from "./type";

// Register rescuer
export const registerRescuer = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>("/api/auth/register-rescuer", data);
  return response.data;
};

// Login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/api/auth/login", data);
  return response.data;
};

// Google Login
export const googleAuth = async (data: GoogleAuthRequest): Promise<GoogleAuthResponse> => {
  const response = await api.post<GoogleAuthResponse>("/api/auth/google-login", data);
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  await api.post("/api/auth/logout");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
