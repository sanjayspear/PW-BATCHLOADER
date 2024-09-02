import {expect, test} from '@playwright/test';

test('Interact with Frames', async ({page}) => {
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
    const frame = page.frameLocator("#firstFr");
    await frame.locator("//input[@name='fname']").fill("Ankit");
    await frame.locator("//input[@name='lname']").fill("Sharma");

});