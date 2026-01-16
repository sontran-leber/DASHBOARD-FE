# E2E Tests with Playwright

This directory contains end-to-end tests for the Dashboard application using Playwright.

## Test Structure

### Test Files

- **`auth.spec.ts`** - Authentication flow tests
  - Login page rendering
  - Form validation
  - Authentication redirects
  - Logout functionality
  - Protected route access

- **`dashboard.spec.ts`** - Dashboard functionality tests
  - Dashboard loading states
  - User information display
  - Section rendering
  - Metric cards display
  - Chart modal interactions
  - Navigation and routing

- **`pdf-export.spec.ts`** - PDF export functionality tests
  - Export button visibility
  - PDF download verification
  - Filename format validation
  - Multiple exports
  - Error handling

## Running Tests

### Run all tests
```bash
npm run test
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

### View test report
```bash
npm run test:report
```

### Generate test code
```bash
npm run test:codegen
```

## Test Configuration

The Playwright configuration is in `playwright.config.ts` at the project root.

### Key Configuration:
- **Base URL**: `http://localhost:5173`
- **Test directory**: `./e2e`
- **Browsers**: Chromium, Firefox, WebKit
- **Automatic dev server**: Starts development server before running tests
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Traces**: Captured on first retry

## Writing New Tests

1. Create a new `.spec.ts` file in the `e2e` directory
2. Import test utilities:
   ```typescript
   import { test, expect } from '@playwright/test';
   ```
3. Write test suites using `test.describe()`
4. Write individual tests using `test()`
5. Use `expect()` for assertions

### Example Test:
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test code
    await expect(page.getByText('Something')).toBeVisible();
  });
});
```

## Authentication in Tests

Most tests require authentication. Set up authenticated state in `beforeEach`:

```typescript
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
```

## Best Practices

1. **Use semantic selectors**: Prefer `getByRole()`, `getByText()`, `getByLabel()` over CSS selectors
2. **Wait for elements**: Use `waitForSelector()` or expect auto-waiting
3. **Clean up**: Clear state in `beforeEach()` hooks
4. **Isolate tests**: Each test should be independent
5. **Use descriptive names**: Test names should clearly describe what is being tested
6. **Handle timeouts**: Set appropriate timeouts for slow operations
7. **Mock when needed**: Mock API responses for consistent test results

## CI/CD Integration

Tests can be run in CI/CD pipelines:

```yaml
- name: Install dependencies
  run: npm ci

- name: Install Playwright browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm run test

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Troubleshooting

### Tests are failing locally
1. Ensure dev server is running on port 5173
2. Clear browser cache and localStorage
3. Check if all dependencies are installed: `npm install`
4. Install Playwright browsers: `npx playwright install`

### Tests are slow
1. Run specific test files instead of all tests
2. Use `test.only()` to run single tests during development
3. Reduce timeout values if appropriate
4. Consider running tests in parallel (configured by default)

### Tests are flaky
1. Add explicit waits for dynamic content
2. Increase timeout values
3. Use retry configuration in playwright.config.ts
4. Check for race conditions in application code

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
