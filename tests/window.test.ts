import { expect, test, chromium, Page } from "@playwright/test";
import { promises } from "dns";

// test.use({
//     viewport: { width: 1100, height: 600 },
// });

//APPROACH 01
test("Interact with multiple tabs or windows", async () => {
    //This time we're not using the page fixture, instead we create our own page.

    //Step 1 launch browser (Any desired browser) : Created the browser
    const browser = await chromium.launch();

    //Step 2 Using the browser we have created the context
    const context = await browser.newContext();

    //Step 3 Using the context we have creates two pages (Multiple pages)
    const page1 = await context.newPage(); //Page 1
    const page2 = await context.newPage(); //Page 2

    //Note: By using page one we can launch one application and by using page two we can launch another
    //      type of application.

    // Here we finding out number of pages created
    const allPages = context.pages();
    console.log(`Number of pages created ${allPages.length}`);

    //Using the page1 we navigatted to the amazon website
    await page1.goto("https://www.amazon.in/");
    const AmazonTitle = await page1.title();
    console.log(`${AmazonTitle}`);
    await expect(page1).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");

    //Using the page2 we have navigatted to the flipkart
    await page2.goto("https://www.flipkart.com/");
    const FlipkartTitle = await page2.title();
    console.log(`${FlipkartTitle}`);
    expect(page2).toHaveTitle("Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!");

    //Note 1 : So far we have not navigatted from one page another page by clicking on some link. Both are independent pages.
    //Note 2 : In playwright terms opening another window upon cliking on link is nothing but an event.
});

test("Handle multiple pages event / new window event / tab event", async () => {
    test.setTimeout(60000); // Increase timeout to 60 seconds

    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page1 = await context.newPage();
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle("OrangeHRM");

    // Step 1: Wait for the new page event
    const pagePromise = context.waitForEvent('page');

    // Step 2: Click on the link to open a new page
        await page1.locator("//a[text()='OrangeHRM, Inc']").click();

    // Step 3: Store the new page from the promise
    const newPage = await pagePromise;
    await newPage.waitForLoadState(); // Ensure the new page is fully loaded

    // Validate the title of the new page
    await expect(newPage).toHaveTitle("Human Resources Management Software | OrangeHRM");

    //Note: So we no need to switch between two different pages. Coz, different page objects are mentaining
    //in the same context. Suppose if you want to perform any validation in the page1 still you can
    //perform validation and also you can also perform validation on the newpage as well.

    await page1.waitForTimeout(6000);
    await newPage.waitForTimeout(3000);

    await browser.close(); //In the existing page fixtion we no need to close the browser explicity. 
    //However, we have created our own browser so we need to close the browser explicity.So finally whatever
    //browser is created that is being closed.
});

//APPROACH 02: Example 1
test("APPROACH 02: Handle multiple pages event / new window event / tab event", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    console.log("Parent Window URL: "+page.url());

    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.locator("//a[text()='OrangeHRM, Inc']").click()
    ]);
    console.log(`Child Window URL: ${newWindow.url()}`);
});

//APPROACH 02: Example 2
test.only("APPROACH 02: Example 2 Handle multiple pages event / new window event / tab event", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    console.log("Parent Window URL: "+page.url());

    const [multiplePages] = await Promise.all([
        page.waitForEvent("popup"),
        page.locator("//a[text()='OrangeHRM, Inc']").click()
    ]);
    await multiplePages.waitForLoadState(); //Waits until all popups or pages are loaded.
    const pages = multiplePages.context().pages();
    console.log("Number of tabs: "+pages);

    //This prints both parent and child url
    pages.forEach(tab => {
        console.log(tab.url());
    });

    //Steps to interact with the child element
    let chidPage: Page;
    for(let index=0; index < pages.length; index++){
        const url = pages[index].url();
        if(url == "https://www.orangehrm.com/"){
                chidPage = pages[index];
        }
    }
    //You can simply ignore ths red squiggly line
    const textContent = await chidPage.textContent("//h1")  
    console.log("Text Content is: "+textContent);
});

