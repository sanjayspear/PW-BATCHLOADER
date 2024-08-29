import {expect, test} from "@playwright/test"

test("Test Input Field", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const nameField = page.locator("input#name");
    await nameField.scrollIntoViewIfNeeded();
    console.log(await nameField.getAttribute("placeholder"))
    expect(nameField).toHaveAttribute("placeholder", "Enter Your Name");
    console.log("Before entering the data: "+await nameField.inputValue());
    await nameField.fill("Sanjay");
    console.log("After entering the data: "+await nameField.inputValue());
    await page.waitForTimeout(2000);
})