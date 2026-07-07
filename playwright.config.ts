import { defineConfig, devices } from "@playwright/test";

/**
 * E2e-rooktests. Draait tegen een productiebuild:
 *   npm run build && npm run test:e2e
 * De webServer start `next start` automatisch op poort 3900.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://localhost:3900",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "npm run start -- -p 3900",
    url: "http://localhost:3900",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
