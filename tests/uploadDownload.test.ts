import { test, expect } from '@playwright/test';

test('Download Files', async ({ page }) => {
    await page.goto('https://commitquality.com/practice-file-download', {timeout: 60000});

    // Start waiting for download before clicking. Note no await.
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download File'}).click();
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs('./' + download.suggestedFilename());
});