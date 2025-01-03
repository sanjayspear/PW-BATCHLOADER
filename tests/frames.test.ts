import {expect, test} from '@playwright/test';

test('@regression Interact with Frames', async ({page}) => {
    await page.goto("https://letcode.in/frame");
    // Counts no. of frames
    const allFrames = page.frames();
    console.log("No. frames: "+allFrames.length);
    //Locate your frame (Approach 1)
    const myFrame = page.frame("firstFr");
    await myFrame?.fill("//input[@name='fname']", "Sanjay");
    await myFrame?.fill("//input[@name='lname']", "Verma");
    await page.waitForTimeout(3000);
    //expect(await myFrame?.locator('p.has-text-info').textContent()).toContain("You have entered");
    expect(await myFrame?.locator('p.has-text-info').textContent()).toBe("You have entered Sanjay Verma");

    //Locate your frame (Approach 2)
    const parentFrame = page.frameLocator("#firstFr");
    await parentFrame.locator("//input[@name='fname']").fill("Ankit");
    await parentFrame.locator("//input[@name='lname']").fill("Sharma");

    //nested frame
    const childFrame = parentFrame.frameLocator("iframe[src='innerFrame']");
    await childFrame.locator("input[name='email']").fill("sanjayym@dhruvts.com");
    await page.waitForTimeout(3000);
});