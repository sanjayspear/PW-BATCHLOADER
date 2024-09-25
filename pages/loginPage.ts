import { Page } from "@playwright/test";
export default class LoginPage{
    constructor(public page: Page){

    }

    async enterEmail(email: string){
        await this.page.locator('#input-email').fill(email);//test001@test.com
    }
    async enterPassword(password: string){
        await this.page.locator('#input-password').fill(password); //1234
    }
    async clickOnLoginBtn(){
        await this.page.locator("input[value='Login']").click();
    }   
}