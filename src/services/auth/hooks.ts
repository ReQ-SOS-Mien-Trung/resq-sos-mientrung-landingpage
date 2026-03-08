import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import {
  registerRescuer,
  login,
  logout,
  googleAuth,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
} from "./api";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  AuthError,
  GoogleAuthRequest,
  GoogleAuthResponse,
  ResendVerificationRequest,
  ResendVerificationResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "./type";
import { AxiosError } from "axios";
import { toast } from "sonner";
// Note: Error toasts (400/401) are handled globally by the axios interceptor.
// Only success toasts are managed here in onSuccess callbacks.

// Register rescuer
export const useRegisterRescuer = (): UseMutationResult<
  RegisterResponse,
  AxiosError<AuthError>,
  RegisterRequest
> => {
  return useMutation({
    mutationFn: registerRescuer,
    onSuccess: (data: RegisterResponse) => {
      toast.success("Đăng ký thành công!", {
        description:
          data.message || "Vui lòng kiểm tra email để xác nhận tài khoản.",
        duration: 5000,
      });
      console.log("Registration successful:", data);
    },
    onError: (error: AxiosError<AuthError>) => {
      // Toast is shown by the global axios interceptor
      console.error("Registration failed:", error.response?.data || error.message);
    },
  });
};

// Login
export const useLogin = (): UseMutationResult<
  LoginResponse,
  AxiosError<AuthError>,
  LoginRequest
> => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      // Save tokens to localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      toast.success("Đăng nhập thành công!", {
        description: "Chào mừng bạn quay trở lại.",
        duration: 3000,
      });
      console.log("Login successful:", data);
    },
    onError: (error: AxiosError<AuthError>) => {
      // Toast is shown by the global axios interceptor
      console.error("Login failed:", error.response?.data || error.message);
    },
  });
};

// Logout
export const useLogout = (): UseMutationResult<
  void,
  AxiosError<AuthError>,
  void
> => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Đăng xuất thành công!", {
        description: "Hẹn gặp lại bạn.",
        duration: 3000,
      });
      console.log("Logout successful");
    },
    onError: (error: AxiosError<AuthError>) => {
      // Toast is shown by the global axios interceptor
      console.error("Logout failed:", error.response?.data || error.message);
    },
  });
};

// Unified Google Auth (handles both login and signup based on backend isOnboarded)
export const useGoogleAuth = (): UseMutationResult<
  GoogleAuthResponse,
  AxiosError<AuthError>,
  GoogleAuthRequest
> => {
  return useMutation({
    mutationFn: googleAuth,
    onSuccess: (data: GoogleAuthResponse) => {
      // Save tokens to localStorage
      if (data.accessToken)
        localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken)
        localStorage.setItem("refreshToken", data.refreshToken);
      // Note: toast is shown in the page after getUserMe() to get the real isOnboarded value
      console.log("Google auth successful:", data);
    },
    onError: (error: AxiosError<AuthError>) => {
      // Toast is shown by the global axios interceptor
      console.error("Google auth failed:", error.response?.data || error.message);
    },
  });
};

// Resend Verification Email
export const useResendVerification = (): UseMutationResult<
  ResendVerificationResponse,
  AxiosError<AuthError>,
  ResendVerificationRequest
> => {
  return useMutation({
    mutationFn: resendVerificationEmail,
    onSuccess: (data: ResendVerificationResponse) => {
      if (data.success) {
        toast.success("Gửi email thành công!", {
          description: data.message || "Vui lòng kiểm tra hộp thư của bạn.",
          duration: 5000,
        });
      } else {
        toast.error("Gửi email thất bại", {
          description: data.message,
          duration: 4000,
        });
      }
      console.log("Resend verification:", data);
    },
    onError: (error: AxiosError<AuthError>) => {
      // Toast is shown by the global axios interceptor
      console.error("Resend verification failed:", error.response?.data || error.message);
    },
  });
};

// Forgot Password
export const useForgotPassword = (): UseMutationResult<
  ForgotPasswordResponse,
  AxiosError<AuthError>,
  ForgotPasswordRequest
> => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data: ForgotPasswordResponse) => {
      toast.success("Gửi yêu cầu thành công!", {
        description: data.message,
        duration: 6000,
      });
    },
    onError: (error: AxiosError<AuthError>) => {
      // Toast is shown by the global axios interceptor
      console.error("Forgot password failed:", error.response?.data || error.message);
    },
  });
};

// Reset Password
export const useResetPassword = (): UseMutationResult<
  ResetPasswordResponse,
  AxiosError<AuthError>,
  ResetPasswordRequest
> => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data: ResetPasswordResponse) => {
      toast.success("Đặt lại mật khẩu thành công!", {
        description: data.message,
        duration: 4000,
      });
    },
    onError: (error: AxiosError<AuthError>) => {
      // Toast is shown by the global axios interceptor
      console.error("Reset password failed:", error.response?.data || error.message);
    },
  });
};
