import { expect, test } from "@playwright/test";
import { describe } from "node:test";

describe('@regression', () => {
    test('Static Dropdown test1', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.selectOption('select#dropdown-class-example',
            {
                label: 'Option1'
            });
        await page.waitForTimeout(2000);
    });
    
    test('Static Dropdown test2', async ({ page }) => {
        await page.goto("https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select");
        await page.waitForSelector('select#cars', {timeout: 10000});
        await page.selectOption('select#cars',
            {
                //value: 'audi'
                index:3
            });
        await page.waitForTimeout(1000);
    
        // Verify that the selected option is correct
        const selectedValue = await page.inputValue('select#cars');
        expect(selectedValue).toBe('audi');
    });
    
    // test('Multi Select Dropdown test2', async ({ page }) => {
    //     await page.goto("https://demo.mobiscroll.com/select/multiple-select");
    //     const iframe = page.frame({ url: "https://www.googletagmanager.com/ns.html?id=GTM-NDRKTM9" }); // If the iframe has a specific URL or part of it, use it to locate
    
    //     await iframe.click('#my-input');
    //       // Select multiple options by their values
    //       await iframe.selectOption('#multiple-select', [
    //         '1',  // Books
    //         '2',  // Movies, Music & Games
    //         '3',  // Electronics & Computers
    //         '4',  // Home, Garden & Tools
    //     ]);
    // });
});


