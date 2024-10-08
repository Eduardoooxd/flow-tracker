import { defineConfig, devices } from '@playwright/test';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './e2e',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        ['html', { outputFile: 'playwright-report/report.html' }],
        [
            'playwright-ctrf-json-reporter',
            { outputDir: 'playwright-report', outputFile: 'ctrf-report.json' },
        ],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://127.0.0.1:3000',

        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

        {
            name: 'Mobile Iphone 13 Pro',
            use: devices['iPhone 13 Pro'],
        },

        {
            name: 'Mobile Android',
            use: devices['Pixel 5'],
        },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: 'pnpm dev',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !process.env.CI,
    },
});
