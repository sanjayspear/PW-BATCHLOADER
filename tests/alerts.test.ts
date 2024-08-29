import {expect, test} from "@playwright/test";

test('Accept: Normal alert', async ({page}) => {
    await page.goto("https://testpages.herokuapp.com/styled/alerts/alert-test.html");
    const simpleJSAlert = page.locator("input#alertexamples");
    page.on("dialog", async (alert) => {
            await page.waitForTimeout(2000);
            const text = alert.message();
            console.log("Message on the JS Alert is: "+text);
            await alert.accept();
    });
    await simpleJSAlert.click();
    const text = await page.locator("p#alertexplanation").textContent();
    expect(text).toBe("You triggered and handled the alert dialog");
});

test('Dismiss: Confirmation alert', async ({page}) => {
    await page.goto("https://testpages.herokuapp.com/styled/alerts/alert-test.html");
    const simpleJSAlert = page.locator("input#confirmexample");
    page.on("dialog", async (alert) => {
            await page.waitForTimeout(2000);
            const text1 = alert.message();
            console.log("Message on the JS Alert is: "+text1);
            await alert.dismiss();
            const text2 = await page.locator("p#confirmexplanation").textContent();
            expect(text2).toBe("You clicked Cancel, confirm returned false.");
            expect(page.locator("p#confirmexplanation")).toContainText("Cancel");
    });
    await simpleJSAlert.click();
});

test('Accept: Prompt alert', async ({page}) => {
    await page.goto("https://testpages.herokuapp.com/styled/alerts/alert-test.html");
    const simpleJSAlert = page.locator("input#promptexample");
    page.on("dialog", async (alert) => {
            await page.waitForTimeout(2000);
            const text1 = alert.message();
            console.log("Message on the JS Alert is: "+text1);
            await alert.accept("Hello! Sanjay");
            const text2 = await page.locator("p#promptexplanation").textContent();
            //expect(text2).toBe("You clicked OK. 'prompt' returned Hello! Sanjay");
            expect(page.locator("p#promptexplanation")).toContainText("Sanjay");
    });
    await simpleJSAlert.click();
});

test.only('Model Popup', async ({page}) => {
    await page.goto("https://getbootstrap.com/docs/4.0/components/modal/");
    await page.locator("text=Launch demo modal").click();
    await page.waitForTimeout(2000);
});