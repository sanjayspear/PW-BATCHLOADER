import { test, expect } from '../base/pomFixture';
import * as data from '../test-data/addToCart-TestData.json';

test.describe("Page Object test demo", async () => {
    test("Register test_01", async ({ page, baseURL, registerPage }) => {
        await page.goto(`${baseURL}route=account/register`);
        await registerPage.enterFirstName(data.firstname);
        await registerPage.enterLastName(data.lastname);
        await registerPage.enterEmail(data.email);
        await registerPage.enterTelephoneNumber(data.phone_number);
        await registerPage.enterPassword(data.password);
        await registerPage.enterConfirmPassword(data.password);
        await registerPage.clickOnTermsAndConitionCheckbox();
        await registerPage.clickOnContinueToRegister();
    });

    test("Login test_02", async ({ page, baseURL, loginPage }) => {
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(data.email);
        await loginPage.enterPassword(data.password);
        await loginPage.clickOnLoginBtn();
        expect(await page.title()).toBe('My Account');
    });

    test.only("Add to Cart test_03", async ({ page, baseURL, loginPage, homePage, addToCartPage }) => {
        //const product: string = "HTC";
        const product: string = data.product;

        await page.goto(`${baseURL}route=account/login`);
        await loginPage.login(data.email, data.password);
        await homePage.megaMenu(product);
        await addToCartPage.addProductToCart();
        const isCartVisible = await addToCartPage.isToastVisible();
        expect(isCartVisible).toBeVisible();
        await isCartVisible.click();
    });
});
