import {Page} from '@playwright/test';
export default class RegistrationPage {

    constructor(public page: Page){
        
    }
    async enterFirstName(firstName: string){
        await this.page.locator('#input-firstname').fill(firstName);
    }
    async enterLastName(lastName: string){
        await this.page.locator('#input-lastname').fill(lastName);
    }
    async enterEmail(email: string){
        await this.page.locator('#input-email').fill(email);
    }
    async enterTelephoneNumber(telephone: string){
        await this.page.locator('#input-telephone').fill(telephone);
    }
    async enterPassword(password: string){
        await this.page.locator('#input-password').fill(password);
    }
    async enterConfirmPassword(confirmPassword: string){
        await this.page.locator('#input-confirm').fill(confirmPassword);
    }

    async isSubscribedChecked(){
       return await this.page.locator('#input-newsletter-no').isChecked();
    }

    async clickOnTermsAndConitionCheckbox(){
        //await this.page.locator("input[name='agree']").click();
        await this.page.locator("//div[contains(@class, 'custom-checkbox')]").click();
    }

    async clickOnContinueToRegister() {
        // We use Promise.all to ensure two actions happen simultaneously:
        // 1. We wait for the page navigation to complete after clicking the button (i.e., when there are no network requests left).
        // 2. We click the "Continue" button, which has a value attribute of 'Continue'.
    
        await Promise.all([
            // Waits for the page to finish navigation before proceeding.
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
    
            // Clicks the "Continue" button to proceed with registration.
            this.page.locator("input[value='Continue']").click()
        ]);
    }    
}