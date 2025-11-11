// Authentication utility functions for JWT token management

export interface AuthTokens {
  accessToken: string;
  // refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

// Token storage keys
const ACCESS_TOKEN_KEY = "accessToken";
// const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

/**
 * Store authentication tokens in localStorage
 */
export const setAuthTokens = (tokens: AuthTokens): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  // localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
};

/**
 * Get access token from localStorage
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get refresh token from localStorage
 */
// export const getRefreshToken = (): string | null => {
//   return localStorage.getItem(REFRESH_TOKEN_KEY);
// };

/**
 * Store user data in localStorage
 */
export const setUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data from localStorage
 */
export const getUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuth = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  // localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

/**
 * Get authorization header for API requests
 */
export const getAuthHeader = ():
  | { Authorization: string }
  | Record<string, never> => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
