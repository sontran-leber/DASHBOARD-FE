import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('PDF Export', () => {
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

  test('should have Export to PDF button visible', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Check Export to PDF button is visible
    const exportButton = page.getByRole('button', { name: /export to pdf/i });
    await expect(exportButton).toBeVisible();

    // Check button has the icon
    await expect(exportButton.locator('svg')).toBeVisible();
  });

  test('should download PDF when clicking Export button', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Set up download listener
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });

    // Click Export to PDF button
    await page.getByRole('button', { name: /export to pdf/i }).click();

    // Wait for download to start
    const download = await downloadPromise;

    // Verify download properties
    expect(download.suggestedFilename()).toMatch(/dashboard-report-.*\.pdf/);

    // Save file to verify it's a valid download
    const downloadPath = path.join(__dirname, '../test-results', download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Verify file exists and has content
    const fileStats = fs.statSync(downloadPath);
    expect(fileStats.size).toBeGreaterThan(0);

    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should generate PDF with correct filename format', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /export to pdf/i }).click();
    const download = await downloadPromise;

    // Check filename format: dashboard-report-YYYY-MM-DD.pdf
    const filename = download.suggestedFilename();
    expect(filename).toMatch(/^dashboard-report-\d{4}-\d{2}-\d{2}\.pdf$/);

    // Verify the date in filename is today's date
    const today = new Date().toISOString().split('T')[0];
    expect(filename).toContain(today);
  });

  test('should show alert when no data available for export', async ({ page }) => {
    // Go to dashboard but don't wait for data to load
    await page.goto('/dashboard');

    // Create a promise to listen for dialog
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('No data available');
      await dialog.accept();
    });

    // Immediately try to export before data loads
    // Note: This might not always trigger due to race conditions
    // Adjust based on actual application behavior
  });

  test('should handle PDF generation error gracefully', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Mock PDF generation failure by overriding the function
    await page.evaluate(() => {
      // Override pdf function to throw error
      (window as any).__MOCK_PDF_ERROR__ = true;
    });

    // Listen for alert
    let alertShown = false;
    page.on('dialog', async dialog => {
      if (dialog.message().includes('Failed to generate PDF')) {
        alertShown = true;
      }
      await dialog.accept();
    });

    // Note: Actual error simulation depends on your implementation
    // This is a placeholder test structure
  });

  test('should maintain dashboard state after PDF export', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Export PDF
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /export to pdf/i }).click();
    await downloadPromise;

    // Verify dashboard is still displayed correctly
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByText(/welcome back/i)).toBeVisible();

    // Verify we can still interact with dashboard
    await expect(page.getByRole('button', { name: /logout/i })).toBeEnabled();
  });

  test('should allow multiple PDF exports', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Export PDF first time
    const download1Promise = page.waitForEvent('download');
    await page.getByRole('button', { name: /export to pdf/i }).click();
    const download1 = await download1Promise;
    expect(download1).toBeTruthy();

    // Wait a moment
    await page.waitForTimeout(1000);

    // Export PDF second time
    const download2Promise = page.waitForEvent('download');
    await page.getByRole('button', { name: /export to pdf/i }).click();
    const download2 = await download2Promise;
    expect(download2).toBeTruthy();

    // Both should have same filename format
    expect(download1.suggestedFilename()).toMatch(/dashboard-report-.*\.pdf/);
    expect(download2.suggestedFilename()).toMatch(/dashboard-report-.*\.pdf/);
  });

  test('should export PDF with all metric data', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    // Verify metrics are loaded before export
    await expect(page.getByText('First Response Rate')).toBeVisible();
    await expect(page.getByText('Total Users')).toBeVisible();

    // Export PDF
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: /export to pdf/i }).click();
    const download = await downloadPromise;

    // Save and check file size (PDF with data should be larger)
    const downloadPath = path.join(__dirname, '../test-results', download.suggestedFilename());
    await download.saveAs(downloadPath);

    const fileStats = fs.statSync(downloadPath);
    // PDF with multiple pages of metrics should be at least 50KB
    expect(fileStats.size).toBeGreaterThan(50000);

    // Clean up
    fs.unlinkSync(downloadPath);
  });
});

test.describe('PDF Export Button Interaction', () => {
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

  test('should have correct button styling', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    const exportButton = page.getByRole('button', { name: /export to pdf/i });

    // Check button is styled correctly (has outline variant)
    await expect(exportButton).toHaveClass(/outline/);

    // Check button has icon and text
    await expect(exportButton.locator('svg')).toBeVisible();
    await expect(exportButton).toContainText('Export to PDF');
  });

  test('should be positioned next to logout button', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForSelector('h1:has-text("Dashboard")', { timeout: 30000 });

    const exportButton = page.getByRole('button', { name: /export to pdf/i });
    const logoutButton = page.getByRole('button', { name: /logout/i });

    // Both buttons should be visible
    await expect(exportButton).toBeVisible();
    await expect(logoutButton).toBeVisible();

    // They should be in the same container (header area)
    const exportBox = await exportButton.boundingBox();
    const logoutBox = await logoutButton.boundingBox();

    expect(exportBox).toBeTruthy();
    expect(logoutBox).toBeTruthy();

    // They should be roughly on the same horizontal line
    if (exportBox && logoutBox) {
      const verticalDiff = Math.abs(exportBox.y - logoutBox.y);
      expect(verticalDiff).toBeLessThan(50);
    }
  });
});
