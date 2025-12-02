import axiosInstance from "@/config/axiosConfig";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  // refreshToken: string;
  // user?: {
  //   id: string;
  //   email: string;
  //   name: string;
  // };
}

export interface ApiError {
  message: string;
  status?: number;
  data?: any;
  errors?: Record<string, string[]>;
}

/**
 * Login user with email and password
 */
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>(
      "/api/v1/auth/login",
      credentials
    );
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshToken = async (
  refreshToken: string
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>("/auth/refresh", {
      refreshToken,
    });
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

/**
 * Logout user (optional - if your backend has a logout endpoint)
 */
export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.delete("/api/v1/auth/logout");
  } catch (error) {
    // Ignore errors on logout
    console.error("Logout error:", error);
  }
};

/**
 * Example: Get dashboard data (protected endpoint)
 */
export const getDoctorActionData = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/api/v1/metrics/doctor-actions", {
      params: {
        period: "weekly",
        count: 14,
      },
    });
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const getAllData = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/api/v1/metrics/all", {
      params: {
        period: "weekly",
        count: 14,
      },
    });
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
