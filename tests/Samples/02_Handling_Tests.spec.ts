import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://www.google.com');
}); 

test.afterEach(async({page}) => {
    console.log("Test after each");
})

test ('Test to cover all lessons', async({page}) => {
    // await page.goto('https://www.google.com');
    await page.getByRole('combobox', {name: 'Search'}).first().fill('Berries');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Delete');

    await page.screenshot({path: './screenshots/test.png'});
});
