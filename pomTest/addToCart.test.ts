import { test, expect } from '@playwright/test';
import RegisterPage from "../pages/registrationPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import AddToCart from "../pages/addProductToCart";

const email = "test003@test.com";
const password = '1234';

test.describe("Page Object test demo", async () => {
    test("Register test_01", async ({ page, baseURL }) => {
        const register = new RegisterPage(page);
        await page.goto(`${baseURL}route=account/register`);
        await register.enterFirstName("Sanjay");
        await register.enterLastName("Singh");
        await register.enterEmail(email);
        await register.enterTelephoneNumber("6732542783");
        await register.enterPassword(password);
        await register.enterConfirmPassword(password);
        //expect(register.isSubscribedChecked()).toBeTruthy();
        await register.clickOnTermsAndConitionCheckbox();
        await register.clickOnContinueToRegister();
    });

    test("Login test_02", async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`);
        await login.enterEmail(email);
        await login.enterPassword(password);
        await login.clickOnLoginBtn();
        expect(await page.title()).toBe('My Account');
    });

    test("Add to Cart test_03", async ({ page, baseURL }) => {
        const product: string = "HTC";
        const login = new LoginPage(page);
        const homePage = new HomePage(page);
        const addToCat = new AddToCart(page);

        await page.goto(`${baseURL}route=account/login`);
        await login.login(email, password);
        await homePage.megaMenu(product);
        await addToCat.addProductToCart();
        const isCartVisible = await addToCat.isToastVisible();
        expect(isCartVisible).toBeVisible();
        await isCartVisible.click();
    });
});
