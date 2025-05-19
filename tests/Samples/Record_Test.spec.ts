import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await test.step("Navigate to Homepage", async () => {
    await page.goto("https://github.com/");
    await page.getByRole("link", { name: "Sign in" }).click();
  });

  await test.step("Enter Credentials", async () => {
    await page
      .getByRole("textbox", { name: "Username or email address" })
      .click();
    await page
      .getByRole("textbox", { name: "Username or email address" })
      .fill("testerstalk");
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill("testg");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
  });

  await test.step("Validate error message", async () => {
    await expect(page.getByRole("alert")).toContainText(
      "Incorrect username or password."
    );
  });
});
