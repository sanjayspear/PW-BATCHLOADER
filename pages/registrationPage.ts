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
        await this.page.locator("input[name='agree']").click(); 
    }

    async clickOnContinueToRegister(){
        await this.page.locator("input[value='Continue']").click();
    }
}