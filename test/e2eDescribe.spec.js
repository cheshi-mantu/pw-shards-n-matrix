import { test } from "@playwright/test";
import * as allure from "allure-js-commons";

test.describe("Payment suite", () => {
    test.beforeEach(async () => {
        await allure.epic("Web interface");
        await allure.feature("Payment");
        await allure.story("Checkout flow");
    });

    test("test one", async ({ page }) => { 
		expect(true).toBe(true);
	 });
    test("test two", async ({ page }) => { 
		expect(true).toBe(true);
	 });
});