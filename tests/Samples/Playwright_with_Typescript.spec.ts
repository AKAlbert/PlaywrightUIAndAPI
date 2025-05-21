// Import playwright module
import { test, expect } from "@playwright/test";

// Write a test

test("My first playwright typescript test", {tag: ['@PlaywrightAutomation']}, async ({ page }) => {
  // Go to URL
  await page.goto("https://www.youtube.com/");

  // Search with keywords
  await page
    .getByRole('combobox', { name: 'Search' })
    .fill("playwright by testers talk");
  await page.getByRole("combobox", { name: "Search" }).press("Enter");

  // Click on the playlist
  await page
    .getByRole('link', { name: 'Playwright by Testers Talk☑️' })
    // .first()
    .click();

  // Validate the page title
  await expect(page).toHaveTitle("Playwright Tutorial Full Course 2024 | Playwright Testing Tutorial - YouTube");
});
