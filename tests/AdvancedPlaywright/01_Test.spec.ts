import {test, expect} from '@playwright/test'

test ('Read ENV file test', async({page}) => {
    await page.goto(`${process.env.GOOGLE_URL}`);
    await page.getByRole('combobox', {name: 'Search'}).first().fill('Berries');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Delete');

    await page.screenshot({path: './screenshots/test.png'});
});
