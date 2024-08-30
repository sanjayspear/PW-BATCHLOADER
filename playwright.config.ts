
import type { PlaywrightTestConfig } from "@playwright/test";
//import { on } from "events";

const config: PlaywrightTestConfig = {
  testMatch: ["tests/dropdown.test.ts"],
  use: {
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure"
  },

  retries: 0,

  reporter: [["dot"], ["json", { outputFile: "jsonReports/jsonReports.json" }], ["html", { open: "always" }]]
}

export default config;