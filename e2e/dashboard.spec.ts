import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Set up authenticated state before each test
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

  test('should display dashboard with loading state', async ({ page }) => {
    await page.goto('/dashboard');

    // Should show loading initially
    await expect(page.getByText(/loading dashboard/i)).toBeVisible();

    // Wait for loading to complete (with timeout)
    await expect(page.getByText(/loading dashboard/i)).not.toBeVisible({ timeout: 30000 });
  });

  test('should display dashboard header with user info', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for dashboard to load
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Check header elements
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByText(/welcome back/i)).toBeVisible();
    await expect(page.getByText(/test user/i)).toBeVisible();
  });

  test('should display action buttons', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Check for Export to PDF and Logout buttons
    await expect(page.getByRole('button', { name: /export to pdf/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
  });

  test('should display all section headings', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Scroll and check for major sections
    const sections = [
      'Doctor Actions',
      'Consultations',
      'Consultation Unique Users',
      'Company Care Facility Counts',
      'Billing Referrals',
      'Doctor Ratings',
      'Paid Member Consultations',
      'Pool Consultation',
      'Premium Subscription',
      'School Account Registrations',
      'User Statistics',
      'User Type Consultations',
    ];

    for (const section of sections) {
      await expect(page.getByRole('heading', { name: section, exact: false })).toBeVisible();
    }
  });

  test('should display metric cards', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Check that metric cards are visible (by looking for specific card titles)
    await expect(page.getByText('First Response Rate')).toBeVisible();
    await expect(page.getByText('Total Consultation')).toBeVisible();
    await expect(page.getByText('Total Users')).toBeVisible();
  });

  test('should open chart modal when clicking metric card', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Find and click a metric card
    const firstMetricCard = page.locator('div').filter({ hasText: 'First Response Rate' }).first();
    await firstMetricCard.click();

    // Modal should open
    await expect(page.getByRole('heading', { name: /first response rate/i })).toBeVisible();

    // Modal should have close button
    const closeButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await expect(closeButton).toBeVisible();

    // Close modal
    await closeButton.click();

    // Modal should close
    await expect(page.getByRole('heading', { name: /first response rate/i })).not.toBeVisible();
  });

  test('should close chart modal when clicking backdrop', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Click a metric card to open modal
    const firstMetricCard = page.locator('div').filter({ hasText: 'First Response Rate' }).first();
    await firstMetricCard.click();

    // Wait for modal
    await page.waitForSelector('.fixed.inset-0.bg-black\\/50', { timeout: 5000 });

    // Click backdrop
    await page.locator('.fixed.inset-0.bg-black\\/50').click({ position: { x: 10, y: 10 } });

    // Modal should close
    await expect(page.locator('.fixed.inset-0.bg-black\\/50')).not.toBeVisible();
  });

  test('should display trend indicators on metric cards', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Look for trend indicators (arrows or trend text)
    const trendIndicators = page.locator('text=/[↑↓→]/').or(page.locator('text=/[+-]\\d+/'));
    const count = await trendIndicators.count();

    // Should have multiple trend indicators
    expect(count).toBeGreaterThan(0);
  });

  test('should handle scroll and display all sections', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait a bit for any lazy loading
    await page.waitForTimeout(1000);

    // Check last section is visible
    await expect(page.getByRole('heading', { name: /user type consultations/i })).toBeVisible();
  });

  test('should maintain authentication state on page reload', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Reload page
    await page.reload();

    // Should still be on dashboard (not redirected to login)
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('should navigate away and back to dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Navigate to root
    await page.goto('/');

    // Should stay on/redirect to dashboard since authenticated
    await expect(page).toHaveURL('/dashboard');
  });
});

test.describe('Dashboard Error Handling', () => {
  test.beforeEach(async ({ page }) => {
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

  test('should handle API errors gracefully', async ({ page }) => {
    // Intercept API calls and return error
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: 'Server error' })
      });
    });

    await page.goto('/dashboard');

    // Should show error or handle gracefully
    // Note: Adjust based on your actual error handling
  });
});
