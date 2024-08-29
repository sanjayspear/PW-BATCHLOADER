import { chromium, test } from "@playwright/test";

test("Login test Demo", async () => {
   const browser = await chromium.launch({
        headless: false
   });
   const context = await browser.newContext();
   const page = await context.newPage();

   await page.goto("https://ecommerce-playground.lambdatest.io/");
   await page.hover("//a[@data-toggle='dropdown']//span[contains(text(), ' My account')]");
   //await page.click("text=Login");
   await page.click("'Login'");
   await page.waitForTimeout(1000);

   //US: sanjay.qawizard@gmail.com
   //PWD: Welcome@2024

   await page.fill("input[name='email']","sanjay.qawizard@gmail.com" );
   await page.fill("input[name='password']", "Welcome@2024");
   await page.click("input[type='submit']");
   await page.waitForTimeout(1000);

   const newContext = await browser.newContext();
   const newPage = await newContext.newPage();
   await newPage.goto("https://ecommerce-playground.lambdatest.io/");
   await page.waitForTimeout(1000);
})