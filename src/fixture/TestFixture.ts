import {test as base} from '@playwright/test';
import { Homepage } from '../pages/Homepage';
import { ResultPage } from '../pages/ResultsPage';
import { PlaylistPage } from '../pages/PlaylistPage';

export const test = base.extend<{
    saveLogs: void;
    homePage: Homepage;
    resultsPage: ResultPage;
    playlistPage: PlaylistPage;
}> ({
    saveLogs: [async({ }, use) => {
        console.log('Global before is running ');

        await use ();

        console.log('Global afterEach is running ...');
    },
    {auto : true}],
    homePage: async ({page}, use) =>{
        const homePage = new Homepage(page);
        await use(homePage);
    },
    resultsPage: async ({page}, use) =>{
        const resultsPage = new ResultPage(page);
        await use(resultsPage);
    },
    playlistPage: async ({page}, use) =>{
        const playlistPage = new PlaylistPage(page);
        await use(playlistPage);
    },
});

export { expect } from '@playwright/test'