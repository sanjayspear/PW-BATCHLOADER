import { expect, test } from "@playwright/test";

test('Lambdatest Ecom Site Test', async ({page}) => {
    await page.goto("https://ecommerce-playground.lambdatest.io/index.php?route=account/login");
    await page.locator('#input-email').fill('test001@test.com');//test001@test.com
    await page.locator('#input-password').fill('1234'); //1234
    await page.locator("input[value='Login']").click();
    await page.locator("'Mega Menu'").hover(); //locator type is linked text.
    //await page.locator("'Apple'").hover();
    await page.locator("'HTC'").click();
    await page.locator("(//img[@class='lazy-load'])[1]").click();
    await page.getByRole('button', {name:'ADD TO CART'}).click();
    const toast =  page.locator("//a[.='View Cart ']");
    await toast.waitFor({state: 'visible'});
    await toast.click();

    await page.waitForTimeout(3000);
});