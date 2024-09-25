import { Page } from "@playwright/test";

export default class AddProductToCart{
    constructor(public page: Page){

    }

    async addProductToCart(){
        await this.page.locator("(//img[@class='lazy-load'])[1]").click();
        await this.page.getByRole('button', {name:'ADD TO CART'}).click();
    }

    async isToastVisible(){
        const toast =  this.page.locator("//a[.='View Cart ']");
        await toast.waitFor({state: 'visible'});
        return toast;
    }

}