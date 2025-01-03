import { test, expect } from '@playwright/test';


    test('@regression Navigate and open datepicker', async ({ page }) => {
        // Go to the webpage
        await page.goto('https://testautomationpractice.blogspot.com/');
        
        // Scroll into view and click to open datepicker
        await page.locator('#datepicker').scrollIntoViewIfNeeded();
        await page.click('#datepicker'); // Open Calendar
        
        // Verify that datepicker opened by checking for month/year elements
        const actualMonth = await page.locator('.ui-datepicker-month').textContent();
        const actualYear = await page.locator('.ui-datepicker-year').textContent();
    
        expect(actualMonth).not.toBeNull(); // Check that month exists
        expect(actualYear).not.toBeNull();  // Check that year exists
    });
    
    test('@regression Select correct month and year in datepicker', async ({ page }) => {
        const expectedYear = '1991';
        const expectedMonth = 'January';
    
        await page.goto('https://testautomationpractice.blogspot.com/');
        await page.click('#datepicker'); // Open Calendar
    
        // While loop to find the correct month and year
        while (true) {
            const actualMonth = await page.locator('.ui-datepicker-month').textContent();
            const actualYear = await page.locator('.ui-datepicker-year').textContent();
    
            if (expectedYear == actualYear && expectedMonth == actualMonth) {
                // Break when the correct month and year are found
                break;
            }
            // Click "Prev" to navigate to the previous month
            await page.locator("//span[text()='Prev']").waitFor({ state: 'visible' });
            //await page.waitForTimeout(1000); // Wait 5 seconds before clicking
            await page.locator("//span[text()='Prev']").click({ timeout: 60000 });
        }
    
        // Verify the selected month and year
        const selectedMonth = await page.locator('.ui-datepicker-month').textContent();
        const selectedYear = await page.locator('.ui-datepicker-year').textContent();
        expect(selectedMonth).toBe(expectedMonth);
        expect(selectedYear).toBe(expectedYear);
    });
    
