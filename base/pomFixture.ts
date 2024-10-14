import { test as baseTest } from '@playwright/test';
import RegisterPage from "../pages/registrationPage";
import LoginPage from "../pages/loginPage";
import HomePage from "../pages/homePage";
import AddToCart from "../pages/addProductToCart";

type pageObjects = {
    registerPage: RegisterPage,
    loginPage: LoginPage,
    homePage: HomePage,
    addToCartPage: AddToCart
}

//Creating all our page objects within the fixture
const testPages = baseTest.extend<pageObjects>({
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page))
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    addToCartPage: async ({ page }, use) => {
        await use(new AddToCart(page))
    }
});

export const test = testPages;
export const expect = testPages.expect;
export const describe = testPages.describe;