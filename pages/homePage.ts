import { Page } from "@playwright/test";

export default class HomePage{
    constructor(public page: Page){

    }

    // async clickOnSpecialHotMenu(){
    //     await this.page.click("'Special Hot'");   
    // }

    async megaMenu(productName: string){
        await this.page.locator("'Mega Menu'").hover(); //locator type is linked text.
        //await this.page.locator("'HTC'").click();
        await this.page.locator(`'${productName}'`).click();
    }
}