import {test, expect} from '@playwright/test'
import testData from '../../test-data/qa/testdata.json'

type TestData = {
    TestDataSet1: {
        Skill1: string,
        Skill2: string,
    },

    TestDataSet2: {
        Skill1: string,
        Skill2: string
    }
}

const typedTestData = testData as TestData;

for (const dataSetName in typedTestData){
    const skill = typedTestData[dataSetName as keyof TestData]

    test (`Data Driven Testing using JSON file : ${skill.Skill1} `, async({page}) => {
        await page.goto(`${process.env.GOOGLE_URL}`);
        await page.getByRole('combobox', {name: 'Search'}).first().fill(skill.Skill1);
        await page.keyboard.press('Meta+A');
        await page.keyboard.press('Delete');
    
        await page.screenshot({path: './screenshots/test.png'});
    });
}

