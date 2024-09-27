import { Page } from "@playwright/test";
export default class LoginPage {
    constructor(public page: Page) {

    }
    async enterEmail(email: string) {
        await this.page.locator('#input-email').fill(email);//test001@test.com
    }
    async enterPassword(password: string) {
        await this.page.locator('#input-password').fill(password); //1234
    }
    async clickOnLoginBtn() {
        await Promise.all([
            //this.page.waitForNavigation({waitUntil: "networkidle"}),
            this.page.waitForNavigation(),
            this.page.locator("input[value='Login']").click()
        ]);
    }

    async login(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickOnLoginBtn();
    }
}