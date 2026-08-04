const { expect, test } = require("@playwright/test");

test("Playwright homepage contains 'Playwright CLI'", async ({ page }) => {
  await page.goto("https://playwright.dev");

  await expect(page.getByText("Playwright CLI")).toBeVisible();
});
