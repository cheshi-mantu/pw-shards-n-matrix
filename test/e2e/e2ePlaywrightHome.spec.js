const { expect, test } = require("@playwright/test");
const allure = require("allure-js-commons");

test.beforeEach(async () => {
  console.log("beforeEach");
  await allure.attachment("One small txt attachment", "Welcome to wonderland!", "text/plain");
});

test.afterEach(async () => {
  console.log("afterEach");
  await allure.attachment("after each test we attach text", "That's all folks!", "text/plain");
});


test("Playwright homepage contains 'Playwright CLI'", async ({ page }) => {
  await allure.tags("web", "playwright", "smoke");
  await allure.epic("Allure Framework");
  await allure.feature("Integration with Playwright");
  await allure.story("Demo page test");
  await allure.layer("e2e");
  await page.goto("https://playwright.dev");
  await expect(page.getByText("Playwright CLI")).toBeVisible();
});
