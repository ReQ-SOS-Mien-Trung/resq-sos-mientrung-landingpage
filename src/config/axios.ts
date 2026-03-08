import axios from "axios";
import { toast } from "sonner";
import { isApiErrorResponse, getApiErrorMessages } from "@/types/api";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Track whether a token refresh is in progress to avoid multiple concurrent refreshes
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const clearAuthAndRedirect = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("resq_user");
  localStorage.removeItem("resq_onboarding_complete");
  // Use a small delay so any pending toast can fire first
  setTimeout(() => {
    window.location.href = "/auth/login";
  }, 100);
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh/redirect logic for auth endpoints (login, register, etc.)
    const isAuthEndpoint = originalRequest?.url?.includes("/identity/auth/");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      const storedRefreshToken = localStorage.getItem("refreshToken");

      // No refresh token available → clear auth and redirect
      if (!storedRefreshToken) {
        clearAuthAndRedirect();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // Queue this request until the refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const storedAccessToken = localStorage.getItem("accessToken") ?? "";

      try {
        const response = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(`${import.meta.env.VITE_API_BASE_URL}/identity/auth/refresh-token`, {
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        api.defaults.headers.common["Authorization"] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthAndRedirect();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Handle API errors: show backend message as toast
    if (error.response && (error.response.status !== 401 || isAuthEndpoint)) {
      const data = error.response.data;
      if (isApiErrorResponse(data)) {
        // Has both message + errors fields → show field errors as description
        const fieldErrors = getApiErrorMessages(data);
        toast.error(data.message, {
          description: fieldErrors.join(" • "),
          duration: 5000,
        });
      } else if (typeof data?.message === "string") {
        // Only message → show message only
        toast.error(data.message, { duration: 5000 });
      }
    }

    return Promise.reject(error);
  },
);

export default api;
