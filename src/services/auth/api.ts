import api from "@/config/axios";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  GoogleAuthRequest,
  GoogleAuthResponse,
  ResendVerificationRequest,
  ResendVerificationResponse,
} from "./type";

// Register rescuer
export const registerRescuer = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/identity/auth/register-rescuer",
    data,
  );
  return response.data;
};

// Login
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/identity/auth/login-rescuer",
    data,
  );
  return response.data;
};

// Google Login
export const googleAuth = async (
  data: GoogleAuthRequest,
): Promise<GoogleAuthResponse> => {
  const response = await api.post<GoogleAuthResponse>(
    "/identity/auth/google-login",
    data,
  );
  return response.data;
};

// Resend Verification Email
export const resendVerificationEmail = async (
  data: ResendVerificationRequest,
): Promise<ResendVerificationResponse> => {
  const response = await api.post<ResendVerificationResponse>(
    "/identity/auth/resend-verification-email",
    data,
  );
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  await api.post("/identity/auth/logout");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
