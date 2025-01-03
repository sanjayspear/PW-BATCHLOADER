import { test, expect } from '@playwright/test';
import { describe } from 'node:test';
import path from 'path';

describe('@regression', () => {
    //Note: You can get the following code form the Playwright official Document.

//Reference: https://playwright.dev/docs/downloads
test('Download Files', async ({ page }) => {
    await page.goto('https://commitquality.com/practice-file-download', { timeout: 60000 });

    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download File' }).click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('./' + download.suggestedFilename());
});

//Reference: https://playwright.dev/docs/input
test('Upload Single File', async ({ page }) => {
    await page.goto('https://www.foundit.in/upload');
    await page.waitForSelector('.mqfihd-upload');
    await page.click('.mqfihd-upload');
    await page.locator('#file-upload').setInputFiles('tests/uploadFiles/testfile1.pdf');
    await page.waitForTimeout(3000);
});

test('Upload Multiple File', async ({ page }) => {
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.waitForSelector('#filesToUpload');
    // Select multiple files
    await page.locator('#filesToUpload').setInputFiles([
        'tests/uploadFiles/testfile1.pdf',
        'tests/uploadFiles/testfile2.pdf',
        'tests/uploadFiles/testfile3.pdf',      
    ]);
    await page.waitForTimeout(3000);

    await expect(page.locator("ul[id='fileList'] li:nth-child(1)")).toHaveText('testfile1.pdf');
    await expect(page.locator('#fileList li:nth-child(2)')).toHaveText('testfile2.pdf');
    await expect(page.locator('#fileList li:nth-child(3)')).toHaveText('testfile3.pdf');

    //Remove all files
    await page.locator('#filesToUpload').setInputFiles([]);
    await expect(page.locator('#fileList li:nth-child(3)')).toHaveText('No Files Selected');
});
});







