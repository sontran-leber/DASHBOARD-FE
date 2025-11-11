import axiosInstance from "@/config/axiosConfig";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
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
      "/auth/login",
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
    await axiosInstance.delete("/auth/logout");
  } catch (error) {
    // Ignore errors on logout
    console.error("Logout error:", error);
  }
};

/**
 * Get user profile (example protected endpoint)
 */
export const getUserProfile = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

/**
 * Example: Get dashboard data (protected endpoint)
 */
export const getDashboardData = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get("/dashboard");
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
