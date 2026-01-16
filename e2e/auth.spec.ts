import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should redirect to login page when not authenticated', async ({ page }) => {
    await page.goto('/');

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
    await expect(page.getByText('Dashboard Login')).toBeVisible();
  });

  test('should redirect to login when accessing dashboard without authentication', async ({ page }) => {
    await page.goto('/dashboard');

    // Should redirect to login page
    await expect(page).toHaveURL('/login');
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.goto('/login');

    // Click submit without filling form
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show validation errors
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('should show validation error for short password', async ({ page }) => {
    await page.goto('/login');

    // Fill username but short password
    await page.getByPlaceholder(/account name/i).fill('testuser');
    await page.getByPlaceholder(/enter your password/i).fill('12345');
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show password length error
    await expect(page.getByText(/password must be at least 6 characters/i)).toBeVisible();
  });

  test('should display login form elements', async ({ page }) => {
    await page.goto('/login');

    // Check all form elements are present
    await expect(page.getByText('Dashboard Login')).toBeVisible();
    await expect(page.getByPlaceholder(/account name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/enter your password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    await expect(page.getByText(/don't have an account/i)).toBeVisible();
    await expect(page.getByText(/forgot password/i)).toBeVisible();
  });

  test('should not allow access to dashboard without login', async ({ page }) => {
    await page.goto('/dashboard');

    // Should be redirected to login
    await expect(page).toHaveURL('/login');

    // Try to directly navigate to dashboard again
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login');
  });

  test('should handle invalid login credentials gracefully', async ({ page }) => {
    await page.goto('/login');

    // Fill with invalid credentials
    await page.getByPlaceholder(/account name/i).fill('invaliduser');
    await page.getByPlaceholder(/enter your password/i).fill('wrongpassword');

    // Submit form
    await page.getByRole('button', { name: /sign in/i }).click();

    // Should show loading state briefly
    await expect(page.getByText(/signing in/i)).toBeVisible();

    // Note: Actual error handling depends on your API response
    // This test assumes the API will return an error
  });

  test('should redirect authenticated user away from login page', async ({ page, context }) => {
    // Simulate being authenticated by setting localStorage
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'mock-token-for-testing');
    });

    // Try to access login page
    await page.goto('/login');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });
});

test.describe('Logout Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Set up authenticated state
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.setItem('accessToken', 'mock-token-for-testing');
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        email: 'test@example.com',
        name: 'Test User'
      }));
    });
  });

  test('should logout and redirect to login page', async ({ page }) => {
    await page.goto('/dashboard');

    // Click logout button
    await page.getByRole('button', { name: /logout/i }).click();

    // Should redirect to login
    await expect(page).toHaveURL('/login');

    // Should clear authentication
    const hasToken = await page.evaluate(() => !!localStorage.getItem('accessToken'));
    expect(hasToken).toBe(false);
  });
});
