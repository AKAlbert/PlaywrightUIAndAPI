import {test, expect} from '@playwright/test'
import { Homepage } from '../../src/pages/Homepage'
import { ResultPage } from '../../src/pages/ResultsPage';
import { PlaylistPage } from '../../src/pages/PlaylistPage';

test('Page Object Model Test', async({page}) => {

    // Object of Homepage using the ref (homepage)
    const homepage = new Homepage(page);
    await homepage.goToURL();
    await homepage.searchWithKeywords(`${process.env.KEYWORDS}`);

    // Object of Results Page 
    const resultsPage = new ResultPage(page);
    resultsPage.clickOnPlaylist(`${process.env.KEYWORDS}`)

    // Object of Playlist page 
    const playlistPage = new PlaylistPage(page);
    await playlistPage.validatePageTitle(`${process.env.KEYWORDS}`+ '☑️ - YouTube');
})