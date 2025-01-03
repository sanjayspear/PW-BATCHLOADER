import {expect, test} from "@playwright/test"

test("@smoke Test Input Field", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const nameField = page.locator("input#name");
    await nameField.scrollIntoViewIfNeeded();
    console.log(await nameField.getAttribute("placeholder"))
    expect(nameField).toHaveAttribute("placeholder", "Enter Your Name");
    console.log("Before entering the data: "+await nameField.inputValue());
    await nameField.fill("Sanjay");
    console.log("After entering the data: "+await nameField.inputValue());
    const value = await nameField.inputValue();
    expect(value).toBe("Sanjay");
    await page.waitForTimeout(2000);
    const CB =  page.locator("input#checkBoxOption1")
    await CB.check();
    const flag = await CB.isChecked();
    expect(flag).toBe(true);
    expect(CB).toBeChecked();
    //expect(CB).not.toBeChecked();

    console.log("Is Checkbox Checked "+flag);
})