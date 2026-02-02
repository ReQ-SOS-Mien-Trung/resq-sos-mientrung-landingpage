import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { registerRescuer, login, logout, googleAuth } from "./api";
import type {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  AuthError,
  GoogleAuthRequest,
  GoogleAuthResponse,
} from "./type";
import { AxiosError } from "axios";
import { toast } from "sonner";

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
      const errorMessage =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      const errors = error.response?.data?.errors;

      // Display specific field errors if available
      if (errors && Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            toast.error(`Lỗi ${field}`, {
              description: msg,
              duration: 4000,
            });
          });
        });
      } else {
        toast.error("Đăng ký thất bại", {
          description: errorMessage,
          duration: 4000,
        });
      }
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message,
      );
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
      const errorMessage =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";
      const errors = error.response?.data?.errors;

      // Display specific field errors if available
      if (errors && Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            toast.error(`Lỗi ${field}`, {
              description: msg,
              duration: 4000,
            });
          });
        });
      } else {
        toast.error("Đăng nhập thất bại", {
          description: errorMessage,
          duration: 4000,
        });
      }
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
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
      const errorMessage =
        error.response?.data?.message ||
        "Đăng xuất thất bại. Vui lòng thử lại.";
      toast.error("Đăng xuất thất bại", {
        description: errorMessage,
        duration: 4000,
      });
      console.error(
        "Logout failed:",
        error.response?.data?.message || error.message,
      );
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
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      // Show appropriate message based on isOnboarded status
      if (data.user.isOnboarded) {
        toast.success("Đăng nhập thành công!", {
          description: "Chào mừng bạn quay trở lại.",
          duration: 3000,
        });
      } else {
        toast.success("Xác thực thành công!", {
          description: "Chào mừng bạn đến với ResQ SOS. Hãy hoàn tất hồ sơ.",
          duration: 3000,
        });
      }
      console.log("Google auth successful:", data);
    },
    onError: (error: AxiosError<AuthError>) => {
      const errorMessage =
        error.response?.data?.message ||
        "Xác thực với Google thất bại. Vui lòng thử lại.";
      toast.error("Xác thực thất bại", {
        description: errorMessage,
        duration: 4000,
      });
      console.error(
        "Google auth failed:",
        error.response?.data?.message || error.message,
      );
    },
  });
};
