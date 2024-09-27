
import type { PlaywrightTestConfig } from "@playwright/test";
//import { on } from "events";

const config: PlaywrightTestConfig = {
  //testMatch: ["tests/datepicker.test.ts"],
  //testMatch: ["pomTest/addToCart.test.ts"],
  //testMatch:["fixture/fixture.test.ts"],
  testMatch: ["pomTest/addToCartUsingFixture.test.ts"],
  workers: 1,
  timeout: 120000,
  use: {
    baseURL: "https://ecommerce-playground.lambdatest.io/index.php?",
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    // // launchOptions: {
    //     ignoreHTTPSErrors: true
    //   // }
  },

  retries: 0,

  reporter: [["dot"], ["json", { outputFile: "jsonReports/jsonReports.json" }], ["html", { open: "always" }]]
}

export default config;