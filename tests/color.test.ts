import { test, expect } from '@playwright/test';

test('@smoke Validate element color', async ({ page }) => {
  // Navigate to the webpage
  await page.goto('https://ecommerce-playground.lambdatest.io/index.php?');

  // Locate the element (adjust the selector as needed)
  const element = page.locator("(//*[contains(@class, 'entry-design') and contains(@class, 'design-image') and contains(@class, 'flex-grow-0') and contains(@class, 'flex-shrink-0')])[1]");

  // Check if the element has the correct color
  await expect(element).toHaveCSS('color', 'rgb(38, 38, 38)');
});

/**
 * QUESTION: 
 * 
 *  How can I validate a color property using the toHaveCSS() method in Playwright 
 *  if my application's CSS uses hexadecimal color values?
 * 
 * ANSWER:
 *  When using the toHaveCSS() method in Playwright, it expects the color value in RGB format,
 *  not hexadecimal. Although the application may use hexadecimal color values, you should convert 
 *  those values to the corresponding RGB format before using them in the toHaveCSS() assertion. 
 *  For example, if your application uses #4CAF50 (hex), you need to convert it to rgb(76, 175, 80) for the toHaveCSS() method.

This ensures that Playwright correctly matches the computed color styles since it reads them in RGB
 format
 */