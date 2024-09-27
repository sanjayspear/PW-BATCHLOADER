import { test, expect } from '../base/pomFixture';

const email = "test003@test.com";
const password = '1234';

test.describe("Page Object test demo", async () => {
    test("Register test_01", async ({ page, baseURL, registerPage }) => {
        await page.goto(`${baseURL}route=account/register`);
        await registerPage.enterFirstName("Sanjay");
        await registerPage.enterLastName("Singh");
        await registerPage.enterEmail(email);
        await registerPage.enterTelephoneNumber("6732542783");
        await registerPage.enterPassword(password);
        await registerPage.enterConfirmPassword(password);
        await registerPage.clickOnTermsAndConitionCheckbox();
        await registerPage.clickOnContinueToRegister();
    });

    test("Login test_02", async ({ page, baseURL, loginPage }) => {
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(email);
        await loginPage.enterPassword(password);
        await loginPage.clickOnLoginBtn();
        expect(await page.title()).toBe('My Account');
    });

    test("Add to Cart test_03", async ({ page, baseURL, loginPage, homePage, addToCartPage }) => {
        const product: string = "HTC";
        
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.login(email, password);
        await homePage.megaMenu(product);
        await addToCartPage.addProductToCart();
        const isCartVisible = await addToCartPage.isToastVisible();
        expect(isCartVisible).toBeVisible();
        await isCartVisible.click();
    });
});
