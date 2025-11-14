import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getAccessToken, clearAuth } from "@/utils/authUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (import.meta.env.DEV) {
  console.log("🚀 Running in:", import.meta.env.VITE_ENV);
  console.log("🔗 API URL:", API_BASE_URL);
}
// Create Axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_BASE_URL, // Replace with your actual API base URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// List of endpoints that don't require authentication
const PUBLIC_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
];

// Request Interceptor - Attach token to every request (except public endpoints)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Check if the endpoint requires authentication
    const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    // Attach token if not a public endpoint
    if (!isPublicEndpoint) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    console.error("Request Error:", error);
    return Promise.reject({
      message: "Failed to send request",
      error,
    });
  }
);

// Response Interceptor - Handle all response errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful response
    return response;
  },
  (error: AxiosError) => {
    // Handle response errors
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data as any;

      switch (status) {
        case 400:
          // Bad Request
          return Promise.reject({
            message:
              data?.message || "Invalid request. Please check your input.",
            status,
            data,
          });

        case 401:
          // Unauthorized - Clear auth and redirect to login
          clearAuth();
          //   window.location.href = "/login";
          return Promise.reject({
            message: data?.error || "Session expired. Please login again.",
            status,
            data,
          });

        case 403:
          // Forbidden
          return Promise.reject({
            message:
              data?.message ||
              "You do not have permission to access this resource.",
            status,
            data,
          });

        case 404:
          // Not Found
          return Promise.reject({
            message: data?.message || "The requested resource was not found.",
            status,
            data,
          });

        case 422:
          // Unprocessable Entity (Validation Error)
          return Promise.reject({
            message:
              data?.message || "Validation failed. Please check your input.",
            status,
            data,
            errors: data?.errors || {},
          });

        case 429:
          // Too Many Requests
          return Promise.reject({
            message:
              data?.message || "Too many requests. Please try again later.",
            status,
            data,
          });

        case 500:
          // Internal Server Error
          return Promise.reject({
            message: data?.message || "Server error. Please try again later.",
            status,
            data,
          });

        case 503:
          // Service Unavailable
          return Promise.reject({
            message:
              data?.message ||
              "Service temporarily unavailable. Please try again later.",
            status,
            data,
          });

        default:
          return Promise.reject({
            message: data?.message || `Request failed with status ${status}`,
            status,
            data,
          });
      }
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message:
          "No response from server. Please check your internet connection.",
        error,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || "An unexpected error occurred.",
        error,
      });
    }
  }
);

export default axiosInstance;
