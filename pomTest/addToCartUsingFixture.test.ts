import { test, expect, describe } from '../base/pomFixture';
import RegistrationPage from '../pages/registrationPage';
import * as data from '../test-data/addToCart-TestData.json';


describe("Page Object test demo", async () => {

    test("Register test_01", async ({ page, baseURL, registerPage }) => {
        // Navigate to the registration page
        await page.goto(`${baseURL}route=account/register`);

        // Enter registration details
        await registerPage.enterFirstName(data.firstname);
        await registerPage.enterLastName(data.lastname);
        await registerPage.enterEmail(data.email);
        await registerPage.enterTelephoneNumber(data.phone_number);
        await registerPage.enterPassword(data.password);
        await registerPage.enterConfirmPassword(data.password);

        // Click on terms and conditions checkbox
        await registerPage.clickOnTermsAndConitionCheckbox();

        // Click to continue registration
        await registerPage.clickOnContinueToRegister();

        // Get the error message locator
        const errorMessageLocator = await registerPage.getErrorMessageLocator();

        // Check if an error message appears indicating the user is already registered
        const isErrorVisible = await errorMessageLocator.isVisible({ timeout: 5000 });

        if (isErrorVisible) {
            // Capture the error message
            const errorMSG = await errorMessageLocator.textContent();

            // Assert that the error message matches the expected text
            expect(errorMSG?.trim()).toBe("Warning: E-Mail Address is already registered!");

            console.log("Warning: E-Mail Address is already registered!");

            // If error is found (user already registered), exit the test without registering
            return;
        } else {
            // No error message, proceed with registration
            console.log('Registration successful, no error message found.');

            const registrtionSuccessfulMSG = await (await registerPage.getSuccessfulLoginMessageLocator()).textContent();

            //Assert the successful registration
            expect(registrtionSuccessfulMSG?.trim()).toBe("Your Account Has Been Created!");
        }
    });
 
    test("Login test_02", async ({ page, baseURL, loginPage }) => {
        await page.goto(`${baseURL}route=account/login`);
        await loginPage.enterEmail(data.email);
        await loginPage.enterPassword(data.password);
        await loginPage.clickOnLoginBtn();
        expect(await page.title()).toBe('My Account');
    });

    test("Add to Cart test_03", async ({ page, baseURL, loginPage, homePage, addToCartPage }) => {
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
