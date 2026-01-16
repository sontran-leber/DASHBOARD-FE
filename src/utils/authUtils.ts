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
const TOKEN_EXPIRY_KEY = "tokenExpiry";

/**
 * Store authentication tokens in localStorage with expiry time
 * Default expiry: 7 days from now
 */
export const setAuthTokens = (
  tokens: AuthTokens,
  expiryHours: number = 1
): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  // localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);

  // Set expiry timestamp (in milliseconds)
  const expiryTime = Date.now() + expiryHours * 60 * 60 * 1000;
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
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
 * Check if the stored token has expired
 */
const isTokenExpired = (): boolean => {
  const expiryStr = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiryStr) return true; // No expiry means old token, consider expired

  const expiryTime = parseInt(expiryStr, 10);
  return Date.now() > expiryTime;
};

/**
 * Clear all authentication data from localStorage
 */
export const clearAuth = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  // localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
};

/**
 * Check if user is authenticated and token is not expired
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  if (!token) return false;

  // Check if token is expired
  if (isTokenExpired()) {
    // Clear expired token
    clearAuth();
    return false;
  }

  return true;
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
