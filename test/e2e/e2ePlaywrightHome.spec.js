const { expect, test } = require("@playwright/test");
const allure = require("allure-js-commons");

test("Playwright homepage contains 'Playwright CLI'", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page.getByText("Playwright CLI")).toBeVisible();
});
