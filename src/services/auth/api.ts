import api from "@/config/axios";
import authEmailApi from "@/config/authEmailAxios";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  GoogleAuthRequest,
  GoogleAuthResponse,
  ResendVerificationRequest,
  ResendVerificationResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "./type";

// Register rescuer
export const registerRescuer = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  const response = await authEmailApi.post<RegisterResponse>(
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
  const response = await authEmailApi.post<ResendVerificationResponse>(
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

// Refresh token
export const refreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const storedAccessToken = localStorage.getItem("accessToken") ?? "";
  const storedRefreshToken = localStorage.getItem("refreshToken");
  if (!storedRefreshToken) throw new Error("No refresh token available");

  const response = await api.post<{
    accessToken: string;
    refreshToken: string;
  }>("/identity/auth/refresh-token", {
    accessToken: storedAccessToken,
    refreshToken: storedRefreshToken,
  });
  return response.data;
};

// Forgot Password
export const forgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>(
    "/identity/auth/forgot-password",
    data,
  );
  return response.data;
};

// Reset Password
export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>(
    "/identity/auth/reset-password",
    data,
  );
  return response.data;
};
