import { Page } from '@playwright/test';

/**
 * Helper utilities for authentication in tests
 */

export interface MockUser {
  id: string;
  email: string;
  name: string;
}

/**
 * Set up authenticated state in localStorage
 */
export async function setupAuthState(page: Page, user?: MockUser) {
  const defaultUser: MockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  const userData = user || defaultUser;

  await page.evaluate(
    ({ token, userJson }) => {
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', userJson);
    },
    {
      token: 'mock-token-for-testing',
      userJson: JSON.stringify(userData),
    }
  );
}

/**
 * Clear authentication state
 */
export async function clearAuthState(page: Page) {
  await page.evaluate(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  });
}

/**
 * Check if user is authenticated (by checking localStorage)
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  return await page.evaluate(() => {
    return !!localStorage.getItem('accessToken');
  });
}

/**
 * Get current user from localStorage
 */
export async function getCurrentUser(page: Page): Promise<MockUser | null> {
  return await page.evaluate(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  });
}

/**
 * Login helper - navigates to login and sets up auth
 */
export async function login(page: Page, user?: MockUser) {
  await page.goto('/login');
  await setupAuthState(page, user);
  await page.goto('/dashboard');
}

/**
 * Logout helper - clears auth and navigates to login
 */
export async function logout(page: Page) {
  await clearAuthState(page);
  await page.goto('/login');
}
