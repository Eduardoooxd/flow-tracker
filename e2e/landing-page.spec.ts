import { expect, test } from '@playwright/test';

test.describe('Landing Page Test', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the base URL before each test
        await page.goto('/');
    });

    test('Should have the appropriate page title', async ({ page }) => {
        await expect(page).toHaveTitle(/Next Template/);
    });
});
