const { devices, defineConfig } = require("@playwright/test");

export default defineConfig({
  testDir: "./test",
  reporter: [
    ["list"],
    ['html', { outputFolder: './playwright-report', open: 'never' }]
  ],
});
