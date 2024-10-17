import { Locator, Page } from "@playwright/test";

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

    async logoColorCheck(): Promise<Locator>{
        const element = this.page.locator("(//*[contains(@class, 'entry-design') and contains(@class, 'design-image') and contains(@class, 'flex-grow-0') and contains(@class, 'flex-shrink-0')])[1]");
        return element;
    }

}