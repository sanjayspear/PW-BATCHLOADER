import {test, expect} from '@playwright/test';

test('Date Picker Test', async ({page}) => {
    //Direct Approach: Enter the desired date directly into the date field.
    await page.goto('https://testautomationpractice.blogspot.com/');
    await page.locator('#datepicker').scrollIntoViewIfNeeded();
    await page.fill('#datepicker', '09/25/2024');
    await page.keyboard.down('Tab');
    await page.waitForTimeout(3000);
});