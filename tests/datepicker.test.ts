import { test, expect } from '@playwright/test';

test('Date Picker Test', async ({ page }) => {
    //Direct Approach: Enter the desired date directly into the date field.
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#datepicker').scrollIntoViewIfNeeded();
    await page.fill('#datepicker', '09/25/2024');
    await page.keyboard.down('Tab');
    await page.waitForTimeout(3000);
});

test('Date Picker, Appraoch 1 (Using for loop): Pick the date based on some conditions', async ({ page }) => {
    //Direct Approach: Enter the desired date directly into the date field.
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#datepicker').scrollIntoViewIfNeeded();


    //date picker
    const expectedYear = '2025';
    const expectedMonth = 'December';
    const expectedDate = '31';

    await page.click('#datepicker'); //Open Calendar

    //By the time while loop breaks, desired Month and Year would be selected.
    while (true) {
        const actualMonth = await page.locator('.ui-datepicker-month').textContent();
        const actualYear = await page.locator('.ui-datepicker-year').textContent();

        if (expectedYear == actualYear && expectedMonth == actualMonth) {
            //Break after locating the desired month and year
            break;
        }

        //Clicks next until it finds desired month
        await page.locator("//span[text()='Next']").click();
    }
    //Apprach 1: Select the date using for loop.
    //This will returns array of dates
    const dates = await page.$$("//td[@data-handler='selectDay']");

    for (const dt of dates) {
        if (await dt.textContent() == expectedDate) {
            await dt.click();
        }
    }

    await page.waitForTimeout(3000);
}); 

test('Date Picker, Approach 2 (Without using for loop) : Pick the date based on some conditions', async ({ page }) => {
    //Direct Approach: Enter the desired date directly into the date field.
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#datepicker').scrollIntoViewIfNeeded();


    //date picker
    const expectedYear = '2026';
    const expectedMonth = 'October';
    const date = '31';

    await page.click('#datepicker'); //Open Calendar

    //By the time while loop breaks, desired Month and Year would be selected.
    while (true) {
        const actualMonth = await page.locator('.ui-datepicker-month').textContent();
        const actualYear = await page.locator('.ui-datepicker-year').textContent();

        if (expectedYear == actualYear && expectedMonth == actualMonth) {
            //Break after locating the desired month and year
            break;
        }

        //Clicks next until it finds desired month
        await page.locator("//span[text()='Next']").click();
    }
    

    //Approach 2: Select the date using the xpath without any for loop
    await page.click(`//a[@class='ui-state-default'][text()='${date}']`);

    await page.waitForTimeout(3000);
});

test.only('Select date for the previous month : Pick the date based on some conditions', async ({ page }) => {
    //Direct Approach: Enter the desired date directly into the date field.
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#datepicker').scrollIntoViewIfNeeded();


    //date picker
    const expectedYear = '2016';
    const expectedMonth = 'January';
    const date = '24';

    await page.click('#datepicker'); //Open Calendar

    //By the time while loop breaks, desired Month and Year would be selected.
    while (true) {
        const actualMonth = await page.locator('.ui-datepicker-month').textContent();
        const actualYear = await page.locator('.ui-datepicker-year').textContent();

        if (expectedYear == actualYear && expectedMonth == actualMonth) {
            //Break after locating the desired month and year
            break;
        }

        //Clicks next until it finds desired month
        await page.locator("//span[text()='Prev']").click();
    }
    

    //Approach 2: Select the date using the xpath without any for loop
    await page.click(`//a[@class='ui-state-default'][text()='${date}']`);

    await page.waitForTimeout(3000);
}); 