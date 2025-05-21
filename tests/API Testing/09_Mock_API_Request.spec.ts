import { test, expect } from '@playwright/test'

test('Mock API Requests in Playwright', async ({ page }) => {

    await page.route('*/**/api/v1/fruits', async route => {
        const json = [
            { name: 'FirstTestName', id: 12 },
            { name: 'SecondTestName1', id: 13 },
            { name: 'ThirdTestName2', id: 14 },
            { name: 'FourthTestName3', id: 15 },
        ];

        await route.fulfill({ json });
    });

    await page.goto('https://demo.playwright.dev/api-mocking/');

    // Validate text
    await expect(page.getByText('FirstTestName')).toBeVisible();
    await expect(page.getByText('SecondTestName1')).toBeVisible();
    await expect(page.getByText('ThirdTestName2')).toBeVisible();
    await expect(page.getByText('FourthTestName3')).toBeVisible();

});
